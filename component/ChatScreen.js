import { useState } from "react";
import styled from "styled-components";
import { Avatar,IconButton,Menu,MenuItem } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import  { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import getRecipentEmail from "../config/getRecipentEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import DeleteIcon from '@material-ui/icons/Delete';
import { useRouter } from "next/router";
import firebase from "firebase";
import InputEmoji from "react-input-emoji";
import TimeAgo from "timeago-react";
//import Messages from "./Messages"
import { withStyles } from '@material-ui/core/styles';
import dynamic from 'next/dynamic';

const Messages = dynamic(()=> import('./Messages'));
// const InputEmoji = dynamic(()=> import('react-input-emoji'));

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
      padding: '0px',
      bottomMargin: '5px',
      backgroundColor: '#EDEDED',
    },    
    root: {
        '& .MuiListItem-gutters' : {
            padding: '0px'
        },
        '& .MuiList-padding' :{
            padding: '4px'
        }
    }               
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

function ChatScreen({ message ,chat }) {
    const [ user ] = useAuthState(auth); 
    const router = useRouter();
   
    const [ messageSnapshot ] = useCollection(
        db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp","asc")
    )   
    //for showing messages
    const showMessages = () => {
        if(messageSnapshot){
            return messageSnapshot?.docs?.map(message =>(
                <Messages
                    id = {message.id}
                    user = {message.data().user}
                    message = {{
                        ...message.data(),
                        timestamp :  message.data().timestamp?.toDate() 
                    }}
                 />
                ))
        }else{
            return JSON.parse(message)?.map(message => (
                <Messages key={message.id} message={message} user={message.user} />
            ))
        }
    }

    const myTrim = (x) => {
        return x.replace(/^\s+|\s+$/gm,'');
    }


    //send message
    const sendMessage = (inp) => {
        var input = myTrim(inp);
       
        if(!input || input === undefined && input.length === 0 ){
            return;
        }

        db.collection("user").doc(user.uid).set({
            lastSeen : firebase.firestore.FieldValue.serverTimestamp()
        },{
            merge : true
        });

        db.collection("chats").doc(router.query.id).collection("messages").add({
            message : input,    
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            user : user.email,
            photoURL : user.photoURL,
        });

        setinput("");
    }

    //user's lastseen and name
    const [ recipentSnapshot ] = useCollection(db.collection("user").where("email","==",getRecipentEmail(chat.users,user)));
    const recipent = recipentSnapshot?.docs?.[0]?.data();

    const recipentemail = getRecipentEmail(chat.users,user)
    const [input, setinput] = useState();

    ///delete chats
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleDelete = () => {
        messageSnapshot?.docs?.map(message =>{
            db.collection("chats").doc(router.query.id).collection("messages")
                .doc(message.id).delete().then(() => {
                    console.log("Chat history successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
            })
        });
        setAnchorEl(null);
    }

    return (
        <ChatScreen_Container>
            <Chat_Conatiner_1>
                {
                    recipent ?  
                    <Avatar className="user_avatar" src={recipent?.photoURL}  /> 
                    :
                    <Avatar className="user_avatar" >{recipentemail[0]}</Avatar>
                }
                
                <div className="users_info">
                    <h4>{recipentemail}</h4>
                    {recipent ? <h6>last seen : {' '}
                            <TimeAgo datetime={recipent?.lastSeen?.toDate()} />
                        </h6> 
                        : 
                        <h6>
                            Not have Any Recent Activity
                        </h6>
                    }
                </div>       
                
                <IconButton>
                    <MoreVertIcon onClick={handleClick} className="user_moreicon" aria-controls="simple-menu" aria-haspopup="true"  />
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                    <MenuItem onClick={handleDelete}>
                        <DeleteIcon />
                    </MenuItem>
                    </StyledMenu>
                </IconButton>

            </Chat_Conatiner_1>
            <Chat_Conatiner_2>
                {showMessages()}
            </Chat_Conatiner_2>
            <Chat_Conatiner_3>
                <InputEmoji
                    className="input_field_chatScreen"
                    value={input}
                    onChange={setinput}
                    cleanOnEnter
                    onEnter={sendMessage}
                    keepOpenend
                    placeholder="  type Your Message's Here"
                    spellcheck={false}
                />  
            </Chat_Conatiner_3>
        </ChatScreen_Container>
    )
}

export default ChatScreen;

const ChatScreen_Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Chat_Conatiner_1 = styled.div`
    *{
        margin: 0!important;
    }
    display: flex;
    align-items: center;
    flex-direction: row;
    border-bottom: 1px solid rgb(207, 202, 202);
    .user_avatar{
        margin: 5px!important;
        transition: all .2s ease-in-out;
        text-transform: uppercase;
    }
    .user_avatar:hover{
        transform: scale(0.8);
        cursor: pointer;
    }
    .users_info{
        margin: 5px!important;
        margin-left: 3px!important;
        flex: 1;
    }
    .user-info > h4{
        font-size: 1rem!important;
    }
    .user_info > h6{
        &&&{
            color: rgb(158, 156, 156);
        }
    }
    .user_moreicon{
        padding: 0px!important;
        width: 20px!important;
        height: 20px!important;
        object-fit: contain;
    }
`;

const Chat_Conatiner_2 = styled.div`
    flex: 1;
    height: 100%;
    overflow-y: hidden;
    overflow: scroll;
    ::-webkit-scrollbar{
        display: none;
    }
`;

const Chat_Conatiner_3 = styled.div`
    display: flex;
    border-top: 1px solid rgb(207, 202, 202);
    .input_field{
        flex: 1;
    }
    .emoji_icon{
        margin: 9px!important;
    }
    .send_icon{
        margin: 9px!important;
    }
    .react-input-emoji--input {
        width: 100%;
        max-width: 956px!important;
        overflow-x: hidden!important;
        overflow-y: hidden;
        overflow: scroll;
        ::-webkit-scrollbar{
            display: none;
        }
    }
    .input_field_chatScreen{
        flex: 1;
        &&&{
            padding: 10px!important;
        }
        border-radius: 10px;
        padding-left: 10px!important;
        margin: 5px!important;
        outline: none;
        border: none;
        overflow : scroll!important;
    }
`;