import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import { Avatar,Button,IconButton } from "@material-ui/core";
import { useDataLayerValue } from "../config/DataLayer"; 
import { ThemeProvider } from "styled-components";
import { darkmodechat, lightmodechat, GlobalStyles } from '../config/theme';
import  { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth,db } from "../config/firebase";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useRouter } from "next/router";
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator";
import Chat from "./Chat";
import ChatScreen from "./ChatScreen";

// import dynamic from 'next/dynamic';
// const Chat = dynamic(()=> import('./Chat'));
// const ChatScreen = dynamic(()=> import('./ChatScreen'));

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

const Main_Conatiner_chat = styled.div`
    display: flex;
    max-width: 1440px!important;
    max-height: 800px;
    width: 90vw!important;
    height: 90vh!important;
    background-color: #EDEDED;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.7);
    @media (max-width: 1024px) {
        display: none;
    }
`;

const LeftContainer_chat = styled.div`
    flex: 0.25!important;
    border-right: 1px solid rgb(172, 169, 169);
    overflow-y: hidden;
    overflow: scroll;
    ::-webkit-scrollbar{
        display: none;
    }
`;

const RightContainer_chat = styled.div`
    flex: 0.75;
`;

const Avatar_Conatiner = styled.div`
    display: flex;
    position: sticky!important;
    align-items: center;
    justify-content: space-between;
    .container_avatar{
        display: flex;
        align-items: center;
    }
    .Avatar{
        margin: 5px!important;
        transition: all .2s ease-in-out;
    }  
    .container_avatar > p{
        font-weight: 600;
    }
    .arrow_button{
        object-fit: contain;
    }
    .container_avatar:hover{
        cursor: pointer;
    }
    .Avatar:hover{
        transform: scale(0.8);
    }
`;

const SearchBar_Conatiner = styled.div`
    .Appleft_searchbar{
        display: flex;
        background-color: #f6f6f6;
        align-items: center;
        color: grey;
        padding: 6px!important;
    }

    .searchbar > input {
        border: none;
        outline: none;
        color: rgb(92, 90, 90);
        width: 80%;
        margin-left: 8px;
    }

    a{
        text-decoration: none!important;
        color: black;
    }

    .searchbar{
        display: flex;
        background-color: #FFFFFF;
        flex: 1;
        /* padding: 4px; */
        border-radius: 14px;
    }
`;

const StartButton = styled(Button)`
    width: 100%;
    background-color: #d9e4f5;
    background-image: linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%);
    &&&{
        font-weight: 600!important;
        padding: 5px 0px!important;
    }
`;

const Message_Display = styled.div`
    display : none;
    text-align: center;
    h1{
        margin-left: 25px;
        margin-right: 25px;
        color: black;
    }
    @media (max-width: 1024px) {
        display : block; 
    }
`;

function chats({ chats ,message, chat }) {

    const router = useRouter();
    const [ { theme } , dispatch ] = useDataLayerValue();
    const [ user ] = useAuthState(auth);
    const userChatRef = db.collection("chats").where('users','array-contains',user.email);
    const [ chatsnapshot ] = useCollection(userChatRef);

    const ChatAlreadyExits = (recipentEmail) => {
        if(!!chatsnapshot?.docs.find(chat => chat.data().users.find( user => user === recipentEmail )) === true) {
            return false;
        }
        else {
            return true;
        }
    }

    const CreateChat = () =>{
        const input = prompt(' Enter Valid Email Id of Your Friend ');
        if(!input){
            return null;
        }
        
        if(EmailValidator.validate(input) && ChatAlreadyExits(input) && input!==user.email){
            db.collection("chats").add({
                users : [user.email,input]
            })
        }else{
            alert("Enter valid email address");
        }
    }

    const [searchoption, setsearchoption] = useState(null);

    const update = (e)=> {
        setsearchoption(e.target.value);
    }

    let filteredContact = chatsnapshot?.docs?.filter((contact)=>{
        let data;
        if(contact.data().users?.[0] === user.email ){
            data = (contact.data().users?.[1]?.toLowerCase().indexOf(searchoption?.toLowerCase()) !== -1 ) ;
        }else{
            data = (contact.data().users?.[0]?.toLowerCase().indexOf(searchoption?.toLowerCase()) !== -1 ) ;
        }
        return data;
    }); 

    return (
        <ThemeProvider theme={theme === "light" ? lightmodechat : darkmodechat }>
        <GlobalStyles />
        <Container_chat>
            <Head>
                <title>WebChat Chat</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main_Conatiner_chat>
                <LeftContainer_chat>
                    <Avatar_Conatiner>
                        <div className="container_avatar">
                            <Avatar src={user.photoURL} alt={user.displayName.substr(0,1)} className="Avatar" />
                            <p>{user.displayName}</p>
                        </div>
                            <IconButton onClick={() => router.back()}>
                                <ArrowBackIcon className="arrow_button" />
                            </IconButton>
                    </Avatar_Conatiner>
                    <SearchBar_Conatiner>
                        <div className="Appleft_searchbar">
                            <div className="searchbar">
                                <SearchIcon />
                                <input placeholder="Search or Create New Chat People's "  value={searchoption} onChange={update} spellCheck="false" ></input>
                            </div>
                        </div>
                    </SearchBar_Conatiner>
                    <StartButton onClick={CreateChat}>Start New Chat</StartButton>
                
                    {
                        searchoption === null ? 
                        chatsnapshot?.docs?.map((chat)=>(
                            <Chat id={chat.id} key={chat.id} users={chat.data().users} />
                        )) : 
                        filteredContact?.map((chat)=>(
                            <Chat key={chat.id} id={chat.id} users={chat.data().users} />
                        ))
                    }

                </LeftContainer_chat>
                {
                    chats ? 
                        <RightContainer_chat>
                            <ChatScreen chat={chat} message={message} />
                        </RightContainer_chat> : 
                    <>
                    </>
                }
               
            </Main_Conatiner_chat>
            <Message_Display>
                <h1>
                    Sorry,for Inconvenience we are bulding for mobile version soon, for now you have to login via laptops.
                </h1>
            </Message_Display>
        </Container_chat>
        </ThemeProvider>
    )
}

export default chats;
