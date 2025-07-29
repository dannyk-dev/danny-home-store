'use client'

import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import { Avatar, Flex, HStack, IconButton, Menu, Text } from "@chakra-ui/react";
import Link from "next/link";
import { AiFillBell, AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  const bg = useColorModeValue('white', 'gray.900');
  return (
    <Flex
      align="center"
      justify="space-between"
      px={{ base: 4, md: 6 }}
      py={3}
      bg={bg}
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="sm"
    >
      <Link href="/admin" passHref>
        <HStack as="a" spacing={1} _hover={{ textDecor: 'none' }}>
          <Text fontWeight="bold" fontSize="xl" color="red.500">Danny</Text>
          <Text fontWeight="extrabold" fontSize="xl">Home</Text>
        </HStack>
      </Link>

      <HStack spaceX={2}>
        <IconButton aria-label="Notifications"  variant="ghost">
          <AiFillBell />
        </IconButton>
        <ColorModeButton />
        <Menu.Root lazyMount>
          <Menu.Trigger cursor='pointer' >
            <Avatar.Root>
              <Avatar.Fallback name="Admin" />
            </Avatar.Root>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="profile">
                <AiOutlineUser />
                Profile
              </Menu.Item>
              <Menu.Separator/>
              <Menu.ItemGroup>
                <Menu.Item color='red' value="sign-out">
                  Sign out
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </HStack>
    </Flex>
  );
};

export default Navbar;
