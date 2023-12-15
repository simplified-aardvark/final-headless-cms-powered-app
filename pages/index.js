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
import { get_sorted_contact_list } from '../lib/contacts_data';

// define a getStaticProps() function - this name is defined by next.js
export async function getStaticProps() {
  const all_data = await get_sorted_contact_list();
  console.log(all_data);

  return {
    props: { all_data },
    revalidate: 60
  };
}

const links = [
  {
    title: "Contacts",
    ref: "/contacts",
    info: "This section presents contacts and their basic information (e.g., Phone and Email)."
  },
  {
    title: "Products",
    ref: "/products",
    info: "This section presents a list of products to emulate a simple store."
  },
  {
    title: "Companies",
    ref: "/companies",
    info: "This section presents a list of companies with location information and links to their website."
  }
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>

      <Heading align={'center'} pt={4} fontSize={[20, 26, 36]} mb={4}>Final Headless CMS-Powered App</Heading>
      <hr></hr>

      <Text w={["90%",,"70%"]} align={'center'} mx={"auto"} my={4}>Welcome to my Final Headless CMS-Powered App. Click on the cards below or use the
        links in the navigation bar to the get to the section of the app you would like to explore. If you have a preference for light/dark mode, use the 
        sun/moon symbol on the right side of the navigation bar to toggle between them.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={[2, , 4]} gap={[2, , 6]} pt={4} mb={4}>
        {links &&
          links.map((link) => (
            <Box
              p={3}
              boxShadow="2xl"
              shadow={"dark-lg"}
              transition="0.2s"
              _hover={{ boxShadow: "sm" }}
              key={link.title}
              mx={4}
            >
              <a href={link.ref}>
                <Card >

                  <CardHeader>
                    <Heading size='md'>{link.title}</Heading>
                  </CardHeader>

                  <CardBody>
                    
                      <Box>
                        <Text pt='2' fontSize='sm'>
                          {link.info}
                        </Text>
                      </Box>

                  </CardBody>
                </Card>
              </a>
            </Box>
          ))}
      </SimpleGrid>

    </>
  )
}