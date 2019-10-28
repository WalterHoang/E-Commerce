import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as signUpActions from '../../Redux/Actions/signUpActions';
import * as pActions from '../../Redux/Actions/productActions';
import * as lActions from '../../Redux/Actions/loginActions';
import './Login.css'
/**
 * This component allows a user to create an account
 */
class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            placeholder: 'placeholder for error',
        }
    }
    /**
     * This function passes a object composed of user information
     * to create a user account for a customer
     */
    handleSubmit = e => {
        e.preventDefault();
        let err = []
        let firstName = e.target.firstName.value;
        let lastName = e.target.lastName.value;
        let email = e.target.email.value;
        let street = e.target.street.value;
        let city = e.target.city.value;
        let state = e.target.state.value;
        let zip = e.target.zip.value;
        let phone = e.target.phone.value
        let password = e.target.password.value;
        let passwordCheck = e.target.passwordCheck.value;
        let newUserCreds = {
            email: email,
            password: password
        }
        let newUser = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            address: {
                street: street,
                city: city,
                state: state,
                zip: zip
            },
            role: [{ id: 3, role: 'CUSTOMER' }],
            password: password,
        }
        if (password !== passwordCheck) {
            err.push('Passwords do not match, please try again')
            this.props.dispatch(pActions.setError(err))
        } else {
            this.props.dispatch(signUpActions.userSignupAsync(newUser))
            let jsonCreds = JSON.stringify(newUserCreds)
            setTimeout(() => {
                this.props.dispatch(lActions.initLoginAsync(jsonCreds, email));
            }, 200);
        }
    }
    /**
     * Validation for customer sign up
     */
    validate = (type, value) => {
        //TODO add phone validation
        let errors = []
        if (type === 'name') {
            if (!value.match(/^[A-Za-z]+ ?[A-Za-z]*$/)) {
                errors.push('First and Last names only, cannot contain numbers, special characters, or be blank')
            }
        }
        if (type === 'zip') {
            if (!value.match(/^\d{5}(-\d{4})?$/)) {
                errors.push('Zip must be in US postal code format (55555 or 55555-4444)')
            }
        }
        if (type === 'email') {
            if (!value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                errors.push('Email must be in correct format (i.e., email@email.com)')
            }
        }
        if (type === 'state') {
            if (!value.match(/AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY/)) {
                errors.push('Must be a valid US State two character code (i.e. TX, CA, CO)')
            }
        }
        if (type === 'phone') {
            if (!value.match(/[0-9]{3}-[0-9]{3}-[0-9]{4}/)) {
                errors.push('Phone number cannot be blank and must be in the 123-123-1234 format')
            }
        }
        this.props.dispatch(pActions.setError(errors))
    }
    render() {
        let states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
        return (
            <div id='pages'>
                <h1 >Welcome to the family! </h1>
                {(this.props.productState.errors) ? (<div style={{ color: 'red', fontWeight: 'bold' }} className='error' >{this.props.productState.errors}</div>) : ('')}
                <div >
                    <form className="px-4 py-3 signup" onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <div className="form-row">
                                    <div className="col-sm-4' ">
                                        <label for="exampleDropdownFormPassword1"> First Name</label>
                                    </div>
                                </div>
                                <input
                                    id="signup firstName"
                                    className="form-control align-items-center"
                                    name='firstName'
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    placeholder='First Name'
                                    onBlur={(e) => this.validate('name', e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-row">
                                    <div className="col-xs-1 col-sm-2' ">
                                        <label for="exampleDropdownFormPassword1">Last Name</label>
                                    </div>
                                </div>
                                <input
                                    id="signup lastName"
                                    className="form-control align-items-center"
                                    name='lastName'
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    placeholder='Last Name'
                                    onBlur={(e) => this.validate('name', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-xs-1 col-sm-2' ">
                                    <label for="exampleDropdownFormPassword1">Street</label>
                                </div>
                            </div>
                            <input
                                id='signup street'
                                className="form-control align-items-center"
                                name='street'
                                type='street'
                                margin="normal"
                                variant="outlined"
                                required
                                placeholder='Street'
                            />
                        </div>
                        <div className="form-row">
                            <div className="col-md-10">
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-xs-1 col-sm-2' ">
                                            <label for="exampleDropdownFormEmail1">City</label>
                                        </div>
                                    </div>
                                    <input
                                        id="signup city"
                                        className="form-control align-items-center"
                                        name='city'
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        placeholder='City'
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-xs-1 col-sm-2' ">
                                            <label for="exampleDropdownFormPassword1">State</label>
                                        </div>
                                    </div>
                                    <select
                                        className='form-control'
                                        name='state'
                                        placeholder='State'
                                        required
                                    >
                                        {states.map(state => (
                                            <option>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-7">
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-xs-1 col-sm-2' ">
                                            <label for="exampleDropdownFormPassword1">Phone</label>
                                        </div>
                                    </div>
                                    <input
                                        id='signup phone'
                                        className="form-control align-items-center"
                                        name='phone'
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        placeholder='Phone Number'
                                        onBlur={(e) => this.validate('phone', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-xs-1 col-sm-2' ">
                                            <label for="exampleDropdownFormPassword1">Zip</label>
                                        </div>
                                    </div>
                                    <input
                                        id='signup zip'
                                        className="form-control align-items-center"
                                        name='zip'
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        placeholder='Zip Code'
                                        onBlur={(e) => this.validate('zip', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-xs-1 col-sm-2' ">
                                    <label for="exampleDropdownFormPassword1">Email</label>
                                </div>
                            </div>
                            <input
                                id="signup email"
                                className="form-control align-items-center"
                                type="email"
                                name="email"
                                margin="normal"
                                variant="outlined"
                                required
                                placeholder='Email'
                                onBlur={(e) => this.validate('email', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-xs-1 col-sm-2' ">
                                    <label for="exampleDropdownFormPassword1">Password</label>
                                </div>
                            </div>
                            <input
                                id='signup password'
                                className="form-control align-items-center"
                                name='password'
                                margin="normal"
                                variant="outlined"
                                required
                                placeholder='Password'
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-xs-1 col-sm-2' ">
                                    <label for="exampleDropdownFormPassword1">Re-enter Password</label>
                                </div>
                            </div>
                            <input
                                id='signup passwordCheck'
                                className="form-control align-items-center"
                                name='passwordCheck'
                                margin="normal"
                                variant="outlined"
                                required
                                placeholder='Re-enter Password'
                            />
                        </div>
                        <div className="form-row">
                            <div className="col-xs-4">
                                <button type="submit" className="btn btn-primary">Sign in</button>
                            </div>
                            <div className="col-xs-4">
                                <button className="btn btn-secondary" onClick={this.props.close}>Close</button>
                            </div>
                        </div>
                    </form>
                </div>
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
export default connect(mapStateToProps)(Signup)
