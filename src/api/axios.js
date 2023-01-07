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

export const getUser = async (username) => {
    let users = await getUsers();
    let tragetUser;

    users.filter((user) => {
        if (user.username === username) {
            tragetUser = user;
        }
    })

    console.log(tragetUser);
    return tragetUser;
}

export const editUser = async (user) => {
    try {
        await axios.put(`users/${user.id}`, user)
    } catch (error) {
        console.log(error);
    }
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

export const checkIfUserExists = async (username) => {
    let users = await getUsers();
    let result = false;

    users.forEach((user) => {
        if (user.username === username) {
            result = true;
        }
    })

    return result;
}

export const checkPassword = async (username, password) => {
    let users = await getUsers();
    let result = false;

    users.forEach((user) => {
        if (user.username === username) {
            console.log(user)
            if (user.password === password) {
                result = true;
            }
        }
    })

    console.log(result);

    return result;
}