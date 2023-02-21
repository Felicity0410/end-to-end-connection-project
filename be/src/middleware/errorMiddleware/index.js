const documentNotFoundError = require("./documentNotFoundError");
const jwtValidateError = require("./jwtValidateError");
const validationError = require("./validationError");


module.exports = (app) => {
    app.use(validationError)
    app.use(documentNotFoundError)
    app.use(jwtValidateError)
    app.use((error, req, res, next) => {   
        console.log(error);    
        res
        .status(500)
        .json({ error: 'something bad happened, please try again later' })
    })
}


