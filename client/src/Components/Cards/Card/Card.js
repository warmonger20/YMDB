import React from 'react';
import classes from './Card.module.css';
const card = props => {
    const faceAndFace1 = [classes.face, classes.face1].join(' ');
    const faceAndFace2 = [classes.face, classes.face2].join(' ');
    return (
    // <div className= {classes.Card}>
    //     Hollywood 
    // </div>
        <div className={classes.container}>
            <div className = {classes.card}>
                <div className = {faceAndFace1}>
                    <div class={classes.content}>
                        <div class={classes.icon}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm_BIyjpEJq2A9a2djdh8zAqEzjCR7fwUiwQ&usqp=CAU" alt="" />
                        </div>
                    </div>
                </div>
                <div class={faceAndFace2}>
                    <div class={classes.content}>
                        <h3>
                            <a href="https://www.linkedin.com/in/adamdipinto/">_adamdipinto</a>
                        </h3>
                        <p>This is where I network and build my professional protfolio.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default card;