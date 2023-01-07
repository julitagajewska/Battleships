import axios from 'axios';
import User from '../Models/User';

export default axios.create({
    baseURL: 'http://localhost:7777/'
})

axios.defaults.baseURL = 'http://localhost:7777/';


const defaultImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";

export const getUsers = async () => {
    let users = [];
    let response = await axios.get('users');
    users = response.data;
    return users;
}

export const getNewId = async () => {
    let users = [];
    let response = await axios.get('users');
    users = response.data;

    let ids = [];

    users.forEach(user => {
        ids.push(parseInt(user.id))
    });

    ids = ids.sort(function (a, b) { return a - b; });

    return ids[ids.length - 1] + 1;
}

export const checkUsername = async (username) => {
    let users = [];
    let response = await axios.get('users');
    users = response.data;

    let usernames = users.map((user) => {
        return (user.username);
    })

    return usernames.includes(username) ? false : true;
}

export const registerUser = async (user) => {

    let newId = await getNewId();

    user.id = newId;
    user.image = defaultImage;

    console.log(user)

    try {
        await axios.post('users', user);
    } catch (error) {
        console.log(error);
    }
}