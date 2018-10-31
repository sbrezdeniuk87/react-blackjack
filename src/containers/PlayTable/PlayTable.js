import React, {Component} from 'react'
import classes from './PlayTable.css'
import Dibs from '../../components/Dibs/DIbs'
import Rate from '../../components/Rate/Rate'
import PlayButton from '../../components/UI/PlayButton/PlayButton'
import DealerHand from '../../components/DealerHand/DealerHand'
import PlayerHand from '../../components/PlayerHand/PlayerHand'

class PlayTable extends Component {
    state = {
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
        cash: 1500,
        isPlay: false,
        isEnough: false,
        isMore: false
    }
    
    onCreateDibHandler = value =>{
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
        let bet = parseInt(this.state.bet) + parseInt(value);
        let cash = parseInt(this.state.cash) - parseInt(value);
        if(bet !== 0 && cash >= 0){
            let isPlay = true;
            this.setState({
                bet, cash, isPlay
            });
            document.getElementById('root').appendChild(div);
        }
        
                
    }

    onPlayHandler = ()=>{
        console.log('Play GAME');
        this.setState({
            isPlay: false,
            isEnough: true,
            isMore: true
        });
    }

    render(){
        return(
            <div className={classes.PlayTable}>
                <Rate 
                    bet={this.state.bet}
                    cash={this.state.cash}
                />
                <DealerHand />
                <PlayerHand />
                <Dibs 
                    dibs={this.state.dibs}
                    onDibCLick={this.onCreateDibHandler}
                />
                <PlayButton 
                    onPlay={this.onPlayHandler}
                    disabledPlay={!this.state.isPlay}
                    disabledEnough={!this.state.isEnough}
                    disabledMore={!this.state.isMore}
                />                
            </div>
        )
    }
}

export default PlayTable