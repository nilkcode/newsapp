import React, { Component } from 'react'
import loading from './loader.gif'

export class Spinner extends Component {
  render() {
    return (
      <div>
         <img src={loading} alt="loading spinner" />
      </div>
    )
  }
}

export default Spinner
