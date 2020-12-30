import { getFoodById } from "../data.js";

export async function ditails(){
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    const foodId = this.params.id;

    
    const food =  await getFoodById(foodId);
    let flag = false
    if(food.ownerId === this.app.userData.userId){
        flag = true;
    }
    this.app.userData.flag = flag;
    
    
    const context = Object.assign(food, this.app.userData);
    this.partial('./templates/food/ditails.hbs', context);

}