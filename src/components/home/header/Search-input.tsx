'use client'
import { searchAction } from '@/src/actions/search'
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Input } from '../../ui/input'

const SearchInput = () => {
    const searchText = useSearchParams()

    return (
        <div>
            <form action={searchAction} className='flex'>
                <div className='relative'>
                    <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                    <Input type='text' name='search' id='name' defaultValue={searchText?.get('search') || ""} placeholder=' search here...' className='border-gray-300 py-2 pl-10' />
                </div>

            </form>
        </div>
    )
}

export default SearchInput