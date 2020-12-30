import { logout as apiLogout } from '../data.js';
import {showError, showInfo} from '../notifications.js';


export async function logout() {
    try {
        const result = await apiLogout();
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.username = '';
        this.app.userData.userId = '';
        this.app.userData.firstname = '';
        this.app.userData.lastname = '';



        showInfo('Logout successful.');
        this.redirect('#/home');
    } catch (err) {
        console.log(err);
        showError(err.message);
    }
}