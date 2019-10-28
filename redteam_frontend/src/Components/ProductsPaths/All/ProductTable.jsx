import React, { Component } from 'react'
import './ProdTable.css';
/**
 * Handles rendering of product table
 */
export default class ProductTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    render() {
        const { handleModal } = this.props;
        let products = this.props.data;
        let len = products.length;
        let modFour = len * 0.25;
        let rowNumber = Math.floor(modFour) + 1;
        let gridArray = [];
        for (let j = 0; j < rowNumber; j++) {
            let cycleBoost = j * 4;
            let rowContent = [];
            for (let i = 0; i < 4; i++) {
                if (products[i + cycleBoost]) {
                    rowContent.push(products[i + cycleBoost])
                }
            };
            gridArray.push(rowContent);
        };
        return (
            <div className='product-table background'>
                {gridArray ? (
                    gridArray.length > 0 ? (
                        <div className="prodTable ">
                            {gridArray.map((data, key) => (
                                <div key = {'cardrow' + key} className="cardRow row">
                                    {data.map((data) => (
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
                            ))}
                        </div>
                    ) : (
                            <h1>No products found</h1>
                        )
                ) : (
                        <h1>Loading...</h1>
                    )}
            </div>
        )
    }
}