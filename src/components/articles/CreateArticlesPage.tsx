'use client'
import React, { startTransition, useActionState, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import ReactQuill from "react-quill-new"
import 'react-quill-new/dist/quill.snow.css';
import { createArticles } from '@/src/actions/createArticles'

const CreateArticlesPage = () => {
    const [content, setContent] = useState("")

    const [formState, action, isPending] = useActionState(createArticles, { errors: {} })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e?.currentTarget)
        formData.append("content", content)
        
        startTransition(() => {
            action(formData)
        })
    }



    return (
        <div className='max-w-4xl mx-auto p-6'>
            <Card>
                <CardHeader>
                    <CardTitle>Create New Article</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='space-y-6'>
                            <Label htmlFor='title'>Title</Label>
                            <Input
                                type='text'
                                placeholder='Enter a Article Title'
                                name='title'
                                id='title'
                            />
                            {
                                formState?.errors?.title && (<span className='text-sm text-red-500'>{formState?.errors?.title}</span>)
                            }
                        </div>

                        <div className='space-y-6'>
                            <Label htmlFor='categary'>Categary</Label>
                            <select className='w-full text-yellow-600 h-10 rounded-md' name='categary' id='categary'>
                                <option value="">Select Categary</option>
                                <option value="technology">Technology</option>
                                <option value="programing">Programing</option>
                                <option value="web devlopment">Web devlopment</option>
                            </select>

                            {
                                formState?.errors?.categary && (<span className='text-sm text-red-500'>{formState?.errors?.categary}</span>)
                            }
                        </div>

                        <div className='space-y-6'>
                            <Label htmlFor='featuredImage'>Featured image</Label>
                            <Input
                                type='file'
                                name='featuredImage'
                                id='featuredImage'
                                accept='image/*'
                            />
                            {
                                formState?.errors?.featuredImage && (<span className='text-sm text-red-500'>{formState?.errors?.featuredImage}</span>)
                            }
                        </div>

                        <div className='space-y-2'>
                            <Label>Content</Label>
                            <ReactQuill theme='snow' value={content} onChange={setContent} className='' />
                            {
                                formState?.errors?.content && (<span className='text-sm text-red-500'>{formState?.errors?.content[0]}</span>)
                            }
                        </div>

                        {
                            formState?.errors?.formErrors && (<span className='text-sm text-red-500'>{formState?.errors?.formErrors}</span>)
                        }

                        <div className='flex justify-end gap-4 '>
                            <Button variant={"outline"} type='button'>Cencel</Button>
                            <Button type='submit' disabled={isPending}>
                                {isPending ? "Loading..." : "Publish Articel"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateArticlesPage