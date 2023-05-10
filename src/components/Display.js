import React, { Component } from 'react';


export default class Display extends Component {

  render() {
    const {name, img} = this.props;
    if(name==='giratina-altered') return null;
    return (
      <div className="container">
        <span className="card">
            <img className="card-header" src={img} alt='pokemon' loading="lazy" />
            <span className="card-title">
              <h3>{name}</h3>
            </span>
        </span>
    </div>  
    )
  }
}