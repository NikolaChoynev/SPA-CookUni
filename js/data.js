import { beginRequest, endRequest} from './notifications.js'
function host(endpoint){
    return `https://api.backendless.com/9940051F-91BC-8C98-FFB0-EB42952AA900/00590465-818A-40E0-96B8-403913B905E2/${endpoint}`;
}
const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    FOODS: 'data/foods'
}
function getOptios() {
    const token = localStorage.getItem('userToken');

    const options = { headers: {} };

    if (token !== null) {
        options.headers = {
            'user-token': token
        };
    }
    return options;
}
async function get(endpoint) {

    beginRequest();
    const result =  await (await fetch(host(endpoint), getOptios()));
    endRequest();

    return result;
}
async function post(endpoint, body) {
    const options = getOptios();

    options.method = 'POST';
    options.headers['Content-type'] = 'application/json';
    options.body = JSON.stringify(body);

    beginRequest();

    const result = (await fetch(host(endpoint), options)).json();

    endRequest();

    return result;
}
async function put(endpoint, body) {
    const options = getOptios();

    options.method = 'PUT';
    options.headers['Content-type'] = 'application/json';
    options.body = JSON.stringify(body);

    beginRequest();

    const result = (await fetch(host(endpoint), options)).json();

    endRequest();

    return result;
}
export async function register(firstname, lastname, username, password) {
    return post(endpoints.REGISTER, { firstname, lastname, username, password });
}
export async function login(username, password) {
    const result = await (post(endpoints.LOGIN, { login: username, password }));

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);
    localStorage.setItem('firstname', result.firstname);
    localStorage.setItem('lastname', result.lastname);


    return result;
}
export async function logout() {
    localStorage.removeItem('userToken');
    return get(endpoints.LOGOUT);
}
export async function getAllFoods() {
    return await (await (get(endpoints.FOODS))).json();
}
export async function getFoodsByOwner() {
    

    const token = localStorage.getItem('userToken');
    const ownerId = localStorage.getItem('userId');

    const result = await (await get(endpoints.FOODS + `?where=ownerId%3D%27${ownerId}%27`)).json();


    return result;
}
export async function getFoodById(id) {
    return await (await (get(endpoints.FOODS + `/${id}`))).json();
}
export async function createFood(food) {
    return await post(endpoints.FOODS, food);
}
export async function updateFood(id, updatedProps) {
    return await put(endpoints.FOODS + `/${id}`, updatedProps);
}
export async function deleteFood(id) {
    const token = localStorage.getItem('userToken');

    const result = await (await fetch(host(endpoints.FOODS + `/${id}`), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();

    return result;
}
export async function like(event) {
    const newLike = event.likes + 1;
    const foodId = event.objectId;

    return updateFood(foodId, { likes: newLike });
}