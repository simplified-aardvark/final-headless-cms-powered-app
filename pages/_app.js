import Auth from "@/components/Auth";
import NavBar from "@/components/NavBar";
import { ChakraProvider, Container } from "@chakra-ui/react";
function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <NavBar />
            <Container maxW={"7xl"}>
                
                {/* <Auth /> */}
                <Component {...pageProps} />
            </Container>
        </ChakraProvider>

    );
}
export default MyApp;