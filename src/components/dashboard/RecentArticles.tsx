'use client'
import React, { useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { MoveRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Prisma } from '@prisma/client'
import { deleteArticle } from '@/src/actions/deleteArticle'

type RecentArticlesProps = {
    articles: Prisma.ArticlesGetPayload<{
        include: {
            comments: true,
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    }>[]
}

const RecentArticles: React.FC<RecentArticlesProps> = ({ articles }) => {
    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle>Recent ArticleS</CardTitle>
                    <Button className='text-muted-foreground' variant={"ghost"}>
                        View All <MoveRight className='w-4 h-4' />
                    </Button>
                </div>
            </CardHeader>

            {
                !articles?.length ? (
                    <div>
                        No Article found
                    </div>
                ) : (
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Comment</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className='text-center'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {
                                    articles?.map((article) => (
                                        <TableRow key={article?.id}>
                                            <TableCell>{article?.title}</TableCell>
                                            <TableCell><Badge variant={"outline"} className='rounded-full bg-green-100 text-green-800'>Published</Badge></TableCell>
                                            <TableCell>{article?.comments?.length}</TableCell>
                                            <TableCell>{article?.createdAt?.toDateString()}</TableCell>
                                            <TableCell>
                                                <div className='flex gap-3 items-center justify-center'>
                                                    <Link href={`/dashboard/articles/${article?.id}/edit`}>
                                                        <Button>Edit</Button>
                                                    </Link>
                                                    <div>
                                                        <DeleteButton articleId={article?.id} />
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>

                        </Table>
                    </CardContent>
                )
            }


        </Card>
    )
}

export default RecentArticles

type DeleteButtonProps = {
    articleId: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
   const [isPending, startTransition] = useTransition()

    return (
        <form action={() => {
            startTransition(async () => {
                await deleteArticle(articleId)
            })
        }}>
            <Button disabled={isPending} type='submit' variant={'ghost'}>
                {isPending ? "loading..." : "Delete"}
            </Button>
        </form>
    )
}