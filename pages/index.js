import { useState, useEffect } from "react";
import Head from 'next/head'
import Link from "next/link";
import firebase from "firebase";
import styled,{ ThemeProvider } from "styled-components";
import { darkmode, lightmode, GlobalStyles } from '../config/theme';
import { useDataLayerValue } from "../config/DataLayer"; 
import MenuIcon from '@material-ui/icons/Menu';
import dynamic from 'next/dynamic';

const Features = dynamic(()=> import('../component/Features'),{
  ssr:false
});
const About = dynamic(()=> import("../component/About"),{
  ssr:false
});
const Contact = dynamic(()=> import("../component/Contact"),{
  ssr:false
});

export default function Home() {

  const [ { theme },dispatch] = useDataLayerValue();
  const [ checked, setchecked] = useState();

  useEffect(() => {
    if(theme ==="light"){
      setchecked(false)
    }else{
      setchecked(true)
    }
  }, [checked,theme]) 

  const logOut = () => {
      firebase.auth().signOut();
  }

  const themeToggle = () => {
    theme === "light" ?  dispatch({
      type : "SET_THEME",
      theme : "dark"
    }) : dispatch({
      type : "SET_THEME",
      theme : "light"
    }) ;
  }

  //navbar 
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <ThemeProvider theme={ theme === "light" ? lightmode : darkmode }>
    <GlobalStyles />
    <Main_Conatiner>
      <Head>
        <title>WebChat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Container1>
            <Navbar_left>
                <h2>WebChat</h2>
            </Navbar_left>
            <Navbar_right>

            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <a href="#features">
                  <li className="nav-item nav-links" activeClassName="active" onClick={handleClick}>
                    Feature's
                  </li>
                </a>
                <a href="#aboutus">
                  <li className="nav-item nav-links" activeClassName="active" onClick={handleClick}>
                      About Us
                  </li>
                </a>
                <a href="#contactus">
                  <li className="nav-item nav-links" activeClassName="active" onClick={handleClick}>
                    Contact Us
                  </li>
                </a>
                <li className="nav-links" onClick={handleClick}>
                    <button onClick={logOut} className="logOut">LogOut</button>
                </li>
            </ul>
            <div className="nav-icon" onClick={handleClick}>
              <MenuIcon className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            </Navbar_right>
        </Container1>
        <Thememode_container>
          <label class="switch"> 
            <input type="checkbox" onClick={themeToggle} checked={checked} />
            <span class="slider round"></span>
          </label>
        </Thememode_container>
        <Container2>
            <LeftContainer>
                <h4>We Are here to connect you with known people's.</h4>
                    <Link href="/chats">
                        <h5>GoTo Chats</h5>
                    </Link>
            </LeftContainer>
            <RightContainer>
              <img src="chatMain.svg" alt="chatImg" width="90%" height="auto" />
            </RightContainer>
        </Container2>
        
        {/* feature's section -->  */}
        <span id="features"></span>
        <Features />
      

        {/* About section --> */}
        <span id="aboutus"></span>
        <About />

        {/* Contact section --> */}
        <span id="contactus"></span>
        <Contact />
        
        <Container6>
           <hr className="horizontal_rule"/>
           <p>Designed Or Created by <br />
              <span className="green"> @prajyot_burbure
              <br /> 
              and Team </span>
           </p>
        </Container6>

      </Container>
    </Main_Conatiner>
    </ThemeProvider>
  )
}


const Main_Conatiner = styled.main`
`;

const Container = styled.div`
   font-family: 'Poppins', sans-serif!important;
   max-width : 1240px;
   margin-left: auto;
   margin-right: auto;
`;

const Container2 = styled.div`
    max-width : 1240px;
    margin-left: auto;
    margin-right : auto;
    display: flex;
    @media (max-width: 768px) {
      flex-direction : column-reverse;
    }
`;

const LeftContainer = styled.div`
    width: 50%;
    h4{
      margin-top : 200px;
      margin-left : 20px;
      font-size : 2.35rem;       
      color :  #06D253;
    }
    h5{
      margin-top : -35px;
      margin-left : 20px;
      font-size : 1.2rem;
      color: #707072;
      width : fit-content;
      padding: 7px;
      padding-left : 20px;
      padding-right : 20px;
      border-radius : 20px;
      border :  1px solid #06D253;
    }
    @media (max-width: 768px) {
      width: 100%;
      h4{
        margin-top : 30px;
        margin-left : 0px;
        text-align: center;
      }
      h5{
        margin-left: auto;
        margin-right: auto;
      }
    }
    h5:hover{
      cursor: pointer;
      color : #545261;
    }
`;

const RightContainer = styled.div`
    flex : 1;
    img{
      margin-top : 100px;
    }
    @media (max-width: 768px) {
      img{
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-top : 50px;
    }
    }
`;

const Container1= styled.div`
  max-width: 1240px;
  margin-right : auto;
  margin-left : auto;
  padding-top: 0px;
  padding-bottom : 0px;
  display : flex;
  justify-content : space-between;
  align-items: center;
`;

const Navbar_left = styled.div`
    h2{
      font-size : 1.8rem;    
      margin-left: 20px;   
      color :  #06D253;
      letter-spacing: .1em;
    }
    h2:hover{
      cursor: pointer;
    }
    @media (max-width: 768px) {
        /* h2{
          margin-left: 20px;
        } */
    }
`;

const Navbar_right = styled.div`
    display: flex;
    align-items: center!important;
    div{
      display : flex;
      margin-right : 0px;
    }
    div > p {
      color :  #06D253;
      margin-left : 12px;
      letter-spacing: .1em;
      transition: text-shadow .3s;
    }
     p:hover{
      text-shadow: 0 0 1.2px #06D253, 0 0 1.2px #06D253;
      cursor: pointer;
    } 
    .logOut{
      background-color: none;
      color: #2F2E41;
      width : fit-content;
      font-size: 1rem;
      margin-left: 15px;
      margin-right: 15px;
      padding: 7px;
      padding-left : 20px;
      padding-right : 20px;
      border-radius : 20px;
      border :  1px solid #06D253;
      outline: none;
    }
    .logOut:hover{
      cursor: pointer;
      color:  #06D253;
      outline: none;
    }


.navbar {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 20;
}

.nav-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  max-width: 1500px;
}

.nav-menu {
  display: flex;
  list-style: none;
  text-align: center;
  margin-right: 2rem;
}

.nav-links {
  color: #06D253;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;
  border-bottom: 3px solid transparent;
}
.fa-code {
  margin-left: 1rem;
}

.nav-item {
  line-height: 40px;
  margin-right: 1rem;
}

.nav-item:after {
  content: "";
  display: block;
  height: 3px;
  width: 0;
  background: transparent;
  transition: width 0.7s ease, background-color 0.5s ease;
}

.nav-item:hover:after {
  width: 100%;
  background: #06D253;
}

.nav-item .active {
  color: white;
  border: 1px solid white;
}

.nav-icon {
  display: none;
}

@media screen and (max-width: 960px) {
  *{
    padding: 0;
    margin: 0;
  }
  .nav-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-top: 1pxsolid #fff;
    position: absolute;
    top: 70px;
    left: -110%;
    opacity: 1;
    transition: all 0.5s ease;
  }

  .nav-menu.active {
    background: black;
    left: 0px;
    opacity: 1;
    transition: all 0.5s ease;
    z-index: 1;
  }
  .nav-item .active {
    color: #06D253;
    border: none;
  }
  .nav-links {
    padding: 0.7rem;
    width: 100%;
    display: table;
  }

  .nav-icon {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #ffdd40;
  }
}
`;

const Container6 = styled.div`
    .horizontal_rule{
       margin-top: 40px;
       margin-bottom: 40px;
       border: 0px;
       border-bottom: 1px solid #06d253;
       border-style: dotted;
       width: 50%;
    }
    p{
      text-align: center;
      color: #707072;
      font-weight: 600;
      margin-bottom : -16px;
      padding-bottom: 16px;
    }
    .green{
      color: #06D253!important;
      font-weight: 500;
    }

`;

const Thememode_container = styled.div`
 display : grid;
 place-items: center;
  .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #06d253;
}

input:focus + .slider {
  box-shadow: 0 0 1px #06d253;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
`;
