import { UserOnly } from "@/app/_components/auth";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <UserOnly>
            {children} 
        </UserOnly>
    );
}
