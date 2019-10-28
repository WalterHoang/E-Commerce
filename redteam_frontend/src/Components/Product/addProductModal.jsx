import React, { Component } from 'react';
import * as actions from '../../Redux/Actions/productActions';
import { connect } from 'react-redux';
import { Modal, Button, Container, Col, Row, FormControl, Form, FormGroup, FormLabel, Image } from 'react-bootstrap';

/**
 * Modal to add a new product to the database
 */
class AddProductModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgUrl: null,
            validationErr:[],
        }

    }
    /**
     * gets the url from the modal, and sets the state of the modal itself so that it rerenders with the new image.
     */
    handleImgSubmit = () => {
        let url = this.refs.url.value

        if (this.validateUrlIsImage(url)) {
            this.setState({
                imgUrl: url
            })
        }

    }

    /**
     * takes the url, and makes sure that the backend can accept the string
     * makes sure the the url goes to a valid image, by making sure it has a jpeg, jpg, gif or png.
     */
    validateUrlIsImage = (inputVal) => {
        if (inputVal.length < 255) {
            if (inputVal.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                return true;
            }
        }
    }

    /**
     * gets the image from the newly rendered image in the modal.
     * gets the associated image height and width from the information within the image
     * returns a true or false if the image size matches our requirements.
     */
    handleImgSizeValidation(){

        if (this.state.imgUrl !== null) {
            let img = document.getElementById("prodImg")

            let height = img.naturalHeight;
            let width = img.naturalWidth;

            if (height <= 512) {
                if (width <= 512) {
                    return true;
                }
            }
            return false;
        }
    }

    /**
     * Handles the submit of the form, and internal validation.
     */
    handleSubmit = e => {
        e.preventDefault();
        let error = [];
        let name = e.target.name.value;
        let quantity = e.target.quantity.value;
        let description = e.target.description.value;
        let price = e.target.price.value;
        let demographic = []
        let category = []
        let type = []


        /**
         *  Sets demographic value by refs
         */
        if (this.refs.women.checked) {
            demographic.push({ id: 1, demographic: 'women' })
        }
        if (this.refs.men.checked) {
            demographic.push({ id: 2, demographic: 'men' })
        }
        if (this.refs.girl.checked) {
            demographic.push({ id: 3, demographic: 'girl' })
        }
        if (this.refs.boy.checked) {
            demographic.push({ id: 4, demographic: 'boy' })
        }
        /**
         * Sets type value by refs
         */
        if (this.refs.ball.checked) {
            type.push({ id: 1, type: 'ball' })
        }
        if (this.refs.equipment.checked) {
            type.push({ id: 2, type: 'equipment' })
        }
        if (this.refs.shirts.checked) {
            type.push({ id: 3, type: 'shirts' })
        }
        if (this.refs.shoes.checked) {
            type.push({ id: 4, type: 'shoes' })
        }
        if (this.refs.pants.checked) {
            type.push({ id: 5, type: 'pants' })
        }
        /**
         * Sets category value by refs
         */
        if (this.refs.basketball.checked) {
            category.push({ id: 1, category: 'basketball' })
        }
        if (this.refs.baseball.checked) {
            category.push({ id: 2, category: 'baseball' })
        }
        if (this.refs.running.checked) {
            category.push({ id: 3, category: 'running' })
        }
        if (this.refs.golf.checked) {
            category.push({ id: 4, category: 'golf' })
        }
        if (this.refs.soccer.checked) {
            category.push({ id: 5, category: 'soccer' })
        }

        if (this.handleImgSizeValidation() && (category.length > 0) && (demographic.length > 0) && (type.length > 0)) {
            let newProd = {
                name: name,
                description: description,
                url: this.state.imgUrl,
                quantity: quantity,
                price: price,
                productType: type,
                demographic: demographic,
                category: category,
            }
            this.props.dispatch(actions.addNewProductAsync(newProd));
            this.props.handleModal(false);
            window.location.reload();
        }
        else {
            if(!this.handleImgSizeValidation()){
                error.push("URL must link to an image of size 512px x 512px, or smaller.");
            }
            if (category.length === 0) {
                error.push("Products must have at least one category.")
            }
            if (type.length === 0) {
                error.push("Products must have at least one type.")
            }
            if (demographic.length === 0) {
                error.push("Products must have at least one demographic.")
            }
            this.setState({
                validationErr: error
            })
        }

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
                                <h1>Add new product</h1>
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Container>
                                <Row>
                                    <FormGroup>
                                    {(this.state.validationErr.length !== 0) ? this.state.validationErr.map(
                                        err => {
                                            return <FormLabel>{err}</FormLabel>
                                        }
                                    ) : null}
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <h3>Product Information</h3>
                                        <FormGroup>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl
                                                id="name"
                                                type='text'
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                placeholder='Product Name'
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl
                                                id='description'
                                                type='text'
                                                margin="normal"
                                                variant="outlined"
                                                required
                                                placeholder='Description'
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
                                                        step='any'
                                                        required
                                                        placeholder='Price'
                                                    />
                                                </FormGroup>
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
                                    <Col sm={8}>

                                        <Form.Row>
                                            <Col xs={4}>

                                                <p>Demographic</p>
                                                <Form.Check
                                                    id='prod-demo'
                                                    label='Mens'
                                                    value='men'
                                                    name='men'
                                                    ref='men'
                                                />
                                                <Form.Check
                                                    id='prod-demo'
                                                    label='Womens'
                                                    value='women'
                                                    name='women'
                                                    ref='women'
                                                />
                                                <Form.Check
                                                    id='prod-demo'
                                                    label='Boys'
                                                    value='boys'
                                                    name='boys'
                                                    ref='boy'
                                                />
                                                <Form.Check
                                                    id='prod-demo'
                                                    label='Girls'
                                                    value='girls'
                                                    name='girls'
                                                    ref='girl'
                                                />
                                            </Col>
                                            <Col xs={4}>
                                                <p>Type</p>
                                                <Form.Check
                                                    id='prod-type'
                                                    label='Balls'
                                                    value='ball'
                                                    name='ball'
                                                    ref='ball'
                                                />
                                                <Form.Check
                                                    id='prod-type'
                                                    label='Equipment'
                                                    value='equipment'
                                                    name='equipment'
                                                    ref='equipment'
                                                />
                                                <Form.Check
                                                    id='prod-type'
                                                    label='Shirts'
                                                    value='shirts'
                                                    name='shirts'
                                                    ref='shirts'
                                                />
                                                <Form.Check
                                                    id='prod-type'
                                                    label='Shoes'
                                                    value='shoes'
                                                    name='shoes'
                                                    ref='shoes'
                                                />
                                                <Form.Check
                                                    id='prod-type'
                                                    label='Pants'
                                                    value='pants'
                                                    name='pants'
                                                    ref='pants'
                                                />
                                            </Col>
                                            <Col xs={4}>
                                                <p>Category</p>
                                                <Form.Check
                                                    id='prod-category'
                                                    label='Basketball'
                                                    value='basketball'
                                                    name='basketball'
                                                    ref='basketball'
                                                />
                                                <Form.Check
                                                    id='prod-category'
                                                    label='Baseball'
                                                    value='baseball'
                                                    name='baseball'
                                                    ref='baseball'
                                                />
                                                <Form.Check
                                                    id='prod-category'
                                                    label='Running'
                                                    value='running'
                                                    name='running'
                                                    ref='running'
                                                />
                                                <Form.Check
                                                    id='prod-category'
                                                    label='Golf'
                                                    value='golf'
                                                    name='golf'
                                                    ref='golf'
                                                />
                                                <Form.Check
                                                    id='prod-category'
                                                    label='Soccer'
                                                    value='soccer'
                                                    name='soccer'
                                                    ref='soccer'
                                                />
                                            </Col>
                                        </Form.Row>

                                        <Form.Row>
                                            <Col xs={12}>

                                                <div className="validateImage image productImage">

                                                    <Col xs={6}>
                                                        <Form.Row>
                                                            <Form.Label>Image</Form.Label>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Image id="prodImg"
                                                                name="prodImg"
                                                                ref="img"
                                                                src={(this.state.imgUrl !== null) ? this.state.imgUrl
                                                                    :
                                                                    "https://www.ecalions.org/wp-content/uploads/2018/09/baseball.png"}
                                                                thumbnail
                                                                alt={(this.state.imgUrl === null) ? 'Your desired icon will be displayed here' : 'The desired icon is here'} />
                                                        </Form.Row>

                                                    </Col>
                                                    <Col xs={6}>
                                                        <Form.Row>
                                                            <Form.Label>URL</Form.Label>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <FormControl
                                                                className="prodImgUrl"
                                                                id="prodImgUrl"
                                                                type="url"
                                                                name="imgValidUrl"
                                                                placeholder="image url"
                                                                ref='url'
                                                                onChange={this.handleImgSubmit} />
                                                        </Form.Row>
                                                    </Col>
                                                </div>
                                            </Col>
                                        </Form.Row>
                                    </Col>
                                </Row>

                                <Row>

                                </Row>

                            </Container>
                        </Modal.Body>

                    </Form>
                </Modal>

            </div>
        )
    }
}

/**
 * This function provides a state to our component
 * @param {Object} state 
 */
const mapStateToProps = (state) => {
    return {
        productState: state.product
    }
}
export default connect(mapStateToProps)(AddProductModal)

