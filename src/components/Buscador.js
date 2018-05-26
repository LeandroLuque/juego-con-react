import React, { Component } from 'react';
import imdb, { get } from "imdb-api";  


class Buscador extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            movie: "",
            est: 0,
            cf: 1,
            cu: 1.2,
            ae: 0,
            IGS: 0
        };

        this.handleChangeMovie = this.handleChangeMovie.bind(this);
        this.handleChangeYears = this.handleChangeYears.bind(this);
        this.handleChangeCF = this.handleChangeCF.bind(this);
        this.handleChangeCU = this.handleChangeCU.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeMovie(event) {
        this.setState({movie: event.target.value});
    }

    handleChangeYears(event) {
        this.setState({ae: event.target.value});
    }
    
    handleChangeCF(event) {
        this.setState({cf: event.target.value});
    }

    handleChangeCU(event) {
        this.setState({cu: event.target.value});
    }

    handleSubmit(event) {
        alert(this.state.ae * 2);
        this.searchIMDB(this.state.value);
        event.preventDefault();

    }
    
    searchIMDB(movie){
        get('Friends', {apiKey:'ad7c9a90'})
            .then(console.log)
            .catch(console.log);
    }


    calculateIGS(){
        var temp = (this.state.est - 7) * this.state.cf * this.state.cu
        temp =  temp / this.state.ae
        this.setState({IGS:temp});
    }


    render() {
        return (

            <form onSubmit={this.handleSubmit}>

                <div className="form-group">
                    <label>Pelicula</label>
                    <input type="text" onChange={this.handleChangeMovie} className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Años</label>
                    <input type="number" onChange={this.handleChangeYears} className="form-control"/>
                </div>

                <div className="form-group">
                    <label>
                    Coeficiente de Final 
                    <select id="sltCF" className="custom-select" onChange={this.handleChangeCF} value={this.state.cf}>
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                    </select>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                    Coeficiente de Unitario 
                    <select className="custom-select" onChange={this.handleChangeCU} value={this.state.cu}>
                        <option value="1.2">1.2</option>
                        <option value="1">1</option>
                    </select>
                    </label>
                </div>

                <input type="submit" value="Calcular IGS" className='btn btn-primary'/>
          </form>
        );
    }
}

export default Buscador;