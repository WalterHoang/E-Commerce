import React, { Component } from 'react';
import Product from '../../Product/Product'
import Filters from '../../filter'
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/productActions'

/**
|--------------------------------------------------
| Page that will show all children products
|--------------------------------------------------
*/
class AllChildren extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    /**
     * Runs all functions that need run on the mount of the component
     */
    componentDidMount = () => {
        this.props.dispatch(actions.setProductsAsync())
        this.handleFilter();
    }
    /**
     * Filters the data you are searching for and sets it to the filtered data global state
     */
    handleFilter = () => {
        let filtered = Filters.filterByDemo('children', this.props.productState.data);
        this.props.dispatch(actions.setFilteredData(filtered))
    }
    render() {
        return (
            <div>
                <Product
                    data={this.props.productState.filteredData}
                />
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

export default connect(mapStateToProps)(AllChildren)
