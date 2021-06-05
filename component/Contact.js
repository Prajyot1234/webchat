import styled from "styled-components";

function Contact() {
    return (
        <Contactus>
            <Container5>
            <h2>Contact Us</h2>
            <div>
                <div className="col1" src="./">
                    <img loading="lazy" src="contactUs.svg" alt="contactImg" height="200px" width="250px" />
                    <p>By phone<br />+91-9518783974</p>
                </div>
                <div className="col1">
                    <img loading="lazy" src="email.svg" alt="emailImg" height="200px" width="250px" />
                    <p>Regarding any kind of bug,Or any kind of question email us.<br />
                    </p>
                    <a href="mailto:prajyotb9@gmail.com" className="link">Send</a>
                </div>
                <div className="col1">
                    <img loading="lazy" src="connectSocial.svg" alt="connectImg" height="200px" width="250px" />
                    <p>Connect Us on social media.<br />
                    <a target="_blank" href="https://www.instagram.com/prajyot_burbure/?hl=en" >@WebChat</a>
                    </p>
                </div>
                </div>
            </Container5>
        </Contactus>
    )
}

export default Contact


const Contactus = styled.div`
    margin-top: 10px;
`;


const Container5 = styled.div`
    h2{
      margin-top : 50px;
      text-align: center;
      color :  #06D253;
      letter-spacing: 0.1em;
      font-size: 1.8rem;
    }
    h5{
      margin-top : 50px;
      margin-bottom: 40px;
      text-align: center;
      color :  #06D253;
      letter-spacing: 0.1em;
      font-size: 1.8rem;
    }
    div{
     display: flex;
     width : 100%;
   }
   div > .col1{
     display: flex;
     flex-direction: column;
   }
   div > .col1 > img{
      margin-left: auto;
      margin-right: auto;
      /* height: 200px; */
      max-width: 250px;
   }
   div > .col1 > p{
     color: #06d253; 
     margin-left: auto;
     margin-right: auto;
     width: 85%;
     text-align: center;
   }
   .link{
      color: #707072;
      font-weight: 600;
      width : fit-content;
      padding: 7px;
      border :  1px solid #06D253;
      border-radius: 20px;
      padding-left: 20px;
      padding-right: 20px;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
   }
   .link:hover{
      color : #2F2E41;
      font-weight: 600;
      cursor: pointer;
   }
   @media (max-width: 768px) {
    div{
      flex-direction: column;
    }
    div > .col1 > img{
      max-width: 300px;
    }
    div > .col1 > p{
      width: 75%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .link{
      margin-bottom: 40px;
    }
   }
`;