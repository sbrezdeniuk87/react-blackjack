import {FETCH_SUCCESS, DATA_USER, SET_ROLE} from './actionType'
import axios from 'axios'


export function fetchPlaySuccess(){
    return{
        type: FETCH_SUCCESS
    }
}

export function dataUser(setStateUser){
    return{
        type: DATA_USER,
        ...setStateUser
    }
}

export function setRole(chooseRole){
    return{
        type: SET_ROLE,
        chooseRole
    }
}

export function getDataUser(userToken){
    return async dispatch =>{
        const data = {
            userToken: userToken  
        }
        const respons = await axios.post('http://localhost:3001/profile', data);
        console.log(respons.data)
        if(respons.data){
            const setStateUser = {
                cash: respons.data.bet,
                name: respons.data.name,
                email: respons.data.email
            }
            dispatch(dataUser(setStateUser));
        }
    }
       
}

export function chooseRoleHandler(){
    return dispatch =>{
        let result = window.confirm('Привет ! Вы хотите быть Дилером?');
        if(result){
            const chooseRole = true;
            dispatch(setRole(chooseRole));
        }else{
            const chooseRole = false;
            dispatch(setRole(chooseRole));
        }
    }
}


