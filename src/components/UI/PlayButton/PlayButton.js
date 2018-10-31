import React from 'react'
import classes from './PlayButton.css'

const PlayButton = props =>(
    <div className={classes.PlayButton}> 
          <button className={classes.btn}
            disabled={props.disabledPlay}
            onClick={()=> props.onPlay()}
          >Play</button>
          <button className={classes.btn}
            disabled={props.disabledEnough}
          >Enough</button>
          <button className={classes.btn}
            disabled={props.disabledMore}
          >More</button>          
    </div>
)

export default PlayButton