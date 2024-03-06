import React, { Component } from 'react'
import loading from "./loading.gif"

export class Spinner extends Component {
  render() {
    return (
     <div className="text-center">
         <img src={loading} alt="loading" height="50" width="50"></img>
     </div>
    )
  }
}

export default Spinner