import Head from 'next/head';
import {
    Box,
    Heading,
    Text,
    Card,
    CardHeader,
    CardBody,
    Stack,
    StackDivider,

} from "@chakra-ui/react";
import { get_all_product_ids, get_product_data } from '../../lib/products_data';

export async function getStaticPaths() {
    const paths = await get_all_product_ids();
    //   console.log("HERE: "+ paths);
    return {
        paths,
        fallback: false,
    };
}


export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const item_data = await get_product_data(params.id);

    return {
        props: {
            item_data
        },
        revalidate: 60
    };
}


export default function productItem({ item_data, }) {
    return (


        <>
            <Head>
                <title>{item_data.product_name}</title>
            </Head>
            <Card>
                <CardHeader>
                    <Heading size='md' dangerouslySetInnerHTML={{__html: item_data.product_name}}>
                        {/* {item_data.product_name} */}
                    </Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                 Description:
                            </Heading>
                            <Text pt='2' fontSize='sm' dangerouslySetInnerHTML={{__html: item_data.post_title}}>
                                {/* {item_data.post_title} */}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Cost:
                            </Heading>
                            <Text pt='2' fontSize='sm' dangerouslySetInnerHTML={{__html: item_data.product_cost}}>
                                {/* {item_data.product_cost} */}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Product Number:
                            </Heading>
                            <Text pt='2' fontSize='sm' dangerouslySetInnerHTML={{__html: item_data.product_number}}>
                                {/* {item_data.product_number} */}
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </>
    );
}


