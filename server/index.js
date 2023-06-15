import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(7777, () => console.log("Server address http://localhost:7777"));

app.get('/users', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, usersJson) => {
        if (err) {
            console.log("File read failed in GET /users: " + err);
            res.status(500).send('File read failed');
            return;
        }
        console.log("GET: /users");
        res.send(usersJson);
    });
});

app.get('/users/:id', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, usersJson) => {
        if (err) {
            console.log("File read failed in GET /users/" + req.params.id + ": " + err);
            res.status(500).send('File read failed');
            return;
        }
        var users = JSON.parse(usersJson);
        var user = users.find(usertmp => usertmp.id == req.params.id);
        if (!user) {
            console.log("Can't find user with id: " + req.params.id);
            res.status(500).send('Cant find user with id: ' + req.params.id);
            return;
        }
        var userJSON = JSON.stringify(user);
        console.log("GET /users/" + req.params.id);
        res.send(userJSON);
    });
});

app.post('/users', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, usersJson) => {
        if (err) {
            console.log("File read failed in POST /users: " + err);
            res.status(500).send('File read failed');
            return;
        }
        var users = JSON.parse(usersJson);
        var user = users.find(usertmp => usertmp.id == req.body.id);
        if (!user) {
            users.push(req.body);
            var newList = JSON.stringify(users);
            fs.writeFile('./users.json', newList, err => {
                if (err) {
                    console.log("Error writing file in POST /users: " + err);
                    res.status(500).send('Error writing file users.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file users.json and added new user with id = " + req.body.id);
                }
            });
        } else {
            console.log("user by id = " + req.body.id + " already exists");
            res.status(500).send('user by id = ' + req.body.id + ' already exists');
            return;
        }
    });
});

app.put('/users/:id', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, usersJson) => {
        if (err) {
            console.log("File read failed in PUT /users/" + req.params.id + ": " + err);
            res.status(500).send('File read failed');
            return;
        }
        var users = JSON.parse(usersJson);
        var userBody = users.find(usertmp => usertmp.id == req.body.id);
        if (userBody && userBody.id != req.params.id) {
            console.log("user by id = " + userBody.id + " already exists");
            res.status(500).send('user by id = ' + userBody.id + ' already exists');
            return;
        }
        var user = users.find(usertmp => usertmp.id == req.params.id);
        if (!user) {
            users.push(req.body);
            var newList = JSON.stringify(users);
            fs.writeFile('./users.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /users/" + req.params.id + ": " + err);
                    res.status(500).send('Error writing file users.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file users.json and added new user with id = " + req.body.id);
                }
            });
        } else {
            for (var i = 0; i < users.length; i++) {
                if (users[i].id == user.id) {
                    users[i] = req.body;
                }
            }
            var newList = JSON.stringify(users);
            fs.writeFile('./users.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /users/" + req.params.id + ": " + err);
                    res.status(500).send('Error writing file users.json');
                } else {
                    res.status(200).send(req.body);
                    console.log("Successfully wrote file users.json and edit user with old id = " + req.params.id);
                }
            });
        }
    });
});

app.delete('/users/:id', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, usersJson) => {
        if (err) {
            console.log("File read failed in DELETE /users: " + err);
            res.status(500).send('File read failed');
            return;
        }
        var users = JSON.parse(usersJson);
        var userIndex = users.findIndex(usertmp => usertmp.id == req.params.id);
        if (userIndex != -1) {
            users.splice(userIndex, 1);
            var newList = JSON.stringify(users);
            fs.writeFile('./users.json', newList, err => {
                if (err) {
                    console.log("Error writing file in DELETE /users/" + req.params.id + ": " + err);
                    res.status(500).send('Error writing file users.json');
                } else {
                    res.status(204).send();
                    console.log("Successfully deleted user with id = " + req.params.id);
                }
            });
        } else {
            console.log("user by id = " + req.params.id + " does not exists");
            res.status(500).send('user by id = ' + req.params.id + ' does not exists');
            return;
        }
    });
});

// -------- Games ------- //

app.get('/games', (req, res) => {
    fs.readFile('./games.json', 'utf8', (err, gamesJson) => {
        if (err) {
            console.log("File read failed in GET /games: " + err);
            res.status(500).send('File read failed');
            return;
        }
        console.log("GET: /games");
        res.send(gamesJson);
    });
});

app.get('/games/:id', (req, res) => {
    fs.readFile('./games.json', 'utf8', (err, gamesJson) => {
        if (err) {
            console.log("File read failed in GET /games/" + req.params.id + ": " + err);
            res.status(500).send('File read failed');
            return;
        }
        var games = JSON.parse(gamesJson);
        var game = games.find(gametmp => gametmp.id == req.params.id);
        if (!game) {
            console.log("Can't find game with id: " + req.params.id);
            res.status(500).send('Cant find game with id: ' + req.params.id);
            return;
        }
        var gameJSON = JSON.stringify(game);
        console.log("GET /games/" + req.params.id);
        res.send(gameJSON);
    });
});

app.post('/games', (req, res) => {
    fs.readFile('./games.json', 'utf8', (err, gamesJson) => {
        if (err) {
            console.log("File read failed in POST /games: " + err);
            res.status(500).send('File read failed');
            return;
        }
        var games = JSON.parse(gamesJson);
        var game = games.find(gametmp => gametmp.id == req.body.id);
        if (!game) {
            games.push(req.body);
            var newList = JSON.stringify(games);
            fs.writeFile('./games.json', newList, err => {
                if (err) {
                    console.log("Error writing file in POST /games: " + err);
                    res.status(500).send('Error writing file games.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file games.json and added new game with id = " + req.body.id);
                }
            });
        } else {
            console.log("game by id = " + req.body.id + " already exists");
            res.status(500).send('game by id = ' + req.body.id + ' already exists');
            return;
        }
    });
});

app.put('/games/:id', (req, res) => {
    fs.readFile('./games.json', 'utf8', (err, gamesJson) => {
        if (err) {
            console.log("File read failed in PUT /games/" + req.params.id + ": " + err);
            res.status(500).send('File read failed');
            return;
        }
        var games = JSON.parse(gamesJson);
        var gameBody = games.find(gametmp => gametmp.id == req.body.id);
        if (gameBody && gameBody.id != req.params.id) {
            console.log("game by id = " + gameBody.id + " already exists");
            res.status(500).send('game by id = ' + gameBody.id + ' already exists');
            return;
        }
        var game = games.find(gametmp => gametmp.id == req.params.id);
        if (!game) {
            games.push(req.body);
            var newList = JSON.stringify(games);
            fs.writeFile('./games.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /games/" + req.params.id + ": " + err);
                    res.status(500).send('Error writing file games.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file games.json and added new game with id = " + req.body.id);
                }
            });
        } else {
            for (var i = 0; i < games.length; i++) {
                if (games[i].id == game.id) {
                    games[i] = req.body;
                }
            }
            var newList = JSON.stringify(games);
            fs.writeFile('./games.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /games/" + req.params.id + ": " + err);
                    res.status(500).send('Error writing file games.json');
                } else {
                    res.status(200).send(req.body);
                    console.log("Successfully wrote file games.json and edit game with old id = " + req.params.id);
                }
            });
        }
    });
});

app.delete('/games/:id', (req, res) => {
    fs.readFile('./games.json', 'utf8', (err, gamesJson) => {
        if (err) {
            console.log("File read failed in DELETE /games: " + err);
            res.status(500).send('File read failed');
            return;
        }
        var games = JSON.parse(gamesJson);
        var gameIndex = games.findIndex(gametmp => gametmp.id == req.params.id);
        if (gameIndex != -1) {
            games.splice(gameIndex, 1);
            var newList = JSON.stringify(games);
            fs.writeFile('./games.json', newList, err => {
                if (err) {
                    console.log("Error writing file in DELETE /games/" + req.params.id + ": " + err);
                    res.status(500).send('Error writing file games.json');
                } else {
                    res.status(204).send();
                    console.log("Successfully deleted game with id = " + req.params.id);
                }
            });
        } else {
            console.log("game by id = " + req.params.id + " does not exists");
            res.status(500).send('game by id = ' + req.params.id + ' does not exists');
            return;
        }
    });
});