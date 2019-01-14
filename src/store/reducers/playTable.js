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
        AUTH_LOGOUT} from '../actions/actionType'

 
const initialState = {
    deck: [
        {
            name: 'Ace',
            suit: 'Hearts',
            value: 11
        },
        {
            name: 'Two',
            suit: 'Hearts',
            value: 2
        },
        {
            name: 'Three',
            suit: 'Hearts',
            value: 3
        },
        {
            name: 'Four',
            suit: 'Hearts',
            value: 4
        },
        {
            name: 'Five',
            suit: 'Hearts',
            value: 5
        },
        {
            name: 'Six',
            suit: 'Hearts',
            value: 6
        },
        {
            name: 'Seven',
            suit: 'Hearts',
            value: 7
        },
        {
            name: 'Eight',
            suit: 'Hearts',
            value: 8
        },
        {
            name: 'Nine',
            suit: 'Hearts',
            value: 9
        },
        {
            name: 'Ten',
            suit: 'Hearts',
            value: 10
        },
        {
            name: 'Jack',
            suit: 'Hearts',
            value: 10
        },
        {
            name: 'Queen',
            suit: 'Hearts',
            value: 10
        },
        {
            name: 'King',
            suit: 'Hearts',
            value: 10
        },
        {
            name: 'Ace',
            suit: 'Diamonds',
            value: 11
        },
        {
            name: 'Two',
            suit: 'Diamonds',
            value: 2
        },
        {
            name: 'Three',
            suit: 'Diamonds',
            value: 3
        },
        {
            name: 'Four',
            suit: 'Diamonds',
            value: 4
        },
        {
            name: 'Five',
            suit: 'Diamonds',
            value: 5
        },
        {
            name: 'Six',
            suit: 'Diamonds',
            value: 6
        },
        {
            name: 'Seven',
            suit: 'Diamonds',
            value: 7
        },
        {
            name: 'Eight',
            suit: 'Diamonds',
            value: 8
        },
        {
            name: 'Nine',
            suit: 'Diamonds',
            value: 9
        },
        {
            name: 'Ten',
            suit: 'Diamonds',
            value: 10
        },
        {
            name: 'Jack',
            suit: 'Diamonds',
            value: 10
        },
        {
            name: 'Queen',
            suit: 'Diamonds',
            value: 10
        },
        {
            name: 'King',
            suit: 'Diamonds',
            value: 10
        },
        {
            name: 'Ace',
            suit: 'Clubs',
            value: 11
        },
        {
            name: 'Two',
            suit: 'Clubs',
            value: 2
        },
        {
            name: 'Three',
            suit: 'Clubs',
            value: 3
        },
        {
            name: 'Four',
            suit: 'Clubs',
            value: 4
        },
        {
            name: 'Five',
            suit: 'Clubs',
            value: 5
        },
        {
            name: 'Six',
            suit: 'Clubs',
            value: 6
        },
        {
            name: 'Seven',
            suit: 'Clubs',
            value: 7
        },
        {
            name: 'Eight',
            suit: 'Clubs',
            value: 8
        },
        {
            name: 'Nine',
            suit: 'Clubs',
            value: 9
        },
        {
            name: 'Ten',
            suit: 'Clubs',
            value: 10
        },
        {
            name: 'Jack',
            suit: 'Clubs',
            value: 10
        },
        {
            name: 'Queen',
            suit: 'Clubs',
            value: 10
        },
        {
            name: 'King',
            suit: 'Clubs',
            value: 10
        },
        {
            name: 'Ace',
            suit: 'Spades',
            value: 11
        },
        {
            name: 'Two',
            suit: 'Spades',
            value: 2
        },
        {
            name: 'Three',
            suit: 'Spades',
            value: 3
        },
        {
            name: 'Four',
            suit: 'Spades',
            value: 4
        },
        {
            name: 'Five',
            suit: 'Spades',
            value: 5
        },
        {
            name: 'Six',
            suit: 'Spades',
            value: 6
        },
        {
            name: 'Seven',
            suit: 'Spades',
            value: 7
        },
        {
            name: 'Eight',
            suit: 'Spades',
            value: 8
        },
        {
            name: 'Nine',
            suit: 'Spades',
            value: 9
        },
        {
            name: 'Ten',
            suit: 'Spades',
            value: 10
        },
        {
            name: 'Jack',
            suit: 'Spades',
            value: 10
        },
        {
            name: 'Queen',
            suit: 'Spades',
            value: 10
        },
        {
            name: 'King',
            suit: 'Spades',
            value: 10
        }
    ],
    dibs:[
        {
            id: 1,
            value: '1',
            classView: 'blue'
        },
        {
            id: 2,
            value: '5',
            classView: 'blue'
        },
        {
            id: 3,
            value: '25',
            classView: 'yellow'
        },
        {
            id: 4,
            value: '50',
            classView: 'yellow'
        },
        {
            id: 5,
            value: '100',
            classView: 'red'
        },
        {
            id: 6,
            value: '200',
            classView: 'red'
        }
    ],
    bet: 0,
    cash: 0,
    nameUser: '',
    role: null,
    opponentName: '',
    opponentCash: 0,
    playerHand: [],
    playerHandSum: 0,
    dealerHand: [],
    dealerHandSum: 0,
    isPlay: false,
    isEnough: false,
    isMore: false,
    backProfile: false,
    isExit: false,
    isDib: true,
    message: '',
    messageResult: ''
}

export default function playReducer(state = initialState, action){
    switch(action.type){
        case FETCH_SUCCESS:
            return{
                ...state,
                cash: action.cash,
                nameUser: action.nameUser,
                role: action.role
            }        
        case FETCH_MAKE_BET:
            return{
                ...state, 
                bet: action.bet, 
                cash: action.cash,
                isPlay: action.isPlay,
                messageResult:''
            }
        case MAKE_BET_SERVER:
            return{
                ...state, 
                bet: action.bet, 
                opponentCash: action.opponentCash,
                isPlay: action.isPlay
            }
        case OPPONENT_DATA:
            return{
                ...state, 
                opponentName: action.opponentName,
                opponentCash: action.opponentCash,
                isDib: action.isDib
            }
        case MESSAGE_BUTTON:
            return{
                ...state, 
                message: action.message,
                isPlay: action.isPlay,
                isEnough: action.isEnough,
                isMore: action.isMore,
                isDib: action.isDib
            }
        case HAND_SUCCESS:
            return{
                ...state,
                playerHand: action.playerHand,
                playerHandSum: action.playerHandSum,
                dealerHand: action.dealerHand,
                dealerHandSum: action.dealerHandSum,
                isPlay: action.isPlay,
                isEnough: action.isEnough,
                isMore: action.isMore,
                message: ''
            }
        case WIN_GAME:
            return{
                ...state,
                playerHandSum: action.playerHandSum,
                dealerHandSum: action.dealerHandSum,
                bet: action.bet,
                cash: action.cash,
                opponentCash: action.opponentCash,
                playerHand: action.playerHand,
                dealerHand: action.dealerHand,
                messageResult: action.messageResult,
                isEnough: false,
                isMore: false,
                isDib: false
            }
        case LOSE_GAME:
            return{
                ...state,
                playerHandSum: action.playerHandSum,
                bet: action.bet,
                cash: action.cash,
                opponentCash: action.opponentCash,
                dealerHandSum: action.dealerHandSum,
                playerHand: action.playerHand,
                dealerHand: action.dealerHand,
                messageResult: action.messageResult,
                isEnough: false,
                isMore: false,
                isDib: false
            }
        case DRAW_GAME:
            return{
                ...state,
                playerHandSum: action.playerHandSum,
                dealerHandSum: action.dealerHandSum,
                bet: action.bet,
                cash: action.cash,
                opponentCash: action.opponentCash,
                playerHand: action.playerHand,
                dealerHand: action.dealerHand,
                messageResult: action.messageResult,
                isEnough: false,
                isMore: false,
                isDib: false
            }
        case DEAL_HAND:
            return{
                ...state,
                dealerHand: action.dealerHand,
                dealerHandSum: action.dealerHandSum,
                message: ''
            }
        case PLAY_HAND:
            return{
                ...state,
                playerHand: action.playerHand,
                playerHandSum: action.playerHandSum,
                isPlay: action.isPlay,
                isEnough: action.isEnough,
                isMore: action.isMore,
                message: ''
            }
        case AUTH_LOGOUT:
            return{
                ...state,
                bet: 0,
                cash: 0,
                nameUser: '',
                role: null,
                opponentName: '',
                opponentCash: 0,
                playerHand: [],
                playerHandSum: 0,
                dealerHand: [],
                dealerHandSum: 0,
                isPlay: false,
                isEnough: false,
                isMore: false,
                backProfile: false,
                isExit: false,
                isDib: true,
                message: '',
                messageResult: ''
            }
        default:
            return state
    }
}