import React, {Component} from 'react'
import classes from './Profile.css'
// import {NavLink} from 'react-router-dom'
import Button from '../../components/UI/Button/Button'

class Profile extends Component{
    render(){
        return(
            <div className={classes.Profile}>
                <div>
                    <h1>Саша</h1>
                    <hr />
                    <p>
                        <b>Почта: </b><em>sbrezdeniu@gmail.com</em><br />
                        <b>Счет: </b><em>1500</em><br />
                    </p>
                    <hr />
                    <div className={classes.Buttons}>
                        <Button 
                            type="success" 
                        >Играть</Button>
                        <Button 
                            type="primary" 
                        >Пополнить счет</Button>
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