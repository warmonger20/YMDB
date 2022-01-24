import React, { Component } from 'react'
import axios from 'axios';
import Card from '../card3/card3';
import Navbar from '../Navbar/Navbar'

export class homePage extends Component {
    state ={
        movieData: [], 
    }
    componentDidMount(){
        axios.get('http://localhost:5000/', {
            "headers": {
                "Accept" : "application/json",
                "content-type": "application/json"
            },
            withCredentials : true 
        })
            .then(res => this.setState({movieData: res.data}));
    }

    render() {
        // console.log(this.props.location);
        // let CardsJSX = this.state.movieData.map(movie => {
        //     return (
        //         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        //             <Card description={movie.description} img={movie.poster} />
        //         </div>
        //     );
        // })
        return (
            <>
            <Navbar/>
            <div className="container" style={{'marginTop': '100px'}}>
                <div className="row">
                    {
                        this.state.movieData.map(movie => {
                            return (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                                    <Card 
                                        description={movie.description} 
                                        img={movie.poster} 
                                        genre={movie.genre} 
                                        title={movie.title}/>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            </>
        )
    }
}

export default homePage
