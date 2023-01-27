import axios from 'axios';
import User from '../Models/User';

export default axios.create({
    baseURL: 'http://localhost:7777/'
})

axios.defaults.baseURL = 'http://localhost:7777/';


const defaultImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";


// ------- Users requests -------- //

export const getUsers = async () => {
    let users = [];

    try {
        let response = await axios.get('users');
        users = response.data;
    } catch (error) {
        console.log(error);
    }

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

    return tragetUser;
}

export const editUser = async (user) => {
    try {
        await axios.put(`users/${user.id}`, user)
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (user) => {
    try {
        await axios.delete(`users/${user.id}`, user)
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
            if (user.password === password) {
                result = true;
            }
        }
    })

    return result;
}

// -------- Games requests -------- //

export const getAllGames = async () => {
    let games = [];

    try {
        let response = await axios.get('games');
        games = response.data;
    } catch (error) {

    }

    return games;
}

export const getUserGames = async (user) => {
    let games = await getAllGames();

    games.filter((game) => {
        if (game.userA.username === user.username || game.userB.username === user.username) {
            return game
        }
    })

    return games;
}

export const getNewGameId = async () => {
    let games = [];
    let response = await axios.get('games');

    games = response.data;
    if (games.length === 0) {
        return 0;
    }

    let ids = [];

    games.forEach(game => {
        ids.push(parseInt(game.id))
    });

    ids = ids.sort(function (a, b) { return a - b; });

    return ids[ids.length - 1] + 1;

}

export const saveGame = async (game) => {
    try {
        await axios.post('games', game);
    } catch (error) {
        console.log(error);
    }
}

export const getLastThreeGames = async (username) => {
    let games = [];
    let response = await axios.get('games');
    games = response.data;

    let lastThreeGames = games.filter((game) => {
        if (game.userA.username === username || game.userB.username === username) {
            return game
        }
    })

    if (lastThreeGames.length <= 3) {
        return lastThreeGames
    }

    return lastThreeGames.slice(lastThreeGames.length - 3);
}
