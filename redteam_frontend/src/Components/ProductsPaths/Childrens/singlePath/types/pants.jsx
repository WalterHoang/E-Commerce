import React, { Component } from 'react'
import Product from '../../../../Product/Product'
import Filters from '../../../../filter'
import { connect } from 'react-redux';
import * as actions from '../../../../../Redux/Actions/productActions'

class ChildrensPants extends Component {
    /**
    * Runs all functions that need run on the mount of the component
    */
    componentDidMount = () => {
        this.fetchProducts();
        this.handleFilter();
    }
    /**
     * Filters the data you are searching for and sets it to the filtered data global state
     */
    handleFilter = () => {
        let filtered = Filters.filterByDemo('children', this.props.productState.data);
        let result = Filters.filterByType('pants', filtered);
        // let result = Filters.filterByCategory('', filtered);
        this.props.dispatch(actions.setFilteredData(result))
    }
    /**
     * Fetches products so each page will have the most current data
     */
    fetchProducts = () => {
        this.props.dispatch(actions.setProductsAsync())
    }
    render() {
        return (
            <div>
                <Product
                    data={this.props.productState.filteredData}
                />
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
        productState: state.product,
    }
}

export default connect(mapStateToProps)(ChildrensPants)
