import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Menu,

  MenuItem,
  Spacer,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { FiBell, FiLogOut, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { RiBillFill } from "react-icons/ri";
import { ColorModeButton } from "@/components/ui/color-mode";
import {Bell} from '@phosphor-icons/react'
// import { signOut, useSession } from "next-auth/react";

const NAV_TABS = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/promotions", label: "Promotions" },
  { href: "/admin/banners", label: "Banners" },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  // const { pathname } = useRouter();
  const session = await auth();
  // const activeIndex = NAV_TABS.findIndex((t) => pathname.startsWith(t.href));
  // const bg = useColorModeValue("white", "gray.900");

  if (!session) {
    redirect('/auth/signin')
  }

  // const { data: session } = useSession();
  const userName = "Admin"; // session?.user.name ?? "Admin";

  return (
    <Flex direction='column' minH="100vh">
      <Container maxWidth='8/12' marginX='auto' background='bg.muted' shadow={'sm'}  marginTop='5' rounded={12} position='sticky' top={0} display='flex' alignItems={'center'} left={0} right={0} p='5'>
        <Button asChild variant='outline' size='xl' borderColor='white'>
          <Link href="/admin" passHref  >
          <HStack as="a" spaceX={0} _hover={{ textDecor: "none" }}>
            <Text fontWeight="bold" fontSize="lg" color="red.500">
              Danny
            </Text>
            <Text fontWeight="extrabold" fontSize="lg">
              Home
            </Text>
          </HStack>
        </Link>
        </Button>
        <Spacer />
        <HStack >
          <IconButton aria-label="Notifications" variant="ghost">
            <Bell />
          </IconButton>
          <ColorModeButton />

          {/* <Menu>/ */}
            {/* <MenuButton as={Avatar} size="sm" cursor="pointer" name={userName} /> */}
            {/* <MenuList> */}
              {/* <MenuItem icon={<FiUser />}>Profile</MenuItem> */}
              {/* <MenuDivider /> */}
              {/* <MenuItem icon={<FiLogOut />} onClick={() => signOut()}>Logout</MenuItem> */}
            {/* </MenuList> */}
          {/* </Menu> */}
        </HStack>
      </Container>

        {children}
    </Flex>
  );
};

export default AdminLayout
