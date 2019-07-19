import React from "react"
import styled from 'styled-components'

const Tag = styled.div`
  background-color: rgba(211, 211, 211, 0.8);
  text-overflow: ellipsis;
  box-sizing: border-box;
  white-space: nowrap;
  position: relative;
  font-size: 0.9em;
  padding: 0px 5px;
  overflow: hidden;
  max-width: 48%;
  color: #282D33;
  margin: 2px;
  :hover {
    cursor: pointer;
    overflow: visible;
    :before {
      content: "${p => p.val}";
      color: white;
      background-color: rgb(150, 150, 150);
      outline: 2px solid rgb(150,150,150);
      width: max-content;
      position: absolute;
      align-items: center;
      display: flex;
      padding: 0px 5px;
      font-size: 1.1em;
      z-index: 2;
      bottom: 0px;
      left: 0;
      top: 0px;
    }
  }
`

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5px;
`

class TagList extends React.Component {
  render() {
    return (
      <Container>
        {this.props.keywords.map((keyword, i) =>
          <Tag val={keyword} key={i}>{keyword}</Tag>
        )}
    </Container>
    )
  }
}

export default TagList