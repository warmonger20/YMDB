import React from 'react';
import './cards2.css'

function cards2(props) {
    return (
        <div className="b-game-card" onClick={props.onClick}>
            <img className="b-game-card__cover" src={props.img}/>
        </div>
    )
}

export default cards2
