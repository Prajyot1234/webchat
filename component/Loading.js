import styled from "styled-components";
import { Circle } from "better-react-spinkit";

const Container = styled.div`
    padding: 0;
    margin: 0;
    height: 100vh;
    width: 100vw;
    display: grid;
    place-items: center;
`;

const Loader = styled.div`
    h2{
      font-family: 'Poppins', sans-serif;
      font-size : 1.8rem;       
      color :  #06D253;
      letter-spacing: .1em;
    }
    h2:hover{
      cursor: pointer;
    }
`;

const Loader_conatiner = styled.div`
    display: grid;
    place-items: center;
`;

function Loading() {
    return (
        <Container>
            <Loader>
                <h2>WebChat</h2>
                <Loader_conatiner>
                    <Circle color="#06D253" size={60} className="spinner"/>
                </Loader_conatiner>
            </Loader>
        </Container>
    )
}

export default Loading;
