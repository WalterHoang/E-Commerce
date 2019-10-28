import React, { Component } from 'react';
import Product from '../../Product/Product'
import Filters from '../../filter'
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/productActions'
/**
|--------------------------------------------------
| Shows all products for men
|--------------------------------------------------
*/
class AllMen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    /**
     * Runs functions once the component mounts
     */
    componentDidMount = () => {
        this.props.dispatch(actions.setProductsAsync());
        this.handleFilter();
    }
    /**
     * Handles the filtering of data for display
     */
    handleFilter = () => {
        let filtered = Filters.filterByDemo('men', this.props.productState.data);
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

export default connect(mapStateToProps)(AllMen)
