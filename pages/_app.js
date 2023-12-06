import Auth from "@/components/Auth";
import NavBar from "@/components/NavBar";
import { ChakraProvider, Container } from "@chakra-ui/react";
function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <NavBar border={"solid black"}/>
            <Container maxW={"7xl"} bg={"gray.100"} h={"100vh"}
            boxShadow="2xl"
            shadow={"dark-lg"}
            
            >
                
                {/* <Auth /> */}
                <Component {...pageProps} />
            </Container>
        </ChakraProvider>

    );
}
export default MyApp;