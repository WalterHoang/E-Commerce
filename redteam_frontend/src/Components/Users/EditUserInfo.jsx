import React, { Component } from 'react';
import * as actions from '../../Redux/Actions/userActions';
import { connect } from 'react-redux';
import DoubleCheckDeleteModal from './DoubleCheckDeleteModal';
import { withRouter, Redirect } from 'react-router-dom';


class EditUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Grabs the user information from the backend.
     */
    componentDidMount() {
        this.props.dispatch(actions.setUsersToEdit());
    }

    /**
     * Upon successful editing, the user will be redirected to the homepage.
     */
    componentDidUpdate(){
        if(this.state.redirect === true){
            return window.location.replace("/")
        }
    }

    /**
     * This basically structures the user object dependedent on whether the address is there or not, and if it is a customer.
     * @param {event} e 
     */
    handleEditUserObject (e) {
        
        let firstNameForm = e.target.firstName.value;
        let lastNameForm = e.target.lastName.value;
        let phoneForm = e.target.phone.value;
        let streetForm = e.target.street.value;
        let cityForm = e.target.city.value;
        let stateForm = e.target.state.value;
        let zipForm = e.target.zip.value;

        let {
            role, id, email, password
        } = this.props.userState.infoToEdit;


        if (this.props.userState.infoToEdit.address !== null && this.props.userState.infoToEdit.address !== undefined) {
            let {
                street, city, state, zip
            } = this.props.userState.infoToEdit.address

            let addressUser = {
                street: (streetForm !== null) ? streetForm : street,
                city: (cityForm !== null) ? cityForm : city,
                state: (stateForm !== null) ? stateForm : state,
                zip: (zipForm !== null) ? zipForm : zip,
            }

            let editUserWithAddress = {
                id: id,
                firstName: firstNameForm,
                lastName: lastNameForm,
                phone: phoneForm,
                email: email,
                address: addressUser,
                role: role,
                password: password,
            }
            return editUserWithAddress;
        } else if (this.props.userState.infoToEdit.address !== undefined && this.props.userState.infoToEdit.address === null) {
            let addressUserFromForm = {
                street: streetForm,
                city: cityForm,
                state: stateForm,
                zip: zipForm,
            }

            let editUserWithoutAddress = {
                id: id,
                firstName: firstNameForm,
                lastName: lastNameForm,
                phone: phoneForm,
                email: email,
                address: addressUserFromForm,
                role: role,
                password: password,
            }
            return editUserWithoutAddress;
        }
        else {
            let editUserNoAddress = {
                id: id,
                firstName: firstNameForm,
                lastName: lastNameForm,
                phone: phoneForm,
                email: email,
                address: null,
                role: role,
                password: password,
            }
            return editUserNoAddress;
        }
    }

    /**
     * Handles the submit function, by only submitting if the error state is empty.
     * If it is, it updates the componenets state to trigger the relocation to the homepage.
     * @param {event} e 
     */
    handleSubmit(e) {
        e.preventDefault();

        if (this.props.userState.errors.length === 0) {
          let editOb = this.handleEditUserObject(e);
          this.props.dispatch(actions.editUsersAsync(editOb));
          this.setState({
              redirect: true,
          })
        }
    }

    /**
     * Validates the inputs, when you move away from them.
     * Based on "type".
     */
    validate = (type, value) => {
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
        this.props.dispatch(actions.setUserError(errors));
    }

    /**
     * If the user wishes to delete their account, a modal will pop up with additional verification options.
     */
    handleDeleteAttempt = (event) => {
        event.preventDefault();
        this.props.dispatch(actions.handleModal(true));
    }


    render() {
        let states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

        let {
            firstName, lastName, phone,
        } = this.props.userState.infoToEdit;

        if (this.props.userState.infoToEdit.address !== undefined && this.props.userState.infoToEdit.address === null) {
            return (
                <div id='pages'>

                    <DoubleCheckDeleteModal
                        open={this.props.userState.opener}
                        centered
                    />

                    {(this.props.userState.errors) ? (<div style={{ color: 'red', fontWeight: 'bold' }} className='error' >{this.props.userState.errors}</div>) : ('')}

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
                                        id="signup editInfo firstName"
                                        className="form-control align-items-center"
                                        name='firstName'
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        placeholder='First Name'
                                        defaultValue={firstName}
                                        ref="firstName"
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
                                        defaultValue={lastName}
                                        required
                                        placeholder='Last Name'
                                        ref="lastName"
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
                                    ref="street"
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
                                        >
                                            {states.map((state, key) => (
                                                <option key={key + state}>
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
                                            defaultValue={(phone !== null)? phone: "Enter Phone Number: ex '111-111-1111' "}
                                            required
                                            placeholder='Phone Number'
                                            ref="phone"
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
                                            placeholder='Zip Code'
                                            ref="zip"
                                            onBlur={(e) => this.validate('zip', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-xs-4">
                                    <button type="submit" className="btn btn-primary" >Submit Info</button>
                                </div>
                                <div className="col-xs-4">
                                    <button className="btn btn-primary" onClick={this.handleDeleteAttempt}>Delete Account</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }

        if (this.props.userState.infoToEdit.address !== null && this.props.userState.infoToEdit.address !== undefined) {
            let {
                street, city, state, zip
            } = this.props.userState.infoToEdit.address

            return (
                <div id='pages'>

                    <DoubleCheckDeleteModal
                        open={this.props.userState.opener}
                        centered
                    />

                    {(this.props.userState.errors) ? (<div style={{ color: 'red', fontWeight: 'bold' }} className='error' >{this.props.userState.errors}</div>) : ('')}
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
                                        id="signup editInfo firstName"
                                        className="form-control align-items-center"
                                        name='firstName'
                                        margin="normal"
                                        variant="outlined"
                                        required
                                        placeholder='First Name'
                                        defaultValue={firstName}
                                        ref="firstName"
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
                                        defaultValue={lastName}
                                        required
                                        placeholder='Last Name'
                                        ref="lastName"
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
                                    defaultValue={street}
                                    required
                                    ref="street"
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
                                            defaultValue={city}
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
                                            defaultValue={state}
                                        >
                                            {states.map((state, key) => (
                                                <option key = {key + state}>
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
                                            defaultValue={(phone !== null)? phone: "Enter Phone Number: ex '111-111-1111' "}
                                            required
                                            placeholder='Phone Number'
                                            ref="phone"
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
                                            defaultValue={zip}
                                            placeholder='Zip Code'
                                            ref="zip"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-xs-4">
                                    <button type="submit" className="btn btn-primary" >Submit Info</button>
                                </div>
                                <div className="col-xs-4">
                                    <button className="btn btn-primary" onClick={this.handleDeleteAttempt}>Delete Account</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }


        if (sessionStorage.getItem("email") === null) {
            return <Redirect to="/" />
        }

        return (
            <div id="pages">
                Loading...
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
        userState: state.users,
    }
}
export default withRouter(connect(mapStateToProps)(EditUserInfo));