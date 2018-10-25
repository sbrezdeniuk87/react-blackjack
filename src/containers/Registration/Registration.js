import React, {Component} from 'react'
import classes from './Registration.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
// import is from 'is_js'

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
				errorMessage: 'Введите корректный пароль',
				valid: false,
				touched: false,
				validation:{
					required: true,
					minLength: 6
				}
			}
		}
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