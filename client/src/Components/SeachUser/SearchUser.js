import React, { Component} from 'react'
import axios from 'axios';
import Card from '../card3/card3';
import Navbar from '../Navbar/Navbar'

export class SearchUser extends Component {
    state ={
        movieData: [], 
        pop: false,
    }

    componentDidMount(){
        console.log("component did mount")
        const url = window.location.href.split('/');
        const user = url[url.length - 1];
        if(this.props.location.username===undefined)
        {
            const username = {
            search: user
            }
            axios.post(`http://localhost:5000/search`, username, {
                "headers": {
                    "Accept" : "application/json",
                    "content-type": "application/json"
                },
                withCredentials : true 
            })
                .then(res => this.setState({movieData: res.data.userData}));
        }

    }

    render() {
        console.log("i am in render")
        console.log(this.props)
        // if(this.props.history.action==="POP")
        // {
        //     this.setState({pop: true});
        // }
        let jsx = this.props.location.username ? (
            this.props.location.username.map(movie => {
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
        ) :
        (
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
        )

        return (
            <div>
            <Navbar/>
            <div className="container" style={{'marginTop': '100px'}}>
                <div className="row">
                    {jsx}
                </div>
            </div>
            </div>
        )
    }
}

export default SearchUser
