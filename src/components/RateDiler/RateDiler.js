import React from 'react'
import classes from './RateDiler.css'

const RateDiler = props => (
    <div className={classes.RateDiler}>
        <p>Привет дилер, <br/><strong id="diler">{props.name}</strong></p>
        <div className={classes.bet}>
          <label>Банк:</label>
          <p>{props.cash}</p>
        </div>
        <div className={classes.cash}>
          <label>Ставка:</label>
          <p>{props.bet}</p>
        </div>        
    </div>
)

export default RateDiler