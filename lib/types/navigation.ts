export interface NavItem {
  href: string;
  label: string;
  submenu?: { href: string; label: string }[];
}