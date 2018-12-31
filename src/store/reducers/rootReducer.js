import { combineReducers } from 'redux'
import playReducer from './playTable'
import profileReducer from './profile'

export default combineReducers({
    playTable: playReducer,
    profile: profileReducer,
    list: {playReducer,profileReducer}
})