import React, {Component} from 'react'
import {connect} from 'react-redux'
import classes from './Profile.css'
import {NavLink, Redirect} from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
// import axios from 'axios';
import {getDataUser, chooseRoleHandler} from '../../store/actions/profile';

// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:3001');





class Profile extends Component{
    state = {
        isLogout: false
    }

    

    isLogout = () => {
        localStorage.removeItem('userToken');
        this.setState({
            isLogout: true
        });
        // socket.disconnect();
    }

    componentDidMount(){        
        const userToken = localStorage.getItem('userToken');       
		 
        if(userToken === null){
            this.setState({
                isLogout: true
            });
        }else{      
            this.props.getDataUser(userToken);           
        }   
    }

   
    render(){
        if(this.state.isLogout){
            return (<Redirect to='/' />)
        }else{
            return(
                <div className={classes.Profile}>
                    <div>
                        <h1>{this.props.name}</h1>
                        <hr />
                        <p>
                            <b>Почта: </b><em>{this.props.email}</em><br />
                            <b>Счет: </b><em>{this.props.cash}</em><br />
                        </p>
                        <hr />
                        <div className={classes.Buttons}>
                            <NavLink to="/play">
                                <Button 
                                    type="success" 
                                    onClick={this.props.chooseRoleHandler}
                                >Играть</Button>
                            </NavLink>                        
                            <Button 
                                type="error"
                                onClick={this.isLogout} 
                            >Выход</Button>
                        </div>                    
                    </div>               
                </div>
            )   
        }
             
    }
}

function mapStateToProps(state){
    console.log('state', state);
    return{
        cash: state.profile.cash,
        name: state.profile.name,
        email: state.profile.email
    }
}

function mapDispatchToProps(dispatch){
    return{
        getDataUser: userToken => dispatch(getDataUser(userToken)),
        chooseRoleHandler: ()=>dispatch(chooseRoleHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)