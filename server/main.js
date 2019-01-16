
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const  io  =  require('socket.io')(server);

// const path = require('path');


const api = require('./db/api.js');
const secrekeyJWT = 'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L';
const players = {};
let countPlayers = 0;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../build')));

app.post('/',(req ,res)=>{

    if(!req.body) return res.sendStatus(400);
      
    let dataUser = req.body;
    
    api.checkUser(dataUser)
			.then(async (doc)=>{
                console.log('userID', doc);
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
	res.sendStatus(404, 'Error 404 not found!');
	next();
});

app.use((error, req, res, next)=>{
	console.log(error);
	res.send('Error 500 server not work!');
	next();
});



io.on('connection', (client) => {
    
    console.log("New client has connected with id:", client.id);
    countPlayers++;
    
    if(countPlayers <= 2){
        client.on("new_player",(serverData)=>{
            console.log('serverData', serverData);
            players[client.id] = serverData;
            client.emit('response', players);
            client.broadcast.emit('response', players);
            console.log('new_client: ', players );
        });
    }
    

    client.on('bet', clientBet => {        
        players[client.id] = {...players[client.id],'bet': clientBet};
        console.log('clientBet', players)
        client.emit('betResponse', players);
        client.broadcast.emit('betResponse', players);
    });
    
    client.on('pressButton', message => {  
        console.log('pressButton', message);        
        client.broadcast.emit('pressButton', message);
    });

    client.on('cardPlay', cardPlay => {     
        players[client.id] = {...players[client.id],'card': cardPlay};
        console.log('clientGame', players);
        client.broadcast.emit('cardPlay', players);
    });

    client.on('cardMore', cardMore => {  
        players[client.id].card.playerHand = cardMore.playerHand;
        players[client.id].card.playerHandSum = cardMore.playerHandSum;      
        client.broadcast.emit('cardPlay', players);
    });
    
    client.on('cardEnough', cardEnough => {  
        players[client.id].card.dealerHand = cardEnough.dealerHand;
        players[client.id].card.dealerHandSum = cardEnough.dealerHandSum;      
        client.broadcast.emit('cardPlay', players);
    });

    client.on('winGame', winGame => { 
        console.log('winGame', winGame);
        for(let id in players){
            if(players[id].role === true){
                players[id].card = {
                    playerHandSum: winGame.playerHandSum,
                    dealerHandSum: winGame.dealerHandSum,
                    playerHand: winGame.dealerHand,
                    dealerHand: winGame.dealerHand,
                    isEnough: winGame.isEnough,
                    isMore: winGame.isMore,
                    bet: winGame.bet,
                    opponentCash: winGame.opponentCash,
                    cash: winGame.cash,
                    messageResult: winGame.messageResult

                }
            }else{
                players[id].bet = {
                    bet: winGame.bet,

                }
            }
        }

        client.broadcast.emit('finishGame', players);
    });

    client.on('loseGame', loseGame => { 
        console.log('loseGame', loseGame);
        for(let id in players){
            if(players[id].role === true){
                players[id].card = {
                    playerHandSum: loseGame.playerHandSum,
                    dealerHandSum: loseGame.dealerHandSum,
                    playerHand: loseGame.dealerHand,
                    dealerHand: loseGame.dealerHand,
                    isEnough: loseGame.isEnough,
                    isMore: loseGame.isMore,
                    bet: loseGame.bet,
                    opponentCash: loseGame.opponentCash,
                    cash: loseGame.cash,
                    messageResult: loseGame.messageResult
                }
            }else{
                players[id].bet = {
                    bet: loseGame.bet,

                }
            }
        } 
        console.log('finishPlayers', players);
        
        client.broadcast.emit('finishGame', players);
    });

    client.on('backToProfile', () => {
        players[client.id] = {}; 
        client.broadcast.emit('after_delet', players);        
        console.log('After delet ', players);       
    });

    client.on('disconnect', () => { 
        delete players[client.id];   
        countPlayers--;     
        client.broadcast.emit('after_delet', players);        
        console.log('After delet ', players);       
    });   
    
});



server.listen(3001,()=>{
    console.log("Listened 3001");
});

