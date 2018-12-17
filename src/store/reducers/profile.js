import {FETCH_SUCCESS, DATA_USER,SET_ROLE} from '../actions/actionType'

const initialState = {
    cash: '',
    name: '',
    email: '',
    role: null
}

export default function profileReducer(state = initialState, action){
    switch(action.type){
        case FETCH_SUCCESS:
            return{
                ...state
            }
        case DATA_USER:
            return{
                ...state,
                cash: action.cash,
                name: action.name,
                email: action.email
            }
        case SET_ROLE:
            return{
                ...state,
                role: action.chooseRole
            }
        default:
            return state
    }
}