import { GuestOnly } from "../_components/auth";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <GuestOnly>
            {children} 
        </GuestOnly>
    );
}
