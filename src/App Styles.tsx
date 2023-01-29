import styled, { createGlobalStyle } from "styled-components";

export const MyStyle = createGlobalStyle`
html{
    height:100%;
}
body{
    background-image:url("https://images.unsplash.com/photo-1674796941974-9120fdf15205?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1341&q=80")
    background-size:cover;
    margin:0;
    padding:0,20px;
    display:flex;
    justify-content:center;
}
*{
    box-sizing: border-box;
    font-family:'Catamaran',sans-serif;
}


`;

export const Wrapper = styled.div`
display:flex;
flex-direction:column;
align-items:center;
>p{
    color: #fff;
}
.score{
    color: #fff;
    font-size:2rem;
    margin:0;
}

h1{
    font-family: Fascinate inline sans-serif;
    background-image:linear-gradient(180deg, #fff,#87f1ff);
    background-size:100%;
    background-clip:text;
    font-size:70px;
    text-align:center;
    margin:20px;
    font-weight:400;

}


`
