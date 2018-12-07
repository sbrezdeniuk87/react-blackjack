import React from 'react'
import classes from './OpponetFirstHand.css'
import Card from '../Card/Card'

const OpponetFirstHand = props =>{
    return(
        <div className={classes.OpponetFirstHand}>
            {
                props.OpponetFirstHandSum === 0 ? null : <p>{props.OpponetFirstHandSum}</p>
            }
            
            {
                props.OpponetFirstHand.map((card, index)=>{
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

export default OpponetFirstHand