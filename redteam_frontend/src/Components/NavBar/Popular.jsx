import React, { Component } from 'react';
import './Footer.css';
import * as actions from '../../Redux/Actions/loginActions';
import * as pActions from '../../Redux/Actions/productActions';
import { connect } from 'react-redux';
/**
 * This function handles the rendering of a
 * product table with popular products
 */
class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        if (sessionStorage.getItem('id_token') && !sessionStorage.getItem('role')) {
            this.props.dispatch(actions.getRoleAsync(sessionStorage.getItem('id_token')));
        }
        this.fetchPopular();
    }
    /**
     * Handles the api request to get products
     */
    fetchProducts = () => {
        this.props.dispatch(pActions.setProductsAsync())
    }
    /**
     * Activates the api request to get popular products
     */
    fetchPopular = () => {
        this.props.dispatch(pActions.getPopularAsync());
    }
    /**
     * Handles the filtering of popular products (obselete)
     */
    getPopular = () => {
        let mapThis = this.props.productState.data;
        let popProds = [];
        let nums = [];
        for (let i = 0; i < 4; i++) {
            let popular = Math.floor(Math.random() * Math.floor(mapThis.length));
            mapThis.map(void function (product) {
                let bool = false;
                if (product.id === popular && !bool) {
                    nums.push(popular);
                    popProds.push(product);
                }
            });
        }
        sessionStorage.setItem('popular1', JSON.stringify(popProds[0]));
        sessionStorage.setItem('popular3', JSON.stringify(popProds[2]));
        sessionStorage.setItem('popular4', JSON.stringify(popProds[3]));
        sessionStorage.setItem('popular2', JSON.stringify(popProds[1]));
        return popProds;
    }
    render() {
        let popProds = this.props.popular;
        const { handleModal } = this.props;
        return (
            <div className="popular">
                <h1>Check out our popular products!</h1>
                {sessionStorage.getItem('popular3') !== undefined ? (
                    popProds.length > 0 ? (
                        <div>
                            <div id="cardRow row">
                                {popProds.map(data => (
                                    <div onClick={() => handleModal(data.id)} className="col-xs-6 cardz" key={data.id} >
                                        <div className='card-body'>
                                            <img src={data.url} alt={data.name} className="card-img" />
                                            <div className="card-title">
                                                <h3><b>{data.name}</b></h3>
                                            </div>
                                            <div className="card-subtitle">
                                                Tags:
                                                    {data.productType.map((tee, key) => (
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
                    )}</div>
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
        productState: state.product,
        popular: state.product.popular
    }
}
export default connect(mapStateToProps)(Popular);