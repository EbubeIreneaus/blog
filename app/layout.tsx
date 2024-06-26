import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core styles
import 'primeicons/primeicons.css'; // Icons 
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';

import "./globals.css";
import Header from "./_components/Header";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
     <html lang="en">
      <head>
       
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <>
          <Header />
          <main>
            {children}
          </main>
        </>
      </body>
    </html>
   </PrimeReactProvider>
  );
}
