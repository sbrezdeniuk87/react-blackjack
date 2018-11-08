import React, {Component} from 'react'
import {connect} from 'react-redux'
import classes from './PlayTable.css'
import Dibs from '../../components/Dibs/DIbs'
import Rate from '../../components/Rate/Rate'
import PlayButton from '../../components/UI/PlayButton/PlayButton'
import DealerHand from '../../components/DealerHand/DealerHand'
import PlayerHand from '../../components/PlayerHand/PlayerHand'
import {fetchMakeBet, 
        onPlayHandler,
        onEnoughHandler,
        onMoreHandler} from '../../store/actions/playTable'

class PlayTable extends Component {
    
    
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
        let bet = parseInt(this.props.bet) + parseInt(value);
        let cash = parseInt(this.props.cash) - parseInt(value);
        if(bet !== 0 && cash >= 0 && this.props.playerHandSum === 0){
            let isPlay = true;
            this.props.fetchMakeBet(bet, cash, isPlay);
            document.getElementById('dibsBet').appendChild(div);
        }
        
                
    }

    
    render(){
        return(
            <div className={classes.PlayTable}>
                <Rate 
                    bet={this.props.bet}
                    cash={this.props.cash}
                />
                <DealerHand 
                    dealerHand={this.props.dealerHand}
                    dealerHandSum={this.props.dealerHandSum}
                />
                <div id="dibsBet"></div>
                <PlayerHand 
                    playerHand={this.props.playerHand}
                    playerHandSum={this.props.playerHandSum}
                />
                <Dibs 
                    dibs={this.props.dibs}
                    onDibCLick={this.onCreateDibHandler}
                />
                <PlayButton 
                    onPlay={this.props.onPlayHandler}
                    onEnough={this.props.onEnoughHandler}
                    onMore={this.props.onMoreHandler}
                    disabledPlay={!this.props.isPlay}
                    disabledEnough={!this.props.isEnough}
                    disabledMore={!this.props.isMore}
                />                
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        deck: state.playTable.deck,
        dibs:state.playTable.dibs,
        bet: state.playTable.bet,
        cash: state.playTable.cash,
        playerHand: state.playTable.playerHand,
        playerHandSum: state.playTable.playerHandSum,
        dealerHand: state.playTable.dealerHand,
        dealerHandSum: state.playTable.dealerHandSum,
        isPlay: state.playTable.isPlay,
        isEnough: state.playTable.isEnough,
        isMore: state.playTable.isMore
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchMakeBet: (bet, cash, isPlay)=> dispatch(fetchMakeBet(bet, cash, isPlay)),
        onPlayHandler: () => dispatch(onPlayHandler()),
        onEnoughHandler: () => dispatch(onEnoughHandler()),
        onMoreHandler: () => dispatch(onMoreHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayTable)