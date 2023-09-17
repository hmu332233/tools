import {
  Navbar as NextUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';

function Navbar() {
  return (
    <NextUiNavbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">minung--dev-tools</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            JSON-CSV (MONGODB)
          </Link>
        </NavbarItem>
      </NavbarContent>
    </NextUiNavbar>
  );
}

export default Navbar;
