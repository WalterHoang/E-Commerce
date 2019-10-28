/**
 * url and its paths
 */
const API = 'http://localhost:8080';
const login = '/login';
const roles = '/roles';

/**
 * Database call to see if the creds are valid
 * @param {credentials for login} data 
 */
export const firstLogin = (data) => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    let reqBody = data.data;
    sessionStorage.setItem('email', data.email);
    let myInit = {
        method: 'POST',
        headers: headers,
        mode: 'cors',
        body: reqBody
    };
    return new Promise((resolve, reject) => {

        return fetch(API + login, myInit)
            .then(response => {

                if (response.status <= 204) {
                    let jsonResponse = response.json();
                    return jsonResponse;
                }
                throw response.status
            })
            .then(jsonResponse => {
                resolve(jsonResponse.token);
            })
            .catch((err) => {
                reject(err);

            })
    })
}
/**
 * Database call to retrieve the role of a user
 * @param {*} token 
 */
export const getRoleApi = (token) => {
    let headers1 = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
    };
    let myInit = {
        method: "GET",
        headers: headers1,
        mode: "cors",
        body: null
    };
    return new Promise((resolve, reject) => {
        return fetch(API + login + roles, myInit)
            .then((res) => {
                return res.text();
            })
            .then((role) => {
                sessionStorage.setItem('role', role)
                resolve(role);
            })
            .catch((err) => {
                reject(err);
            })
    })

}