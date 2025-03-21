import { currentUser } from "@clerk/nextjs/server";
// import "./globals.css";
import { prisma } from "@/src/lib/prisma";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const user = await currentUser();
    if (!user) {
        return <div>
            {children || "loading"}
        </div>; // Ya ek proper loading component
    }

    let loggedInUser = await prisma?.user?.findUnique({
        where: { clerkUserId: user.id },
    });
    if (!loggedInUser) {
        loggedInUser = await prisma.user.create({
            data: {
                name: `${user.fullName} ${user.lastName}`,
                clerkUserId: user.id,
                email: user.emailAddresses[0].emailAddress,
                imageUrl: user.imageUrl,
            },
        });
    }
    return (
        <div>
            {children}
        </div>

    );
}
