import React, { Component } from 'react';
import './Footer.css';
import * as actions from '../../Redux/Actions/loginActions';
import * as pActions from '../../Redux/Actions/productActions';
import { connect } from 'react-redux';
/**
 * This component handles a rendering 
 * of a product table with the newest products
 */
class NewProds extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        if (sessionStorage.getItem('id_token') && !sessionStorage.getItem('role')) {
            this.props.dispatch(actions.getRoleAsync(sessionStorage.getItem('id_token')));
        }
        this.fetchProducts();
    }
    /**
     * Handles the api request to get products
     */
    fetchProducts = () => {
        this.props.dispatch(pActions.setProductsAsync())
    }
    /**
     * Handles the filtering of the newest products
     */
    getNewestProds = () => {
        let highestId = 0;
        let highestId2 = 0;
        let newProds = [];
        let mapThis = this.props.productState.data
        mapThis.map(function (product) {// eslint-disable-line array-callback-return
            if (product.id >= highestId) {
                highestId = product.id;
            }
        });
        mapThis.map(function (product) {// eslint-disable-line array-callback-return
            if (product.id >= highestId2 && product.id < highestId) {
                highestId2 = product.id
            }
        });
        mapThis.map(function (product) {// eslint-disable-line array-callback-return
            if (product.id === highestId) {
                newProds.push(product);
            }
            else if (product.id === highestId2) {
                newProds.push(product);
            }

        });
        return newProds;
    };
    render() {
        let newProds = this.getNewestProds();
        const { handleModal } = this.props;
        return (
            <div className="newProducts">
                <h1>Check out our Hot New products!</h1>
                {newProds ? (
                    newProds.length > 0 ? (
                        <div >
                            <div id="cardRow row">
                                {newProds.map((data, key) => (
                                    <div onClick={() => handleModal(data.id)} className="col-xs-6 cardz" key={data.id} >
                                        <div className='card-body'>
                                            <img src={data.url} alt={data.name} className="card-img" />
                                            <div className="card-title">
                                                <h3><b>{data.name}</b></h3>
                                            </div>
                                            <div className="card-subtitle">
                                                Tags:{data.productType.map((tee, key) => (
                                                    <span key={'type' + key}> {tee.type}, </span>
                                                ))}
                                                {data.category.map((cee, key) => (
                                                    <span key={'category' + key}>{cee.category}, </span>
                                                ))}
                                                {data.demographic.map((dee, key) => (
                                                    <span key={'demographic' + key}>{dee.demographic}, </span>
                                                ))}
                                            </div>
                                            <div className="card-text">
                                                <h5><b>{sessionStorage.getItem('id_token') ?
                                                    ("$" + data.price) : (<div />)}
                                                </b></h5>
                                            </div>
                                            <div>
                                                <button className='card-link'>View Details</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                            <h1>No products found</h1>
                        )
                ) : (
                        <h1>Loading...</h1>
                    )}
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
        token: state.loginStuff.token,
        creds: state.loginStuff.creds,
        productState: state.product
    }
}
export default connect(mapStateToProps)(NewProds);