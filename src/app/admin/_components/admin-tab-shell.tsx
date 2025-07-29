'use client';
import { Tabs } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React from "react";

const NAV_ORDER = [
  "/admin",
  "/admin/products",
  "/admin/categories",
  "/admin/orders",
  "/admin/promotions",
  "/admin/banners",
];

export const AdminTabsShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const idx = NAV_ORDER.findIndex((p) => pathname.startsWith(p));
  return <Tabs.Root value={NAV_ORDER[idx]}>{children}</Tabs.Root>;
};
