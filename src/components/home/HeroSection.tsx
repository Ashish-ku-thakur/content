import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/src/lib/utils'
import Image from 'next/image'

const HeroSection = () => {
    return (
        <section className='relative min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-900 to-indigo-900'>
            <div className='absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-gradient-to-r before:from-violet-600/20 before:blur-3xl'></div>

            <div className='container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-24 md:flex-row md:py-32'>
                <div className='flex-1 space-y-8 text-center md:text-left'>
                    <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl'>Explore the World Through
                        <span className='bg-gradient-to-r from-violet-400 bg-clip-text text-transparent'>
                            {" "}
                            Words</span>
                    </h1>

                    <p className='max-w-2xl mx-auto text-lg md:-ml-0 md:max-w-4xl text-gray-300 md:text-xl'>Discover insightfull articles, throught-provoking stories, and expert prespectives on technology, lifestyle and inovation</p>

                    <div className='flex flex-col items-center gap-4 sm:flex-row md:justify-start'>
                        <Button className='rounded-full'>Strat Reading</Button>
                        <Button className='rounded-full' variant={"outline"}>Explor Topics</Button>
                    </div>

                    {/* text 1K+, 10M, 50+ */}
                    <div className='grid grid-cols-3 gap-4 pt-8 text-white md:max-w-md'>
                        <div className='space-y-2'>
                            <div className='text-2xl font-bold'>1K+</div>
                            <div className='text-sm text-gray-400 font-bold'>Publish Articles</div>
                        </div>
                        <div className='space-y-2'>
                            <div className='text-2xl font-bold'>50+</div>
                            <div className='text-sm text-gray-400 font-bold'>Export Writer</div>
                        </div>
                        <div className='space-y-2'>
                            <div className='text-2xl font-bold'>10M</div>
                            <div className='text-sm text-gray-400 font-bold'>Monthly Reader</div>
                        </div>
                    </div>
                </div>

                {/* image frame */}
                <div className='mt-12 flex-1 md:mt-0'>
                    <div className={cn("relative mx-auto w-64 h-64 rounded-2xl overflow-hidden",
                        "bg-gradient-to-br from-white/5 to-transparent",
                        "border border-primary/20 backdrop-blur-lg",
                        "shadow-2xl shadow-indigo-500/10")}>
                        <Image
                            src='https://images.unsplash.com/photo-1522198648249-0657d7ff242a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGElMjBwZXJzb24lMjB3aXRoJTIwbGFwdG9wfGVufDB8fDB8fHww'
                            alt=''
                            className='object-cover'
                            // width={100}
                            // height={100}
                            fill
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection