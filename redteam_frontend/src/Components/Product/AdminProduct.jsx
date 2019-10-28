import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import * as pActions from '../../Redux/Actions/productActions';
import { connect } from 'react-redux';
import AddProductModal from './addProductModal';
import EditProductModal from './editProductModal';

class AdminProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }
    /**
         * Runs functions once the component mounts
         */
    componentDidMount() {
        if (sessionStorage.getItem('id_token') && sessionStorage.getItem('role') === "ADMIN") {
            this.fetchProducts();
        }
    }
    /**
     * makes a call to the database to get all products
     */
    fetchProducts = () => {
        this.props.dispatch(pActions.setProductsAsync());
    }

    handleEditProd = (product) => {
        this.props.dispatch(pActions.setProductInfoToEdit(product));
    }

    handleDeleteProd = (id) => {
        this.props.dispatch(pActions.deleteProductAsync(id));
        window.location.reload();
    }

    handleSubmit = (product) => {
        this.props.dispatch(pActions.addNewProductAsync(product));
    }

    /**
    * Handles the modal 
    */
    setOpen = (flag) => {
        this.props.dispatch(pActions.handleModal(flag))
        if(flag === false){
            this.setEditing(false);
        }
    }

    setEditing = (flag, id) => {
        this.setState({
            editing: flag
        })
        if(flag === true){
            this.props.dispatch(pActions.handleModal(flag))
        }
        
        let pList = this.props.productState.data
        for (let i = 0; i < pList.length; i++) {
            if (id === pList[i].id) {
                this.props.dispatch(pActions.setModalInfo(pList[i]))
            }
        }
        
    }

    render() {

        if (!sessionStorage.getItem('id_token') || sessionStorage.getItem('role') !== "ADMIN") {
            return <div id="pages"> You must be logged in, and an admin to view this page. </div>
        }
        const { editing } = this.state;
        return (
            <div id="pages">

                <div className="addProd">
                <Button onClick={this.setOpen}>Add Product</Button>
                </div>

                {editing ? (
                    <EditProductModal
                        open={this.props.productState.open}
                        handleModal={this.setOpen}
                        centered
                        data={this.props.productState.modalInfo}
                    />
                ):(
                 <AddProductModal
                    open={this.props.productState.open}
                    handleModal={this.setOpen}
                    centered
                />   
                )}
                
                

                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Demographic</th>
                            <th>Product Type</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.productState.data.map((product, key) => {

                            return (
                                <tr key={key + ":" + product.id}>
                                    <td key={key + product.id + product.name}>{product.id}</td>
                                    <td key={key + product.name}>{product.name}</td>
                                    <td key={key + product.description}>{product.description}</td>
                                    <td key={key + product.price}>{product.price}</td>
                                    <td key={key + product.quantity}>{product.quantity}</td>
                                    <td>
                                        <div>
                                            <Table striped responsive>
                                                <tbody>
                                                    {product.category.map(cat => {
                                                        return (
                                                            <tr key={key + cat.id + product.id}><td>{cat.category}</td></tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <Table striped responsive="sm">
                                                <tbody>
                                                    {product.demographic.map(demo => {
                                                        return (
                                                            <tr key={key + demo.id + product.id} ><td>{demo.demographic}</td></tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <Table striped>
                                                <tbody>
                                                    {product.productType.map(typ => {
                                                        return (
                                                            <tr key={key + typ.id + product.id}><td>{typ.type}</td></tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <Button variant="info" size="sm" onClick={() => this.setEditing(true, product.id)}>Edit</Button>
                                        </div>
                                        <div>
                                            <Button variant="danger" size="sm" onClick={() => this.handleDeleteProd(product.id)}>Delete</Button>
                                        </div>
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </div>
        );
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
export default connect(mapStateToProps)(AdminProduct);