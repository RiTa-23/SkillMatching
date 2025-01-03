import Link from "next/link";

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
      <h1 className="text-accent-500 text-6xl font-extrabold ml-6">
        Skill Matching
      </h1>
      <NavigationMenu>
        <NavigationMenuList className="space-x-10 text-white text-lg mr-6">
          {urls.map((url) => (
            <NavigationMenuItem key={url.url} className="hover:text-accent-500">
              <Link href={`/answerer${url.url}`} passHref>
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
