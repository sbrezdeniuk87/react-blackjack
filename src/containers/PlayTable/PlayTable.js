import React, {Component} from 'react'
import classes from './PlayTable.css'

class PlayTable extends Component {
    render(){
        return(
            <div className={classes.PlayTable}>
                <div className={classes.fishka}>
                    <ul>
                        <li className={classes.blue} >1</li>
                        <li className={classes.blue} >5</li>
                        <li className={classes.yellow}>25</li>
                        <li className={classes.yellow}>50</li>
                        <li className={classes.red}>100</li>
                        <li className={classes.red}>200</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default PlayTable