const bcrypt = require('bcrypt')
const { Schema, model } = require('mongoose')

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

schema.methods.hashPassword = async function () {
    this.password = await bcrypt.hash(this.password, 12)
}

schema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}



const UserModel = model('User', schema)

module.exports = UserModel