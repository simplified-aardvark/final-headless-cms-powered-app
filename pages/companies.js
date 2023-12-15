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
import { get_sorted_company_list } from '../lib/companies_data';

// define a getStaticProps() function - this name is defined by next.js
export async function getStaticProps() {
    const company_data = await get_sorted_company_list();
    console.log(company_data);

    return {
        props: { company_data },
        revalidate: 60
    };
}

export default function companies({ company_data }) {
    return (
        <>
            <Head>
                <title>Companies</title>
            </Head>
            <>
                <Heading align={'center'} pt={4} mb={4}>Companies</Heading>
                <hr></hr>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={[2, , 4]} gap={[2, , 6]} pt={4} my={4}>
                    {company_data &&
                        company_data.map((company) => (
                            <Box
                                p={3}
                                boxShadow="2xl"
                                shadow={"dark-lg"}
                                transition="0.2s"
                                _hover={{ boxShadow: "sm" }}
                                key={company.id}
                                mx={4}
                            >
                                <a href={"/company/" + company.id}>
                                    <Card >

                                        <CardHeader>
                                            <Heading size='md'>{company.company_name}</Heading>
                                        </CardHeader>

                                        <CardBody>
                                            <Stack divider={<StackDivider />} spacing='4'>
                                                <Box>
                                                    <Heading size='xs' textTransform='uppercase'>
                                                        CEO:
                                                    </Heading>
                                                    <Text pt='2' fontSize='sm'>
                                                        {company.ceo}
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