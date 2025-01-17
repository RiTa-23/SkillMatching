import Header from "@/components/header/Header";
import { companyUrls } from "@/components/header/CompanyUrls";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header urls={companyUrls} />
      <main className="w-full">{children}</main>
    </div>
  );
}
