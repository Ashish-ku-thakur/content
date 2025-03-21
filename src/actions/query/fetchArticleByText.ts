import { prisma } from "@/src/lib/prisma";


export const fetchArticleByText = async (
  searchText: string,
  skip: number,
  take: number
) => {
  const [articles, total] = await prisma.$transaction([
    prisma.articles.findMany({
      where: {
        OR: [
          { title: { contains: searchText, mode: "insensitive" } },
          { category: { contains: searchText, mode: "insensitive" } },
        ],
      },

      include: {
        author: {
          select: { name: true, imageUrl: true, email: true },
        },
      },
      skip: skip,
      take: take,
    }),
    prisma.articles.count({
      where: {
        OR: [
          { title: { contains: searchText, mode: "insensitive" } },
          { category: { contains: searchText, mode: "insensitive" } },
        ],
      },
    }),
  ]);

  return { articles, total };
};
