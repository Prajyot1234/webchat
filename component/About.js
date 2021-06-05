import styled from "styled-components"; 

function About() {
    return (
        <Aboutus>
            <Container4>
                <h2>About Us</h2>
                <img src='developer.svg' alt="devloperImg"  width="40%" height="auto" />
                <p>So we are bunch of student from SSGMCE college. for pre-final year mini-project we've created this project name as 
                WebChat,By using this website we can communicate with people with using their email-id. By using this is website 
                we can avoid the tension of giving the personal mobile number to other.<br/>
                </p>
            </Container4>
        </Aboutus>
    )
}

export default About

const Aboutus = styled.div`
`;

const Container4 = styled.div`
    h2{
      margin-top : 50px;
      text-align: center;
      color :  #06D253;
      letter-spacing: 0.1em;
      font-size: 1.8rem;
    }
    img{
      display: block;
      margin-top: 20px;
      margin-bottom: 30px;
      margin-left: auto;
      margin-right: auto; 
    }
    p{
      text-align: center;
      color :  #06D253;
     margin-left: auto;
     margin-right: auto;
     width: 70%;
     text-align: center;
    }
    @media (max-width: 768px) {
      img{
        width:80%;
      }
    }
`;
