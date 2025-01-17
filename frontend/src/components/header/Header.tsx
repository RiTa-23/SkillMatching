import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  urls: { name: string; url: string }[];
}

const Header = ({ urls }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center bg-main-600 h-[10vh]">
      <Link href="/signin" passHref>
        <Image
          src="/logo.png"
          alt="logo"
          width={400}
          height={80}
          className="cursor-pointer"
        />
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="space-x-10 text-white text-lg mr-6">
          {urls.map((url) => (
            <NavigationMenuItem key={url.url} className="hover:text-accent-500">
              <Link href={`${url.url}`} passHref>
                {url.name}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
