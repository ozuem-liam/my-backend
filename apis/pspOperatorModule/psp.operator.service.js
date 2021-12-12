const { Psp } = require('./psp.operator.model');
const messages = require('../../translation/messages.json');

const getPspOperators = async ({ per_page, page, region }) => {
  const offset = (page - 1) * per_page;
  const psps = await Psp.find({ region }).skip(offset).limit(per_page);
  if (psps) return { isSuccess: true, data: psps };
  const message = messages['NO-PSP-OPERATOR-FOUND'];
  return { isSuccess: false, message };
};

const createPspOperator = async ({
  psp_operator_name,
  ceo_name,
  psp_operator_phone_number,
  psp_operator_email,
  location,
  region,
  address,
  district,
  slots,
  account_number,
  bank_name,
  bank_branch_code,
}) => {
  try {
    let message;
    const exist = await Psp.exists({ psp_operator_email });
    if (exist) {
      message = messages['PSP-OPERATOR-EMAIL-EXIST'];
      return { isSuccess: false, message };
    }
    const pspOperator = await Psp.create({
      psp_operator_name,
      ceo_name,
      psp_operator_phone_number,
      psp_operator_email,
      location,
      region,
      address,
      district,
      slots,
      account_number,
      bank_name,
      bank_branch_code,
    });
    if (pspOperator) {
      message = messages['PSP-OPERATOR-CREATED-SUCCESS'];
      return { isSuccess: true, pspOperator, message };
    }
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

const updatePspOperator = async (id, psp_data) => {
  let message;
  try {
    const query = { _id: id };
    const update = { ...psp_data };
    const options = { upsert: false, new: true };
    const psp = await Psp.findOneAndUpdate(query, update, options);
    if (psp) {
      message = messages['PSP-OPERATOR-UPDATE-SUCCESS'];
      return { isSuccess: true, data: psp };
    }
  } catch (error) {
    message = messages['PSP-OPERATOR-UPDATE-ERROR'];
    return { isSuccess: false, message };
  }
};

const deletePspOperator = async (id) => {
  const query = { _id: id };
  let message;
  const psp = await Psp.findOneAndRemove(query);

  message = messages['PSP-OPERATOR-DELETE-SUCCESS'];
  if (psp) return { isSuccess: true, psp, message };

  message = messages['PSP-OPERATOR-DELETE-ERROR'];
  return { isSuccess: false, message };
};

module.exports = { createPspOperator, deletePspOperator, getPspOperators, updatePspOperator };
