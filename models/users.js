const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const usersSchema = mongoose.Schema({
    name: {
        type: String,
        // required: true,
        minLength: 3,
        maxLength: 50,
        // unique: true
    },
    email: {
        type: String,
        unique: true,
        // validate: {
        //     validator: function (v) {
        //         return /^[a-zA-Z]{3,8}(@)(gmail|yahoo|outlook)(.com)$/.test(v);
        //     },
        //     message: props => {
        //         console.log(props);
        //         return `${props.value} is not a valid email !`
        //     }
        // }
    },
    password: {
        type: String,
        // required: true,
    }

}, { timestamps: true })

usersSchema.pre('save', function (next) {


    ////hashing before saving////////===liength of rando caracter of salt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword

    ///next عشان يطلع من الميديل وير ويرد بالريسبونس
    next()
    
})


var userModel = mongoose.model("User", usersSchema)

module.exports = userModel