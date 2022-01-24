import React from 'react';
import classes from './Input.module.css';

const input = props => {
    let val;
    switch(props.type) {
        case 'text':
            val = (
                <div className={classes.Field}>
                    <label className={classes.Label}>{props.label}</label>
                    <input 
                        className={classes.Input}
                        type = {props.type} 
                        placeholder = {props.placeholder} 
                        required = {props.required} 
                        onChange={props.changed}
                        name={props.name} />
                </div>
            );
            break;
        case 'submit':
            val = (
                <div className={classes.Field}>
                    <button className={classes.Input}>Submit</button>
                </div>
            );
            break;
        default: val = <div></div>;
    }
    return val;
}

export default input;