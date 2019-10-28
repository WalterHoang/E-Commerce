import React, { Component } from 'react'
import * as actions from '../../Redux/Actions/loginActions';
import * as pActions from '../../Redux/Actions/productActions';
import { connect } from 'react-redux'
import Signup from './Signup';
import './Login.css'
/**
 * This component allows for a user to login
 * with their email and password
 */
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signUp: false
        }
    }
    componentDidMount = () => {
        this.props.dispatch(pActions.handleModal(false));
        this.props.dispatch(pActions.setProductsAsync())
    }
    
    /**
     * This function redirects the user to the homepage after logging
     * in successfully
     */
    redirect() {
        sessionStorage.setItem('id_token', this.props.token);
        this.props.dispatch(actions.redirect());
    }
    /**
     * This function sends an action to the saga to
     * login a user when they submit their credentials
     */
    handleLogin = (e) => {
        e.preventDefault();
        const eail = e.target.georgie.value;
        const pss = e.target.harrison.value;
        let creds = {
            email: eail,
            password: pss
        }
        let jsonCreds = JSON.stringify(creds);
        this.props.dispatch(actions.initLoginAsync(jsonCreds, eail));

        sessionStorage.setItem('id_token', this.props.token)

    }
    /**
     * Displays the signup modal
     */
    showSignup = (e) => {
        this.setState({ signUp: true })
        //this.props.dispatch(pActions.setError([]))
    }
    /**
     * Closes the signup modal
     */
    closeSignup = () => {
        this.setState({ signUp: false })
    }
    render() {

        if (this.props.token && !this.props.role) {
            sessionStorage.setItem('id_token', this.props.token);
            this.props.dispatch(actions.getRoleAsync(this.props.token));
        }
        return (
            <div>
                {this.state.signUp ? (
                    <Signup
                        close={this.closeSignup}
                    />
                ) : (
                        <div id="pages">
                            <h1>Login to see prices, product details, and more!</h1>
                            {(this.props.productState.errors) ? (<div style={{ color: 'red', fontWeight: 'bold' }} className='error' >{this.props.productState.errors}</div>) : ('')}
                            <form className="px-4 py-3 login-form" onSubmit={this.handleLogin}>
                                <div className="form-row">
                                    <div className="col-xs-1 col-sm-2' ">
                                        <label for="exampleDropdownFormEmail1">Email address</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input name="georgie"
                                        type="email"
                                        placeholder="Email"
                                        className="form-control"
                                        defaultValue='admin@catalyte.io'
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="col-xs-1 col-sm-2' ">
                                        <label for="exampleDropdownFormEmail1">Password</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input name="harrison"
                                        type="password"
                                        placeholder="Password"
                                        className="form-control"
                                        defaultValue='pass@word1'
                                    />
                                </div>
                                <div className="col-xs-4 justify-content-center">
                                    <button type="submit" className="btn btn-primary">Sign in</button>
                                </div>
                                <br></br>
                                <p className='signup-btn' onClick={this.showSignup}>New around these parts? Sign up here!</p>
                            </form>
                        </div>
                    )}
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
        token: state.loginStuff.token,
        role: state.loginStuff.role,
        placeholder: state.loginStuff.err,
        productState: state.product,
        userState: state.users,
    }
}

export default connect(mapStateToProps)(Login);

/* <form className='login' >
<label>Email</label>
<input name="georgie"
    type="email"
    placeholder="Email"
    className="mr-sm-12"
    ref={emailInput => (this._emailInput = emailInput)}
    defaultValue='admin@catalyte.io'
/>
<label>Password</label>
<input name="harrison"
    type="password"
    placeholder="Password"
    className="mr-sm-12"
    ref={passInput => (this._passInput = passInput)}
    defaultValue='pass@word1'
/>
<input type='submit' />
</form> */
