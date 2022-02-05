const { Client } = require('./client.model');
const messages = require('../../translation/messages.json');

const addClient = async ({
  name,
  email,
  phone,
  providers,
}) => {
  try {
    let message;
    const exist = await Client.exists({ email });
    if (exist) {
      message = messages['ACT-EMAIL-EXIST'];
      return { isSuccess: false, message };
    }
    const client = await Client.create({
      name,
      email,
      phone,
      providers,
    });
    if (client) {
      message = messages['ACT-LOGIN-SUCCESS'];
      return { isSuccess: true, client, message };
    }
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

const getAllClients = async () => {
  const clients = await Client.find({});
  if (clients) return { isSuccess: true, data: clients };
  const message = messages['NO-PSP-OPERATOR-FOUND'];
  return { isSuccess: false, message };
};

const editClientInfo = async (id, client_data) => {
  let message;
  try {
    const query = { _id: id };
    const update = { ...client_data };
    const options = { upsert: false, new: true };
    const client = await Client.findOneAndUpdate(query, update, options);
    if (client) {
      message = messages['CLIENT-OPERATOR-UPDATE-SUCCESS'];
      return { isSuccess: true, data: client };
    }
  } catch (error) {
    message = messages['CLIENT-OPERATOR-UPDATE-ERROR'];
    return { isSuccess: false, message };
  }
};

const deleteAClient = async (id) => {
  let message;
  try {
    const query = { _id: id };
    const client = await Client.findOneAndRemove(query);
    message = messages['CLIENT-DELETE-SUCCESS'];
    if (client) return { isSuccess: true, client, message };
  } catch (error) {
    message = messages['CLIENT-DELETE-ERROR'];
    return { isSuccess: false, message };
  }
};

module.exports = { addClient, getAllClients, editClientInfo, deleteAClient };
