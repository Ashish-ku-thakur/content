
import { BlogFooter } from "@/src/components/home/BlogFooter";
import Navbar from "@/src/components/home/header/Navbar";
import HeroSection from "@/src/components/home/HeroSection";
import TopArticles from "@/src/components/home/TopArticles";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Navbar />

      <HeroSection />

      <section className="relative py-16 md:py-24">

        <div className="container mx-auto px-4">
          <div className="mb-12 text-center ">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Featured Artcles</h1>
            <p>Discover Our Most Popular and Tranding Content</p>
          </div>

          <Suspense fallback={<p>Loading...</p>}>

            <TopArticles />
          </Suspense>

          <div className="text-center mt-12">
            <Link href={'/articles'}>
              <Button className="rounded-full hover:bg-gray-900 hover:text-white dark:hover:text-gray-900">View ALL Articles</Button>
            </Link>
          </div>

        </div>
      </section>

      <BlogFooter />
    </main>
  );
}
