import React, { Component } from 'react';

import AllProducts from '../ProductsPaths/All/AllProducts';
import AllMen from '../ProductsPaths/Mens/AllMen';
import AllWomen from '../ProductsPaths/Womens/AllWomen';
import AllChildren from '../ProductsPaths/Childrens/AllChildren';
import AllBaseball from '../ProductsPaths/All/singlePath/categories/baseball';
import AllBasketball from '../ProductsPaths/All/singlePath/categories/basketball';
import AllGolf from '../ProductsPaths/All/singlePath/categories/golf';
import AllSoccer from '../ProductsPaths/All/singlePath/categories/soccer';
import AllBalls from '../ProductsPaths/All/singlePath/types/balls';
import AllEquipment from '../ProductsPaths/All/singlePath/types/equipment';
import AllPants from '../ProductsPaths/All/singlePath/types/pants';
import AllShirts from '../ProductsPaths/All/singlePath/types/shirt';
import AllShoes from '../ProductsPaths/All/singlePath/types/shoes';
import ChildrensBaseball from '../ProductsPaths/Childrens/singlePath/categories/baseball';
import ChildrensBasketball from '../ProductsPaths/Childrens/singlePath/categories/basketball';
import ChildrensGolf from '../ProductsPaths/Childrens/singlePath/categories/golf';
import ChildrensSoccer from '../ProductsPaths/Childrens/singlePath/categories/soccer';
import ChildrensBall from '../ProductsPaths/Childrens/singlePath/types/balls';
import ChildrensEquipment from '../ProductsPaths/Childrens/singlePath/types/equipment';
import ChildrensPants from '../ProductsPaths/Childrens/singlePath/types/pants';
import ChildrensShirts from '../ProductsPaths/Childrens/singlePath/types/shirt';
import ChildrensShoes from '../ProductsPaths/Childrens/singlePath/types/shoes';
import MensBaseball from '../ProductsPaths/Mens/singlePath/categories/baseball';
import MensBasketball from '../ProductsPaths/Mens/singlePath/categories/basketball';
import MensGolf from '../ProductsPaths/Mens/singlePath/categories/golf';
import MensSoccer from '../ProductsPaths/Mens/singlePath/categories/soccer';
import MensBall from '../ProductsPaths/Mens/singlePath/types/balls';
import MensEquipment from '../ProductsPaths/Mens/singlePath/types/equipment';
import MensPants from '../ProductsPaths/Mens/singlePath/types/pants';
import MensShirts from '../ProductsPaths/Mens/singlePath/types/shirt';
import MensShoes from '../ProductsPaths/Mens/singlePath/types/shoes';
import WomensBaseball from '../ProductsPaths/Womens/singlePath/categories/baseball';
import WomensBasketball from '../ProductsPaths/Womens/singlePath/categories/basketball';
import WomensGolf from '../ProductsPaths/Womens/singlePath/categories/golf';
import WomensSoccer from '../ProductsPaths/Womens/singlePath/categories/soccer';
import WomensBall from '../ProductsPaths/Womens/singlePath/types/balls';
import WomensEquipment from '../ProductsPaths/Womens/singlePath/types/equipment';
import WomensPants from '../ProductsPaths/Womens/singlePath/types/pants';
import WomensShirts from '../ProductsPaths/Womens/singlePath/types/shirt';
import WomensShoes from '../ProductsPaths/Womens/singlePath/types/shoes';
import AdminUsers from '../Users/AdminUsers';

export default {
    /**
 * Renders all products
 */
    ProductsAll: () => (
        <div id="pages" className="ProductsAll">
            <AllProducts></AllProducts>
        </div>
    ),
    /**
     * Renders all baseball products
     */
    BaseballAll: () => (
        <div id="pages" className="BaseballAll">
            <h1>All Baseball Products</h1>
            <AllBaseball />
        </div>
    ),
    /**
     * Renders all basketball products
     */
    BasketballAll: () => (
        <div id="pages" className="BasketballAll">
            <h1>All Basketball Products</h1>
            <AllBasketball />
        </div>
    ),
    /**
     * Renders all golf products
     */
    GolfAll: () => (
        <div id="pages" className="GolfAll">
            <h1>All Golf Products</h1>
            <AllGolf />
        </div>
    ),
    /**
     * Renders all soccer products
     */
    SoccerAll: () => (
        <div id="pages" className="SoccerAll">
            <h1>All Soccer Products</h1>
            <AllSoccer />
        </div>
    ),
    /**
     * Renders all ball products
     */
    BallsAll: () => (
        <div id="pages" className="BallsAll">
            <h1>All Balls</h1>
            <AllBalls />
        </div>
    ),
    /**
     * Renders all equipment products
     */
    EquipmentAll: () => (
        <div id="pages" className="EquipmentAll">
            <h1>All Equipment</h1>
            <AllEquipment />
        </div>
    ),
    /**
     * Renders all pants products
     */
    PantsAll: () => (
        <div id="pages" className="PantsAll">
            <h1>All Pants</h1>
            <AllPants />
        </div>
    ),
    /**
     * Renders all shirt products
     */
    ShirtsAll: () => (
        <div id="pages" className="ShirtsAll">
            <h1>All Shirts</h1>
            <AllShirts />
        </div>
    ),
    /**
     * Renders all shoe products
     */
    ShoesAll: () => (
        <div id="pages" className="ShoesAll">
            <h1>All Shoes</h1>
            <AllShoes />
        </div>
    ),
    /**
     * Renders all men's products
     */
    MenAll: () => (
        <div id="pages" className="MenAll">
            <h1>Men's Products</h1>
            <AllMen />
        </div>
    ),
    /**
     * Renders all women's products
     */
    WomenAll: () => (
        <div id="pages" className="WomenAll">
            <h1>Women's Products</h1>
            <AllWomen />
        </div>
    ),
    /**
     * Renders all girl's and boy's products
     */
    ChildrenAll: () => (
        <div id="pages" className="ChildrenAll">
            <h1>Children's Products</h1>
            <AllChildren />
        </div>
    ),
    /**
     * Renders all baseball products for girls and boys
     */
    BaseballChildrens: () => (
        <div id="pages" className="BaseballChildrens">
            <h1>Childrens's Baseball</h1>
            <ChildrensBaseball />
        </div>
    ),
    /**
     * Renders all basketball products for girls and boys
     */
    BasketballChildrens: () => (
        <div id="pages" className="BasketballChildrens">
            <h1>Childrens's Basketball</h1>
            <ChildrensBasketball />
        </div>
    ),
    /**
     * Renders all golf products for girls and boys
     */
    GolfChildrens: () => (
        <div id="pages" className="GolfChildrens">
            <h1>Childrens's Golf</h1>
            <ChildrensGolf />
        </div>
    ),
    /**
     * Renders all soccer products for girls and boys
     */
    SoccerChildrens: () => (
        <div id="pages" className="SoccerChildrens">
            <h1>Childrens's Soccer</h1>
            <ChildrensSoccer />
        </div>
    ),
    /**
     * Renders all ball products for girls and boys
     */
    BallChildrens: () => (
        <div id="pages" className="BallChildrens">
            <h1>Balls for Children</h1>
            <ChildrensBall />
        </div>
    ),
    /**
     * Renders all equipment products for girls and boys
     */
    EquipmentChildrens: () => (
        <div id="pages" className="EquipmentChildrens">
            <h1>Childrens's Equipment</h1>
            <ChildrensEquipment />
        </div>
    ),
    /**
     * Renders all pants products for girls and boys
     */
    PantsChildrens: () => (
        <div id="pages" className="PantsChildrens">
            <h1>Childrens's Pants</h1>
            <ChildrensPants />
        </div>
    ),
    /**
     * Renders all shirt products for girls and boys
     */
    ShirtsChildrens: () => (
        <div id="pages" className="ShirtsChildrens">
            <h1>Childrens's Shirts</h1>
            <ChildrensShirts />
        </div>
    ),
    /**
     * Renders all shoe products for girls and boys
     */
    ShoesChildrens: () => (
        <div id="pages" className="ShoesChildrens">
            <h1>Childrens's Shoes</h1>
            <ChildrensShoes />
        </div>
    ),
    /**
     * Renders all baseball products for men
     */
    BaseballMens: () => (
        <div id="pages" className="BaseballMens">
            <h1>Mens's Baseball</h1>
            <MensBaseball />
        </div>
    ),
    /**
     * Renders all basketball products for men
     */
    BasketballMens: () => (
        <div id="pages" className="BasketballMens">
            <h1>Mens's Basketball</h1>
            <MensBasketball />
        </div>
    ),
    /**
     * Renders all golf products for men
     */
    GolfMens: () => (
        <div id="pages" className="GolfMens">
            <h1>Mens's Golf</h1>
            <MensGolf />
        </div>
    ),
    /**
     * Renders all soccer products for men
     */
    SoccerMens: () => (
        <div id="pages" className="SoccerMens">
            <h1>Mens's Soccer</h1>
            <MensSoccer />
        </div>
    ),
    /**
     * Renders all ball products for men
     */
    BallMens: () => (
        <div id="pages" className="BallMens">
            <h1>Balls for Men</h1>
            <MensBall />
        </div>
    ),
    /**
     * Renders all equipment products for men
     */
    EquipmentMens: () => (
        <div id="pages" className="EquipmentMens">
            <h1>Mens's Equipment</h1>
            <MensEquipment />
        </div>
    ),
    /**
     * Renders all pants products for men
     */
    PantsMens: () => (
        <div id="pages" className="PantsMens">
            <h1>Mens's Pants</h1>
            <MensPants />
        </div>
    ),
    /**
     * Renders all shirt products for men
     */
    ShirtsMens: () => (
        <div id="pages" className="ShirtsMens">
            <h1>Mens's Shirts</h1>
            <MensShirts />
        </div>
    ),
    /**
     * Renders all shoe products for men
     */
    ShoesMens: () => (
        <div id="pages" className="ShoesMens">
            <h1>Mens's Shoes</h1>
            <MensShoes />
        </div>
    ),
    /**
     * Renders all baseball products for women
     */
    BaseballWomens: () => (
        <div id="pages" className="BaseballWomens">
            <h1>Womens's Baseball</h1>
            <WomensBaseball />
        </div>
    ),
    /**
     * Renders all basketball products for women
     */
    BasketballWomens: () => (
        <div id="pages" className="BasketballWomens">
            <h1>Womens's Basketball</h1>
            <WomensBasketball />
        </div>
    ),
    /**
     * Renders all golf products for women
     */
    GolfWomens: () => (
        <div id="pages" className="GolfWomens">
            <h1>Womens's Golf</h1>
            <WomensGolf />
        </div>
    ),
    /**
     * Renders all soccer products for women
     */
    SoccerWomens: () => (
        <div id="pages" className="SoccerWomens">
            <h1>Womens's Soccer</h1>
            <WomensSoccer />
        </div>
    ),
    /**
     * Renders all ball products for women
     */
    BallWomens: () => (
        <div id="pages" className="BallWomens">
            <h1>Balls for Women</h1>
            <WomensBall />
        </div>
    ),
    /**
     * Renders all equipment products for women
     */
    EquipmentWomens: () => (
        <div id="pages" className="EquipmentWomens">
            <h1>Womens's Equipment</h1>
            <WomensEquipment />
        </div>
    ),
    /**
     * Renders all pants products for women
     */
    PantsWomens: () => (
        <div id="pages" className="PantsWomens">
            <h1>Womens's Pants</h1>
            <WomensPants />
        </div>
    ),
    /**
     * Renders all shirt products for women
     */
    ShirtsWomens: () => (
        <div id="pages" className="ShirtsWomens">
            <h1>Womens's Shirts</h1>
            <WomensShirts />
        </div>
    ),
    /**
     * Renders all shoe products for women
     */
    ShoesWomens: () => (
        <div id="pages" className="ShoesWomens">
            <h1>Womens's Shoes</h1>
            <WomensShoes />
        </div>
    ),
    Customers: () => (
        <div id="pages" className="customers">
            <AdminUsers />
        </div>
    ),
    Employees: () => (
        <div id="pages" className="employees">
            <h1>Employees</h1>
        </div>
    ),
    addEmployee: () => (
        <div id="pages" className="addEmployees">
            <h1>Add Employee</h1>
        </div>
    )
}