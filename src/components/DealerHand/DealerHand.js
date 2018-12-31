import React from 'react'
import classes from './DealerHand.css'
import Card from '../Card/Card'

const DealerHand = props =>(
    <div className={props.role === true ? classes.DealerHandTrue : classes.DealerHand}>
        {
            props.name === '' ? null : <b>{props.name}</b> 
        }
        {
            props.dealerHandSum === 0 ? null : <p>{props.dealerHandSum}</p>            
        }
        
        {
            props.dealerHand.map((card, index)=>{
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

export default DealerHand