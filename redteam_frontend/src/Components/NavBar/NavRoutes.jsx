import React, { Component } from 'react';
import {Route, Switch } from "react-router-dom";
import HomePage from './HomePage';
import AdminProduct from '../Product/AdminProduct';
import navComponents from './navComponents';
import EditUserInfo from '../Users/EditUserInfo';
import AdminEmployees from '../Users/AdminEmployees';
import SearchPage from '../SearchBar/SearchPage';
import Login from '../Login/Login';


class NavRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Switch id="pages">
                <Route exact path="/" component={HomePage} />
                <Route exact path='/products' component={AdminProduct} />
                <Route exact path='/edit' component={EditUserInfo} />
                <Route exact path='/employees' component={AdminEmployees} />
                <Route exact path="/all" component={navComponents.ProductsAll} />
                <Route exact path="/men" component={navComponents.MenAll} />
                <Route exact path="/women" component={navComponents.WomenAll} />
                <Route exact path="/children" component={navComponents.ChildrenAll} />
                <Route exact path='/all/baseball' component={navComponents.BaseballAll} />
                <Route exact path='/all/basketball' component={navComponents.BasketballAll} />
                <Route exact path='/all/golf' component={navComponents.GolfAll} />
                <Route exact path='/all/soccer' component={navComponents.SoccerAll} />
                <Route exact path='/all/balls' component={navComponents.BallsAll} />
                <Route exact path='/all/equipment' component={navComponents.EquipmentAll} />
                <Route exact path='/all/pants' component={navComponents.PantsAll} />
                <Route exact path='/all/shirts' component={navComponents.ShirtsAll} />
                <Route exact path='/all/shoes' component={navComponents.ShoesAll} />
                <Route exact path='/search' component={SearchPage} />
                <Route exact path='/children/baseball' component={navComponents.BaseballChildrens} />
                <Route exact path='/men/baseball' component={navComponents.BaseballMens} />
                <Route exact path='/women/baseball' component={navComponents.BaseballWomens} />
                <Route exact path='/children/Basketball' component={navComponents.BasketballChildrens} />
                <Route exact path='/men/Basketball' component={navComponents.BasketballMens} />
                <Route exact path='/women/Basketball' component={navComponents.BasketballWomens} />
                <Route exact path='/children/Golf' component={navComponents.GolfChildrens} />
                <Route exact path='/men/Golf' component={navComponents.GolfMens} />
                <Route exact path='/women/Golf' component={navComponents.GolfWomens} />
                <Route exact path='/children/Soccer' component={navComponents.SoccerChildrens} />
                <Route exact path='/men/Soccer' component={navComponents.SoccerMens} />
                <Route exact path='/women/Soccer' component={navComponents.SoccerWomens} />
                <Route exact path='/children/balls' component={navComponents.BallChildrens} />
                <Route exact path='/men/balls' component={navComponents.BallMens} />
                <Route exact path='/women/balls' component={navComponents.BallWomens} />
                <Route exact path='/children/equipment' component={navComponents.EquipmentChildrens} />
                <Route exact path='/men/equipment' component={navComponents.EquipmentMens} />
                <Route exact path='/women/equipment' component={navComponents.EquipmentWomens} />
                <Route exact path='/children/pants' component={navComponents.PantsChildrens} />
                <Route exact path='/men/pants' component={navComponents.PantsMens} />
                <Route exact path='/women/pants' component={navComponents.PantsWomens} />
                <Route exact path='/children/shirts' component={navComponents.ShirtsChildrens} />
                <Route exact path='/men/shirts' component={navComponents.ShirtsMens} />
                <Route exact path='/women/shirts' component={navComponents.ShirtsWomens} />
                <Route exact path='/children/shoes' component={navComponents.ShoesChildrens} />
                <Route exact path='/men/shoes' component={navComponents.ShoesMens} />
                <Route exact path='/women/shoes' component={navComponents.ShoesWomens} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/customers' component={navComponents.Customers} />
                <Route exact path='/employees' component={navComponents.Employees} />
                <Route exact path='/addEmployee' component={navComponents.addEmployee} />
            </Switch>
        );
    }
}

export default NavRoutes;