
const express = require('express')
const cors = require('cors');
const app = express()
const port = 8000
var bodyParser = require('body-parser')
var sql = require("mssql")

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var config = {
  user: 'sa',
  password: 'ahuva221',
  server: 'localhost', 
  database: 'Acceptable',
  trustServerCertificate: true
};

sql.connect(config, function (err) {
    
  if (err) console.log(err);
  //retTable('select * from users')
});




var request = new sql.Request();

app.use(cors());

app.get('/sign', (req, res) => {
  
     
  // query to the database and get the records
  request.query('select * from Users', function (err, recordset) {
      
      if (err) console.log(err)

      // send records as a response
      res.send({h: recordset['recordset']})
  });
})

app.post('/sign',(req,res)=>{
  
  request.query("select Count(*) from users where Users = '"+req.body.name+"' and Password = '"+req.body.password+"'", function (err, recordset) {
    if (err) console.log(err)
    // send records as a response
    if(recordset['recordset'][0]['']=== 0){
      res.send({error: true})
    }
    else{
      res.send({error: false})
    }
    
});
})

app.post('/add',(req,res)=>{
 
  request.query("INSERT INTO users (Users,Password) VALUES ('"+req.body.name+"', '"+req.body.password+"');", function (err, recordset) {
    if (err) {
      
      res.send({error: true})}
    else res.send({error: false})    
});
})

app.post('/addScale',(req,res)=>{
 
  request.query("INSERT INTO scales (username,question) VALUES ('"+req.body.name+"', '"+req.body.question+"');", function (err, recordset) {
    if (err) {
      res.send({error: true})}
    else res.send({error: false})    
});
})

app.post('/getData',(req,res) => {

  
  request.query(`select Id,
                 scales.username,                 
                 question,                          
                 sum(case when votes.username = '`+req.body.name+`' and [Like] = 'Yes' then 1 else 0 end) as IsYes,
                 sum(case when votes.username = '`+req.body.name+`' and [Like] = 'No' then 1 else 0 end) as IsNot,
                 sum(case when [like] = 'Yes' then 1 else 0 end) AS likes,
                 count([like]) as votes from scales
                 left join votes on scales.Id = votes.scaleId
                 group by Id,scales.username,question
                 ORDER BY Id DESC`,
    function(err,recordset){
      if(!err){
        res.send({data: recordset['recordset']}) 
    }

  });
})

app.post('/addVote',(req,res)=>{
  
  request.query("DELETE FROM votes WHERE scaleId = "+req.body.id+" and username = '"+req.body.name+"' and [like] != '"+req.body.like+"'", function( err, recordset) {
   
    if(!err){
      request.query("INSERT INTO votes ([like],username,scaleId) VALUES ('"+req.body.like+"', '"+req.body.name+"', '"+req.body.id+"')", function( err, recordset) {
        if(!err){
          
          res.send({error:false})
        }else{
          
          res.send({error:true})
        }
      })
    }
  })
  

})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/*
select Id,
	   scales.username,                 
	   question,                          
	   sum(case when votes.username = 'itsik135' then 1 else 0 end) as Isvote,
	   sum(case when [like] = 'Yes' then 1 else 0 end) AS likes,
       count([like])
as votes from scales
left join votes on scales.Id = votes.scaleId
group by Id,scales.username,question
*/