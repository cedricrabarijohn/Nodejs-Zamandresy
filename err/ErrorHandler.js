const ApiError = require("./ApiError")

const ErrorHandler = (err, req, res, next) => {
    if (err) {
        if (err instanceof ApiError) {
            res.status(err.code).send({ error: err })
            next()
        }
        else {
            res.status(500).send({ error: { message: 'An internal server error' } })
            next()
        }
    } else {
        res.status(500).send({ error: { message: 'An internal server error' } })
        next()
    }
}

module.exports = ErrorHandler