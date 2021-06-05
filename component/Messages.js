import styled from "styled-components";
import  { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useEffect, useRef } from "react";

function Messages({ message, user }) {
    const [ userr ] = useAuthState(auth); 

    const prettyDate2 = (time) => {
        return time?.replace(/:\d+ /, ' ');
    }

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(scrollToBottom, [message?.message]);
   
    // useEffect(() => {
    //     var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //     var d = new Date(message?.timestamp);
    //     console.log(d.getDate() + ' ' + (months[d.getMonth()]?.toUpperCase()) + ' ' + d.getFullYear());
    // }, []);

    return (
     <Messages_main_Container>
        <Message_Con> 
            <p className={`msg_decoration ${user === userr?.email && "chat_msg_sender"}`}>
                    {message?.message}
                <span className="msg_time">
                    {prettyDate2(new Date(message?.timestamp).toLocaleTimeString())}
                </span>
            </p>
        </Message_Con>
        <EndMessages ref={messagesEndRef}/>
     </Messages_main_Container>
    )
}

const EndMessages = styled.div``;

const Messages_main_Container = styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: 95%;
`;

const Message_Con = styled.div`
    *{
        padding: 0!important;
        margin : 0!important;
    }
    font-size: 1rem;
    margin: 10px!important;
  
    .message_msg{
        color : #5c5c5f!important;
    }
        
    .chat_msg_sender{
        margin-left: auto!important;
        background-color: #dcf8c6!important;
    }

    .msg_decoration{
        width: 70%;
        max-width: 500px!important;
        word-wrap: break-word;
        background-color: white;
        width: fit-content;
        position: relative;
        margin-top: 30px;
        padding: 5px 13px!important;
        border-radius: 9px;
    }

    .msg_time{
        font-size: xx-small;
        margin-left: 8px!important;
        font-weight: 500;
        color: grey;
    }

`;

export default Messages;