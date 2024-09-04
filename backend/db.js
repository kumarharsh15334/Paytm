const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://kharsh15334:aIWoD2Oh6kzrTazB@harsh.38vnpne.mongodb.net/?retryWrites=true&w=majority&appName=Harsh");

const userSchema = mongoose.Schema({
    username : String,
    password : String,
    firstName : String,
    lastName : String
})

const User = mongoose.model("User", userSchema);

module.exports = {
    User
};