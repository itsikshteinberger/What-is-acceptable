import { map } from 'mssql';
import React, { Component } from 'react';
import Scale from '../../Scale/Scale';
import './Scales.css'

class Scales extends React.Component { 
    state = {
      Data: [],
      IsData: false,
      Search:"",
      filter: "newest"
    } 

    GetData = () =>{
         
        fetch('http://localhost:8000/getData',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name: this.props.user})
        })
        .then(response => response.json())
        .then(data => {
          
          
          this.setState({
            Data: data.data,
            IsData: true
          })
          
        })
      }

    componentDidMount(){
      this.GetData()
    }

    Sort(){
      

    }
  
    render()
    {
      
      return (
        <div className="Main"> 
           <input placeholder="Search specific users or specific words" type="text" onChange={(event)=>{this.setState({Search: event.target.value})}}></input>
         
          
        <div className = "ScalesScreen">
        {(this.state.Data).map((x) =>   (String)(x.username).toUpperCase().includes(this.state.Search.toUpperCase()) ||  (String)(x.question).toUpperCase().includes(this.state.Search.toUpperCase())?<Scale Myuser ={this.props.user} user = {x.username} choose = {x.IsYes === 1? "Yes": x.IsNot ===1? "No": "None"} id ={x.Id} voters={x.votes} yesvoters={x.likes} question = {x.question}/>:null)}
       
        {this.props.user != "" && this.props.user != null?<button className="Add" onClick={() => this.props.ChangeScreen("Add")}>+</button> :null }
        
      </div>
        </div>
     
    );}
  }
  
  export default Scales;

