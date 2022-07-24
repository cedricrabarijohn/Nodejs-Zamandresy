const ApiError = require('../err/ApiError');
const MvolaService = require('../services/MvolaService');
const Authenticate = async (req, res, next) => {
    try {
        const b64 = req.headers.authorization.split(' ')[1]
        const auth = await MvolaService.Authenticate(b64, (callback) => {
            // console.log(callback)
            res.json(callback)
        })
        // console.log(auth)
    } catch (err) {
        next(err)
    }
}
const InitiateRequest = async (req, res, next) => {
    try {
        const { useraccountidentifier, partnername } = req.headers
        const { amount, description, debitMsisdn, creditMsisdn } = req.body
        const b64 = req.headers.authorization.split(' ')[1]
        const initiate = await MvolaService.InitiateRequest(b64, useraccountidentifier, partnername, amount, description, debitMsisdn, creditMsisdn, (callback) => {
            // console.log(callback)
            res.json(callback)
        })
    } catch (err) {
        next(ApiError.serverError(err.message))
    }
}
const GetTransactionStatus = async (req, res, next) => {
    try {
        const transactionId = req.params.transactionId
        const { useraccountidentifier, partnername } = req.headers
        const b64 = req.headers.authorization.split(' ')[1]
        const transactionStatus = await MvolaService.GetTransactionStatus(
            b64, transactionId, useraccountidentifier, partnername, (callback) => {
                res.json(callback)
            }
        )
    } catch (err) {
        next(ApiError.serverError(err.message))
    }
}
const GetTransactionDetails = async(req,res,next) => {
    try{
        const objectReference = req.params.objectReference
        const b64 = req.headers.authorization.split(' ')[1]
        const { useraccountidentifier,partnername} = req.headers
        const transactionDetails = await MvolaService.GetTransactionDetails(
            b64,objectReference,useraccountidentifier,partnername, (callback) =>{
                res.json(callback)
            }
        )
    }catch(err){
        // console.log(err)
        next(ApiError.serverError(err.message))
    }
}
module.exports = {
    Authenticate,
    InitiateRequest,
    GetTransactionStatus,
    GetTransactionDetails
}