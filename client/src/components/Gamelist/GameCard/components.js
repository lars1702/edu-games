import styled from "styled-components"
import React from "react"
import Shiitake from "shiitake"


export const Description = ({l, tr, description}) => {
  return (
    <ShiitakeContainer>
      <Shiitake lines={4}>
        {description}
      </Shiitake>
    </ShiitakeContainer>
)}

export const Container = styled.div`
  width: 30%;
  background-color: #FFD940;
  margin: 5px;
  padding: 4px;
  box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.5);
  :hover {
    filter: saturate(105%);
    transform: scale(1.01);
    z-index: 2;
  }
`

export const ContainerInner = styled.div`
  cursor: pointer;
`

export const ShiitakeContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: #FFD940;
  word-break: break-word;
  color: black;
`

export const ImageStyled = styled.img`
  max-height: 100%;
  max-width: 100%;
`

export const ImageContainer = styled.div`
  width: fit-content;
`

export const Image = ({src, alt}) =>
  <ImageContainer>
    <ImageStyled src={src} alt={alt}/>
  </ImageContainer>

