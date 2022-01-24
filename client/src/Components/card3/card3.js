import React from 'react';
import { genre } from '../../constant';
import './card3.css';


function card3(props) {
    console.log(props.genre);
    const genre = props.genre.join(', ');
    let desc = props.description
    if(desc.length>200)
    {
        desc = props.description.substr(0,200) + '...';
    }
    return (
        <div className="movie-card">
            <img className="movie-card__cover" src={props.img}/>
            <div className="card_content">
                <p className="lead movie_name">{props.title}</p>
                <p className="movie_genre">{genre}</p>
                <p className="movie_des">{desc}</p>
            </div>  
        </div>
    )
}

export default card3


