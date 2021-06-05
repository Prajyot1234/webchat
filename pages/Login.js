import styled from "styled-components";
import Head from 'next/head'
import { auth,provider } from "../config/firebase";

const Main_Conatiner = styled.div`
font-family: 'Roboto', sans-serif;
    background-color: black;
`;

const Container = styled.div`
    display: grid;
    place-items: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    overflow: hidden;
`;

const Container_Box = styled.div`
        color: white!important;
        width: 25vw;
        height: 70vh;
        min-height: 500px;
        border-radius: 10px;
        background-color: #7ee8fa;
        background-image: linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%);
        box-shadow: 10px 10px 40px 5px rgba(0, 0, 0, 0.5);
       
        .login_svg{
            margin-top: 50px;     
            width: 70%;
        }

        p{
            font-size: 1.1rem;
            margin-top: 40px;
            color: black!important;
            width: 80%;
            margin-left: auto;
            margin-right: auto;
            text-transform: uppercase;
        }
       
        .wrap {
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
        }

        .button {
            margin-top: 10px;
            vertical-align: center;
            width: 140px;
            height: 45px;
            font-family: 'Roboto', sans-serif;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 2.6px;
            font-weight: 500;
            color: black;
            font-weight: 600;
            background-color: #fff;
            border: none;
            border-radius: 45px;
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease 0s;
            cursor: pointer;
            outline: none;
        }

        .button:hover {
            background-color: #2EE59D;
            box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
            color: #fff;
            transform: translateY(-7px);
        }

        .button:hover span{
            color: white; 
        }

        .google_svg{
            width: 20px;
            height: 20px; 
        }
        span{
            color: black;
            display: block;
            margin-top: auto!important;
            margin-bottom: auto!important;
        }

        @media (max-width: 1260px) {
            width: 45vw;
        }

        @media (max-width: 768px) {
            width: 70vw;
        }
`;

const Conatiner_Chat = styled.div`
    h5{
        margin-top: 500px;
      font-family: 'Poppins', sans-serif;
      margin-left : 20px;
      font-size : 1.2rem;
      color: #2F2E41;
      width : fit-content;
      padding: 7px;
      padding-left : 20px;
      padding-right : 20px;
      border-radius : 20px;
      border :  1px solid #06D253;
    }
    h5:hover{
        cursor: pointer;
    }
`;
    
function login() {

    const Login= ()=> {
        try {
            auth.signInWithPopup(provider)
            .catch(error => (alert(error.message)))   
        } catch (error) {
            console.log(error);
        }
    }

    return  (
        <Main_Conatiner>
            <Head>
                <title>login page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <Container_Box>
                    <img src="/mobile_login.svg" className="login_svg"/>
                    <p>Login using Google Account</p>
                    <div class="wrap">
                        <button onClick={Login} class="button"><span>Login</span><img src="google.svg" className="google_svg"/></button>
                    </div>
                </Container_Box>
            </Container>
        </Main_Conatiner>
    )
}

export default login;
