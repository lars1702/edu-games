import React from "react"


class TagList extends React.Component {
  
  render() {
    return (
      <div className="kw-list g-l-card">
        <div className="row mx-2">
          {this.props.game.keywords.map((keyword, i) => (
            <p className="ell list-unstyled bg-secondary text-light px-1 border-0 rounded" key={i}>
              {keyword}
            </p>
          ))}
        </div>
      </div>
    )
  }
}

export default TagList