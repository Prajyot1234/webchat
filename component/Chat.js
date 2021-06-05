import { Avatar, Button } from "@material-ui/core";
import styled from "styled-components";
import getRecipentEmail from "../config/getRecipentEmail";
import  { useAuthState } from "react-firebase-hooks/auth";
import { auth,db } from "../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Link from "next/link";

const Chat_Container = styled(Button)`
    width: 100%!important;
    padding: 0px!important;
    &&&{
        display: flex;
        align-items: center;
        font-size: 0.9rem;
        width: 100%;
        border-bottom: 1px solid rgb(235, 224, 224)!important;
    }
    p{
        font-weight: 600;
        word-break: break-word;
    }
    :hover{
        cursor: pointer;
        background-color: #e6eae7!important;
    }
`;

const Avatar_Chat = styled(Avatar)`
   &&&{
        padding : 0!important;
        margin: 5px!important;
        transition: all .2s ease-in-out;
        text-transform: uppercase;
   }
    :hover{
        transform: scale(0.8);
    }
`;

const Avatar_Container = styled.div`
    &&&{
        display: flex;
        align-items: center;
        margin-right: auto!important;
        text-transform: none;
    }
`;

function Chat({ id ,users }) {
    
    const [ user ] = useAuthState(auth);
    const  getremail = getRecipentEmail(users,user);
    
    const [ recipentSnapshot ] = useCollection(
        db.collection("user").where("email","==",getremail)
    )
   
    const recipent = recipentSnapshot?.docs?.[0]?.data();
    console.log(recipent?.photoURL);

    return (
        <Link href='/chats/[id]' as={`/chats/${id}`} >
            <Chat_Container>
            <Avatar_Container>
                {
                    recipent ? 
                    <Avatar_Chat src={recipent?.photoURL} alt={getremail.substr(0,1)} />
                    :
                    <Avatar_Chat >
                        {getremail[0]}
                    </Avatar_Chat>
                }
                <p>{getremail}</p>
            </Avatar_Container>
            </Chat_Container>
        </Link>
    )
}

export default Chat;



