
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const api = require('./db/api.js');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/',(req ,res)=>{

    if(!req.body) return res.sendStatus(400);
      
    let dataUser = req.body;
    
    api.checkUser(dataUser)
			.then((doc)=>{
				res.send(doc._id);								
			})
			.catch((error)=>{
                console.log(error);
				res.sendStatus(400, error);			
			});  
    
   
});

app.post('/registration', (req, res)=> {  
    if(!req.body) return res.sendStatus(400);
      console.log('Registration',req.body);
      let dataUser = req.body;
      console.log('Registration',dataUser);
      
      api.createUser(dataUser)
                .then((result)=>{
                    res.json(result);
                })
                .catch((err)=>{
                    console.log(err);
                    res.sendStatus(400, error);                    
                });    
  });

app.post('/profile', (req, res)=> {  
    if(!req.body) return res.sendStatus(400);
      
    let userId = req.body.userId;

    api.checkUserId(userId)
			.then((doc)=>{
				if(doc){
					res.send(doc);				
				} else {
                    console.log("User error ");
					res.json(dataUser.email);										
				}
			})
			.catch((error)=>{
                console.log(error);
				res.sendStatus(400, error);			
			});  
    
  });

app.listen(3001,()=>{
    console.log("Listened 3001");
});

