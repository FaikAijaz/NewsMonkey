import React, { Component } from 'react'


export class NewsItem extends Component {
  render() {
    let {title,description, imgUrl, newsUrl, author, date, source}=this.props
    return (
      <div className="card my-3">
      <img src={imgUrl} className="c}ard-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%", zIndex:1}}>{source}
  </span>
        <p className="card-text">{description}...</p>
        <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
        <a href={newsUrl}  target="_blank" className="btn btn-sm btn-primary btn-dark">Read More</a>

      </div>
    </div>
    )
  }
}

export default NewsItem