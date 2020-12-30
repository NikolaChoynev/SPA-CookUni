import register, {registerPost} from './controls/register.js';
import home from './controls/home.js';
import login, {loginPost} from './controls/login.js';
import { logout } from './controls/logout.js';
import { create, createPost } from './controls/create.js';
import { ditails } from './controls/ditails.js';
import { edit, editPost, deleteFood, like } from './controls/edit.js';


window.addEventListener('load', () => {
    const app = Sammy('#rooter', function(){
        this.use('Handlebars', 'hbs');
        this.userData = {
            username: localStorage.getItem('username') || '',
            userId: localStorage.getItem('userId') || '',
            firstname: localStorage.getItem('firstname') || '',
            lastname: localStorage.getItem('lastname') || ''
        };
        this.get('/', home);
        this.get('index.html', home);
        this.get('#/home', home);

        this.get('#/register', register);
        this.post('#/register', ctx => { registerPost.call(ctx) });

        this.get('#/login', login);
        this.post('#/login', ctx => { loginPost.call(ctx) });

        this.get('#/logout', logout);

        this.get('#/create', create);
        this.post('#/create', ctx => { createPost.call(ctx) });

        this.get('#/ditails:id', ditails);

        this.get('#/edit:id', edit);
        this.post('#/edit:id', ctx => { editPost.call(ctx) });

        this.get('#/delete:id', deleteFood);

        this.get('#/like:id', like);



        




        





    });
    app.run();
});