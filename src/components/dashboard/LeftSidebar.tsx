'use client'
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { LayoutDashboard } from 'lucide-react'
import DashBoardSidebar from './DashBoardSidebar'

const LeftSidebar = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant={"outline"} className='md:hidden m-4'>
                        <LayoutDashboard className='h-4 w-4' />
                    </Button>
                </SheetTrigger>

                <SheetContent side='left' className='w-[250px]'>
                    {/* this is for mobile device */}
                    <DashBoardSidebar />
                </SheetContent>
            </Sheet>

            {/* this is for pc or laptop */}
            <div className='hidden md:block h-screen w-[250px] border-r border-gray-500 dark:border-white'>
                <DashBoardSidebar />
            </div>
        </div>
    )
}

export default LeftSidebar