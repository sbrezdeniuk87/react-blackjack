import React from 'react'
import classes from './OpponentSecondHand.css'
import Card from '../Card/Card'

const OpponentSecondHand = props =>{
    return(
        <div className={classes.OpponentSecondHand}>
            {
                props.OpponentSecondHandSum === 0 ? null : <p>{props.OpponentSecondHandSum}</p>
            }
            
            {
                props.OpponentSecondHand.map((card, index)=>{
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

export default OpponentSecondHand