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
  Portal,
  Spacer,
  Tabs,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FiBell, FiLogOut, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { ColorModeButton } from "@/components/ui/color-mode";
import { PiBell, PiBrowsers, PiColumns } from "react-icons/pi";
import { AiOutlineProduct } from "react-icons/ai";
// import {Bell} from '@phosphor-icons/react'
// import { signOut, useSession } from "next-auth/react";

const NAV_TABS = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/promotions", label: "Promotions" },
  { href: "/admin/banners", label: "Banners" },
];

const links = [
  {
    title: "Profile",
    href: "#",
  },
  {
    title: "Sign out",
    href: "#",
  },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  // const { pathname } = useRouter();
  const session = await auth();
  // const activeIndex = NAV_TABS.findIndex((t) => pathname.startsWith(t.href));
  // const bg = useColorModeValue("white", "gray.900");

  if (!session) {
    redirect("/auth/signin");
  }

  // const { data: session } = useSession();
  const userName = "Admin"; // session?.user.name ?? "Admin";

  return (
    <Flex direction="column" minH="100vh">
      <Container
        maxWidth="8/12"
        marginX="auto"
        background="bg.muted"
        shadow={"sm"}
        marginTop="5"
        rounded={12}
        position="sticky"
        top={0}
        display="flex"
        alignItems={"center"}
        left={0}
        right={0}
        p="5"
      >
        <Button asChild variant="outline" size="xl" borderColor="white">
          <Link href="/admin" passHref>
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

        <Tabs.Root>
          <Tabs.List>
            <Tabs.Trigger value="products">
              <ChakraLink unstyled href="/admin/products">
                <AiOutlineProduct />
                Products
              </ChakraLink>
            </Tabs.Trigger>
            <Tabs.Trigger value="categories">
              <ChakraLink unstyled href="/admin/categories">
                <Flex><PiColumns />
                Categories</Flex>
              </ChakraLink>
            </Tabs.Trigger>
            <Tabs.Trigger value="banners">
              <ChakraLink unstyled href="/admin/banners">
                <PiBrowsers />
                Banners
              </ChakraLink>
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>

        <Spacer />
        <HStack position="relative">
          <IconButton aria-label="Notifications" variant="ghost">
            {/* <Bell /> */}
            <PiBell />
          </IconButton>
          <ColorModeButton />

          <Menu.Root>
            <Menu.Trigger rounded="full" focusRing="outside">
              <Avatar.Root variant="subtle">
                <Avatar.Fallback name="Test User" />
              </Avatar.Root>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  {links.map((link) => (
                    <Menu.Item key={link.href} asChild value={link.title}>
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {link.title}
                      </a>
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </HStack>
      </Container>

      {children}
    </Flex>
  );
};

export default AdminLayout;
