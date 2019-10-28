import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/userActions';
import { Modal, Button, Container, Col, Form } from 'react-bootstrap';


class DoubleCheckDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validErr: [],
        }
    }


    handleDelete() {
        let error = [];

        let pass = this.refs.password.value;
        let con = this.refs.conPassword.value;

        let userPass = this.props.userState.infoToEdit.password;


        if ((pass === con) && (pass === userPass)) {
            let id = this.props.userState.infoToEdit.id
            this.props.dispatch(actions.deleteUsersAsync(id));
            this.handleLogout();
        } else {
            if (userPass !== pass) {
                error.push("Incorrect password")
                
            } else if (pass !== con) {
                error.push("Please confirm your password.")
            }
            this.setState({
                validErr: error
            })
        }
    }

    handleLogout() {
        sessionStorage.clear();
        window.location.reload();
    }

    handleClose(flag) {
        this.props.dispatch(actions.handleModal(flag));
    }

    render() {
        const { open } = this.props

        return (
            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={open}
                >
                    <Container>
                        <Form>
                            <Modal.Header>
                                <Modal.Title>
                                    <h1>Delete User</h1>
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Container>
                                    <Form.Group>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label>
                                                    Are you sure you want to delete your account?
                                             </Form.Label>
                                            </Col>ּ
                                    </Form.Row>
                                    </Form.Group>

                                    
                                        {(this.state.validErr.length !==0)? this.state.validErr.map(
                                            error => {
                                                return <Form.Label>{ error }</Form.Label>
                                            }
                                        ) : null }
                                    

                                    <Form.Group>
                                        <Form.Row>
                                            <Col xs={6}>
                                                <Form.Label>Enter Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    ref="password"
                                                    required
                                                    autoComplete={false}
                                                />
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="conPassword"
                                                    ref="conPassword"
                                                    autoComplete={false}
                                                    required
                                                />
                                            </Col>
                                        </Form.Row>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Row>
                                            <Col xs={6}>
                                                <Button onClick={() => this.handleDelete()} variant="primary">Yes</Button>
                                            </Col>
                                            <Col xs={6}>
                                                <Button vairant="secondary" onClick={() => this.handleClose(false)}>Cancel</Button>
                                            </Col>
                                        </Form.Row>
                                    </Form.Group>
                                </Container>
                            </Modal.Body>
                        </Form>
                    </Container>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userState: state.users
    }
}
export default connect(mapStateToProps)(DoubleCheckDeleteModal);