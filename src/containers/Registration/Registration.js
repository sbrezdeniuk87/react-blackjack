import React, {Component} from 'react'
import classes from './Registration.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {NavLink} from 'react-router-dom'
import is from 'is_js'

class Registration extends Component{

    state = {
		isFormValid: false,
		formControls:{
            name:{
				value: '',
				type: 'text',
				label: 'Имя',
				errorMessage: 'Введите корректный имя',
				valid: false,
				touched: false,
				validation:{
					required: true,
					minLength: 3
				}
			},
			email:{
				value: '',
				type: 'email',
				label: 'Email',
				errorMessage: 'Введите корректный email',
				valid: false,
				touched: false,
				validation:{
					required: true,
					email: true
				}
			},
			password: {
				value: '',
				type: 'password',
				label: 'Пароль',
				errorMessage: 'Введите корректный пароль',
				valid: false,
				touched: false,
				validation:{
					required: true,
					minLength: 6
				}
            },
            passwordRepeat: {
				value: '',
				type: 'password',
				label: 'Повторить пароль',
				errorMessage: 'Пароль не совпадает',
				valid: false,
				touched: false,
				validation:{
					required: true,
					minLength: 6
				}
			}
		}
	}
	validateControl(value, validation, controlName){
		if(!validation){
			return true
		}
		
		let isValid = true;

		if(validation.required){
			isValid = value.trim() !== '' && isValid
		}

		if(validation.email){
			isValid = is.email(value) && isValid
		}

		if(validation.minLength){
			isValid = value.length >= validation.minLength && isValid 
		}

		if(controlName === 'passwordRepeat'){
			let password = this.state.formControls.password.value
			isValid = value === password && isValid
		}

		return isValid
	}


	onChangeHandler = (event, controlName)=>{
		const formControls = {...this.state.formControls}
		const control = {...formControls[controlName]}

		control.value = event.target.value
		control.touched = true
		control.valid = this.validateControl(control.value, control.validation, controlName)

		formControls[controlName] = control

		let isFormValid = true;

		Object.keys(formControls).forEach(name=>{
			isFormValid = formControls[name].valid && isFormValid
		})

		this.setState({
			formControls, isFormValid
		})
	}

    renderInputs(){
		return Object.keys(this.state.formControls).map((controlName, index)=>{
			const control = this.state.formControls[controlName]
			return(
				<Input 
					key={controlName+index}
					type={control.type}
					value={control.value}
					valid={control.valid}
					touched={control.touched}
					label={control.label}
					shouldValidate={!!control.validation}
					errorMessage={control.errorMessage}
					onChange={event=>this.onChangeHandler(event, controlName)}
				/>
			)
		})
	}

    render(){
		return(
			<div className={classes.Registration} >
				<div>
					<form onSubmit={this.submitHandler} className={classes.RegistrationForm}>
						{this.renderInputs()}
						<hr />
						<NavLink to='/'>
							<Button 
								type="success" 							
							>Назад</Button>
						</NavLink>
						<Button 
							type="primary" 
							onClick={this.registerHandler}
							disabled={!this.state.isFormValid}
						>Зарегистрироваться</Button>
					</form>
				</div>
			</div>
		)
	}
}

export default Registration