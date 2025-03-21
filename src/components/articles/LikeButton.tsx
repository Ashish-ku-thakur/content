'use client'
import React, { useOptimistic, useTransition } from 'react'
import { Button } from '../ui/button'
import { Bookmark, Share2, ThumbsUp } from 'lucide-react'
import { likeOrDislikeToggle } from '@/src/actions/likeDislikeToggle'
import { Like } from '@prisma/client'

type LikeButtonProps = {
    articleId: string,
    likes: Like[],
    isLiked: boolean
}

const LikeButton: React.FC<LikeButtonProps> = ({ articleId, isLiked, likes }) => {

    const [optimisticLike, setOptimisticLike] = useOptimistic(likes?.length)
    const [isPending, startTransition] = useTransition()

    const handleLikeDislike = async () => {
        startTransition(async () => {
            setOptimisticLike(isLiked ? optimisticLike - 1 : optimisticLike + 1)  // optimistis ui update
            await likeOrDislikeToggle(articleId)
        })
    }

    return (
        <div className='flex gap-4 mb-12 border-t pt-8'>
            <form action={handleLikeDislike}>
                <Button  disabled={isPending} type='submit' className='gap-2' variant={'ghost'}>
                    <ThumbsUp className='h-4 w-4' />{optimisticLike}</Button>
                <Button type='button' variant={'ghost'}>
                    <Bookmark className='h-4 w-4' /> 0
                </Button>
                <Button type='button' variant={'ghost'}>
                    <Share2 className='h-4 w-4' /> 0
                </Button>

            </form>
        </div>
    )
}

export default LikeButton