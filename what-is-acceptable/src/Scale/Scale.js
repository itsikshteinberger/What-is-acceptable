import React, { Component } from 'react';
import './Scale.css'

class Scale extends React.Component {

state = {
    choosen: this.props.choose,
    yesvoters: this.props.yesvoters,
    voters: this.props.voters
}

choose = (id) => {
    
    if(id === "Yes"){
        switch(this.state.choosen){
            case "No": this.setState({choosen: id, yesvoters: this.state.yesvoters +1, voters: this.state.voters })  
                break;
            case "None": this.setState({choosen: id, yesvoters: this.state.yesvoters +1, voters: this.state.voters+1 }) 
                break;
        }
    }if(id === "No"){
        switch(this.state.choosen){
            case "Yes": this.setState({choosen: id, yesvoters: this.state.yesvoters -1, voters: this.state.voters }) 
                break;
            case "None": this.setState({choosen: id, yesvoters: this.state.yesvoters, voters: this.state.voters + 1 }) 
                break;
        }
    }
    
     
}

SaveVote = (vote) =>{
    if(vote != this.state.choosen && this.props.Myuser != "" && this.props.Myuser != null){
        fetch('http://localhost:8000/addVote',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name: this.props.Myuser,
                               like: vote,
                               id: this.props.id     })
      })
      .then(response => response.json())
      .then(data => {
        if(!data.error)
        {this.choose(vote)}
      })
    }

    
}

    
render()
  {
    return (
        <div className="main">

            <span style={{paddingRight: "32%"}}>From: {this.props.user}</span>
            <span style={{paddingLeft:  "32%"}}> {this.state.voters} votes</span>
            
            
           
            <h3 className="title">{this.props.question}</h3>
           
            <div className="scale">
                <p id = "yes" onClick={()=>this.SaveVote("Yes")} className={this.state.choosen === "Yes"? "yes_c":"yes"}> {parseInt(100*(this.state.yesvoters/this.state.voters))}% </p>
                <div className="rectangle" style = {{background: "linear-gradient(90deg, rgba(138,239,163,1) "+parseInt(100*(this.state.yesvoters/this.state.voters))+"%, rgba(237,123,146,1) "+(parseInt(100*(this.state.yesvoters/this.state.voters)))+"%)"}}></div>
                <p id = "no" onClick={()=>this.SaveVote("No")} className={this.state.choosen === "No"? "no_c":"no"}> {100-parseInt(100*(this.state.yesvoters/this.state.voters))}% </p>
            </div>
            
        </div>
  );}

}

export default Scale;