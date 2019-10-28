import React, { Component } from 'react';
import { NavLink, BrowserRouter } from "react-router-dom";
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './Footer.css';
import './ResponsiveNavBar.css';
import SearchBar from '../SearchBar/SearchBar';
import Footer from './Footer';
import Bread from './Bread';
import { Nav } from 'react-bootstrap';
import NavRoutes from './NavRoutes';
import Burger from './Burger';

/**
 * This class renders a navbar based on whether a user
 * is logged in or not as well as what kind of user they are
 * (admin, employee, or customer)
 */
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };

    }
    /**
     * This function reloads the page
     * on login or logout
     */
    home() {
        this.props.history.replace('/');
        window.location.reload();
    }
    /**
     * This function logs out a user
     */
    handleLogout() {
        sessionStorage.clear();
        this.props.history.replace('/');
        window.location.reload();
    }

    /**
     * Reloads the page on navigation to Login so the breadcrumbs disappear
     */
    refresh() {
        window.location.reload();
        window.location.replace('/login');
    }
    render() {
        if (this.props.redirect) {
            this.home();
        }

        return (
            <BrowserRouter >
                <div id="navbar">
                    <h1 className="titleBox">
                        <div className="text-left">
                            <div className="flex-row" id="sahara">
                                <img onClick={this.home.bind(this)} id='nav-logo'
                                    src='https://myrealdomain.com/images/s-company-logo-2.png' alt='logo' />
                                <span onClick={this.home.bind(this)} className="navBarHide">SAHARA: Zombification™ of the American Dream </span>

                                {(sessionStorage.getItem('role')) ?
                                    (<div className="flex-row-reverse login1" style={{ color: 'black', fontSize: 20, fontWeight: 'bold', display: "inline-block" }}
                                        label="Login" >

                                        {(sessionStorage.getItem('role') === "ADMIN") ?
                                            (<div className="adminLogin1">
                                                <span className=" dropdown" label="ADMIN">
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 20, fontWeight: 'bold' }} className="dropbtn">
                                                        ADMIN
                                                    <i className="fa fa-caret-down"></i>
                                                    </NavLink>
                                                    <div className="dropdown-content adminOptions" style={{ textAlign: 'center' }}>
                                                        <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }}
                                                            to='/customers'>CUSTOMERS</NavLink>
                                                        <br />
                                                        <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }}
                                                            to='/employees'>EMPLOYEES</NavLink>
                                                        <br />
                                                        <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }}
                                                            to='/products'>PRODUCTS</NavLink>
                                                        <br />
                                                    </div>
                                                </span>
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 20, fontWeight: 'bold' }}
                                                    onClick={this.handleLogout.bind(this)} >
                                                    Logout </NavLink>
                                            </div>
                                            ) :
                                            (sessionStorage.getItem('role') === "CUSTOMER") ?
                                                (<div className="adminLogin2">
                                                    <span className=" dropdown"> {sessionStorage.getItem('email') + '   '}
                                                        <i className="fa fa-caret-down"></i>
                                                        <div className="dropdown-content" style={{ textAlign: 'center' }}>
                                                            <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }}
                                                                to='/edit'>Manage Profile</NavLink>
                                                        </div>
                                                    </span>
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 20, fontWeight: 'bold' }}
                                                        onClick={this.handleLogout.bind(this)} >
                                                        Logout </NavLink>
                                                </div>)
                                                :
                                                (sessionStorage.getItem('role') === "EMPLOYEE") ?
                                                    (<div className="adminLogin">
                                                        <span className=" dropdown"> {sessionStorage.getItem('email') + '   '}
                                                            <i className="fa fa-caret-down"></i>
                                                            <div className="dropdown-content" style={{ textAlign: 'center' }}>
                                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }}
                                                                    to='/edit'>Manage Profile</NavLink>
                                                            </div>
                                                        </span>
                                                        <NavLink style={{ color: '142, 182, 189', fontSize: 20, fontWeight: 'bold' }}
                                                            onClick={this.handleLogout.bind(this)} >
                                                            Logout </NavLink>
                                                    </div>)
                                                    :
                                                    (
                                                        <div className=" flex-row-reverse login2" style={{ fontSize: 20, fontWeight: 'bold', display: "inline-block" }}
                                                            label="Login" >
                                                            <NavLink onClick={this.refresh} style={{ padding: 20, fontSize: 20, fontWeight: 'bold' }} to='/login' >
                                                                Login
                                                    </NavLink>
                                                        </div>
                                                    )}
                                    </div>) :
                                    (
                                        <div className=" flex-row-reverse login2" style={{ fontSize: 20, fontWeight: 'bold', display: "inline-block" }}
                                            label="Login" >
                                            <NavLink onClick={this.refresh} style={{ padding: 20, fontSize: 20, fontWeight: 'bold' }} to='/login' >
                                                Login
                                    </NavLink>
                                        </div>
                                    )}

                            </div>
                        </div>
                    </h1>
                    <table id="page-nav" className="container">
                        <tr id="searchBar">
                            <SearchBar id="searchBar2" style={{ color: '142, 182, 189', fontSize: 20, fontWeight: 'bold' }}
                                class="dropbtn" />
                        </tr>
                        <label htmlFor="hamburger">
                            <div>
                                &#9776;
                                    </div>
                        </label>
                        <input type="checkbox" id="hamburger" />
                        <tbody>
                            {(sessionStorage.getItem('role') === 'ADMIN') ?
                                (<tr name="whole-navbar-with-burger" id="top" className="row" >
                                    <Burger />
                                    <Nav className="nav nav-pills" id="notBurger" style={{ left: 0, float: "left" }}>
                                        <td className="nav-item dropdown" label="ALL" >
                                            <NavLink style={{ color: '142, 182, 189', padding: 20, fontSize: 20, fontWeight: 'bold' }}
                                                className="nav-link dropbtn" to="/all" >
                                                ALL
                                                <i className="fa fa-caret-down"></i>
                                            </NavLink>
                                            <div className="dropdown-content">
                                                <p>BY SPORT</p>
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/basketball">Basketball</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/soccer">Soccer</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/baseball">Baseball</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/golf">Golf</NavLink><br />
                                                <hr />
                                                <p>BY TYPE</p>
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/shoes">Shoes</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/shirts">Shirts</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/pants">Pants</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/balls">Balls</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/equipment">Equipment</NavLink>
                                            </div>
                                        </td>
                                        <td className="nav-item dropdown" label="MENS" >
                                            <NavLink style={{ color: '142, 182, 189', padding: 20, fontSize: 20, fontWeight: 'bold' }}
                                                className="nav-link dropbtn" to="/men">
                                                MEN'S
                                                    <i className="fa fa-caret-down"></i>
                                            </NavLink>
                                            <div className="dropdown-content">
                                                <p>BY SPORT</p>
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/basketball">Basketball</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/soccer">Soccer</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/baseball">Baseball</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/golf">Golf</NavLink><br />
                                                <hr />
                                                <p>BY TYPE</p>
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/shoes">Shoes</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/shirts">Shirts</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/pants">Pants</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/balls">Balls</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/equipment">Equipment</NavLink>
                                            </div>
                                        </td>
                                        <td className="nav-item dropdown" label="WOMENS" to="/women">
                                            <NavLink style={{ color: '142, 182, 189', padding: 20, fontSize: 20, fontWeight: 'bold' }}
                                                className="nav-link dropbtn" to="/women">
                                                WOMEN'S
                                                <i className="fa fa-caret-down"></i>
                                            </NavLink>
                                            <div className="dropdown-content">
                                                <p>BY SPORT</p>
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/basketball">Basketball</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/soccer">Soccer</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/baseball">Baseball</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/golf">Golf</NavLink><br />
                                                <hr />
                                                <p>BY TYPE</p>
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/shoes">Shoes</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/shirts">Shirts</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/pants">Pants</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/balls">Balls</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/equipment">Equipment</NavLink>
                                            </div>
                                        </td>
                                        <td className="nav-item dropdown" label="CHILDRENS" >
                                            <NavLink style={{ color: '142, 182, 189', padding: 20, fontSize: 20, fontWeight: 'bold' }}
                                                className="nav-link dropbtn" to="/children" >
                                                CHILDREN'S
                                                    <i className="fa fa-caret-down"></i>
                                            </NavLink>
                                            <div className="dropdown-content">
                                                <p>BY SPORT</p>
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/basketball">Basketball</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/soccer">Soccer</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/baseball">Baseball</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/golf">Golf</NavLink><br />
                                                <hr />
                                                <p>BY TYPE</p>
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/shoes">Shoes</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/shirts">Shirts</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/pants">Pants</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/balls">Balls</NavLink><br />
                                                <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/equipment">Equipment</NavLink>
                                            </div>
                                        </td>
                                    </Nav>
                                </tr>
                                )
                                :
                                (
                                    <tr name="whole-navbar-with-burger-not-admin" id="top" className="row">
                                        <Burger />
                                        <Nav className="nav nav-pills" id="notBurger" style={{ left: 0, float: "left" }}>
                                            <td className="nav-item dropdown" label="ALL" >
                                                <NavLink style={{ color: '142, 182, 189', padding: 20, fontSize: 20, fontWeight: 'bold' }}
                                                    className="nav-link dropbtn" to="/all" >
                                                    ALL
                                                            <i className="fa fa-caret-down"></i>
                                                </NavLink>
                                                <div className="dropdown-content">
                                                    <p>BY SPORT</p>
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/basketball">Basketball</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/soccer">Soccer</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/baseball">Baseball</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/golf">Golf</NavLink><br />
                                                    <hr />
                                                    <p>BY TYPE</p>
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/shoes">Shoes</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/shirts">Shirts</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/pants">Pants</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/balls">Balls</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/all/equipment">Equipment</NavLink>
                                                </div>
                                            </td>
                                            <td className="nav-item dropdown" label="MENS" >
                                                <NavLink style={{ color: '142, 182, 189', padding: 20, fontSize: 20, fontWeight: 'bold' }}
                                                    className="nav-link dropbtn"
                                                    to="/men">
                                                    MEN'S
                                                            <i className="fa fa-caret-down"></i>
                                                </NavLink>
                                                <div className="dropdown-content">
                                                    <p>BY SPORT</p>
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/basketball">Basketball</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/soccer">Soccer</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/baseball">Baseball</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/golf">Golf</NavLink><br />
                                                    <hr />
                                                    <p>BY TYPE</p>
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/shoes">Shoes</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/shirts">Shirts</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/pants">Pants</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/balls">Balls</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/men/equipment">Equipment</NavLink>
                                                </div>
                                            </td>
                                            <td className="nav-item dropdown" label="WOMENS" to="/women">
                                                <NavLink style={{ color: '142, 182, 189', padding: 20, fontSize: 20, fontWeight: 'bold' }}
                                                    className="nav-link dropbtn"
                                                    to="/women">
                                                    WOMEN'S
                                                    <i className="fa fa-caret-down"></i>
                                                </NavLink>
                                                <div className="dropdown-content">
                                                    <p>BY SPORT</p>
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/basketball">Basketball</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/soccer">Soccer</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/baseball">Baseball</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/golf">Golf</NavLink><br />
                                                    <hr />
                                                    <p>BY TYPE</p>
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/shoes">Shoes</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/shirts">Shirts</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/pants">Pants</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/balls">Balls</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/women/equipment">Equipment</NavLink>
                                                </div>
                                            </td>
                                            <td className="nav-item dropdown" label="CHILDRENS" >
                                                <NavLink style={{ color: '142, 182, 189', padding: 20, fontSize: 20, fontWeight: 'bold' }}
                                                    className="nav-link dropbtn" to="/children"
                                                >CHILDREN'S
                                                <i className="fa fa-caret-down"></i>
                                                </NavLink>
                                                <div className="dropdown-content">
                                                    <p>BY SPORT</p>
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/basketball">Basketball</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/soccer">Soccer</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/baseball">Baseball</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/golf">Golf</NavLink><br />
                                                    <hr />
                                                    <p>BY TYPE</p>
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/shoes">Shoes</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/shirts">Shirts</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/pants">Pants</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/balls">Balls</NavLink><br />
                                                    <NavLink style={{ color: '142, 182, 189', fontSize: 12, fontWeight: 'bold' }} to="/children/equipment">Equipment</NavLink>
                                                </div>
                                            </td>
                                        </Nav>
                                    </tr>)}
                            <Bread></Bread>
                        </tbody>
                    </table>
                </div>
                <Footer />
                <NavRoutes />
            </BrowserRouter >
        )
    }
}
/**
 * This function provides a state to our component
* @param {Object} state
                                      */
const mapStateToProps = (state) => {
    return {
        redirect: state.loginStuff.redirect,
        token: state.loginStuff.token,
        email: state.loginStuff.creds,
        productState: state.product,
        userState: state.users
    }
}
export default compose(
    withRouter,
    connect(mapStateToProps))(NavBar);