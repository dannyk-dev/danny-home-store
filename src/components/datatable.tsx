
'use client';

import {
  Box,
  Center,
  Spinner,
  Text,
  TableRoot,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableColumnHeader,
  TableCell,
} from '@chakra-ui/react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Row,
} from '@tanstack/react-table';
import React, { useMemo } from 'react';

export interface DataTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  isLoading?: boolean;
  emptyPlaceholder?: React.ReactNode;
  renderRowActions?: (row: Row<T>) => React.ReactNode;
  caption?: string;
}

 function DataTable<T extends object>(props: DataTableProps<T>) {
  const { data, columns, isLoading, emptyPlaceholder, renderRowActions, caption } = props;

  const enhancedColumns = useMemo<ColumnDef<T, unknown>[]>(() => {
    if (!renderRowActions) return columns

    return [
      ...columns,
      {
        id: '_actions',
        header: 'Actions',
        cell: (cell) => renderRowActions(cell.row),
        enableSorting: false,
        enableColumnFilter: false,
      } satisfies ColumnDef<T, unknown>,
    ];
  }, [columns, renderRowActions]);

  const table = useReactTable<T>({
    data,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <Center py={10}>
        <Spinner size="lg" />
      </Center>
    );
  }

  if (!data.length) {
    return (
      <Center py={10}>
        {emptyPlaceholder ?? <Text fontSize="sm" color="gray.500">No data</Text>}
      </Center>
    );
  }

  return (
    <Box overflowX="auto">
      <TableRoot variant="line" size="sm">
        {caption && <TableCaption>{caption}</TableCaption>}

        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableColumnHeader key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableColumnHeader>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} _hover={{ bg: 'gray.50', _dark: { bg: 'gray.700' } }}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

        {table.getFooterGroups().some((fg) => fg.headers.some((h) => h.column.columnDef.footer)) && (
          <TableFooter>
            {table.getFooterGroups().map((fg) => (
              <TableRow key={fg.id}>
                {fg.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(header.column.columnDef.footer, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        )}
      </TableRoot>
    </Box>
  );
}

export default DataTable
/*──────── Example Usage ─────────
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { IconButton } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';

interface Product { id: string; name: string; price: number; }
const columns: ColumnDef<Product>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'price', header: 'Price', cell: info => `R$ ${info.getValue<number>().toFixed(2)}` },
];

<DataTable
  data={products}
  columns={columns}
  isLoading={isFetching}
  renderRowActions={row => (
    <IconButton aria-label="Edit" icon={<FiEdit />} size="sm" onClick={() => edit(row.original)} />
  )}
/>
──────────────────────────────*/
