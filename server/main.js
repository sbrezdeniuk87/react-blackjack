
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const server = require('http').createServer(app);
const path = require('path');


const api = require('./db/api.js');
const secrekeyJWT = 'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L';


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../build')));

app.post('/',(req ,res)=>{

    if(!req.body) return res.sendStatus(400);
      
    let dataUser = req.body;
    
    api.checkUser(dataUser)
			.then(async (doc)=>{
                const token = await jwt.sign({ userId: doc._id }, secrekeyJWT );
                res.json({
                    type: true,
                    userId: doc._id,
                    token: token
                });								
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

app.post('/profile', async (req, res)=> {  
    if(!req.body) return res.sendStatus(400);
    
    let userToken = await jwt.verify (req.body.userToken, secrekeyJWT);
    
    api.checkUserId(userToken.userId)
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

  app.post('/play', async (req, res)=> {  
    if(!req.body) return res.sendStatus(400);
      
    let userToken = await jwt.verify (req.body.userToken, secrekeyJWT);

    api.checkUserId(userToken.userId)
			.then((doc)=>{
				if(doc){
                    console.log('Play', doc);
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

  app.put('/playUser', async (req, res)=> {  
    if(!req.body) return res.sendStatus(400);
    console.log('dataUpdate', req.body)  
    
    let userJWT = await jwt.verify (req.body.userUpdate, secrekeyJWT);
    console.log('userJWT',userJWT);
    let userUpdate = userJWT.userId;
    console.log('userUpdate',userUpdate);
    let cash = req.body.cash

    let dataUpdate = {
        userUpdate, cash
    };
    console.log('DATA_Update', dataUpdate)  
    api.updateUser(dataUpdate)
			.then((doc)=>{
				if(doc){
                    console.log('Play', doc);
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


app.use((req, res, next)=>{
	res.send('Error 404 not found!');
	next();
});

app.use((error, req, res, next)=>{
	console.log(error);
	res.send('Error 500 server not work!');
	next();
});
 


app.listen(3001,()=>{
    console.log("Listened 3001");
});

// function setToken(userId){
//     const token = jwt.sing

// }