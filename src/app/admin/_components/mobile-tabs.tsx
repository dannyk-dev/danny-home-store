'use client';

import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Button, Tabs, useTabs,  } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useColorModeValue } from '@/components/ui/color-mode';
import Link from 'next/link';

const NAV_TABS = [
  { label: 'Overview', href: '/admin' },
  { label: 'Products', href: '/admin/products' },
  { label: 'Categories', href: '/admin/categories' },
  { label: 'Orders', href: '/admin/orders' },
  { label: 'Promotions', href: '/admin/promotions' },
  { label: 'Banners', href: '/admin/banners' },
];

export const MobileNav= () => {
  const pathname = usePathname() || '';
  const index =  NAV_TABS.findIndex((t) => pathname === t.href);
  const bg = useColorModeValue('white', 'gray.900');
  const [value, setValue] = useState<string | null>(index > 0 ? NAV_TABS[index]!.href : NAV_TABS[0]!.href)


  return (
    <Tabs.Root
      variant="subtle"
      activationMode='manual'
      colorScheme="brand"
      bg={bg}
      px={2}
      py={2}
      display={{ base: 'block', md: 'none' }}
      overflowX="auto"
      value={value}
      onValueChange={(val) => setValue(val.value)}
      scrollbar={'hidden'}
    >
      <Tabs.List>
        {NAV_TABS.map((t) => (
          <Tabs.Trigger value={t.href} key={t.href} whiteSpace="nowrap" asChild>
             <Button asChild variant="ghost">
              <Link href={t.href}>
              {t.label}
            </Link>
              </Button>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};

export default MobileNav;
