"use server";

import { prisma } from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const likeOrDislikeToggle = async (articleId: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("please login first to like any article");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("please login first");
  }

  const existingLike = await prisma.like.findFirst({
    where: {
      articleId,
      userId: user?.id,
    },
  });

  if (existingLike) {
    // dislike
    await prisma.like.delete({
      where: { id: existingLike?.id },
    });
  } else {
    // like
    await prisma.like.create({
      data: {
        userId: user.id,
        articleId: articleId,
      },
    });
  }

  revalidatePath(`/articles/${articleId}`);
};
