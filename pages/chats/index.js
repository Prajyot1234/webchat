import Head from "next/head";
import styled from "styled-components";
import { useDataLayerValue } from "../../config/DataLayer"; 
import { ThemeProvider } from "styled-components";
import { darkmodechat, lightmodechat, GlobalStyles } from '../../config/theme';
import Chats from "../../component/Chats";

const Container_chat = styled.div`
    *{
        font-family: 'Poppins', sans-serif;
    }
    font-family: 'Poppins', sans-serif;
    height: 100vh;
    width: 100vw;
    display: grid;
    place-items: center;
`;

function chats() {

    const [ { theme } , dispatch ] = useDataLayerValue();

    return (
        <ThemeProvider theme={theme === "light" ? lightmodechat : darkmodechat }>
        <GlobalStyles />
        <Container_chat>
            <Head>
                <title>WebChat Chat</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Chats chats={false} />
        </Container_chat>
        </ThemeProvider>
    )
}

export default chats;
