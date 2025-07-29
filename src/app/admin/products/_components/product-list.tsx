// src/app/admin/products/product-list.tsx
// ProductList component – tRPC + DataTable + action buttons
// Assumes:
//   • api.admin.product.list, delete, update (edit handled via router or modal)
//   • DataTable component imported from shared path
//   • Chakra UI 3.3 & TanStack Table v8

'use client';

import React from 'react';
import { IconButton, HStack } from '@chakra-ui/react';
import DataTable from '@/components/datatable';
import { type ColumnDef } from '@tanstack/react-table';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
import { toaster } from '@/components/ui/toaster';

interface Product {
  id: string;
  name: string;
  slug: string;
  defaultPrice: number;
  currency: string;
}

 const ProductList = () => {
  const router = useRouter();

  const listQuery = api.products.list.useQuery({ page: 1, perPage: 50 });
  const deleteMutation = api.products.delete.useMutation({
    onSuccess: () => {
      toaster.create({ type: 'success', description: 'Product deleted' });
      void listQuery.refetch();
    },
    onError: (e) => toaster.create({ type: 'error', description: e.message }),
  });

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'slug', header: 'Slug' },
      {
        accessorKey: 'defaultPrice',
        header: 'Price',
        cell: (info) => {
          const price = info.getValue<number>();
          const row = info.row.original;
          return `${row.currency} ${price.toFixed(2)}`;
        },
      },
    ],
    [],
  );

  const renderActions = (row: { original: Product }) => (
    <HStack spaceX={1}>
      <IconButton
        aria-label="Edit"
        size="sm"
        onClick={() => router.push(`/admin/products/${row.original.id}`)}
      >
        <FiEdit />
      </IconButton>
      <IconButton
        aria-label="Delete"
        size="sm"
        colorScheme="red"
        onClick={() => deleteMutation.mutate({ id: row.original.id })}
        loading={deleteMutation.isPending}
      >
          <FiTrash2 />
      </IconButton>
    </HStack>
  );

  return (
    <DataTable<Product>
      data={listQuery.data ?? []}
      columns={columns}
      isLoading={listQuery.isLoading}
      renderRowActions={renderActions}
      emptyPlaceholder="No products found"
      caption="Product list"
    />
  );
};

export default ProductList;
