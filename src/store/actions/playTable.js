import {FETCH_SUCCESS,
        FETCH_MAKE_BET,
        HAND_SUCCESS,
        WIN_GAME,
        LOSE_GAME,
        DRAW_GAME,
        DEAL_HAND,
        PLAY_HAND,
        OPPONENT_DATA,
        MAKE_BET_SERVER,
        MESSAGE_BUTTON,
        AUTH_LOGOUT} from './actionType' 
import axios from 'axios'
import classes from '../../containers/PlayTable/PlayTable.css'

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');



export function onCreateDibHandler (isDib, value) {
    return (dispatch, getState)=>{
        const state = getState().playTable;
        if(isDib){
            let bet = parseInt(state.bet) + parseInt(value);
            let cash 
            if(state.role !== true){
                 cash = parseInt(state.cash) - parseInt(value);
            }       
           
            if(bet !== 0 && cash >= 0 && state.playerHandSum === 0){
                let socketBet = {
                    bet, cash, isPlay: true, dib: value
                }
                socket.emit('bet', socketBet);
                dispatch(makeBet(socketBet));
                onCreateDib(value);
            }           
                    
        }
    }     
 }

export function serverData(){
    return dispatch =>{
        socket.on('betResponse', serverBet=>{
            for(let id in serverBet){
                if(serverBet[id].role === false){
                    if(id !== socket.id){
                        const betServer = {
                            opponentCash: serverBet[id].bet.cash,
                            bet: serverBet[id].bet.bet
                        } 
                        dispatch(makeBetServer(betServer));
                        onCreateDib(serverBet[id].bet.dib);
                    }
                }         
            }
        });
        socket.on('pressButton', message=>{
            dispatch(pressButtonMessage(message.message, message.disable)); 
        })
        socket.on('cardPlay', players=>{
            for(let id in players){
                    if(id !== socket.id){
                        const cardServer = {
                            playerHand: players[id].card.playerHand,
                            playerHandSum: players[id].card.playerHandSum,
                            dealerHand: players[id].card.dealerHand,
                            dealerHandSum: players[id].card.dealerHandSum,
                            isEnough: true,
                            isMore: true
                        } 

                        dispatch(handSuccess(cardServer));
                    }     
            }
        })

        socket.on('finishGame', players=>{
            for(let id in players){
                if(players[id].role === true){
                    const cardServer = {
                        playerHand: players[id].card.playerHand,
                        playerHandSum: players[id].card.playerHandSum,
                        dealerHand: players[id].card.dealerHand,
                        dealerHandSum: players[id].card.dealerHandSum,
                        bet: players[id].card.bet,
                        cash: players[id].card.opponentCash,
                        opponentCash: players[id].card.cash,
                        messageResult: players[id].card.messageResult
                    }
                    if(players[id].card.result === 'win'){
                        dispatch(winGame(cardServer));
                    }else if(players[id].card.result === 'draw'){
                        dispatch(drawGame(cardServer));
                    }else{
                        dispatch(loseGame(cardServer));
                    }
                    updateData(cardServer.cash);                           
                    onDeletDib(); 
                }
                
            } 
        })

        socket.on('after_delet', serverData=>{
            if(Object.keys(serverData).length === 1){
                const opponentData={
                    opponentName: '',
                    opponentCash: '',
                    isDib: true,
                    messageResult:''
                }
                dispatch(opponent(opponentData));                            
            }else{
                for(let id in serverData){
                    if(id !== socket.id){
                        const opponentData={
                            opponentName: '',
                            opponentCash: '',
                            isDib: true,
                            messageResult:''
                        }
                        dispatch(opponent(opponentData));                       
                    }
                }
            }
        })
    }
}

export function pressButton(nameButton){

    return dispatch=>{
        let message = '';
        let disable = {
            isPlay: false,
            isEnough: false,
            isMore: false,
            isDib: true
        };
        dispatch(pressButtonMessage(message, disable));
        switch(nameButton){
            case 'Play':
                message = 'Раздать карты';
                disable = {
                    isPlay: true,
                    isEnough: false,
                    isMore: false
                }
                break;
            case 'Enough':
                message = 'Хватит';
                disable = {
                    isPlay: false,
                    isEnough: true,
                    isMore: false
                }
                break;
            case 'More':
                message = 'Еще карту';
                disable = {
                    isPlay: false,
                    isEnough: false,
                    isMore: true
                }
                break;
            default:
                message = 'Ожидания действия';
                disable = {
                    isPlay: false,
                    isEnough: false,
                    isMore: false
                }
        }
        socket.emit('pressButton', {message, disable});
    }
    
}

export function getProfileData(){
    return async(dispatch, getState)=>{
        const profileState = getState().profile;
        let cash = profileState.cash;
        let nameUser = profileState.name;
        let role = profileState.role;

        const profileData = {
            cash,
            nameUser,
            role
        }
        dispatch(fetchPlaySuccess(profileData))
        socket.emit('new_player', profileData);
        socket.on('response', serverData=>{
            for(let id in serverData){
                if(id !== socket.id){
                    if(role !== serverData[id].role){
                       const opponentData={
                            opponentName: serverData[id].nameUser,
                            opponentCash: serverData[id].cash,
                            isDib: false
                        }
                        dispatch(opponent(opponentData));
                    }
                    
                }
            }
            
        })       
    }
}


export function onPlayHandler (){
    return async (dispatch, getState) => {
        const state = getState().playTable;
        let playerHand = await [getCard(state), getCard(state)];
        let dealerHand = await [getCard(state)];
        let playerHandSum = await getSum(playerHand);
        let dealerHandSum = await getSum(dealerHand); 

        const set_state = {
            playerHand,
            playerHandSum,
            dealerHand,
            dealerHandSum,
            isPlay: false,
            isEnough: false,
            isMore: false
        };
        
        socket.emit('cardPlay', set_state);
        dispatch(handSuccess(set_state));

        if(playerHandSum === 21){ 
            setTimeout(()=>{
                let cash = state.cash-state.bet*3;
                let opponentCash = state.opponentCash+state.bet*3;
                const win_setState = {
                    playerHandSum: 0,
                    dealerHandSum: 0,
                    bet: 0,
                    cash,
                    opponentCash,
                    playerHand:[],
                    dealerHand:[],
                    isEnough: false,
                    isMore: false,
                    isDib: false,
                    result: 'win',
                    messageResult: 'У Вас BlackJack!!!!!!!!!!!!!'
                };
                socket.emit('winGame', win_setState);
                updateData(cash);
                dispatch(winGame(win_setState)); 
                onDeletDib();  
                alert('У игрока BlackJack!!!!!!!!!!!!!'); 
            }, 600);           
            
        }else if(playerHandSum > 21){
            setTimeout(()=>{
                let cash = state.cash+state.bet;
                let opponentCash = state.opponentCash
                alert('Игрок проиграли!!!!!!!');
                onDeletDib();
                const lose_setState = {
                    playerHandSum: 0,
                    bet: 0,
                    dealerHandSum: 0,
                    playerHand:[],
                    dealerHand:[],
                    cash,
                    opponentCash,
                    isEnough: false,
                    isMore: false,
                    isDib: false,
                    result: 'lose',
                    messageResult: 'Вы проиграли!!!!!!!!!!!!!'
                };
                socket.emit('loseGame', lose_setState);
                updateData(cash);
                dispatch(loseGame(lose_setState));  
            }, 600);
            
        }   
    }    
}

export function onEnoughHandler(){
    return async (dispatch, getState) => {
        const state = getState().playTable;
        let dealerHand = state.dealerHand;
        await dealerHand.push(getCard(state));
        let dealerHandSum = await getSum(dealerHand);
        const deal_setState_first = {
            dealerHand,
            dealerHandSum
        }
        socket.emit('cardEnough', deal_setState_first);
        await dispatch(dealHand(deal_setState_first));
        
               
        if(dealerHandSum === 21){
            setTimeout(()=>{
                let cash = state.cash+state.bet*2;
                let opponentCash = state.opponentCash;
                const lose_setState = {
                    playerHandSum: 0,
                    bet: 0,
                    dealerHandSum: 0,
                    playerHand:[],
                    dealerHand:[],
                    cash,
                    opponentCash,
                    isEnough: false,
                    isMore: false,
                    isDib: false,
                    result: 'lose',
                    messageResult: 'У дилера BlackJack! Вы проиграли((('
                }; 
                socket.emit('loseGame', lose_setState);
                dispatch(loseGame(lose_setState));
                onDeletDib(); 
                updateData(cash); 
                alert('У Вас BlackJack! Вы выграли))))'); 
            }, 600); 
        }else if(dealerHandSum > 21 ){
            setTimeout(()=>{
                let cash = state.cash-state.bet;
                let opponentCash = state.opponentCash+state.bet*2;
                const win_setState = {
                    playerHandSum: 0,
                    dealerHandSum: 0,
                    bet: 0,
                    cash,
                    opponentCash,
                    playerHand:[],
                    dealerHand:[],
                    isEnough: false,
                    isMore: false,
                    isDib: false,
                    result: 'win',
                    messageResult: 'Вы выграли)))))))'
                }; 
                dispatch(winGame(win_setState));
                onDeletDib();  
                socket.emit('winGame', win_setState);
                updateData(cash);
                alert('Вы проиграли!!!!!!!!!!!!!'); 
            }, 600);        
        }
    }
}

export function onMoreHandler(){
    return async (dispatch, getState) =>{
        const state = getState().playTable;
        let playerHand = state.playerHand;
        playerHand.push(getCard(state));
        let playerHandSum = await getSum(playerHand);
        const play_setState = {
            playerHand,
            playerHandSum,
            isPlay: false,
            isEnough: false,
            isMore: false
        }
        socket.emit('cardMore', play_setState);
        dispatch(playHand(play_setState));


        if(playerHandSum === 21){ 
            setTimeout(()=>{
                let cash = state.cash-state.bet*2;
                let opponentCash = state.opponentCash+state.bet*3;
                const win_setState = {
                    playerHandSum: 0,
                    dealerHandSum: 0,
                    bet: 0,
                    cash,
                    opponentCash,
                    playerHand:[],
                    dealerHand:[],
                    isEnough: false,
                    isMore: false,
                    isDib: false,
                    result: 'win',
                    messageResult: 'У Вас BlackJack!!!!!!!!!!!!!'
                };
                socket.emit('winGame', win_setState);
                dispatch(winGame(win_setState));
                onDeletDib();  
                updateData(cash);
                alert('У игрока BlackJack!!!!!!!!!!!!!'); 
            }, 600);           
            
        }else if(playerHandSum > 21){
            setTimeout(()=>{
                let cash = state.cash+state.bet;
                let opponentCash = state.opponentCash
                alert('Игрок проиграл!!!!!!!');
                onDeletDib();
                const lose_setState = {
                    playerHandSum: 0,
                    bet: 0,
                    cash,
                    opponentCash,
                    dealerHandSum: 0,
                    playerHand:[],
                    dealerHand:[],
                    isEnough: false,
                    isMore: false,
                    isDib: false,
                    result: 'lose',
                    messageResult: 'Вы проиграли!!!!!!!!!!!!!'
                };
                socket.emit('loseGame', lose_setState);
                updateData(cash);
                dispatch(loseGame(lose_setState));  
            }, 600);
            
        } 
    }
}

export function onСountingHandler(){
    return async (dispatch, getState) => {
        const state = getState().playTable;
        let playerHandSum = state.playerHandSum;
        let dealerHandSum = state.dealerHandSum; 

        if(dealerHandSum > playerHandSum){
            setTimeout(()=>{
                let cash = state.cash+state.bet;
                let opponentCash = state.opponentCash;
                const lose_setState = {
                    playerHandSum: 0,
                    bet: 0,
                    dealerHandSum: 0,
                    playerHand:[],
                    dealerHand:[],
                    cash,
                    opponentCash,
                    isEnough: false,
                    isMore: false,
                    isDib: false,
                    result: 'lose',
                    messageResult: 'Вы проиграли!!!!!!!!!!!!!'
                }; 
                socket.emit('loseGame', lose_setState);
                dispatch(loseGame(lose_setState));
                onDeletDib(); 
                updateData(cash); 
                alert('Вы выграли))))'); 
            }, 600); 
        }else if(dealerHandSum === state.playerHandSum){
            setTimeout(()=>{
                let cash = state.cash;
                let opponentCash = state.opponentCash+state.bet;
                const draw_setState = {
                    playerHandSum: 0,
                    dealerHandSum: 0,
                    bet: 0,
                    cash,
                    opponentCash,
                    playerHand:[],
                    dealerHand:[],
                    isEnough: false,
                    isMore: false,
                    isDib: false,
                    result: 'draw',
                    messageResult: 'Победила дружба!!!!!!!!!!!!!'
                }; 
                socket.emit('winGame', draw_setState);
                dispatch(drawGame(draw_setState));
                onDeletDib(); 
                alert('Победила дружба!!!!!!!!!!!!!'); 
            }, 600); 
        }else{
            setTimeout(()=>{
                let cash = state.cash-state.bet;
                let opponentCash = state.opponentCash+state.bet*2;
                const win_setState = {
                    playerHandSum: 0,
                    dealerHandSum: 0,
                    bet: 0,
                    cash,
                    opponentCash,
                    playerHand:[],
                    dealerHand:[],
                    isEnough: false,
                    isMore: false,
                    isDib: false,
                    result: 'win',
                    messageResult: 'Вы выграли)))!!!!!!!!'
                }; 
                dispatch(winGame(win_setState));
                onDeletDib();  
                socket.emit('winGame', win_setState);
                updateData(cash);
                alert('Вы проиграли!!!!!!!!!!!!!'); 
            }, 600);
        }
    }
}

export function pressButtonMessage(message, disable){
    return{
        type: MESSAGE_BUTTON,
        message, ...disable
    }
}

export function handSuccess(set_state){
    return{
        type: HAND_SUCCESS,
        ...set_state
    }
}


export function dealHand(deal_setState){
    return{
        type: DEAL_HAND,
        ...deal_setState
    }
}

export function playHand(play_setState){
    return{
        type: PLAY_HAND,
        ...play_setState
    }
}

export function winGame(win_setState){
    return{
        type: WIN_GAME,
        ...win_setState
    }
}

export function loseGame(lose_setState){
    return{
        type: LOSE_GAME,
        ...lose_setState
    }
}

export function drawGame(draw_setState){
    return{
        type: DRAW_GAME,
        ...draw_setState
    }
}

export function fetchPlaySuccess(profileData){
    return{
        type: FETCH_SUCCESS,
        ...profileData
    }
}

export function opponent(opponentData){
    return{
        type: OPPONENT_DATA,
        ...opponentData
    }
}

export function makeBet(betMake){
    return {
        type: FETCH_MAKE_BET,
        ...betMake
    }
}

export function makeBetServer(betServer){
    return {
        type: MAKE_BET_SERVER,
        ...betServer
    }
}

export function isLogouting (){
    socket.disconnect();
    return{
        type: AUTH_LOGOUT
    }
}

export function toProfile (){
    socket.emit('backToProfile');
    return{
        type: AUTH_LOGOUT
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getCard(state){
    return state.deck[getRandomInt(0, state.deck.length - 1)];
}

function getSum (hand){
    let sum = 0;

    for( let i=0; i<hand.length; i++){
        let card = hand[i];
        if(card.name !== 'Ace'){
            sum += card.value;
        }
    }

    for(let i=0; i<hand.length; i++){
        let card = hand[i];
        if(card.name === 'Ace'){
            if(sum > 10){
                sum ++;
            }else{
                sum += card.value;
            }
        }
    }

    return sum;
}

function onDeletDib() {
    return document.getElementById('dibsBet').innerHTML='';
}


async function updateData(cash){
    const userUpdate = localStorage.getItem('userToken');
    const dataUpdate ={
        userUpdate, cash
    }
    await axios.put('http://localhost:3001/playUser', dataUpdate);
}

function onCreateDib(value) {
    let div = document.createElement('div');

    switch(value){
        case '1':
            div.className = classes.dib_1 
            break;
        case '5':
            div.className = classes.dib_5
            break;
        case '25':
            div.className = classes.dib_25
            break;
        case '50':
            div.className = classes.dib_50
            break;
        case '100':
            div.className = classes.dib_100
            break;
        default:
            div.className = classes.dib_200
    }   

    div.innerHTML = value;
    
    document.getElementById('dibsBet').appendChild(div);
    
}

