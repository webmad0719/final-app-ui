import React, { Component } from 'react'
import Services from '../services/coaster.services'

import CoasterCard from './Coaster-card'
import CoasterForm from './Coaster-form'

import { Modal, Toast } from 'react-bootstrap'



class CoasterList extends Component {

    constructor() {
        super()
        this.state = { coasters: [], showModal: false, showToast: false }
        this.services = new Services()
    }

    componentDidMount = () => this.updateList()

    updateList = () => {
        this.services.getCoasters()
            .then(response => this.setState({ coasters: response.data }))
            .catch(err => console.log(err))
    }

    handleModalOpen = () => this.setState({ showModal: true })
    handleModalClose = () => this.setState({ showModal: false })
    handleToastOpen = () => this.setState({ showToast: true })
    handleToastClose = () => this.setState({ showToast: false })


    render() {

        return (
            <>

                <Toast onClose={this.handleToastClose} show={this.state.showToast} delay={3000} autohide style={{ position: 'fixed', bottom: 0, right: 10, zIndex: 9999 }}>
                    <Toast.Header>
                        <strong className="mr-auto">Acción completada</strong>
                    </Toast.Header>
                    <Toast.Body>Montaña rusa guardada en la Base de Datos</Toast.Body>
                </Toast>

                <div className="container">

                    <Modal show={this.state.showModal} onHide={this.handleModalClose}>

                        <Modal.Body>
                            <CoasterForm closeModal={this.handleModalClose} updateCoasterList={this.updateList} showToast={this.handleToastOpen} />
                        </Modal.Body>

                    </Modal>



                    <h1>Listado de montañas rusas</h1>

                    {this.props.userInSession && <button className="btn btn-dark btn-big" onClick={this.handleModalOpen}>Nueva montaña rusa</button>}

                    <div className="row coasters-list">

                        {this.state.coasters.map(coaster => <CoasterCard key={coaster._id} {...coaster} />)}

                    </div>
                </div>
            </>
        )
    }
}


export default CoasterList