import styled from "styled-components"
import React from "react"
import Shiitake from "shiitake"


export const Description = ({l, tr, description}) => 
  <ShiitakeContainer>
    <Shiitake lines={4}>
      {description}
    </Shiitake>
  </ShiitakeContainer>


export const Container = styled.div`
  width: 30%;
  background-color: #FFD940;
  margin: 5px;
  box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.5);
  :hover {
    filter: saturate(105%);
    transform: scale(1.01);
    z-index: 2;
  }
`

export const ShiitakeContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: #FFD940;
  word-break: break-word;
  color: black;
`

export const Image = styled.div`
  background-image: url("${p => p.src}");
  background-size: cover;
  overflow: hidden;
  cursor: pointer;
  height: 185px;
  width: 100%;
`

export const GameTitle = styled.div`
  background-color: rgba(255, 255, 255, 1);
  border-bottom: 1px solid lightgrey;
  width: fit-content;
  margin: 0 auto;
  white-space: nowrap;
  padding: 0px 10px;
  font-size: 110%;
`
