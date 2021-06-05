import styled from "styled-components";

function Features() {
    return (
        <Feature>
            <Container3>
                <h2>Feature's</h2>
                <div>
                <div className="col1">
                    <img src="privacy.svg" alt="privacyImg" height="200px" width="250px" />
                    <p>User's data is only accessed by User,because it protected using encryption. </p>
                </div>
                <div className="col1">
                    <img src="secure.svg" alt="secureImg" height="200px" width="250px" />
                    <p>User have to login using google authentication,so no need to personal authentication.</p>
                </div>
                <div className="col1">
                    <img src="messages.svg" alt="messageImg" height="200px" width="250px" />
                    <p>Message's of user can only be seen by user's .</p>
                </div>
                </div>
            </Container3>
        </Feature>
    )
}

export default Features

const Feature = styled.div`
`;


const Container3 = styled.div`
    font-family: 'Poppins', sans-serif;
    
    h2{
      margin-top : 50px;
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
   }
`;