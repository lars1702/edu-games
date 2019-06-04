import React from "react"
import styled from 'styled-components'

export const Tag = styled.div`
  box-sizing: border-box;
  background-color: rgba(211, 211, 211, 0.8);
  color: #282D33;
  padding: 0px 5px;
  margin: 1px;
  font-size: 0.9em;
`

class TagList extends React.Component {
  render() {
    return (
      <div className="kw-list g-l-card">
        <div className="row mx-2">
          {this.props.game.keywords.map((keyword, i) => (
            <Tag key={i}>
              {keyword}
            </Tag>
          ))}
        </div>
      </div>
    )
  }
}

export default TagList