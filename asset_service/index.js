const express = require('express');
const mongoose = require('mongoose');

const app = express();

const host = process.env.MONGO_HOST;

mongoose.connect(`mongodb://${host}/user`,
{ useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const UserProfile = mongoose.model('userProfile', 
               new mongoose.Schema({ user_id: String, uname: String, profile_image: String, last_update: Number }), 
               'userProfile');

app.get("/", (req, res) => {
    const username = req.query.username;

  UserProfile.findOne({uname: username})
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(404).json({ msg: err }));
});

app.listen(process.env.PORT, () => console.log('Server running...'));