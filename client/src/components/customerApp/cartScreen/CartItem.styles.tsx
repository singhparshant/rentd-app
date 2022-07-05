import styled from "styled-components";

export const Wrapper = styled.div`
  display: block;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 2%;
  max-width: 80%;
  div {
    flex: 1;
  }

  .information{
    display: flex;
    text-align:center;
    justify-content: space-between;
    max-width: 60%;
    margin-left:30%;
    margin-right:20%;
    margin-top:-1%
  }

 .buttonsQuantities{
   max-width:1px
 }

  img {
    margin-right: 3%;
    margin-left: 3%;
  }
`;
