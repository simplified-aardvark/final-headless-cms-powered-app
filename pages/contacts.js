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
    Spacer,

} from "@chakra-ui/react";
import { get_sorted_contact_list } from '../lib/contacts_data';

// define a getStaticProps() function - this name is defined by next.js
export async function getStaticProps() {
    const contact_data = await get_sorted_contact_list();
    console.log(contact_data);

    return {
        props: { contact_data },
        revalidate: 60
    };
}

export default function Contacts({ contact_data }) {
    return (
        <>
            <Head>
                <title>Contacts</title>
            </Head>

            <>
                <Heading align={'center'} pt={4} mb={4}>Contacts</Heading>
                <hr></hr>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={[2, , 4]} gap={[2, , 6]} pt={4} my={4}>
                    {contact_data &&
                        contact_data.map((contact) => (
                            <Box
                                p={3}
                                boxShadow="2xl"
                                shadow={"dark-lg"}
                                transition="0.2s"
                                _hover={{ boxShadow: "sm" }}
                                key={contact.id}
                                mx={4}
                            >
                                <a href={"/contact/" + contact.id}>
                                    <Card >

                                        <CardHeader>
                                            <Heading size='md'>{contact.first_name + " " + contact.last_name}</Heading>
                                        </CardHeader>

                                        <CardBody>
                                            <Stack divider={<StackDivider />} spacing='4'>
                                                <Box>
                                                    <Heading size='xs' textTransform='uppercase'>
                                                        Phone:
                                                    </Heading>
                                                    <Text pt='2' fontSize='sm'>
                                                        {contact.phone}
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