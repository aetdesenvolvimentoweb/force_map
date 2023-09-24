import "@/styles/globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Mapa Força - 18º BBM",
  description:
    "Sistema gerencial que permite melhor controle sobre o poder operacional disponível no 18º Batalhão Bombeiro Militar - Goianésia/Go.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
