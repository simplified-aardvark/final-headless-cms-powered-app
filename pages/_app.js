import Auth from "@/components/Auth";
import { ChakraProvider, Container } from "@chakra-ui/react";
function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <Container maxW={"7xl"}>
                <Auth />
                <Component {...pageProps} />
            </Container>
        </ChakraProvider>

    );
}
export default MyApp;