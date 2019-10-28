import React, { Component } from 'react';
import * as actions from '../../Redux/Actions/burgerActions';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import './ResponsiveNavBar.css';

class Burger extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    /**
    * Activates the action to show or hide navigation options in the burger
    */
    showDropdownMen() {
        if (this.props.showMen) {
            this.props.dispatch(actions.showMen(false));
        } else {
            this.props.dispatch(actions.showMen(true));
        }
    }
    /**
     * Activates the action to show or hide navigation options in the burger
     */
    showDropdownWomen() {
        if (this.props.showWomen) {
            this.props.dispatch(actions.showWomen(false));
        } else {
            this.props.dispatch(actions.showWomen(true));
        }
    }
    /**
     * Activates the action to show or hide navigation options in the burger
     */
    showDropdownChildren() {
        if (this.props.showChildren) {
            this.props.dispatch(actions.showChildren(false));
        } else {
            this.props.dispatch(actions.showChildren(true));
        }
    }
    render() {
        let menClasses;
        if (this.props.showMen) {
            menClasses = ('dropdown-content-noHover', 'show');
        } else {
            menClasses = ('dropdown-content-noHover');
        }
        let womenClasses;
        if (this.props.showWomen) {
            womenClasses = ('dropdown-content-noHover', 'show');
        } else {
            womenClasses = ('dropdown-content-noHover');
        }
        let childrenClasses;
        if (this.props.showChildren) {
            childrenClasses = ('dropdown-content-noHover', 'show');
        } else {
            childrenClasses = ('dropdown-content-noHover');
        }
        return (
            <table id="burger">
                <tbody id="burgerBody">
                    <tr id="burgerMen">
                        <td className="dropdown">
                            <p style={{ marginBottom: 0, color: '85, 108, 112', fontSize: 20, fontWeight: 'bold' }} onClick={this.showDropdownMen.bind(this)}>Men's</p>
                            <div className={menClasses}>
                                <hr style={{ marginTop: 0, marginBottom: '1px' }} />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/men" >All men's</NavLink><br />
                                <hr style={{ marginTop: 0, marginBottom: '1px' }} />
                                <p style={{ color: '85, 108, 112', marginBottom: 0 }}>BY SPORT</p>
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/men/basketball">Basketball</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/men/soccer">Soccer</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/men/baseball">Baseball</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/men/golf">Golf</NavLink><br />
                                <hr style={{ marginTop: 0, marginBottom: '1px' }} />
                                <p style={{ marginBottom: 0 }}>BY TYPE</p>
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/men/shoes">Shoes</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/men/shirts">Shirts</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/men/pants">Pants</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/men/balls">Balls</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/men/equipment">Equipment</NavLink>
                                <hr style={{ marginTop: 0, marginBottom: '1px' }} />
                            </div>
                        </td>
                    </tr>
                    <tr id="burgerWomn">
                        <td className="dropdown">
                            <p style={{ marginBottom: 0, color: '85, 108, 112', fontSize: 20, fontWeight: 'bold' }} onClick={this.showDropdownWomen.bind(this)}>Women's</p>
                            <div className={womenClasses}>
                                <hr style={{ marginTop: 0, marginBottom: '1px' }} />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/women" >All women's</NavLink><br />
                                <hr style={{ marginTop: 0, marginBottom: '1px' }} />
                                <p style={{ color: 'grey', marginBottom: 0 }}>BY SPORT</p>
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/women/basketball">Basketball</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/women/soccer">Soccer</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/women/baseball">Baseball</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/women/golf">Golf</NavLink><br />
                                <hr style={{ marginTop: 0, marginBottom: '1px' }} />
                                <p style={{ marginBottom: 0 }}>BY TYPE</p>
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/women/shoes">Shoes</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/women/shirts">Shirts</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/women/pants">Pants</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/women/balls">Balls</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/women/equipment">Equipment</NavLink>
                                <hr style={{ marginTop: 0, marginBottom: '1px' }} />
                            </div>
                        </td>
                    </tr>
                    <tr id="burgerChildren">
                        <td className="dropdown">
                            <p style={{ marginBottom: 0, color: '85, 108, 112', fontSize: 20, fontWeight: 'bold' }} onClick={this.showDropdownChildren.bind(this)}>Children's</p>
                            <div className={childrenClasses}>
                                <hr style={{ marginTop: 0, marginBottom: '1px' }} />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/children" >All Children's</NavLink><br />
                                <hr style={{ marginTop: 0, marginBottom: '1px' }} />
                                <p style={{ marginBottom: 0 }}>BY SPORT</p>
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/children/basketball">Basketball</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/children/soccer">Soccer</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/children/baseball">Baseball</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/children/golf">Golf</NavLink><br />
                                <hr style={{ marginTop: 0, marginBottom: '1px' }} />
                                <p style={{ marginBottom: 0 }}>BY TYPE</p>
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/children/shoes">Shoes</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/children/shirts">Shirts</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/children/pants">Pants</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/children/balls">Balls</NavLink><br />
                                <NavLink style={{ color: '85, 108, 112', fontSize: 12, fontWeight: 'bold' }} to="/children/equipment">Equipment</NavLink>
                                <hr style={{ marginTop: 0, marginBottom: '1px' }} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        );
    }
}
/**
 * This function provides a state to our component
* @param {Object} state
                                      */
const mapStateToProps = (state) => {
    return {

        showMen: state.burger.flagM,
        showWomen: state.burger.flagW,
        showChildren: state.burger.flagC,
    }
}
export default connect(mapStateToProps)(Burger);