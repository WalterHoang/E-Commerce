import constants from '../constants';
/**
 * This function creates a burger action to activate the navigation menu to subcategories of men's products 
 * @param {boolean} flag show navigation? true or false
 */
export function showMen(flag) {
    return {
        type: constants.SHOW_MEN,
        payload: flag
    }
}
/**
 * This function creates a burger action to activate the navigation menu to subcategories of women's products 
 * @param {boolean} flag show navigation? true or false
 */
export function showWomen(flag) {
    return {
        type: constants.SHOW_WOMEN,
        payload: flag
    }
}
/**
 * This function creates a burger action to activate the navigation menu to subcategories of children's products 
 * @param {boolean} flag show navigation? true or false
 */
export function showChildren(flag) {
    return {
        type: constants.SHOW_CHILDREN,
        payload: flag
    }
}