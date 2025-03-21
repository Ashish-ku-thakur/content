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

export const createArticles = async (
  _: CreateArticlesFormState,
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
      errors: { formErrors: ["user not found pleace login first"] },
    };
  }

  //create articles

  // find the user id via clerk id

  const existingUser = await prisma?.user?.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!existingUser) {
    return {
      errors: {
        formErrors: ["article is not created please login first "],
      },
    };
  }

  const imageFile = formData.get("featuredImage") as File | null;

  if (!imageFile || imageFile.name === "undefined") {
    return {
      errors: { featuredImage: ["Image file is required"] },
    };
  }

  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // this is another type for image data get and upload to cloudinary
  // const uploadResponse: UploadApiResponse | undefined = await new Promise(
  //   (resolve, reject) => {
  //     const uploadStream = cloudinary.uploader.upload_stream(
  //       { resource_type: "auto" },
  //       (error, result) => {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(result);
  //         }
  //       }
  //     );
  //     uploadStream.end(buffer);
  //   }
  // );

  const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;

  const uploadResponse = await cloudinary.uploader.upload(base64Image, {
    resource_type: "image",
    public_id: "articles-image",
  });

  const imageUrl = uploadResponse.secure_url;

  if (!imageUrl) {
    return {
      errors: {
        featuredImage: ["failed to upload image"],
      },
    };
  }

  // now we can createan article

  try {
    await prisma.articles.create({
      data: {
        title: result?.data?.title,
        category: result?.data?.categary,
        content: result?.data?.content,
        featuredImage: imageUrl,
        authorId: existingUser?.id,
      },
    });

    console.log("article created successfully");

    // if (!article) {
    //   cloudinary.api.delete_resources(["articles-image"], {
    //       type: "upload",
    //       resource_type: "image",
    //     })

    // }
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error?.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["Some Internal Error"],
        },
      };
    }
  }
  revalidatePath("/dashboard");
  redirect(`/dashboard`);
};
