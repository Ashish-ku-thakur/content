import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { FileText, LayoutDashboard, MessageCircle, Settings } from 'lucide-react'

const DashBoardSidebar = () => {
    return (
        <div className='h-full px-4 py-6'>
            <div className='flex items-center gap-2 mb-8 px-2'>
                <Link href={"/"} className='flex items-center space-x-2'>
                    <span className='font-bold text-2xl'>
                        <span className='bg-gradient-to-r from-purple-600 to bg-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent'>
                            Byte
                        </span>

                        <span className='text-foreground'>
                            Code
                        </span>
                    </span>
                </Link>
            </div>

            
            {/* links btn articles, dashboard, message */}
            <nav>
                <Link href={'/dashboard'}>
                    <Button className='w-full justify-start' variant={"ghost"}>
                        <LayoutDashboard className='w-5 h-5' />
                        Overview
                    </Button>
                </Link>
                <Link href={'/dashboard/articles/create'}>
                    <Button className='w-full justify-start' variant={"ghost"}>
                        <FileText className='w-5 h-5' />
                        Articles
                    </Button>
                </Link>
                <Link href={'/dashboard'}>
                    <Button className='w-full justify-start' variant={"ghost"}>
                        <MessageCircle className='w-5 h-5' />
                        Comments
                    </Button>
                </Link>
                <Link href={'/settings'}>
                    <Button className='w-full justify-start' variant={"ghost"}>
                        <Settings className='w-5 h-5' />
                        Settings
                    </Button>
                </Link>
            </nav>
        </div>
    )
}

export default DashBoardSidebar