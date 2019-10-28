import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Container, Col, Row, FormControl, Form, FormGroup, FormLabel, Image } from 'react-bootstrap';

class AddEditUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        const { open, handleModal } = this.props
        return (
            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={open}
                >
                    <Form onSubmit={this.handleSubmit}>

                        <Modal.Header>
                            <Modal.Title>
                                <h1>Edit User</h1>
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Container>
                                {/* <FormGroup>
                                    {(this.state.validationErr.length !== 0) ? this.state.validationErr.map(
                                        err => {
                                            return <FormLabel>{err}</FormLabel>
                                        }
                                    ) : null}
                                    </FormGroup> */}
                                <Row>
                                    <Col sm={4}>
                                        <h3>User Information</h3>
                                        <FormGroup>
                                            <FormLabel>User Name</FormLabel>
                                            <Form.Row>
                                                <Col xs={6}>
                                                    <FormControl
                                                        id="firstName"
                                                        type='text'
                                                        margin="normal"
                                                        variant="outlined"
                                                        required
                                                        placeholder='First Name'
                                                    />
                                                </Col>
                                                <Col xs={6}>
                                                    <FormControl
                                                        id="firstName"
                                                        type='text'
                                                        margin="normal"
                                                        variant="outlined"
                                                        required
                                                        placeholder='Last Name'
                                                    />
                                                </Col>
                                            </Form.Row>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl
                                                id='phone'
                                                type='text'
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                placeholder='111-111-1111'
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl
                                                id='email'
                                                type='text'
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                placeholder='Example@example.com'
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl
                                                id='password'
                                                type='password'
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                placeholder='pass@word2'
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl
                                                id='confirmPassword'
                                                type='password'
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                placeholder='Confirm password'
                                            />
                                        </FormGroup>
                                        <Form.Row>
                                            <Col xs={6}>
                                                <FormGroup>
                                                    <FormLabel>Quantity</FormLabel>
                                                    <FormControl
                                                        id="quantity"
                                                        type="number"
                                                        name="quantity"
                                                        margin="normal"
                                                        variant="outlined"
                                                        required
                                                        placeholder='Quantity'
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={6}>
                                                <FormGroup>
                                                    <FormLabel>Price</FormLabel>
                                                    <FormControl
                                                        id='price'
                                                        type='number'
                                                        margin="normal"
                                                        variant="outlined"
                                                        required
                                                        placeholder='Price'
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Form.Row>
                                    </Col>
                                    <Col sm={8}>

                                        <Form.Row>
                                            <Col xs={4}>

                                                <p>Role: </p>
                                                <Form.Check
                                                    id='prod-demo'
                                                    label='Customer'
                                                    value='CUSTOMER'
                                                    name='CUSTOMER'
                                                    ref='CUSTOMER'
                                                />
                                                <Form.Check
                                                    id='prod-demo'
                                                    label='Administrator'
                                                    value='ADMIN'
                                                    name='ADMIN'
                                                    ref='ADMIN'
                                                />
                                                <Form.Check
                                                    id='prod-demo'
                                                    label='Employee'
                                                    value='EMPLOYEE'
                                                    name='EMPLOYEE'
                                                    ref='EMPLOYEE'
                                                />
                                            </Col>
                                        </Form.Row>

                                        <Form.Row>
                                            <Col xs={6}>
                                                <Button type='submit' className='btn btn-primary'>Submit</Button>
                                            </Col>
                                            <Col xs={6}>
                                                <Button onClick={() => handleModal(false)} className='btn btn-secondary'>Close</Button>
                                            </Col>
                                        </Form.Row>

                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>

                    </Form>
                </Modal>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userState: state.users
    }
}
export default connect(mapStateToProps)(AddEditUserModal);