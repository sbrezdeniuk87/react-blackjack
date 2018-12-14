import React, {Component} from 'react'
import classes from './Profile.css'
import {NavLink, Redirect} from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import axios from 'axios';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');





class Profile extends Component{
    state = {
        isLogout: false,
        role: undefined,
        bet: '',
        name: '',
        email: ''
    }

    

    isLogout = () => {
        localStorage.removeItem('userToken');
        this.setState({
            isLogout: true
        });
        socket.disconnect();
    }

    chooseRole = () =>{
        let result;

        result = window.confirm('Привет '+ this.state.name +'! Вы хотите быть Дилером?');
        
               
        socket.emit('choose_role', result);
        
    }

    componentDidMount(){        
        const usertToken = localStorage.getItem('userToken');       
		 
        if(usertToken === null){
            this.setState({
                isLogout: true
            });
        }else{
            socket.on("create-player", serverData=>{
                console.log('New player '+serverData);
            });
            console.log(socket.on("create-player", serverData=>{
                return serverData;
            }));
            this.getDataUser(usertToken);            
        }   
    }

    getDataUser = async (userToken)=>{
        const data = {
            userToken: userToken  
        }
        const respons = await axios.post('http://localhost:3001/profile', data);        
                
        if(respons.data){
            socket.emit("new_player", respons.data);
            this.setState({
                bet: respons.data.bet,
                name: respons.data.name,
                email: respons.data.email
            })
        }
    }


    render(){
        if(this.state.isLogout){
            return (<Redirect to='/' />)
        }else{
            return(
                <div className={classes.Profile}>
                    <div>
                        <h1>{this.state.name}</h1>
                        <hr />
                        <p>
                            <b>Почта: </b><em>{this.state.email}</em><br />
                            <b>Счет: </b><em>{this.state.bet}</em><br />
                        </p>
                        <hr />
                        <div className={classes.Buttons}>
                            <NavLink to="/play">
                                <Button 
                                    type="success" 
                                    onClick={this.chooseRole}
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

export default Profile