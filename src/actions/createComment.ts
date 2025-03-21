"use server";

import { prisma } from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  body: z.string().min(1),
});

type createCommentFormState = {
  errors: {
    body?: string[];
    formErrors?: string[];
  };
};

export const createComment = async (
  articleId: string,
  preState: createCommentFormState,
  formData: FormData
): Promise<createCommentFormState> => {
  const result = createCommentSchema.safeParse({
    body: formData.get("body") as string,
  });

  if (!result?.success) {
    return {
      errors: result?.error?.flatten().fieldErrors,
    };
  }

  const { userId } = await auth();

  if (!userId) {
    return {
      errors: {
        formErrors: ["user not found"],
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!existingUser) {
    return {
      errors: {
        formErrors: ["user not found please login first"],
      },
    };
  }

  // create comment

  try {
    await prisma.comment.create({
      data: {
        body: result?.data?.body,
        authorId: existingUser?.id,
        articleId: articleId,
      },
    });
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
          formErrors: ["some internal error"],
        },
      };
    }
  }

  revalidatePath(`/articles/${articleId}`);

  return {
    errors: {},
  };
};
