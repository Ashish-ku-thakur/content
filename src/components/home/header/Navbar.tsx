'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../../ui/button'
import SearchInput from './Search-input'
import ToggleMode from './ToggleMode'
import { Menu, Search, X } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Input } from '../../ui/input'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

    return (
        <div className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>

                    {/* left side logo*/}
                    <div className='flex items-center gap-8'>
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

                    {/* hidden in sm & md desktop menu links for go to pages route*/}
                    <div className='md:flex hidden items-center gap-4'>
                        <Link href={"/articles"} className='text-sm font-medium text-foreground transition-colors hover:text-foreground'>
                            Articles
                        </Link>

                        <Link href={"/Articles"} className='text-sm font-medium text-foreground transition-colors hover:text-foreground'>
                            About
                        </Link>

                        <Link href={"/Articles"} className='text-sm font-medium text-foreground transition-colors hover:text-foreground'>
                            Tutorial
                        </Link>

                        <Link href={"/dashboard"} className='text-sm font-medium text-foreground transition-colors hover:text-foreground'>
                            Dashboard
                        </Link>

                    </div>


                    {/* right side */}
                    <div className='flex items-center gap-4'>
                        <SearchInput />

                        <ToggleMode />



                        {/* user action */}
                        <SignedIn>
                            <UserButton />
                        </SignedIn>

                        <SignedOut>
                            <div className='hidden md:flex items-center gap-2 '>
                                <SignInButton>
                                    <Button variant={'outline'}>Login</Button>
                                </SignInButton>

                                <SignUpButton>
                                    <Button>Signup</Button>
                                </SignUpButton>
                            </div>
                        </SignedOut>
                    </div>


                    {/* hidden in sm & md btns */}
                    {/* mobile Menu btn --burger --X */}
                    {/* <div> */}
                    <Button variant={"outline"} className='cursor-pointer md:hidden text-muted-foreground hover:text-foreground' size={"icon"}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {
                            isMobileMenuOpen ? (
                                <X className='h-4 w-4' />
                            ) : (
                                <Menu className='h-4 w-4' />
                            )
                        }
                    </Button>
                    {/* </div> */}

                </div>
            </div>

            {/* mobile menu */}

            {isMobileMenuOpen && (
                <div className="md:hidden py-4 space-y-4 border-t">
                    {/* Search Bar (Mobile) */}
                    <div className="px-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search articles..."
                                className="pl-10 w-full focus-visible:ring-1"
                            />
                        </div>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="space-y-2 px-4">
                        <Link
                            href="/articles"
                            className="block px-3 py-2 text-base font-medium text-foreground"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Articles
                        </Link>
                        <Link
                            href="/tutorials"
                            className="block px-3 py-2 text-base font-medium text-foreground"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Tutorials
                        </Link>
                        <Link
                            href="/about"
                            className="block px-3 py-2 text-base font-medium text-foreground"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/dashboard"
                            className="block px-3 py-2 text-base font-medium text-foreground"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                    </div>

                    {/* Mobile Auth Buttons */}
                    <SignedOut>
                        <div className="px-4 flex flex-col gap-2">
                            <SignInButton>
                                <Button variant="outline" className="w-full">
                                    Login
                                </Button>
                            </SignInButton>
                            <SignUpButton>
                                <Button className="w-full">Sign up</Button>
                            </SignUpButton>
                        </div>
                    </SignedOut>
                </div>
            )}

        </div>
    )
}

export default Navbar