import React, { Component } from 'react'
import Services from '../services/coaster.services'



class CoasterForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            length: '',
            inversions: '',
            imageUrl: ''
        }
        this.service = new Services()
    }


    handleChangeInput = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.service.postCoaster(this.state)
            .then(x => {
                this.props.closeModal()
                this.props.updateCoasterList()
                this.props.showToast()
            })
            .catch(err => console.log('error', err))
    }


    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.service.handleUpload(uploadData)
            .then(response => this.setState({ imageUrl: response.data.secure_url }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <h4>Nueva montaña rusa</h4>

                <hr></hr>

                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="input-nombre">Nombre</label>
                        <input id="theName" name="title" type="text" className="form-control" id="input-nombre" onChange={this.handleChangeInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-descripcion">Descripción</label>
                        <input name="description" type="text" className="form-control" id="input-descripcion" onChange={this.handleChangeInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-length">Longitud</label>
                        <input name="length" type="number" className="form-control" id="input-length" onChange={this.handleChangeInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-inv">Inversiones</label>
                        <input name="inversions" type="number" className="form-control" id="input-inv" onChange={this.handleChangeInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-img">URL imagen</label>
                        <input name="imageUrl" type="file" className="form-control" id="input-img" onChange={this.handleFileUpload} />
                    </div>
                    <button type="submit" className="btn btn-dark btn-sm">Crear</button>
                    <button className="btn btn-dark btn-sm" onClick={this.props.closeModal}>Cerrar</button>
                </form>
            </>
        )
    }

}

export default CoasterForm