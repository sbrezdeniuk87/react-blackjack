import React, {Component} from 'react'
import {connect} from 'react-redux'
import classes from './PlayTable.css'
import Dibs from '../../components/Dibs/DIbs'
import Rate from '../../components/Rate/Rate'
import RateDiler from '../../components/RateDiler/RateDiler'
import PlayButton from '../../components/UI/PlayButton/PlayButton'
import Button from '../../components/UI/Button/Button'
import DealerHand from '../../components/DealerHand/DealerHand'
import PlayerHand from '../../components/PlayerHand/PlayerHand'
import {NavLink, Redirect} from 'react-router-dom'
import {fetchMakeBet, 
        onPlayHandler,
        onEnoughHandler,
        onMoreHandler,
        getProfileData,
        serverData,
        pressButton,
        onСountingHandler,
        isLogouting,
        toProfile} from '../../store/actions/playTable';


class PlayTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogout: false,
            count: false
        };
    }
    
   onCreateDibHandler = (isDib, value) =>{
       if(isDib){
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
        let cash 
        if(this.props.role !== true){
             cash = parseInt(this.props.cash) - parseInt(value);
        }       
       
        if(bet !== 0 && cash >= 0 && this.props.playerHandSum === 0){
            let isPlay = true;
            this.props.fetchMakeBet(bet, cash, isPlay);
            document.getElementById('dibsBet').appendChild(div);
        }
        
                
       }
        
    }

    
    isLogout = () => {
        localStorage.removeItem('userToken');
        this.props.isLogouting();
        this.setState({
            isLogout: true
        });
    }

    backToProfile = () => {
        this.props.toProfile();        
    }

    componentWillMount(){
        const userToken = localStorage.getItem('userToken');
        
        if(userToken === null){
            this.setState({
                isLogout: true
            });
        }else{ 
            this.props.getProfileData(); 
            console.log('COUNT', this.props.countPlayers)                    
            // this.props.serverData(); 
        }
    }

    componentDidMount(){
        if(this.props.nameProfile === ''){
            localStorage.removeItem('userToken');
            this.setState({
                isLogout: true 
            });
        }else{
            this.props.serverData();
            
        } 

    }



    render(){ 
        if(this.state.isLogout){
            return (<Redirect to='/' />)
        }else if(this.props.role){
            return(                
                <div className={classes.PlayTable}> 
                    {
                        this.props.message === '' ? null 
                            : alert(this.props.message)
                    }    
                                 
                    <Rate 
                        cash={this.props.opponentCash}
                        name={this.props.opponentName}
                        bet={this.props.bet}
                    />
                    <RateDiler 
                        bet={this.props.bet}
                        cash={this.props.cash}
                        name={this.props.nameUser}
                    />
                    <DealerHand 
                        dealerHand={this.props.dealerHand}
                        dealerHandSum={this.props.dealerHandSum}
                        role={this.props.role}
                    />
                    <div id="dibsBet"></div>
                    <PlayerHand 
                        playerHand={this.props.playerHand}
                        playerHandSum={this.props.playerHandSum}
                        role={this.props.role}
                    />
                    
                    <PlayButton 
                        onPlay={this.props.onPlayHandler}
                        onEnough={this.props.onEnoughHandler}
                        onMore={this.props.onMoreHandler}
                        onСounting={this.props.onСountingHandler}
                        disabledPlay={!this.props.isPlay}
                        disabledEnough={!this.props.isEnough}
                        disabledMore={!this.props.isMore}
                        role={this.props.role}
                    /> 
                    <div className={classes.Button}>
                    <NavLink to='/profile'>
                        <Button type="success"  onClick={this.backToProfile}>Профиль</Button>   
                    </NavLink>                            
                        <Button 
                            type="error" 
                            onClick={this.isLogout}                       
                        >Выход</Button>
                    </div>                   
                </div>
            )
        }else{
            return(
                <div className={classes.PlayTable}>
                    {
                        this.props.messageResult === '' || this.props.messageResult === undefined ? null 
                            : alert(this.props.messageResult)
                    }  
                    <RateDiler 
                        cash={this.props.opponentCash}
                        name={this.props.opponentName}
                        bet={this.props.bet}
                    />
                    <Rate 
                        bet={this.props.bet}
                        cash={this.props.cash}
                        name={this.props.nameUser}
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
                        disabledDib={!this.props.isDib}
                    />
                    <PlayButton 
                        onPlay={this.props.pressButton}
                        onEnough={this.props.pressButton}
                        onMore={this.props.pressButton}
                        disabledPlay={!this.props.isPlay}
                        disabledEnough={!this.props.isEnough}
                        disabledMore={!this.props.isMore}
                        role={this.props.role}
                        onСounting={this.props.onСountingHandler}
                    /> 
                    <div className={classes.Button}>
                    <NavLink to='/profile'>
                        <Button type="success" onClick={this.backToProfile}>Профиль</Button>   
                    </NavLink>                            
                        <Button 
                            type="error" 
                            onClick={this.isLogout}                       
                        >Выход</Button>
                    </div>                   
                </div>
            )
        }
        
    }
}

function mapStateToProps(state){
    console.log(state);
    return{
        deck: state.playTable.deck,
        dibs:state.playTable.dibs,
        bet: state.playTable.bet,
        cash: state.playTable.cash,
        nameUser: state.playTable.nameUser,
        opponentName: state.playTable.opponentName,
        opponentCash: state.playTable.opponentCash,
        playerHand: state.playTable.playerHand,
        playerHandSum: state.playTable.playerHandSum,
        dealerHand: state.playTable.dealerHand,
        dealerHandSum: state.playTable.dealerHandSum,
        isPlay: state.playTable.isPlay,
        isEnough: state.playTable.isEnough,
        isMore: state.playTable.isMore,
        backProfile: state.playTable.backProfile,
        isExit: state.playTable.isExit,
        isDib: state.playTable.isDib,
        isLogouting: state.playTable.isLogouting,
        role: state.playTable.role,
        message: state.playTable.message,
        messageResult: state.playTable.messageResult,
        countPlayers: state.playTable.countPlayers,
        nameProfile: state.profile.name,
        roleProfile: state.profile.role,
        cashProfile: state.profile.cash

    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchMakeBet: (bet, cash, isPlay)=> dispatch(fetchMakeBet(bet, cash, isPlay)),
        pressButton: (nameButton)=> dispatch(pressButton(nameButton)),
        serverData: ()=>dispatch(serverData()),
        getProfileData: () => dispatch(getProfileData()),
        onPlayHandler: () => dispatch(onPlayHandler()),
        onEnoughHandler: () => dispatch(onEnoughHandler()),
        onMoreHandler: () => dispatch(onMoreHandler()),
        onСountingHandler: () => dispatch(onСountingHandler()),
        isLogouting: () => dispatch(isLogouting()),
        toProfile: () => dispatch(toProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayTable)