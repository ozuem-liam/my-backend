const { Invoice } = require('./invoice.model');
const { Facility } = require('../facilityModule/facility.model');
const messages = require('../../translation/messages.json');

const getInvoice = async ({ per_page, page }) => {
  const offset = (page - 1) * per_page;
  const invoice = await Invoice.find().skip(offset).limit(per_page);
  if (invoice) return { isSuccess: true, data: invoice };
  const message = messages['NO-INVOICE-FOUND'];
  return { isSuccess: false, message };
};

const createInvoice = async ({ facility_id, month, year }) => {
  let message;
  try {
    const exist = await Invoice.exists({ month, year });
    if (exist) {
      message = messages['INVOICE-EXIST'];
      return { isSuccess: false, message };
    }
    const invoice_data = await Invoice.create({
      facility_id,
      month,
      year,
    });
    if (invoice_data) {
      message = messages['INVOICE-CREATED-SUCCESS'];
      const query = { $push: { categories: invoice_data._id } };
      const options = { new: true, useFindAndModify: false };

      const facility = await Facility.findByIdAndUpdate(facility_id, query, options);

      if (invoice_data && facility) return { isSuccess: true, data: invoice_data, message };
    }
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

const updateInvoice = async ({ id, month, year }) => {
  let message;
  const query = { _id: id };
  const update = {
    month,
    year,
  };
  const options = { upsert: false, new: true };
  const exist = await Invoice.exists({ month, year });
  if (exist) {
    message = messages['INVOICE-EXIST'];
    return { isSuccess: false, message };
  }
  const invoice_data = await Invoice.findOneAndUpdate(query, update, options);
  message = messages['INVOICE-UPDATE-SUCCESS'];
  if (invoice_data) return { isSuccess: true, data: invoice_data };

  message = messages['INVOICE-UPDATE-ERROR'];
  return { isSuccess: false, message };
};

const deleteInvoice = async (id) => {
  let message;
  try {
    const query = { _id: id };
    const invoice = await Invoice.findOneAndRemove(query);
    message = messages['INVOICE-DELETE-SUCCESS'];
    if (invoice) return { isSuccess: true, invoice, message };
  } catch (error) {
    message = messages['INVOICE-DELETE-ERROR'];
    return { isSuccess: false, message };
  }
};

module.exports = { createInvoice, deleteInvoice, getInvoice, updateInvoice };
