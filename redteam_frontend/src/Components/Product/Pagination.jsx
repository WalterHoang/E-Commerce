import React, { Component } from 'react'
import './Product.css'
/**
 * This component subdivides product lists into pages with a limited number of products per page
 */
export default class Pagination extends Component {
    render() {
        const { prodsPerPage, totalProds, paginate } = this.props
        let pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalProds / prodsPerPage); i++) {
            pageNumbers.push(i)
        }
        return (
            <nav>
                <ul className="pagination pagination-lg justify-content-center">
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <span onClick={() => paginate(number)} alt='page-num' className='page-link'>
                                {number}
                            </span>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}