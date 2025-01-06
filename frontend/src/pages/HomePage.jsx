import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
  const { fetchProducts, products } = useProductStore()
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
  
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          bgGradient='linear(to-l,rgb(255, 0, 0),rgb(0, 0, 0))'
          bgClip='text'
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textAlign={"center"}
          textTransform={"uppercase"}>Welcome to MERN Store 🛒</Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color="gray.500">
            Products not found {""}
            <Link to='/create'>
              <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                Create One
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage