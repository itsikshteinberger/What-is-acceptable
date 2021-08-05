import React, { Component } from 'react';
import './NavBar.css'

class NavBar extends React.Component {
    
    
    render()
    {
      return (
      <div className = "Nav">
         <button className={this.props.Screen === "Scales"? "ChosenButton":"" } onClick={() => {this.props.ChangeScreen("Scales")}}>Home</button>  
         {this.props.User != "" && this.props.User != null? 
         <span>
             <button className={this.props.Screen === "Add"? "ChosenButton":"" } onClick={() => this.props.ChangeScreen("Add")}>Add</button>
            <button onClick={() => this.props.ChangeScreen("Sign")}>Logout</button>
            <text>|  {this.props.User}</text>
         </span>
         : <button className={this.props.Screen === "Sign"? "ChosenButton":"" } onClick={() => this.props.ChangeScreen("Sign")}>Sign</button>}
         
      </div>
    );}
  }
  
  export default NavBar;
