import React, { Component } from 'react';
import './Register.css'

class Register extends React.Component {
    
    state = {
        user: "",
        password: ""
        
    }
    
    render()
    {
      return (
      <div style ={{overflow: 'hidden'}} className="SignScreen RegisterScreen">
        <form style ={{overflow: 'hidden'}}>
          <h1>Enter your details:</h1>
            <input className="Ri" type="text" placeholder="User name" value={this.state.user} onChange ={(event)=> this.setState({user: event.target.value})}></input>
            <input className="Ri" type="password" placeholder="Password"  value={this.state.password} onChange ={(event)=> this.setState({password: event.target.value})}></input>
            <input className="Ri" type ="button" value="Register" onClick={()=> {
                if(!this.state.password.trim() || !this.state.user.trim() )
                {}
                else 
                {this.props.Add(this.state.user,this.state.password)}
                }}/>
        </form>
      </div>
    );}
  }
  
  export default Register;
