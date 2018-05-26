import React, { Component } from 'react';
import imdb, { get } from "imdb-api";  


class Buscador extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            est: 0,
            cf: 0,
            cu: 0,
            ae: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        this.searchIMDB(this.state.value);
        event.preventDefault();

    }
    
    searchIMDB(movie){
        get(movie, {apiKey:'ad7c9a90'})
            .then(console.log)
            .catch(console.log);
    }


    render() {
        return (

            <form onSubmit={this.handleSubmit}>

                <div className="form-group">
                    <label>Pelicula</label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control"/>
                </div>

                <input type="submit" value="Submit" className='btn btn-primary'/>
          </form>
        );
    }
}

export default Buscador;