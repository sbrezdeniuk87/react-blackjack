import React from 'react'
import classes from './PlayButton.css'

const PlayButton = props =>(
    <div className={classes.PlayButton}> 
          <button className={classes.btn}
            disabled={props.disabledPlay}
            onClick={()=> props.onPlay('Play')}
          >Play</button>
          <button className={classes.btn}
            disabled={props.disabledEnough}
            onClick={()=>props.onEnough('Enough')}
          >Enough</button>
          <button className={classes.btn}
            disabled={props.disabledMore}
            onClick={()=>props.onMore('More')}
          >More</button>   
          {
            props.role === false ? null 
              :  <button className={classes.btn}
                  disabled={props.disabledEnough}
                  onClick={()=>props.onСounting()}
                >Сounting</button> 
          }       
    </div>
)

export default PlayButton