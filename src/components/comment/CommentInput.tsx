'use client'
import React, { useActionState } from 'react'
import { Input } from '../ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { createComment } from '@/src/actions/createComment'

type CommentInputProps = {
    articleId: string
}

const CommentInput: React.FC<CommentInputProps> = ({ articleId }) => {

    const [formState, action, isPending] = useActionState(createComment.bind(null, articleId), { errors: {} })

    return (
        <form action={action} className='mb-8'>
            <div className='flex gap-4'>
                <Avatar>
                    <AvatarFallback>CN</AvatarFallback>
                    <AvatarImage
                        src='https://images.unsplash.com/photo-1522198648249-0657d7ff242a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGElMjBwZXJzb24lMjB3aXRoJTIwbGFwdG9wfGVufDB8fDB8fHww'
                        alt='CommentInput-avatar-image'
                    />
                </Avatar>

                <div className='flex-1'>

                    <Input
                        type='text'
                        name='body'
                        placeholder='Add a comment...'
                    />
                    {
                        formState?.errors?.body && (<p className='text-red-500 text-sm'>{formState?.errors?.body}</p>)
                    }

                    <div className='mt-4 flex justify-end'>
                        <Button type='submit'>
                            {isPending ? "loading..." : "Post comment"}
                        </Button>
                    </div>

                    {
                        formState?.errors?.formErrors && (
                            <p className='text-red-500 text-sm border p-2 border-red-400'>{formState?.errors?.formErrors[0]}</p>
                        )
                    }
                </div>

            </div>
        </form>
    )
}

export default CommentInput