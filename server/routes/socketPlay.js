

module.exports = server =>{
    const  io  =  require('socket.io').listen(server.server);
    const players = {};
    let countPlayers = 0;
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
}