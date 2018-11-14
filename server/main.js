
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
				res.send(error);			
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
                });    
  });

app.post('/profile', (req, res)=> {  
    if(!req.body) return res.sendStatus(400);
      
    let userId = req.body.userId;
    console.log('profile',userId);

    api.checkUserId(userId)
			.then((doc)=>{
				if(doc){
					// var cookies = new Cookies( req, res); 
            		// req.session.name = name;
    			    // api.getUser(name).then((result)=>{
					// 					let bet = result.bet;
					// 					let user = result.name;
					// 					res.render('tablePlay',{bet, user});
                    // 				});	
                    console.log("UserID", doc);
                    res.send(doc);				
				} else {
                    console.log("User error ");
					res.json(dataUser.email);										
				}
			})
			.catch((error)=>{
                console.log(error);
				res.json([
                        {id:1, username: "Sasha"},
                        {id:2, username:"Vlad"}
                    ]);			
			});  
    
  });

app.listen(3001,()=>{
    console.log("Listened 3001");
});

