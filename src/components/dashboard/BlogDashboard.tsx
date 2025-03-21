import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Clock, FileTerminal, MessageCircle, PlusCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import RecentArticles from './RecentArticles'
import { prisma } from '@/src/lib/prisma'

const BlogDashboard = async () => {
  const [articles, totalComments] = await Promise.all([
    prisma.articles.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include:{
        comments:true,
        author:{
          select:{
            name:true,
            email:true,
            imageUrl:true
          }
        }
      }
    }),

    prisma.comment.count({})
  ])

  return (
    <main className='flex-1 p-4 md:p-8'>

      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-bold text-2xl'>Blog Dashboard</h1>
          <p>Manage Your Content and analytics</p>
        </div>

        <Link href={`/dashboard/articles/create`}>
          <Button><PlusCircle className='w-4 h-4' /> New Articles</Button>
        </Link>
      </div>

      {/* quick stats means articles */}
      <div className='grid md:grid-cols-3 gap-3 mb-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Total Articles</CardTitle>
            <FileTerminal className='w-4 h-4' />
          </CardHeader>

          <CardContent>
            <div className='text-2xl font-bold'>{articles?.length}</div>
            <p className='text-sm text-muted-foreground mt-1'>+5 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Total Comments</CardTitle>
            <MessageCircle className='w-4 h-4' />
          </CardHeader>

          <CardContent>
            <div className='text-2xl font-bold'>{totalComments}</div>
            <p className='text-sm text-muted-foreground mt-1'>12 awating modration</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Avg Rating time</CardTitle>
            <Clock className='w-4 h-4' />
          </CardHeader>

          <CardContent>
            <div className='text-2xl font-bold'>2</div>
            <p className='text-sm text-muted-foreground mt-1'>+0.6 from month</p>
          </CardContent>
        </Card>
      </div>

      <RecentArticles articles={articles} />
    </main>
  )
}

export default BlogDashboard