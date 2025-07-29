import { ProductCreateForm } from '@/app/admin/products/_components/product-create-form'
import ProductList from '@/app/admin/products/_components/product-list'
import { Button, Card, Container, Drawer, Flex, Portal, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'

type Props = {}

const ProductsPage = () => {
  return (
    <Container py={20} spaceY={6} maxWidth={'11/12'}>
      <Flex w={'full'} align="center" justifyContent={'space-between'}>
        <Text fontSize={'2xl'}>Product Catalog</Text>
        <Drawer.Root size={'lg'}>
          <Drawer.Trigger asChild>
            <Button variant={'subtle'} size={'md'} colorPalette={'red'}>
          <AiFillPlusCircle />
          Add Product
        </Button>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>New Product.</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <ProductCreateForm />
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Flex>
      <Card.Root variant={'subtle'} colorPalette={'white'}>
        <Card.Body>
          <ProductList />
        </Card.Body>
      </Card.Root>
    </Container>

  )
}

export default ProductsPage
