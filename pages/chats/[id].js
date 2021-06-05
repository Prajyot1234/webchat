import Head from "next/head";
import styled from "styled-components";
import { useDataLayerValue } from "../../config/DataLayer"; 
import { ThemeProvider } from "styled-components";
import { darkmodechat, lightmodechat, GlobalStyles } from '../../config/theme';
import Chats from "../../component/Chats";
import { db } from "../../config/firebase";

const Container_chat_empty = styled.div`
    
`;

function chats({message,chat}) {
    const [ { theme }, dispatch ] = useDataLayerValue();

    return (
        <ThemeProvider theme={theme === "light" ? lightmodechat : darkmodechat }>
        <GlobalStyles />
        <Container_chat_empty>
            <Head>
                <title>WebChat Chat</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Chats chats={true} chat={chat} message={message} />
        </Container_chat_empty>
        </ThemeProvider>
    )
}

export async function getServerSideProps(ctx){
    const Ref = db.collection("chats").doc(ctx.query.id);

    //prep for messages on server
    const messageRef = await Ref.collection("messages")
    .orderBy("timestamp","asc").get();

    const messages = messageRef.docs.map(doc => ({
        id : doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }));

    ///prep the chats 
    const ChatRes = await Ref.get();
    const chat = {
        id : ChatRes.id,
        ...ChatRes.data(),
    }

    return{
        props:{
            message: JSON.stringify(messages),
            chat: chat
        }
    }

}

export default chats;


