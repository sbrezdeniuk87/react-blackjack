import React from 'react'
import classes from './PlayerHand.css'
import Card from '../Card/Card'

const PlayerHand = props =>{
    return(
        <div className={props.role === true ? classes.PlayerHandTrue : classes.PlayerHand}>
            {
                props.name === '' ? null : <b>{props.name}</b> 
            }
            {
                props.playerHandSum === 0 ? null : <p>{props.playerHandSum}</p>
            }
            
            {
                props.playerHand.map((card, index)=>{
                    return(
                        <Card 
                            key={index}
                            card={card}
                        />
                    )
                })
            }
        </div>
    )
}

export default PlayerHand