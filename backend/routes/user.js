const express = require("express");
const zod = require("zod");
const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
//signup and signin routes

const signupSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})
router.post("/signup", async (req, res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success) {
        return res.json({
            message: "Email already taken/ Incorrect inputs "
        })
    }

    const user = User.findOne({
        username: bpdy.username
    }) 

    if(user._id){
        return res.json({
            message: "Email already taken/ Incorrect inputs "
        })
    }

    const dbuser = await User.create(body);
    const token = jwt.sign({
        userId: dbuser._id
    }, JWT_SECRET)

    res.json({
        message: "Usefr created succesfull",
        token: token
    })
})


module.exports = router;