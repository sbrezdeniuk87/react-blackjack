import React, {Component} from 'react'
import classes from './Profile.css'
import {NavLink} from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import axios from 'axios';

class Profile extends Component{
    state = {
        bet: '',
        name: '',
        email: ''
    }

    componentDidMount(){
        const userId = localStorage.getItem('userId');
        console.log(userId);
        this.getDataUser(userId);

    }

    getDataUser = async (userId)=>{
        const data = {
            userId: userId  
        }
        const respons = await axios.post('http://localhost:3001/profile', data);
        if(respons.data){
            console.log(respons.data)
            this.setState({
                bet: respons.data.bet,
                name: respons.data.name,
                email: respons.data.email
            })
        }
    }


    render(){
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
                            >Играть</Button>
                        </NavLink>                        
                        {/* <Button 
                            type="primary" 
                        >Пополнить счет</Button> */}
                        <Button 
                            type="error" 
                        >Выход</Button>
                    </div>                    
                </div>               
            </div>
        )        
    }
}

export default Profile