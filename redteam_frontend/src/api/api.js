/**
|--------------------------------------------------
| Class to hold fetches that can be called
|--------------------------------------------------
*/

    /**
     * Fetches all current products
     */
export const fetchProducts = () => {
        let url = 'http://localhost:8080/products'
        let init = {
            method: 'GET',
            headers: new Headers({
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            }),
        }
        return new Promise((resolve, reject) => {
            return fetch(url, init)
                .then(res => {
                    let jsonResp = res.json();
                    if (res.status <= 204) {
                        return jsonResp;
                    }
                    throw res.status
                })
                .then(jsonResp => {
                    resolve(jsonResp)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }


    
    /**
     * Fetches all current users
     */
export const fetchUsers = () => {
    let url = 'http://localhost:8080/users'
    let init = {
        method: 'GET',
        headers: new Headers({
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            "authorization": "Bearer " + sessionStorage.getItem('id_token')
        }),
    }
    return new Promise((resolve, reject) => {
        return fetch(url, init)
            .then(res => {
                let jsonResp = res.json();
                if (res.status !== 200) {
                    throw res.status 
                }
                return jsonResp;
            })
            .then(jsonResp => {
                resolve(jsonResp)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * Gets a user utilizing email.
 * @param {string} email 
 */
export const fetchUserByEmail = (email) => {
    let url = 'http://localhost:8080/users/email?email=' + email
    console.log(url);
    let init = {
        method: 'GET',
        headers: new Headers({
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            "authorization": "Bearer " + sessionStorage.getItem('id_token')
        }),
    }
    return new Promise((resolve, reject) => {
        return fetch(url, init)
            .then(res => {
                let jsonResp = res.json();
                if (res.status !== 200) {
                    throw res.status 
                }
                console.log(jsonResp);
                return jsonResp;
            })
            .then(jsonResp => {
                resolve(jsonResp)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

    /**
     * deletes a user from the database.
     */

    export const deleteUser = (id) => {
        let url = 'http://localhost:8080/users/' + id;
        let init = {
            method: 'DELETE',
            headers: new Headers({
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                "authorization": "Bearer " + sessionStorage.getItem("id_token")
            }),
            mode: 'cors',
        }
        return new Promise((resolve, reject) => {
            return fetch(url, init)
                .then(response => {
                    if (response.status !== 204) {
                        throw response
                    }
                })
                .then(response => { 
                    resolve(response) 
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }


        /**
     * Edits users in database.
     */

export const editUsers = (user) => {
    let url = 'http://localhost:8080/users/' + user.id;
    let init = {
        method: 'PUT',
        headers: new Headers({
            'Accept': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            "authorization": "Bearer " + sessionStorage.getItem('id_token')
        }),
        mode: 'cors',
        body: JSON.stringify(user),
    }
    return new Promise((resolve, reject) => {
        return fetch(url, init)
            .then(response => {
                if (response.status !== 200) {
                    throw response
                }
            })
            .then(response => { 
                resolve(response) 
            })
            .catch((error) => {
                reject(error);
            });
    })
}


    /**
     * Posts a new user to the database
     */
export const addUser = (newUser) => {
        let url = 'http://localhost:8080/signUp';
        let init = {
            method: 'POST',
            headers: new Headers({
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            }),
            mode: 'cors',
            body: JSON.stringify(newUser)
        }
        return new Promise((resolve, reject) => {
            return fetch(url, init)
                .then(res => {
                    let jsonResp = res.json();
                    if (res.status <= 204) {

                        return jsonResp;
                    }
                    throw res.status

                })
                .then(jsonResp => {
                    resolve(jsonResp)
                })
                .catch((err) => {
                    reject(err)
                })
        })

    }
    /**
     * fetches popular products
     */
export const getPop = () => {
        let url = 'http://localhost:8080/products/popular';
        let init = {
            method: 'GET',
            headers: new Headers({
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            }),
        }
        return new Promise((resolve, reject) => {
            return fetch(url, init)
                .then(res => {
                    let jsonResp = res.json();
                    if (res.status <= 204) {
                        return jsonResp;
                    }
                    throw res.status
                })
                .then(jsonResp => {
                    resolve(jsonResp)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    /**
     * Adds a products to the database
     */

export const addProd = (product) => {
        let url = 'http://localhost:8080/products';
        let init = {
            method: 'POST',
            headers: new Headers({
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                "authorization": "Bearer " + sessionStorage.getItem('id_token')
            }),
            mode: 'cors',
            body: JSON.stringify(product)
        }
        return new Promise((resolve, reject) => {
            return fetch(url, init)
                .then(res => {
                    let jsonResp = res.json();
                    if (res.status <= 204) {
                        return jsonResp;
                    }
                    throw res.status
                })
                .then(jsonResp => {
                    resolve(jsonResp)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    /**
     * deletes a product from the database.
     */

export const deleteProduct = (id) => {
        let url = 'http://localhost:8080/products/' + id;
        let init = {
            method: 'DELETE',
            headers: new Headers({
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                "authorization": "Bearer " + sessionStorage.getItem('id_token')
            }),
            mode: 'cors',
        }
        return new Promise((resolve, reject) => {
            return fetch(url, init)
                .then(response => {
                    if (response.status !== 204) {
                        throw response
                    }
                })
                .then(response => { 
                    resolve(response) 
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }
    
    /**
     * Edits products in database.
     */

export const editProduct = (product) => {
        let url = 'http://localhost:8080/products/' + product.id;
        let init = {
            method: 'PUT',
            headers: new Headers({
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                "authorization": "Bearer " + sessionStorage.getItem('id_token')
            }),
            mode: 'cors',
            body: JSON.stringify(product),
        }
        return new Promise((resolve, reject) => {
            return fetch(url, init)
                .then(response => {
                    if (response.status !== 200) {
                        throw response
                    }
                })
                .then(response => { 
                    resolve(response) 
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }


