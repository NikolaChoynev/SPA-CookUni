import { getAllFoods } from '../data.js'
export default async function home() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }
    const foods = await getAllFoods();
    console.log();
    const context = Object.assign({foods}, this.app.userData)
    this.partial('./templates/home.hbs', context);
}