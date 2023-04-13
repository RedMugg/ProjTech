
// Get npm modules
require('dotenv').config();
const axios = require('axios');
const express = require("express");

// Get .env variable values
const DbUsername = process.env.DB_USERNAME;
const DbPassword = process.env.DB_PASSWORD;
const InstaToken = process.env.INSTA_TOKEN;

// Set global variables
var instaPhotos;
var _src;


// Server setup
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://" + (DbUsername) + ":" + (DbPassword) + "@credentials.0wnebbl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const db = client.db("profile");
const col = db.collection("users");
async function connect() {
    try {
        await client.connect(uri);
        console.log("Connection made");
        const findResult = await col.find({}).toArray();
        console.log(findResult);

    } catch (err) {
        console.error(err);
    }
}
connect();

// Setup instagram API
async function insta() {
    let resp;
    try {
        let instaAccessToken = InstaToken;
        resp = await axios.get('https://graph.instagram.com/me/media?fields=media_type,media_url,caption&access_token=' + (instaAccessToken));
        resp = resp.data;
        instaPhotos = resp.data;
        console.log(resp);
    } catch (e) {
        console.log(e);
    }

    return (instaPhotos);
}
insta();


// Handle Express functions
const app = express();
app.use(express.static('static'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', 'view')

app.get('/', onhome)
app.get('/likesDetail', onLikesDetail)



app.listen(8000, () => { console.log('Server is Running') })

async function onhome(req, res) {
    res.render('list', { data: instaPhotos })
}
async function onLikesDetail(req, res) {
    const findResult = await col.find({}).toArray();
    console.log(findResult);
    res.render('likesDetail', { data: findResult })
}

// Handle liking system
// Add photo
app.post('/clicked', (req, res) => {
    const src = req.body.photoUrl;

    console.log(src);

    col.updateMany(
        {
            url: src
        },
        {
            $setOnInsert: { url: src }
        },
        { upsert: true }
    )

    res.render('list', { data: instaPhotos })
});

// Remove Photo
app.post('/clickedRemove', async (req, res) => {
    const src = req.body.photoUrl;

    console.log(src);

    await col.deleteOne({ url: src })

    const findResult = await col.find({}).toArray();
    console.log(findResult);
    res.render('likesDetail', { data: findResult })
});


app.use((req, res, next) => {
    res.status(404).render('not-found.ejs')
})