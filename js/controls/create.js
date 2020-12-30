import { createFood } from '../data.js';
import { showInfo, showError } from '../notifications.js'
export async function create() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/food/create.hbs', this.app.userData);
}
export async function createPost() {
    try {

        if (this.params.meal.length < 4) {
            throw new Error('The meal of the event must be at least 4 English letters.');
        }
        if (typeof this.params.ingredients.length < 2) {
            throw new Error('The ingredients should be at least 2.')
        }
        if (this.params.description.length < 10) {
            throw new Error('The event description should be at least 10 characters.');
        }
        if (this.params.prepMethod.length < 10) {
            throw new Error('The preparation method should be at least 10 characters.');
        }
        if (!(this.params.foodImageURL.startsWith('http://') || this.params.foodImageURL.startsWith('https://'))) {
            throw new Error('Image URL should start with http://... or https://');
        }

        const food = {
            meal: this.params.meal,
            ingredients: this.params.ingredients.split(',').map(i => i.trim()),
            method: this.params.prepMethod,
            description: this.params.description,
            foodImage: this.params.foodImageURL,
            category: this.params.category,
            owner: this.app.userData.username
        }

        const result = await createFood(food);
        console.log(result);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Recipe shared successfully!');
        this.redirect('#/ditails' + result.objectId);
    } catch (err) {
        console.log(err);
        showError(err.message);
    }

}