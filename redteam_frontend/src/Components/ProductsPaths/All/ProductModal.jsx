import React, { Component } from 'react'
import { Modal, Button, Container, Col, Row } from 'react-bootstrap'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";
import EditProductModal from '../../Product/editProductModal';

/**
 * Handles rendering of product modal
 */
export default class ProductModal extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            editing: false 
        }
    }
    handleModal = (flag) => {
        this.props.handleModal(flag);
        this.setEditing(flag);
    }
        
    setEditing = (flag) => {
        this.setState({
            editing: flag,
        })
    }
    render() {
        const { open, data } = this.props
        const { editing } = this.state
        return (
            <div>
                {editing ? (
                    <EditProductModal
                    open={open}
                    data={data}
                    handleModal={this.handleModal}
                    />
                ) : (
                   <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={open}
                >
                    <Modal.Header >
                        <Modal.Title id="contained-modal-title-vcenter">
                            {data.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row className='show-grid'>
                                <Col xs={12} sm={6}>
                                    <img src={data.url} alt={data.name} id='modal-img' />
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Row className='show-grid'>
                                        <h4>
                                            Description: {data.description}
                                        </h4>
                                    </Row>
                                    <Row className='show-grid'>
                                        {sessionStorage.getItem('id_token') ? (<h1>Price:   ${data.price} </h1>) : ('')}
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        {!sessionStorage.getItem('role') ? (<NavLink onClick={this.refresh} style={{ padding: 20, fontSize: 20, fontWeight: 'bold' }} to='/login' > Please login to view more details </NavLink>) : ('')}
                        {sessionStorage.getItem('role') === 'ADMIN' ? (<Button onClick={() => this.setEditing(true)} variant='secondary' >Edit Product</Button>) : ('')}
                        <Button variant='danger' onClick={() => this.handleModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal> 
                )}
                
            </div>
        )
    }
}
