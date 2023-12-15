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
import { get_all_company_ids, get_company_data } from '../../lib/companies_data';

export async function getStaticPaths() {
    const paths = await get_all_company_ids();

    return {
        paths,
        fallback: false,
    };
}


export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const item_data = await get_company_data(params.id);

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
                <title>{item_data.company_name}</title>
            </Head>
            <Card>
                <CardHeader>
                    <Heading size='md' dangerouslySetInnerHTML={{__html: item_data.company_name}}>
                        {/* {item_data.company_name} */}
                    </Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                CEO:
                            </Heading>
                            <Text pt='2' fontSize='sm' dangerouslySetInnerHTML={{__html: item_data.ceo}}>
                                {/* {item_data.ceo} */}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Headquarters:
                            </Heading>
                            <Text pt='2' fontSize='sm' dangerouslySetInnerHTML={{__html: item_data.hq}}>
                                {/* {item_data.hq} */}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase' >
                                Website:
                            </Heading>
                            <a href={'https://www.' + item_data.website} target="_blank">
                            <Text pt='2' fontSize='sm' dangerouslySetInnerHTML={{__html: item_data.website}}>
                                    {/* {item_data.website} */}
                            </Text>
                            </a>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </>
    );
}


