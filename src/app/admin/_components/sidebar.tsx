'use client';
import { useColorModeValue } from '@/components/ui/color-mode';
import { VStack, Icon, Link as CLink, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineShopping, AiOutlineOrderedList, AiOutlineBarChart } from 'react-icons/ai';
import { PiColumns, PiBrowsers, PiPercent } from 'react-icons/pi';

const ITEMS = [
  { label: 'Overview', href: '/admin', icon: AiOutlineBarChart },
  { label: 'Products', href: '/admin/products', icon: AiOutlineShopping },
  { label: 'Categories', href: '/admin/categories', icon: PiColumns },
  { label: 'Orders', href: '/admin/orders', icon: AiOutlineOrderedList },
  { label: 'Promotions', href: '/admin/promotions', icon: PiPercent },
  { label: 'Banners', href: '/admin/banners', icon: PiBrowsers },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname() || '';
  const active = (href: string) => pathname == href;

  const bg = useColorModeValue('white', 'gray.900');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');


  return (
    <VStack
      as="nav"
      spaceY={1}
      align="stretch"
      w={60}
      p={4}
      bg={bg}
      borderRightWidth="1px"
      display={{ base: 'none', md: 'flex' }}
      position="sticky"
      top="80px"
      h="calc(100vh - 80px)"
      overflowY="auto"
    >
      {ITEMS.map(({ label, href, icon }) => (
        <Link key={href} href={href} passHref legacyBehavior>
          <Button
            as="a"
            justifyContent="flex-start"
            variant={active(href) ? 'subtle' : 'ghost'}
            colorPalette='red'
            px={3}
            py={2}
            fontWeight={active(href) ? 'semibold' : 'normal'}
          >
            <Icon as={icon} boxSize={5} />
            {label}
          </Button>
        </Link>
      ))}
    </VStack>
  );
};
