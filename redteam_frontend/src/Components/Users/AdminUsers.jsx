import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import * as actions from '../../Redux/Actions/userActions';
import { connect } from 'react-redux';

class AdminUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        if (sessionStorage.getItem('id_token') && sessionStorage.getItem('role') === "ADMIN") {
            this.props.dispatch(actions.setUsersAsync());
        }
    }

    handleDelete(id){
        this.props.dispatch(actions.deleteUsersAsync(id));
        window.location.reload();
    }

    findAllCustomers(){
        let customers = [];
        let results = []

        this.props.userState.data.forEach(user => {
            user.role.forEach(role => {
                if(Object.values(role).indexOf("CUSTOMER") > -1){
                    customers.push(user);
                }
            })
        })
        results = customers.filter((data, index) => {
            return customers.indexOf(data) === index;//returns the object of the array if the index is equal to the index of the compared object.
        });

        return results;
    }

    render() {

        // return <AddEditUserModal open={true} />

        if (!sessionStorage.getItem('id_token') || sessionStorage.getItem('role') !== "ADMIN") {
            return <div id="pages"> You must be logged in, and an admin to view this page. </div>
        }

        if (this.props.userState.data !== null && this.props.userState.data !== undefined) {
            let customer = this.findAllCustomers();
            return (
                <div id="pages">

                    {/* <div className="addProd">
                        <Button onClick={this.setOpen}>Add Customer</Button>
                    </div> */}

                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Street</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zipcode</th>
                                <th>Roles</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            {customer.map((user, key) => {
                                return (
                                    <tr key={key + ":" + user.id}>
                                        <td key={key + user.id + user.name}>{user.id}</td>
                                        <td key={key + user.firstName}>{user.firstName}</td>
                                        <td key={key + user.lastName}>{user.lastName}</td>
                                        <td key={key + user.phone}>{user.phone}</td>
                                        <td key={key + user.email}>{user.email}</td>
                                        <td key={key + user.id}>{(user.address !== null) ? user.address.street : "No Street Address Found"}</td>
                                        <td key={key + user.id + "city"}>{(user.address !== null) ? user.address.city : "No City Address Found"}</td>
                                        <td key={key + user.id + "state"}>{(user.address !== null) ? user.address.state : "No State Address Found"}</td>
                                        <td key={key + user.id + "zip"}>{(user.address !== null) ? user.address.zip : "No Zipcode Address Found"}</td>
                                        <td>
                                            <div>
                                                <Table striped responsive>
                                                    <tbody>
                                                        {user.role.map(role => {
                                                            return (
                                                                <tr key={key + role.id + user.id}><td>{role.role}</td></tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </td>
                                        <td>
                                            {/* <div>
                                                <Button variant="info" size="sm" onClick={() => this.setEditing()}>Edit</Button>
                                            </div> */}
                                            {(user.email === sessionStorage.getItem("email")) ? null : 
                                            <div>
                                                <Button variant="danger" size="sm" onClick={() => this.handleDelete(user.id)}>Delete</Button>
                                            </div>}
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </Table>
                </div>)
        }

    }


}

/**
 * This function provides a state to our component
 * @param {Object} state 
 */
const mapStateToProps = (state) => {
    return {
        userState: state.users
    }
}
export default connect(mapStateToProps)(AdminUsers);