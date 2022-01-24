import React , { Component } from 'react';
import { Form , Button, Alert} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import './AddForm.css'
// import checkIcon from '../../check-circle-solid.svg'
import Cards2 from '../cards2/cards2'
import axios from 'axios';
import {genre} from '../../constant'
import Navbar from '../Navbar/Navbar'

class AddForm extends Component {
    state = {
        title: '',
        type: 'movie',
        url: '',
        cardsJSX: [],
        showAlert: false,
        alertMessage: '',
        loading: false,
        text: 'Nothing to preview',
        text_display: true
    }
    genreGenerator = (genre_id) => {
        let genreArray = [];
        genre_id.forEach(id => {
            const genreIndex = genre.findIndex(genreObj => {
                return genreObj.id===id;
            });
            if(genreIndex!==-1){
                genreArray.push(genre[genreIndex].name);
            }
        })
        return genreArray;
    }


    sendData = async (data) => {
        const genres = this.genreGenerator(data.genre_ids);
        let img = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        let name;
        // console.log('SendData', data);
        if(this.state.type === 'anime' || this.state.type === 'tv')
            name = data.name;
        else
            name = data.title;
        // this.setState({original_title: name});
        const dataObj = {
            title: name,
            description: data.overview,
            type: this.state.type,
            title_id: data.id,
            poster: img,
            genre: genres
        }
        
        // console.log("genres are: ", genres);
        await axios.post('http://localhost:5000/post', dataObj, {
            "headers": {
                "Accept" : "application/json",
                "content-type": "application/json"
            },
            withCredentials : true 
        })
            .then((data) => this.setState({showAlert: true, alertMessage: data.data.message}))
            .catch(error => console.log("error occured ", error.message));
    }

    onSubmit = async (event) => {
        this.setState({text_display: false});
        this.setState({cardsJSX: []});
        this.setState({loading: true});
        // console.log("category" ,this.state.category);
        event.preventDefault();
        let a = encodeURI(this.state.title)
        let apiHelperKey = this.state.type;
        if(apiHelperKey === 'anime') {
            apiHelperKey = 'tv';
        }
        let apiUrl = `https://api.themoviedb.org/3/search/${apiHelperKey}?api_key=da6c65cb9b8595562d8ed2df20cec5cd&language=en-US&page=1&query=${a}&include_adult=false`
         await axios.get(apiUrl)
            .then(res => {
                     let cardsJSX = res.data.results.map(data => {
                        let img = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
                        return (
                                data.poster_path ? 
                                (
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={data.id}> 
                                        <Cards2 img={img} onClick={() => this.sendData(data)}/>
                                    </div>
                                ) : null
                        );
                    })
                    this.setState({loading: false});
                    this.setState({cardsJSX: [...cardsJSX]})
                    cardsJSX.length ? console.log("okay") : this.setState({text_display: true, text: 'No results found'})

        }).catch(err => {
            this.setState({loading: false})
            this.setState({text_display: true});
            this.setState({text: 'Some error occurred, please try again!!'})
            console.log("error is " ,err)
        })
    }   
    render() {
        // let img = `https://image.tmdb.org/t/p/w500${this.state.url}`;
        return(
            <>
            <Navbar/>
            <div className="container">

                <Alert  variant="primary" className="addFormAlert" show={this.state.showAlert} onClose={() => this.setState({showAlert: false})} dismissible>
                    {this.state.alertMessage} 
                </Alert>

                <div className="addForm">
                <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control as="select" size="md" onChange={(event) => this.setState({type: event.target.value})}>
                                <option value="movie">Movie</option>
                                <option value="tv">TV Show/Series</option>
                                <option value="anime">Anime</option>
                            </Form.Control>
                        </Form.Group> 

                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Title..." onChange={(event) => this.setState({title: event.target.value})}/>
                        </Form.Group>     

                        {/* <Form.Group controlId="formBasicEmail">
                            <Form.Control as="select" size="md" onChange={(event) => this.setState({category: event.target.value})}>
                                <option value="Netflix">Netflix</option>
                                <option value="Hollywood">Hollywood</option>
                                <option value="Bollywood">Bollywood</option>
                                <option value="Tollywood">Tollywood</option>
                            </Form.Control>
                        </Form.Group> */}

                        <Button variant="primary" type="submit" className="addFormButton">
                            Search
                        </Button>
                    </Form>
                </div>
                {
                    this.state.text_display ?
                    (
                        <div className="nthngToPreview">
                            {this.state.text}
                        </div>
                    ) : null
                }
                {
                    this.state.loading ?
                    <Spinner animation="grow" variant="secondary" /> : null
                }
                <div className="row mt-4 d-flex justify-content-center align-items-center">
                    {this.state.cardsJSX}
                </div>

            </div>
</>

        )
    }
}

export default AddForm;