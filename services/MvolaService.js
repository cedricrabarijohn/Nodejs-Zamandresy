const ApiError = require('../err/ApiError');
const correlator = require('express-correlation-id')
var request = require('request');
const Authenticate = async (b64, callback) => {
    try {
        var options = {
            'method': 'POST',
            'url': 'https://devapi.mvola.mg/token',
            'headers': {
                'Authorization': `Basic ${b64}`,
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'JSESSIONID=1it878rxzkl6a; SERVERID=web01'
            },
            form: {
                'grant_type': 'client_credentials',
                'scope': 'EXT_INT_MVOLA_SCOPE'
            }
        };
        // res.json(b64)
        // console.log(b64)
        request(options, function (error, response) {
            if (error) throw ApiError.badRequest(error)
            if (response.body) {
                // console.log(response.body)
                return callback(JSON.parse(response.body))
            }
        });
    } catch (err) {
        throw ApiError.serverError(err)
    }
}
const InitiateRequest = async (b64, userAccountIdentifier, partnerName, amount, description, debitMsisdn, creditMsisdn, callbackRequest) => {
    try {
        await Authenticate(b64, (callback) => {
            const access_token = callback.access_token;
            const correlationId = correlator.getId()
            // console.log(correlationId)
            const headers = {
                'Authorization': `bearer ${access_token}`,
                'Version': `1.0`,
                'X-CorrelationID': `${correlationId}`,
                'UserLanguage': 'mg',
                'UserAccountIdentifier': `msisdn;${userAccountIdentifier}`,
                'partnerName': `${partnerName}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Cookie': 'JSESSIONID=1it878rxzkl6a; SERVERID=web01'
            }
            var options = {
                'method': 'POST',
                'url': 'https://devapi.mvola.mg/mvola/mm/transactions/type/merchantpay/1.0.0/',
                'headers': headers,
                'body': JSON.stringify({
                    "amount": `${amount}`,
                    "currency": "Ar",
                    "descriptionText": `${description}`,
                    "requestDate": "2022-07-19T12:10:57.000Z",
                    "requestingOrganisationTransactionReference": "testTransactionIdClientSide",
                    "originalTransactionReference": "0343500004",
                    "debitParty": [
                        {
                            "key": "msisdn",
                            "value": `${debitMsisdn}`
                        }
                    ],
                    "creditParty": [
                        {
                            "key": "msisdn",
                            "value": `${creditMsisdn}`
                        }
                    ],
                    "metadata": [
                        {
                            "key": "partnerName",
                            "value": "ZaMandresy"
                        },
                        {
                            "key": "fc",
                            "value": "USD"
                        },
                        {
                            "key": "amountfc",
                            "value": "1"
                        }
                    ]
                })
            }
            request(options, function (error, response) {
                if (error) throw new Error(error);
                return callbackRequest(JSON.parse(response.body))
            });
        })
    } catch (err) {
        throw ApiError.serverError(err)
    }
}
const GetTransactionStatus = async (b64, transactionId, userAccountIdentifier, partnerName, callbackRequest) => {
    try {
        await Authenticate(b64, (callback) => {
            const access_token = callback.access_token;
            const correlationId = correlator.getId();
            var options = {
                'method': 'GET',
                'url': `https://devapi.mvola.mg/mvola/mm/transactions/type/merchantpay/1.0.0/status/${transactionId}`,
                'headers': {
                    'Authorization': `Bearer ${access_token}`,
                    'Version': '1.0',
                    'X-CorrelationId': `${correlationId}`,
                    'UserAccountIdentifier': `msisdn;${userAccountIdentifier}`,
                    'partnerName': `${partnerName}`,
                    'Content-Type': 'application/json',
                    'UserLanguage': 'mg',
                    'Cookie': 'JSESSIONID=kpaarszlqov5; SERVERID=web01'
                }
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                // console.log(response.body);
                return callbackRequest(JSON.parse(response.body))
            });
        })
    } catch (err) {
        throw ApiError.serverError(err)
    }
}
const GetTransactionDetails = async (b64,objectReference,userAccountIdentifier,partnerName,callbackRequest) => {
    await Authenticate(b64, (callback) => {
        const access_token = callback.access_token;
        const correlationId = correlator.getId();
        //0343500004
        var options = {
            'method': 'GET',
            'url': `https://devapi.mvola.mg/mvola/mm/transactions/type/merchantpay/1.0.0/${objectReference}`,
            'headers': {
                'Authorization': `Bearer ${access_token}`,
                'Version': '1.0',
                'X-CorrelationId': `${correlationId}`,
                'UserAccountIdentifier': `msisdn;${userAccountIdentifier}`,
                'partnerName': 'zamandresy',
                'Content-Type': 'application/json',
                'UserLanguage': 'mg',
                'Cookie': 'JSESSIONID=vbt6w3kamaa5; SERVERID=web01'
            }
        };
        // console.log(`user acc identifier ${userAccountIdentifier}`)
        request(options, function (error, response) {
            if (error) throw new Error(error);
            return callbackRequest(JSON.parse(response.body))
        });
    })
}
module.exports = {
    Authenticate,
    InitiateRequest,
    GetTransactionStatus,
    GetTransactionDetails
}