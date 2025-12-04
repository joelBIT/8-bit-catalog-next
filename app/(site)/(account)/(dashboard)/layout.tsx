import { UserOnly } from "@/app/_components/auth/UserOnly";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <UserOnly>
            {children} 
        </UserOnly>
    );
}
