import { getFoodById, updateFood, deleteFood as apiDelete, like as apiLike} from "../data.js";
import { showError, showInfo } from '../notifications.js'

export async function edit(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    const foodId = this.params.id;
    const food =  await getFoodById(foodId);
    const context = Object.assign(food, this.app.userData);
    console.log(context);
    this.partial('./templates/food/edit.hbs', context);
}
export async function editPost(){
    const foodId = this.params.id;
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
        if (!(this.params.foodImageURL.startsWith('http://') || this.params.imageURL.startsWith('https://'))) {
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

        const result = await updateFood(foodId ,food);
        console.log(result);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('successfully edited recipe');
        this.redirect('#/home');
    } catch (err) {
        console.log(err);
        showError(err.message);
    }
    
}
export async function deleteFood(){
    if (confirm('Are you sure you want to arhive this recipe?') == false){
        return this.redirect('#/home');
    }

    const foodId = this.params.id;


    try {

        const result = await apiDelete(foodId);


        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo(`Your recipe was archived.`);
        
        this.redirect('#/home');
    } catch (err) {
        console.log(err);
        showError(err.message);
    }

}

export async function like() {
    const foodId = this.params.id;
    const food =  await getFoodById(foodId);

    try {

        const result = await apiLike(food);


        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo(`You liked that recipe.`);
        console.log(this);
        this.redirect('#/ditails' + result.objectId);
    } catch (err) {
        console.log(err);
        showError(err.message);
    }
}