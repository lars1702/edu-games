const mongoose = require("mongoose");
const Game = require('../models/game');
const User = require('../models/user');
const Review = require('../models/review');

const Schema   = mongoose.Schema; //not needed?

mongoose.Promise = Promise;

const dbName = 'edu-fun';
mongoose.connect(`mongodb://localhost/${dbName}`); //connecting to the database

review_user = []
review_game = []
user_favs = []

const games = [
    {
        name: "Tetris", 
        keywords: ["fine motor coordination", "retention", "short-term-memory", "reaction speed", "information processing", "executive functions", "planning/visualising", "shape visualisation"],
        description: "Tetris is excellent for several important cognitive abilities. As the games pace progresses it requires more skills from the user. Reaction speed and planning, which are less important in the start becomes imperative to master at higher levels. ",
        imgURL: "http://www.coolmath-games.com/sites/cmatgame/files/snake.png",
        gameURL: "https://tetris.com/play-tetris"
    },
    {
        name: "Snake", 
        keywords: ["autism", "dyslexia", "fine motor coordination", "reaction speed", "information processing"],
        description: "Snake is a classic game where the goal is to get as big as possible by eating as much food as possible. Steer the snake to the food, and crashing into the wall or yourself",
        imgURL: "https://www.geek.com/wp-content/uploads/2016/05/image-625x352.jpg",
        gameURL: "http://www.coolmath-games.com/0-snake"
    }
];



const reviews = [
    {    
        title: "This game was great",
        comment: "I tried this game with a 13-year old autistic child, with high concentration difficulties. He got right into the game, I've never seen him so focused. I just hope he will be able to use that concentration for real-life situations later.",
        _user: "5b476beeb98e0a72337f2c20",
        _game: "5b476beeb98e0a72337f2c20",
        created: { type: Date, default: Date.now },
    }
]

const user = new User(
    {
        email: "lars@",
        name: "Lars",
        imgURL: "",
        favs: ["5b476beeb98e0a72337f2c20", "5b476beeb98e0a72337f2c20"]
    })


Game.deleteMany()
.then(() => User.deleteMany())
.then(() => Review.deleteMany())
.then(() => Game.create(games))
// .then((GameDocDB) => console.log(GameDocDB))
.then(() => console.log(`\n Created a collection of ${games.length} games \n`))
.then(() =>  User.register(user, "lars123"))
.then((UserDocDB) => console.log(`Created a collection with 1 user \n`))
.then(() => Review.create(reviews))
.then((ReviewDocDB) => console.log(`Created a collection of ${reviews.length} reviews\n`))
.then(() => mongoose.connection.close())
.catch(err => console.log("ERROR ERROR ERROR: \n \n", err));

