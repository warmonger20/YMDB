import React from 'react'
import Card from './Card/Card';
// import {Container} from 'react-bootstrap';
import classes from './Cards.module.css';

const cards = props => {
    return (
        <div className={classes.Container}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            
            <Card />
        </div>
    );
}

export default cards;