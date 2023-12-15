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
import { get_all_contact_ids, get_contact_data } from '../../lib/contacts_data';

export async function getStaticPaths() {
    const paths = await get_all_contact_ids();
    //   console.log("HERE: "+ paths);
    return {
        paths,
        fallback: false,
    };
}


export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const item_data = await get_contact_data(params.id);

    return {
        props: {
            item_data
        },
        revalidate: 60
    };
}


export default function ContactItem({ item_data, }) {
    return (


        <>
            <Head>
                <title>{item_data.first_name + " " + item_data.last_name}</title>
            </Head>
            <Card>
                <CardHeader>
                    <Heading size='md' dangerouslySetInnerHTML={{__html: item_data.first_name + " " + item_data.last_name}}>
                        {/* {item_data.first_name + " " + item_data.last_name} */}
                    </Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Phone: 
                            </Heading>
                            <Text pt='2' fontSize='sm' dangerouslySetInnerHTML={{__html: item_data.phone}}>
                                {/* {item_data.phone} */}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Email:
                            </Heading>
                            <Text pt='2' fontSize='sm' dangerouslySetInnerHTML={{__html: item_data.email}}>
                                {/* {item_data.email} */}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Relationship:
                            </Heading>
                            <Text pt='2' fontSize='sm' dangerouslySetInnerHTML={{__html: item_data.relationship}}>
                                {/* {item_data.relationship} */}
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </>
    );
}


