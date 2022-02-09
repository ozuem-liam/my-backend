const providerService = require('./provider.service');
const { validationResult } = require('express-validator');
const HttpStatusCode = require('../../models/HttpStatusCode');
const { sendSuccess, sendError } = require('../../helpers/response.format');

/**
 * @swagger
 * components:
 *  schemas:
 *   Provider:
 *    type: object
 *    required:
 *      - provider
 *    properties:
 *     id:
 *      type: string
 *      description: This is an auto-generated id by mongodb
 *     provider:
 *      type: string
 *      description: The provider name
 *    example: 
 *     id: d5fe_aedfdl
 *     provider: Provider 1
 */


/**
 * @swagger
 * tags:
 *  name: Provider
 *  description: The provider managing API
 */

/**
 * @swagger
 * /provider:
 *  get:
 *   summary: Get all providers
 *   tags: [Provider]
 *   responses:
 *    200:
 *     description: This gets all providers
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Provider'
 */
const getProviders = async (request, response) => {
  const { id } = request.params;
  const { isSuccess, data, message } = await providerService.getProviders(id);
  if (isSuccess) {
    return sendSuccess({ response, data, message });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

/**
 * @swagger
 * /provider/sorted:
 *  get:
 *   summary: Get all providers
 *   tags: [Provider]
 *   responses:
 *    200:
 *     description: This gets all providers
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Provider'
 */
const getSortedProviders = async (request, response) => {
  const array = JSON.parse(request.query.array);
  const { isSuccess, data, message } = await providerService.getSortedProviders(array);
  if (isSuccess) {
    return sendSuccess({ response, data, message });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

/**
 * @swagger
 * /provider:
 *  post:
 *   summary: Create a new provider
 *   tags: [Provider]
 *   parameters:
 *    - in: query
 *      name: path
 *      schema:
 *       type: array
 *      required: true
 *      description: Array of provider id
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Provider'
 *   responses:
 *    200:
 *     description: The provider was created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Provider'
 *    500:
 *     description: Some server error
 */
const addAProvider = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return sendError({ response, errors });
    }

    const { provider } = request.body;
    const { isSuccess, message, data } = await providerService.addAProvider({
      provider,
    });
    if (isSuccess) {
      return sendSuccess({
        response,
        message,
        data,
      });
    } else {
      return sendError({ response, message });
    }
  } catch (error) {
    return sendError({ response, error });
  }
};

/**
 * @swagger
 * /provider/delete/{id}:
 *  delete:
 *   summary: Remove the provider by id
 *   tags: [Provider]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: The provider id
 *   responses:
 *     200:
 *      description: The provider was deleted successfully
 *     404:
 *      description: Provider was not found
 */
const deleteAProvider = async (request, response) => {
  const { id } = request.params;
  const { isSuccess, message, data } = await providerService.deleteAProvider(id);
  if (isSuccess) {
    return sendSuccess({ response, message, data });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

module.exports = { addAProvider, deleteAProvider, getProviders, getSortedProviders };
