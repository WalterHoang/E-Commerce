import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/productActions'
import { withRouter, Redirect } from 'react-router-dom';
import './searchBar.css';
/**
 * This is the search bar componenet.
 */
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let inputVal = event.target.getElementsByClassName('searchBar');
        let input = inputVal.search.value;
        this.props.dispatch(actions.searchDataInput(input));
        this.props.dispatch(actions.searchDataAsync());
    }
    /**
     * will render the search bar, and then will redirect if there has been a thing enetered
     * into the search field.
     */
    render() {
        if (this.props.productState.searchInput !== null) {
            return (
                <td className="search-container">
                    <Redirect to="/search" />
                    <form id="searchForm" onSubmit={this.handleSubmit} className="form-inline mr-auto ml-sm-2">
                        <input name="search" className="searchBar form-control btn-sm" type="text" placeholder="Search" aria-label="Search" />
                        <input id="searchbtn" className="" type="submit"></input>
                    </form>
                </td>
            )
        }
        return (
            <td className="search-container ml-sm-2">
                <form id="searchForm" onSubmit={this.handleSubmit} className="form-inline mr-auto ml-sm-2">
                    <input name="search" className="searchBar form-control btn-sm" type="text" placeholder="Search" aria-label="Search" />
                    <input id="searchbtn" className="" type="submit"></input>
                </form>
            </td>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        productState: state.product
    }
}
export default withRouter(connect(mapStateToProps)(SearchBar));