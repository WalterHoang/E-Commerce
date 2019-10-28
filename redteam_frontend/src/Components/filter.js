import React, { Component } from 'react';// eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

/**
 * The filter is what truncates the list of products to only include relevant items for a particular page
 */
class Filters extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    static searchInputEquals(input, strToMatch) {
        let doesMatch = 0;
        let searchTerm = input.toUpperCase();
        let searchVar = strToMatch.toUpperCase();

        let searchArr = searchVar.split(" ");
        let searchTermArr = searchTerm.split(" ");

        if (searchTerm === searchVar) {
            doesMatch = doesMatch + 1;
        }
        if (searchVar.includes(searchTerm)) {
            if (searchTermArr.length === 1) {
                searchArr.forEach(element => {
                    if (element.includes(searchTerm)) {
                        let searchCharArr = searchTermArr[0].split('');
                        let elementArr = element.split('');
                        if (elementArr.length === searchCharArr.length) {
                            doesMatch = doesMatch + 1;
                        }
                        if (elementArr[elementArr.length - 1] === '.') {
                            elementArr.pop();
                            if (elementArr.length === searchCharArr.length) {
                                doesMatch = doesMatch + 1;
                            }
                        }
                    }
                })
            }
            if (searchTermArr.length > 1) {
                searchTermArr.forEach(term => {
                    searchArr.forEach(element => {
                        let termArr = term.split('');
                        let elementArr = element.split('');
                        if (termArr.length === elementArr.length) {
                            doesMatch = doesMatch + 1;
                        }

                    })
                })
            }
        }
        if (doesMatch !== 0) {
            return true;
        }
        return false;
    }

    /**
     * The filter all function gets an array of objects, and filters through
     * them based on their ability to match with the input value.
     * 
     * Only works on values that have the exact word, rather than a piece of the word.
     */
    static filterAll = (input, data) => {
        let filtered = [];
        let results = [];

        data.forEach(dat => { //iterates through each of the pieces of the array.
            for (let k in dat) {// eslint-disable-line no-unused-vars
                // checks each property in the data object.
                if (Array.isArray(dat[k])) { //checks if the property of the data is an array
                    dat[k].forEach(innerDat => { //if it is an array, pulls out the inner objects
                        for (let prop in innerDat) {// eslint-disable-line no-unused-vars
                            if (typeof innerDat[prop] == 'string') {
                                if (this.searchInputEquals(input, innerDat[prop])) {
                                    filtered.push(dat);
                                }
                            }
                        }
                    })
                }
                if (typeof dat[k] != 'object') { //checks that the property of the object is not itself an object
                    if (typeof dat[k] == 'string') {
                        if (this.searchInputEquals(input, dat[k])) {
                            filtered.push(dat);
                        }
                    }
                }
                if (typeof dat[k] == 'object') {//checks to see if the property of the object is itself an object.
                    for (let prop in dat[k]) {// eslint-disable-line no-unused-vars
                        if (typeof dat[k][prop] == 'string') {
                            if (this.searchInputEquals(input, dat[k][prop])) {
                                filtered.push(dat);
                            }
                        }
                    }
                }
            }
        });
        if (filtered.length > 0) { //if the filtered array is has anything then it checks for duplicates and removes duplicates.
            results = filtered.filter((data, index) => {
                return filtered.indexOf(data) === index;//returns the object of the array if the index is equal to the index of the compared object.
            });
        } else {
            results = ['Cannot find anything with "' + input + '" . Please try again.'];
        }
        return results;
    }

    static filterByDemo = (demo, data) => {
        let filtered = []

        if (demo === 'women') {
            for (let i = 0; i < data.length; i++) {
                for (let d = 0; d < data[i].demographic.length; d++) {
                    if (data[i].demographic[d].demographic === 'women') {
                        filtered.push(data[i])
                    }
                }
            }
        }
        if (demo === 'men') {
            for (let i = 0; i < data.length; i++) {
                for (let d = 0; d < data[i].demographic.length; d++) {
                    if (data[i].demographic[d].demographic === 'men') {
                        filtered.push(data[i])
                    }
                }
            }
        }
        if (demo === 'children') {
            for (let i = 0; i < data.length; i++) {
                for (let d = 0; d < data[i].demographic.length; d++) {
                    if (data[i].demographic[d].demographic === 'boy' || data[i].demographic[d].demographic === 'girl') {
                        filtered.push(data[i])
                    }
                }
            }
            filtered = filtered.filter((data, index) => {
                return filtered.indexOf(data) === index;//returns the object of the array if the index is equal to the index of the compared object.
            });
        }
        return filtered;
    }

    static filterByType = (type, data) => {
        let filtered = []

        if (type === 'ball') {
            for (let i = 0; i < data.length; i++) {
                for (let d = 0; d < data[i].productType.length; d++) {
                    if (data[i].productType[d].type === 'ball') {
                        filtered.push(data[i])
                    }
                }
            }
        }
        if (type === 'equipment') {
            for (let i = 0; i < data.length; i++) {
                for (let d = 0; d < data[i].productType.length; d++) {
                    if (data[i].productType[d].type === 'equipment') {
                        filtered.push(data[i])
                    }
                }
            }
        }
        if (type === 'shirts') {
            for (let i = 0; i < data.length; i++) {
                for (let d = 0; d < data[i].productType.length; d++) {
                    if (data[i].productType[d].type === 'shirts') {
                        filtered.push(data[i])
                    }
                }
            }
        }
        if (type === 'shoes') {
            for (let i = 0; i < data.length; i++) {
                for (let d = 0; d < data[i].productType.length; d++) {
                    if (data[i].productType[d].type === 'shoes') {
                        filtered.push(data[i])
                    }
                }
            }
        }
        if (type === 'pants') {
            for (let i = 0; i < data.length; i++) {
                for (let d = 0; d < data[i].productType.length; d++) {
                    if (data[i].productType[d].type === 'pants') {
                        filtered.push(data[i])
                    }
                }
            }
        }
        return filtered;
    }


    static filterByCategory = (category, data) => {
        let filtered = []

        if (category === 'basketball') {
            for (let i = 0; i < data.length; i++) {
                for (let d = 0; d < data[i].category.length; d++) {
                    if (data[i].category[d].category === 'basketball') {
                        filtered.push(data[i])
                    }
                }
            }
        }
        if (category === 'baseball') {
            for (let i = 0; i < data.length; i++) {
                for (let d = 0; d < data[i].category.length; d++) {
                    if (data[i].category[d].category === 'baseball') {
                        filtered.push(data[i])
                    }
                }
            }
        }
        if (category === 'running') {
            for (let i = 0; i < data.length; i++) {
                for (let d = 0; d < data[i].category.length; d++) {
                    if (data[i].category[d].category === 'running') {
                        filtered.push(data[i])
                    }
                }
            }
        }
        if (category === 'golf') {
            for (let i = 0; i < data.length; i++) {
                for (let d = 0; d < data[i].category.length; d++) {
                    if (data[i].category[d].category === 'golf') {
                        filtered.push(data[i])
                    }
                }
            }
        }
        if (category === 'soccer') {
            for (let i = 0; i < data.length; i++) {
                for (let d = 0; d < data[i].category.length; d++) {
                    if (data[i].category[d].category === 'soccer') {
                        filtered.push(data[i])
                    }
                }
            }
        }
        return filtered;
    }
}
const mapStateToProps = (state) => {
    return {
        productState: state.product
    }
}

export default connect(mapStateToProps)(Filters)