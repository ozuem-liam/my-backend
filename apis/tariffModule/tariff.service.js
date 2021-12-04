const { Tariff } = require('./tariff.model');
const { Facility } = require('../facilityModule/facility.model')
const messages = require('../../translation/messages.json');

const getTariff = async ({ per_page, page }) => {
  const offset = (page - 1) * per_page;
  const tariffs = await Tariff.find().skip(offset).limit(per_page);
  if (tariffs) return { isSuccess: true, data: tariffs };
  const message = messages['NO-TARIFF-FOUND'];
  return { isSuccess: false, message };
};

const createTariff = async ({
    facility_id, 
    tariff_charge, 
    tariff_charge_code, 
    duration, 
    amount, 
    tariff_image
}) => {
  try {
    let message;
    const tariff = await Tariff.create({
        facility_id, 
        tariff_charge, 
        tariff_charge_code, 
        duration, 
        amount, 
        tariff_image
    });
    if (tariff) {
      message = messages['TARIFF-CREATED-SUCCESS'];
      const query = { $push: { tariffs: tariff._id } };
      const options = { new: true, useFindAndModify: false };
      
      const facility = await Facility.findByIdAndUpdate(facility_id, query, options);
  
      if (tariff && facility) return { isSuccess: true, data: tariff, message };
    }
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

const updateTariff = async (id, tariff_data) => {
  let message;
  const query = { _id: id };
  const update = { ...tariff_data};
  const options = { upsert: false, new: true };
  const tariff = await Tariff.findOneAndUpdate(query, update, options);
  message = messages['TARIFF-UPDATE-SUCCESS'];
  if (tariff) return { isSuccess: true, data: tariff };

  message = messages['TARIFF-UPDATE-ERROR'];
  return { isSuccess: false, message };
};

const deleteTariff = async (id) => {
  let message;
  const query = { _id: id };
  const tariff = await Tariff.findOneAndRemove(query);

  message = messages['TARIFF-DELETE-SUCCESS'];
  if (tariff) return { isSuccess: true, tariff, message };

  message = messages['TARIFF-DELETE-ERROR'];
  return { isSuccess: false, message };
};

module.exports = { createTariff, deleteTariff, getTariff, updateTariff };

