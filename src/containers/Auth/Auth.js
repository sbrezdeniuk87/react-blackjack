import React, {Component} from 'react'
import classes from './Auth.css'
import imgLogo from '../../images/logo.jpg'

class Auth extends Component{
	render(){
		return(
			<div className={classes.Auth} >
				<img src={imgLogo} alt="BlackJack" />
			</div>
		)
	}
}

export default Auth