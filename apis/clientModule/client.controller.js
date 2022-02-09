const clientService = require('./client.service');
const { validationResult } = require('express-validator');
const { sendSuccess, sendError } = require('../../helpers/response.format');
const HttpStatusCode = require('../../models/HttpStatusCode');

/**
 * @swagger
 * components:
 *  schemas:
 *   Client:
 *    type: object
 *    required:
 *      - name
 *      - email
 *      - phone
 *      - providers
 *    properties:
 *     id:
 *      type: string
 *      description: This is an auto-generated id by mongodb
 *     name:
 *      type: string
 *      description: The clients name
 *     email:
 *      type: string
 *      description: The clients email
 *     phone:
 *      type: string
 *      description: The clients phone number
 *     providers:
 *      type: array
 *      description: The clients providers
 *    example: 
 *     id: d5fe_asdl
 *     name: Client 1
 *     email: client@gmail.com
 *     phone: 09808374822
 *     providers: ['d5okemleccvmf', 'd5dfdo93nwkd']
 */


/**
 * @swagger
 * tags:
 *  name: Client
 *  description: The client managing API
 */

/**
 * @swagger
 * /client:
 *  post:
 *   summary: Create a new client
 *   tags: [Client]
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Client'
 *   responses:
 *    200:
 *     description: The client was created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Client'
 *    500:
 *     description: Some server error
 */
const addClient = async (request, response) => {
  try {
    const errors = validationResult(request);
    const data = request.body;
    if (!errors.isEmpty()) {
      return sendError({ response, errors });
    }
    const { isSuccess, message, client } = await clientService.addClient(data);
    if (isSuccess) {
      return sendSuccess({
        response,
        message,
        data: { client },
      });
    } else {
      return sendError({ response, message });
    }
  } catch (error) {
    return sendError({ response, message, error });
  }
};

/**
 * @swagger
 * /client:
 *  get:
 *   summary: Get all clients
 *   tags: [Client]
 *   responses:
 *    200:
 *     description: This gets all clients
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Client'
 */
const getAllClients = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { isSuccess, data, message } = await clientService.getAllClients({});
  if (isSuccess) {
    return sendSuccess({ response, data });
  }

  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

/**
 * @swagger
 * /client/{id}:
 *  get:
 *   summary: Get a client
 *   tags: [Client]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: This client id
 *   responses:
 *    200:
 *     description: Get the client by id
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Client'
 *    400:
 *     description: The client was not found
 */
const getAClient = async (request, response) => {
  const { id } = request.params;

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { isSuccess, data, message } = await clientService.getAClient(id);
  if (isSuccess) {
    return sendSuccess({ response, data });
  }

  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};


/**
 * @swagger
 * /client/edit/{id}:
 *  post:
 *   summary: Edit a client by id
 *   tags: [Client]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: This client id
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Client'
 *   responses:
 *    200:
 *     description: The client was edited
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Client'
 *    500:
 *     description: Some server error
 */
const editClientInfo = async (request, response) => {
  const { id } = request.params;
  const errors = validationResult(request);
  const client_data = request.body;
  if (!errors.isEmpty()) {
    return sendError({ response, errors });
  }
  const { isSuccess, data, message } = await clientService.editClientInfo(id, client_data);
  if (isSuccess) {
    return sendSuccess({ response, data });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

/**
 * @swagger
 * /client/delete/{id}:
 *  delete:
 *   summary: Remove the client by id
 *   tags: [Client]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: The client id
 *   responses:
 *     200:
 *      description: The client was deleted successfully
 *     404:
 *      description: Client was not found
 */
const deleteAClient = async (request, response) => {
  const { id } = request.params;
  const { isSuccess, message, data } = await clientService.deleteAClient(id);
  if (isSuccess) {
    return sendSuccess({ response, message, data });
  }
  return sendError({ response, message, code: HttpStatusCode.SERVER_ERROR });
};

module.exports = { addClient, getAllClients, getAClient, editClientInfo, deleteAClient };
