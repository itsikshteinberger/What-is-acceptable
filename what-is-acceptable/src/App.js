import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Add from './Screens/Add/Add';
import Register from './Screens/Register/Register';
import Scales from './Screens/Scales/Scales';
import Sign from './Screens/Sign/Sign';

class App extends React.Component {
  
  state = {
    User: "",
    currentScreen: "Sign",
    Data: null
  }

  componentDidMount(){
  
    if(localStorage.getItem("User") != null  && String(localStorage.getItem("User")) != ""){
      this.setState({
        User:localStorage.getItem("User"),
        currentScreen: "Scales"
      })
    }

    
  }

  ChangeScreen = (Screen) =>{
    
    if(Screen === "Sign")
    {
      localStorage.setItem("User","")
      localStorage.setItem("Password", "")
      this.setState({currentScreen: "Sign", User: ""})
    }
    else{
      this.setState({currentScreen: Screen})
    }
    
  }

 
  Signin = (User,Password) =>{

    fetch('http://localhost:8000/sign',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name: User, password: Password })
    })
    .then(response => response.json())
    .then(data => {
      if(data.error){
        alert("You entered incorrect information. Try again.")
      }
      else{
        localStorage.setItem("User", User);
        localStorage.setItem("Password", Password);
        this.setState({
          User:User,
          currentScreen: "Scales"
        })
      }
    })

  
  }

  AddScale = (Question) =>{
    fetch('http://localhost:8000/addScale',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name: this.state.User, question: Question })
    })
    .then(response => response.json())
    .then(data => {
      if(data.error){
        alert("Something went wrong")
      }
      else{
        this.setState({
          currentScreen: "Scales"
        })
      }
    })

  
  }

  Add = (User,Password) =>{
    

    fetch('http://localhost:8000/add',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name: User, password: Password })
    })
    .then(response => response.json())
    .then(data => {
      if(data.error){
        alert("Username already exists")
      }
      else{
        localStorage.setItem("User", User);
        localStorage.setItem("Password", Password);
        this.setState({
          User:User,
          currentScreen: "Scales"
        })
      }
    })

  
  }

 
  render()
  {
    
    return (
    <div>
      <NavBar User = {this.state.User} Screen = {this.state.currentScreen} ChangeScreen = {this.ChangeScreen}/>
      {this.state.currentScreen === "Sign"? <Sign Signin = {this.Signin} ChangeScreen = {this.ChangeScreen}/>:
      this.state.currentScreen === "Scales"? <Scales ChangeScreen = {this.ChangeScreen} user = {this.state.User}/>:
      this.state.currentScreen === "Register"? <Register Add={this.Add}/>: 
      this.state.currentScreen === "Add"? <Add AddScale ={this.AddScale}/>:null
      
      }
      
    </div>
  );}
}

export default App;
