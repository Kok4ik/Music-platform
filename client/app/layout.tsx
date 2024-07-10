
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { Container } from "@mui/material";
import Player from "@/components/Player";
import StoreProvider from "./StoreProvider";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Belov Music",
  description: "Listen music free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <StoreProvider>
          <Navbar/>
          <Container style={{margin: '90px 0', marginLeft: 'auto', marginRight: 'auto'}}>
           {children}
          </Container>
          <Player/>
        </StoreProvider>
      </body>
    </html>
  );
}
