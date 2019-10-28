import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from '../Product/Product';
class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    /**
     * The component needs to update every single time the search bar
     * is submitted, and if there is an error.
     * @param {previous global state passed as props} prevProps 
     */
    shouldComponentUpdate(prevProps) {
        if (this.props.productState.errors.length !== 0 || (prevProps.productState.searchBarData !== this.props.productState.searchBarData)) {
            return true;
        }
        else if (prevProps.productState.errors.length !== 0) {
            return true;
        }
        return false;
    }
    /**
     * renders three options: a Searching... text box if there are no errors and no searchbardata.
     * 
     * an "Error Loading" page if there is an error with loading the projects.
     * 
     * and a search results page, which will also return a message, 
     * if no object of that search type is inputted.
     */
    render() {
        if (this.props.productState.searchBarData.length === 0 && this.props.productState.errors.length === 0) {
            return <div id="pages" className="searchResults"> Searching... </div>
        }
        else if (this.props.productState.errors.length !== 0) {
            return <div id="pages" className="searchResults"> Error loading data... </div>
        }
        return (<div id="pages" className="searchResults">
            {(this.props.productState.searchBarData.length <= 1) ?
                <div>{(typeof this.props.productState.searchBarData[0] == 'string') ?
                    <p> {this.props.productState.searchBarData} </p> : <Product data={this.props.productState.searchBarData} />
                }</div> : (
                    <div>
                        <h1>Search Results</h1>
                        <Product
                            data={this.props.productState.searchBarData}
                        />
                    </div>
                )}
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productState: state.product
    }
}

export default connect(mapStateToProps)(SearchPage);