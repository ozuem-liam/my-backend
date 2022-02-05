const { Provider } = require('./provider.model');
const messages = require('../../translation/messages.json');

const getProviders = async () => {
  const providers = await Provider.find({});
  if (providers) return { isSuccess: true, data: providers };
  const message = messages['NO-PROVIDER-FOUND'];
  return { isSuccess: false, message };
};

const addAProvider = async ({ provider }) => {
  let message;
  try {
    const exist = await Provider.exists({ provider });
    if (exist) {
      message = messages['PROVIDER-EXIST'];
      return { isSuccess: false, message };
    }
    const provider_data = await Provider.create({
      provider,
    });
    if (provider_data) {
      message = messages['PROVIDER-CREATED-SUCCESS'];
      return { isSuccess: true, data: provider_data, message };
    }
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

const deleteAProvider = async (id) => {
  let message;
  try {
    const query = { _id: id };
    const provider = await Provider.findOneAndRemove(query);
    message = messages['PROVIDER-DELETE-SUCCESS'];
    if (provider) return { isSuccess: true, data: provider, message };
  } catch (error) {
    message = messages['PROVIDER-DELETE-ERROR'];
    return { isSuccess: false, message };
  }
};

module.exports = { getProviders, addAProvider, deleteAProvider };
