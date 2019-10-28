import React, { Component } from 'react';
import * as actions from '../../../Redux/Actions/productActions';
import { connect } from 'react-redux';
import Product from '../../Product/Product';
/**
 * Handles rendering of all products
 */
class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount = () => {
        this.fetchProducts();
    }
    handleModal = (flag) => {
    }
    /**
     * handles api request to get products
     */
    fetchProducts = () => {
        this.props.dispatch(actions.setProductsAsync())
    }
    render() {
        return (
            <div>
                <h1>All Products</h1>
                <Product
                    data={this.props.productState.data} />
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
        productState: state.product,
    }
}

export default connect(mapStateToProps)(AllProducts)
