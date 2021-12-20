const { Tariff } = require('./tariff.model');
const { Account } = require('../accountModule/account.model');
const cloudinary = require('../../helpers/cloudinary.service');
const messages = require('../../translation/messages.json');

const getTariff = async ({ per_page, page, account_id, timestamp }) => {
  const offset = (page - 1) * per_page;
  const tariffs = await Tariff.find({}).skip(offset).limit(per_page);
  if (tariffs) return { isSuccess: true, data: tariffs };
  const message = messages['NO-TARIFF-FOUND'];
  return { isSuccess: false, message };
};

const getTariffByUser = async ({ per_page, page, account_id, timestamp }) => {
  const offset = (page - 1) * per_page;
  const tariffs = await Tariff.find({ account_id, timestamp }).skip(offset).limit(per_page);
  if (tariffs) return { isSuccess: true, data: tariffs };
  const message = messages['NO-TARIFF-FOUND'];
  return { isSuccess: false, message };
};

const createTariff = async ({
  account_id,
  tariff_charge,
  tariff_charge_code,
  duration,
  amount,
  tariff_image,
  cloudinary_id,
}) => {
  try {
    let message;
    const tariff = await Tariff.create({
      account_id,
      tariff_charge,
      tariff_charge_code,
      duration,
      amount,
      tariff_image,
      cloudinary_id,
    });
    if (tariff) {
      const account = await Account.findById(account_id);
      account.tariffs.push(tariff);
      account.save();
      message = messages['TARIFF-CREATED-SUCCESS'];
      return { isSuccess: true, data: tariff, message };
    }
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

const updateTariff = async ({
  id,
  tariff_charge,
  tariff_charge_code,
  duration,
  amount,
  tariff_image,
}) => {
  let message;
  const query = { _id: id };
  const update = {
    tariff_charge,
    tariff_charge_code,
    duration,
    amount,
    tariff_image,
  };
  const options = { upsert: false, new: true };
  const tariff = await Tariff.findOneAndUpdate(query, update, options);
  message = messages['TARIFF-UPDATE-SUCCESS'];
  if (tariff) return { isSuccess: true, data: tariff };

  message = messages['TARIFF-UPDATE-ERROR'];
  return { isSuccess: false, message };
};

const deleteTariff = async (id) => {
  let message;
  try {
    const tariff = await Tariff.findById(id);
    await cloudinary.uploader.destroy(tariff.cloudinary_id);
    await tariff.remove();
    message = messages['TARIFF-DELETE-SUCCESS'];
    if (tariff) return { isSuccess: true, tariff, message };
  } catch (error) {
    message = messages['TARIFF-DELETE-ERROR'];
    return { isSuccess: false, message };
  }
};

module.exports = { createTariff, deleteTariff, getTariff, getTariffByUser, updateTariff };
