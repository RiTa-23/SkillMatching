import Header from "@/components/header/Header";
import { answererUrls } from "@/components/header/urls";

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
