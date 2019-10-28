import React, { Component, Fragment } from 'react';
import './Footer.css';
import './HomePage.css';
import * as actions from '../../Redux/Actions/loginActions';
import * as pActions from '../../Redux/Actions/productActions';
import * as cActions from '../../Redux/Actions/userActions';
import { connect } from 'react-redux';
import Popular from './Popular';
import NewProds from './NewProds';
import SlideShow from '../SlideShow/SlideShow';
import ProductModal from '../ProductsPaths/All/ProductModal';

/**
 * This component renders a homepage with a slideshow
 * and two product tables for new and popular products
 */
class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    /**
     * Runs functions once the component mounts
     */
    componentDidMount() {
        if (sessionStorage.getItem('id_token') && !sessionStorage.getItem('role')) {
            this.props.dispatch(actions.getRoleAsync(sessionStorage.getItem('id_token')));
            this.props.dispatch(cActions.setUsersAsync());
        }
        this.fetchProducts();
    }
    /**
     * makes a call to the database to get all products
     */
    fetchProducts = () => {
        this.props.dispatch(pActions.setProductsAsync());
    }
    /**
     * Handles the modal 
     */
    setOpen = (flag) => {
        this.props.dispatch(pActions.handleModal(flag))
    }
    /**
     * Sets the information to be displayed on the modal
     */
    setModalInfo = (id) => {
        this.props.dispatch(pActions.handleModal(true))
        let pList = this.props.productState.data
        for (let i = 0; i < pList.length; i++) {
            if (id === pList[i].id) {
                this.props.dispatch(pActions.setModalInfo(pList[i]))
            }
        }
    }
    render() {
        return (
            <Fragment>
                <div className='hp-background'>
                    <SlideShow data={this.props.productState.data} />
                    <NewProds handleModal={this.setModalInfo} />
                    <Popular handleModal={this.setModalInfo} />
                    <ProductModal
                        open={this.props.productState.open}
                        data={this.props.productState.modalInfo}
                        handleModal={this.setOpen}
                        centered
                    />
                </div>
            </Fragment >
        )
    }
}
/**
 * This function provides a state to our component
 * @param {Object} state 
 */
const mapStateToProps = (state) => {
    return {

        token: state.loginStuff.token,
        creds: state.loginStuff.creds,
        productState: state.product,
        userState: state.users,
    }
}
export default connect(mapStateToProps)(HomePage);