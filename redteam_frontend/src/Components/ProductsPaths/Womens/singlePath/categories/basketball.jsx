import React, { Component } from 'react'
import Product from '../../../../Product/Product'
import Filters from '../../../../filter'
import { connect } from 'react-redux';
import * as actions from '../../../../../Redux/Actions/productActions'

/**
|--------------------------------------------------
| Page for all Womens Basketball items
|--------------------------------------------------
*/
class WomensBasketball extends Component {
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
        let filtered = Filters.filterByDemo('women', this.props.productState.data);
        // let result = Filters.filterByType('', filtered);
        let result = Filters.filterByCategory('basketball', filtered);
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

const mapStateToProps = (state) => {
    return {
        productState: state.product,
    }
}

export default connect(mapStateToProps)(WomensBasketball)
