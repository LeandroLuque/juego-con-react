import React, { Component } from 'react';
import imdb, { get } from "imdb-api";  
import swal from "sweetalert";

class Buscador extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            serie: "",
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
        this.sendData = this.sendData.bind(this);
    }

    handleChangeMovie(event) {
        this.setState({serie: event.target.value});
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

    sendData(event) {
        this.searchIMDB(this.state.serie);  
    }
    
    searchIMDB(serie){        
        get(serie, {apiKey:'ad7c9a90'})
            .then(s => {this.setState({est: s.rating});this.calculateIGS()})
            .catch(console.log);
    }

    message() {
        var value = this.state.IGS;
        var mensaje;

        if (value>=0 && value<=0.2)
            mensaje = "Spoiler Leve";
        else if (value>=0.21 && value <=0.3)
            mensaje = "Spoiler Medio";
        else
            mensaje = "Spoiler Grave";
        return mensaje;
    }

    calculateIGS(){
        var temp = (this.state.est - 7) * this.state.cf * this.state.cu
        temp =  temp / this.state.ae
        this.setState({IGS:temp}, function(){
            swal(this.message(), "El índice es " + this.state.IGS, "info");
        });
    }

    render() {
        return (

            <div className="container">
                
                <div className="form-group">
                    <label>Serie</label>
                    <input type="text" onChange={this.handleChangeMovie} className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Años</label>
                    <input type="number" onChange={this.handleChangeYears} className="form-control"/>
                </div>

                <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>
                        Coeficiente de Final 
                        <select id="sltCF" className="custom-select" onChange={this.handleChangeCF} value={this.state.cf}>
                            <option value="1">1</option>
                            <option value="1.5">1.5</option>
                        </select>
                        </label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>
                        Coeficiente de Unitario 
                        <select className="custom-select" onChange={this.handleChangeCU} value={this.state.cu}>
                            <option value="1.2">1.2</option>
                            <option value="1">1</option>
                        </select>
                        </label>
                    </div>
                </div>
                </div>
                <button type="button" onClick={this.sendData} value="Calcular IGS" className='btn btn-primary'>Calcular IGS</button>
          </div>
        );
    }
}

export default Buscador;