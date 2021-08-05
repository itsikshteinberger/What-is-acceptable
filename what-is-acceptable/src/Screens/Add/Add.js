import React, { Component } from 'react';
import './Add.css'

class Add extends React.Component {
    
    state = {
        Question: ""
    }
    render()
    {
      return (
      <div className="AddScreen">
        
          <h1>Add your dilemma:</h1>
          <br></br>
          <textarea cols="10" value = {this.state.Question} onChange = {(event)=> this.setState({Question: event.target.value})} type="text" placeholder="Write your deliberation"></textarea>
          <br></br>
          <br></br>
          <button onClick ={() =>  this.state.Question.trim()?this.props.AddScale(this.state.Question):null}>Add</button>
      </div>
    );}
  }
  
  export default Add;
