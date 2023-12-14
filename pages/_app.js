import NavBar from "@/components/NavBar";
import {
    ChakraProvider,
    Container,
    useColorMode
} from "@chakra-ui/react";
function MyApp({ Component, pageProps }) {
    const bgColor = useColorMode("gray.100", "gray.800")

    return (
        <ChakraProvider>
            <NavBar border={"solid black"} />
            <Container maxW={"7xl"} bg={bgColor} h={[null, ,"100vh"]}
                boxShadow="2xl"
                shadow={"dark-lg"}
                padding={0}
            >
                <Component {...pageProps} />
            </Container>
        </ChakraProvider>

    );
}
export default MyApp;