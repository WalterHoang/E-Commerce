import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/productActions'
import ProductTable from '../ProductsPaths/All/ProductTable';
import ProductModal from '../ProductsPaths/All/ProductModal';
import Pagination from './Pagination'
import './Product.css'

/**
 * This component handles the rendering of a 
 * reusable product table and product modal
 */
class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            prodsPerPage: 8,
        }
    }
    componentDidMount = () => {
        this.fetchProducts();
    }
    /**
     * This function handles the opening of the modal
     */
    setOpen = (flag) => {
        this.props.dispatch(actions.handleModal(flag))
    }
    /**
     * This handles the api request to get products
     */
    /**
     * Will handle  the pagination number
     */
    paginate = (number) => {
        this.setState({
            currentPage: number
        })
    }
    fetchProducts = () => {
        this.props.dispatch(actions.setProductsAsync())
    }
    /**
     * This handles the request to add additional product
     * details that appear on a modal
     */
    setModalInfo = (id) => {
        this.props.dispatch(actions.handleModal(true))
        let pList = this.props.productState.data
        for (let i = 0; i < pList.length; i++) {
            if (id === pList[i].id) {
                this.props.dispatch(actions.setModalInfo(pList[i]))
            }
        }
    }
    render() {
        // const [prod, setProd] = useState([]);
        const { prodsPerPage, currentPage } = this.state
        const indexOfLastProduct = currentPage * prodsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - prodsPerPage;
        const currentProducts = this.props.data.slice(indexOfFirstProduct, indexOfLastProduct)
        return (
            <div>
                <Pagination
                    prodsPerPage={this.state.prodsPerPage}
                    totalProds={this.props.data.length}
                    paginate={this.paginate}
                />
                <ProductTable
                    data={currentProducts}
                    handleModal={this.setModalInfo}
                />
                <Pagination
                    prodsPerPage={this.state.prodsPerPage}
                    totalProds={this.props.data.length}
                    paginate={this.paginate}
                />
                <ProductModal
                    open={this.props.productState.open}
                    data={this.props.productState.modalInfo}
                    handleModal={this.setOpen}
                    centered
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
        productState: state.product
    }
}

export default connect(mapStateToProps)(Product)
