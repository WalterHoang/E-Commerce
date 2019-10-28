import React, { Component } from 'react';
import Filters from '../../filter'
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/productActions'
import Product from '../../Product/Product'
/**
 * Displays all products for women
 */
class AllWomen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    /**
     * Activates the filter 
     */
    componentDidMount = () => {
        this.props.dispatch(actions.setProductsAsync())
        this.handleFilter();
    }
    /**
     * selects only women's products
     */
    handleFilter = () => {
        let filtered = Filters.filterByDemo('women', this.props.productState.data);
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

const mapStateToProps = (state) => {
    return {
        productState: state.product,
    }
}

export default connect(mapStateToProps)(AllWomen)
