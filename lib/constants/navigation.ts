import type { NavItem } from '@/lib/types/navigation';

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    href: "/what-we-do",
    label: "What We Do",
    submenu: [
      { href: "/what-we-do/service-01", label: "Service 01" },
      { href: "/what-we-do/service-02", label: "Service 02" },
      { href: "/what-we-do/service-03", label: "Service 03" },
    ],
  },
  {
    href: "/resources",
    label: "Resources",
    submenu: [     
      { href: "/resources/posts", label: "Posts" },
      { href: "/resources/users", label: "Users" },
    ],
  },
  { href: "/contact", label: "Contact" },
];