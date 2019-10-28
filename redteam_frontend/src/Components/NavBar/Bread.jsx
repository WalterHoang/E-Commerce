import React, { Component } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { BreadcrumbItem } from 'react-bootstrap';
import { NavLink} from "react-router-dom";
import './ResponsiveNavBar.css';
/**
 * This component displays breadcrumbs with the 'history' of the user's navigation, allowing easy movement between pages
 */
class Bread extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let path = window.location.href.toString().substring(22);
        let subPath2 = path.substring(path.indexOf('/') + 1);
        let subPath = path.substring(0, path.indexOf('/'));
        let paths = [];
        let path2;
        if (path.indexOf('/') <= 0 && !subPath && subPath2.length > 0 && subPath2 !== "search" && subPath2 !== "login") {
            if (subPath2 !== "all") {
                paths.push("all");
            }
            paths.push(subPath2)
            return (
                <div className="bread">
                    {(paths.length === 1) ?
                        (
                            <Breadcrumb id="bread">
                                <BreadcrumbItem id="breadActive" active>{paths[0]}</BreadcrumbItem>
                            </Breadcrumb>
                        ) :
                        (paths.length === 2) ?
                            (
                                <Breadcrumb id="bread">
                                    <BreadcrumbItem><NavLink to="/all">{paths[0]}</NavLink></BreadcrumbItem>
                                    <BreadcrumbItem id="breadActive" active>{paths[1]}</BreadcrumbItem>
                                </Breadcrumb>
                            ) :
                            (paths.length === 3) ?
                                (
                                    <Breadcrumb id="bread">
                                        <BreadcrumbItem><NavLink to="/all">{paths[0]}</NavLink></BreadcrumbItem>
                                        <BreadcrumbItem><NavLink to={path2}>{paths[1]}</NavLink></BreadcrumbItem>
                                        <BreadcrumbItem id="breadActive" active>{paths[2]}</BreadcrumbItem>
                                    </Breadcrumb>
                                ) :
                                (
                                    <Breadcrumb id="bread">
                                        <BreadcrumbItem></BreadcrumbItem>
                                    </Breadcrumb>
                                )
                    }</div>)
        } else if (path.indexOf('/') > 0 && subPath2 !== '' && subPath !== '') {
            if (subPath !== "all") {
                paths.push("all");
            }
            paths.push(subPath);
            paths.push(subPath2);
            path2 = "/" + subPath;
            return (
                <div className="bread">
                    {(paths.length === 1) ?
                        (
                            <Breadcrumb id="bread">
                                <BreadcrumbItem active>{paths[0]}</BreadcrumbItem>
                            </Breadcrumb>
                        ) :
                        (paths.length === 2) ?
                            (
                                <Breadcrumb id="bread">
                                    <BreadcrumbItem><NavLink to="/all">{paths[0]}</NavLink></BreadcrumbItem>
                                    <BreadcrumbItem active>{paths[1]}</BreadcrumbItem>
                                </Breadcrumb>
                            ) :
                            (paths.length === 3) ?
                                (
                                    <Breadcrumb id="bread">
                                        <BreadcrumbItem><NavLink to="/all">{paths[0]}</NavLink></BreadcrumbItem>
                                        <BreadcrumbItem><NavLink to={path2}>{paths[1]}</NavLink></BreadcrumbItem>
                                        <BreadcrumbItem active>{paths[2]}</BreadcrumbItem>
                                    </Breadcrumb>
                                ) :
                                (
                                    <Breadcrumb id="bread">
                                        <BreadcrumbItem></BreadcrumbItem>
                                    </Breadcrumb>
                                )
                    }</div>)
        } else if ((path.indexOf('/') < 0 && !subPath2 && !subPath) || subPath2 === "login" || subPath2 === "search") {
            return (
                <div className="bread1"></div>
            );
        }
    }
}
export default Bread;