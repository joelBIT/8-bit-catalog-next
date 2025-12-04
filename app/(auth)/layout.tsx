import { GuestOnly } from "../_components/auth/GuestOnly";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GuestOnly>
            {children} 
        </GuestOnly>
    );
}
