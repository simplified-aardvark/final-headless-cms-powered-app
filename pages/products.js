import Head from 'next/head';
import {
    Box,
    Heading,
    SimpleGrid,
    Text,
    Card,
    CardHeader,
    CardBody,
    Stack,
    StackDivider,
} from "@chakra-ui/react";
import { get_sorted_product_list } from '../lib/products_data';

// define a getStaticProps() function - this name is defined by next.js
export async function getStaticProps() {
    const product_data = await get_sorted_product_list();
    console.log(product_data);

    return {
        props: { product_data },
        revalidate: 60
    };
}

export default function products({ product_data }) {
    return (
        <>
            <Head>
                <title>Products</title>
            </Head>
            <>
                <Heading align={'center'} pt={4} mb={4}>Products</Heading>
                <hr></hr>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={[2, , 4]} gap={[2, , 6]} pt={4} my={4}>
                    {product_data &&
                        product_data.map((product) => (
                            <Box
                                p={3}
                                boxShadow="2xl"
                                shadow={"dark-lg"}
                                transition="0.2s"
                                _hover={{ boxShadow: "sm" }}
                                key={product.id}
                                mx={4}
                            >
                                <a href={"/product/" + product.id}>
                                    <Card >

                                        <CardHeader>
                                            <Heading size='md'>{product.product_name}</Heading>
                                        </CardHeader>

                                        <CardBody>
                                            <Stack divider={<StackDivider />} spacing='4'>
                                                <Box>
                                                    <Heading size='xs' textTransform='uppercase'>
                                                        Cost:
                                                    </Heading>
                                                    <Text pt='2' fontSize='sm'>
                                                        {product.product_cost}
                                                    </Text>
                                                </Box>
                                            </Stack>
                                        </CardBody>
                                    </Card>
                                </a>
                            </Box>
                        ))}
                </SimpleGrid>
            </>
        </>
    );
}