"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CreateArticlesSchema = z.object({
  title: z.string().min(3).max(100),
  categary: z.string(),
  content: z.string().min(10),
});

type CreateArticlesFormState = {
  errors: {
    title?: string[];
    categary?: string[];
    content?: string[];
    featuredImage?: string[];
    formErrors?: string[];
  };
};

export const editArticle = async (
  articleId: string,
  preState: CreateArticlesFormState,
  formData: FormData
): Promise<CreateArticlesFormState> => {
  const result = CreateArticlesSchema.safeParse({
    title: formData.get("title"),
    categary: formData.get("categary"),
    content: formData.get("content"),
  });

  if (!result?.success) {
    return {
      errors: result?.error?.flatten().fieldErrors,
    };
  }

  const { userId } = await auth();

  if (!userId) {
    return {
      errors: { formErrors: ["user not found, please login first"] },
    };
  }

  // Get that article
  const existingArticle = await prisma.articles.findUnique({
    where: { id: articleId },
  });

  if (!existingArticle) {
    return {
      errors: { formErrors: ["article not found"] },
    };
  }

  // Find the user ID via Clerk ID
  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) {
    return {
      errors: { formErrors: ["Please login first"] },
    };
  }

  let imageUrl = existingArticle?.featuredImage;
  const imageFile = formData.get("featuredImage") as File;
  

  if (imageFile?.name !== 'undefined') {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;

    try {
      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        resource_type: "image",
        public_id: "articles-image",
      });

      if (uploadResponse?.secure_url) {
        imageUrl = uploadResponse.secure_url;
      }
    } catch (error: unknown) {
      console.error("Image Upload Error:", error);
      return {
        errors: { formErrors: ["Image upload failed"] },
      };
    }
  } // Yaha bracket sahi jagah par hai ✅

  // Now we can update the article
  try {
    await prisma.articles.update({
      where: { id: articleId },
      data: {
        title: result.data.title,
        category: result.data.categary,
        content: result.data.content,
        featuredImage: imageUrl, // Use old or new image
      },
    });
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      return {
        errors: { formErrors: [error.message] },
      };
    } else {
      return {
        errors: { formErrors: ["Some Internal Error"] },
      };
    }
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard`);
};
