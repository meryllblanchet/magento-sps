/*
* <license header>
*/

/**
 * This is a sample action showcasing how to access an external API
 *
 * Note:
 * You might want to disable authentication and authorization checks against Adobe Identity Management System for a generic action. In that case:
 *   - Remove the require-adobe-auth annotation for this action in the manifest.yml of your application
 *   - Remove the Authorization header from the array passed in checkMissingRequestInputs
 *   - The two steps above imply that every client knowing the URL to this deployed action will be able to invoke it without any authentication and authorization checks against Adobe Identity Management System
 *   - Make sure to validate these changes against your security requirements before deploying the action
 */

const { Core } = require('@adobe/aio-sdk')
const { errorResponse, stringParameters } = require('../utils')

// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // 'info' is the default level if not set
    logger.info('Calling the main action')

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))

    const content = createResponse()
    logger.debug('fetch content = ' + JSON.stringify(content, null, 2))
    const response = {
      statusCode: 200,
      body: content
    }

    // log the response status code
    logger.info(`${response.statusCode}: successful request`)
    return response
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}

createResponse = function() {
  return {
      "carrier":{
          "code":"stub_code",
          "title":"stub_title"
      },
      "deliveryLocation":{
          "city":"Chicago",
          "country":"US",
          "postcode":"60611",
          "region":"IL"
      },
      "estimatedDelivery":"2020-02-06T16:22:56.949Z",
      "service":{
          "code":"Priority Mail",
          "title":"priority"
      },
      "status":"transit",
      "trackingNumber":"STUB_TRACKING_NUMBER",
      "updates":[
          {
              "datetime":"2020-02-01T19:54:29.506Z",
              "note":"The carrier has received the electronic shipment information.",
              "status":"UNKNOWN"
          },
          {
              "datetime":"2020-02-02T23:54:29.506Z",
              "location":{
                  "city":"San Francisco",
                  "country":"US",
                  "postcode":"94103",
                  "region":"CA"
              },
              "note":"Your shipment has departed from the origin.",
              "status":"TRANSIT"
          }
      ]
  }
}

exports.main = main
