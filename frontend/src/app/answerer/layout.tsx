import Header from "@/components/header/Header";
import { answererUrls } from "@/components/header/AnswererUrls";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header urls={answererUrls} />
      <main className="w-full">{children}</main>
    </div>
  );
}
