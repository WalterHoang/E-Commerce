import React, { Component } from 'react';
import './Footer.css'
/**
 * This component renders a footer
 */
export default class Footer extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        return (
            <div className='footer'>
                <div className='footer-right'>
                    <img id='s-logo' src='https://myrealdomain.com/images/s-company-logo-2.png' alt='logo' />
                </div>
                <div className='footer-left'>
                    COPYRIGHT © 2019 SAHARA DESSERT CREAMY Inc.
                </div>
            </div>
        )
    }
}
