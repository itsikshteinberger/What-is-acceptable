import React, { Component } from 'react';
import './Sign.css'

class Sign extends React.Component {
    
    state = {
        user: "",
        password: ""
    }

    constructor(props){
        super(props);
    }
    
    render()
    {
      return (
      <div className="SignScreen">
       
        <div className="Text">
          <h1>What is acceptable?</h1>
        </div>
          <form >
            <input type="text" placeholder="User name" value={this.state.user} onChange ={(event)=> this.setState({user: event.target.value})}></input>
            <input type="password" placeholder="Password"  value={this.state.password} onChange ={(event)=> this.setState({password: event.target.value})}></input>
            <input type="button" value="Sign in" onClick={()=> {
                if(this.state.user.trim() && this.state.password.trim())
                {this.props.Signin(this.state.user,this.state.password)}
                
            }}></input>
          <button onClick= {()=> this.props.ChangeScreen("Register") }>Don't have an account yet?  Sign Up</button>
          </form>
          
      </div>
    );}
  }
  
  export default Sign;
