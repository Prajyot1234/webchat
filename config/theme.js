import { createGlobalStyle } from "styled-components"
import { linearGradient } from 'polished';

export const lightmode = {
    body : "black",
}

export const darkmode = {
    body : "white",
}

export const lightmodechat = {
    gradient : linearGradient({
        colorStops : [ '#2f4353 0%', '#d2ccc4 74%' ],
        toDirection : '315deg',
    })
}

export const darkmodechat = {
    gradient : linearGradient({
        colorStops : [ '#d8dede 0%', '#e5bdf6 74%' ],
        toDirection : '147deg',
    })
}

export const GlobalStyles = createGlobalStyle`
    body{
        background-color : ${ props => props.theme.body };
        background : ${ props => props.theme.gradient };
    }
`;