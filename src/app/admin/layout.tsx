

import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { Box, Flex, Tabs } from "@chakra-ui/react";
import Navbar from "@/app/admin/_components/navbar";
import { Sidebar } from "@/app/admin/_components/sidebar";
import MobileNav from "@/app/admin/_components/mobile-tabs";

const AdminLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const session = await auth();


  if (!session) {
    redirect("/auth/signin");
  }

  const userName = "Admin";

  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Flex overflow='hidden' w={'full'} flexDirection={{
        base: 'column',
        md: 'row'
      }}>
        <Sidebar />
        <MobileNav />
        <Box width='full'>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default AdminLayout;
