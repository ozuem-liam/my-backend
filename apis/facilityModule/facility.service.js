const { Facility } = require('./facility.model');
const { Psp } = require('../../apis/pspOperatorModule/psp.operator.model');
const messages = require('../../translation/messages.json');
const cloudinary = require('../../helpers/cloudinary.service');

const toggleStatus = async (id) => {
  try {
    let status;
    const facilities = await Facility.findById(id);
    if (facilities.status == 'Completed') {
      facilities.status = 'Approved';
      status = facilities.status;
      facilities.save();
      return { isSuccess: true, data: status };
    } else if (facilities.status == 'Approved') {
      facilities.status = 'Completed';
      status = facilities.status;
      facilities.save();
      return { isSuccess: true, data: status };
    }
  } catch (error) {
    const message = messages['NO-FACILITY-FOUND'];
    return { isSuccess: false, message };
  }
};

const getAllFacilityByBillingType = async ({ per_page, page, psp_id, billing_type }) => {
  try {
    const offset = (page - 1) * per_page;
    const facilities = await Facility.find({ psp_id, billing_type }).skip(offset).limit(per_page);
    if (facilities) {
      return { isSuccess: true, data: facilities.sort((a, b) => a - b) };
    }
  } catch (error) {
    const message = messages['NO-FACILITY-FOUND'];
    return { isSuccess: false, message };
  }
};

const getAllFacilityByStatus = async ({ per_page, page, psp_id, status }) => {
  try {
    const offset = (page - 1) * per_page;
    const facilities = await Facility.find({ psp_id, status }).skip(offset).limit(per_page);
    if (facilities) {
      return { isSuccess: true, data: facilities.sort((a, b) => a - b) };
    }
  } catch (error) {
    const message = messages['NO-FACILITY-FOUND'];
    return { isSuccess: false, message };
  }
};

const getFacility = async ({ per_page, page, psp_id }) => {
  try {
    const offset = (page - 1) * per_page;
    const facilities = await Facility.find({ psp_id }).skip(offset).limit(per_page);
    if (facilities) {
      return { isSuccess: true, data: facilities.sort((a, b) => a - b) };
    }
  } catch (error) {
    const message = messages['NO-FACILITY-FOUND'];
    return { isSuccess: false, message };
  }
};

const createFacility = async ({ psp_id, facility_name, address, service_charge, billing_type }) => {
  let message;
  try {
    const facility = await Facility.create({
      psp_id,
      facility_name,
      address,
      service_charge,
      billing_type,
    });
    if (facility) {
      facility.facilities = psp_id;
      facility.save();
      const psp = await Psp.findById(psp_id);
      psp.facilities.push(facility);
      psp.save();
      message = messages['FACILITY-CREATED-SUCCESS'];
      if (facility) return { isSuccess: true, data: facility, message };
    }
  } catch (error) {
    console.log(error);
    message = messages['FACILITY-CREATED-ERROR'];
    return { isSuccess: false, message, error };
  }
};

const updateFacility = async ({ id, facility_name, address, service_charge, billing_type }) => {
  let message;
  try {
    const query = { _id: id };
    const update = {
      facility_name,
      address,
      service_charge,
      billing_type,
    };
    const options = { upsert: false, new: true };
    const facility = await Facility.findOneAndUpdate(query, update, options);
    message = messages['FACILITY-UPDATE-SUCCESS'];
    if (facility) {
      return { isSuccess: true, data: facility };
    } else {
      message = messages['FACILITY-DO-NOT-EXIST'];
      return { isSuccess: false, message };
    }
  } catch (error) {
    message = messages['FACILITY-UPDATE-ERROR'];
    return { isSuccess: false, message };
  }
};

const createEnumeratedFacility = async ({
  id,
  facility_name,
  facility_email_1,
  facility_email_2,
  facility_phone_number_1,
  facility_phone_number_2,
  location,
  address,
  charge_per_trip,
  number_of_trips,
  number_of_bins,
  service_charge,
  status,
  category,
  servicing_psp,
  facility_front_image,
  facility_waste_image,
  front_image_cloudinary_id,
  waste_image_cloudinary_id,
}) => {
  let message;
  try {
    const query = { _id: id };
    const update = {
      facility_name,
      facility_email_1,
      facility_email_2,
      facility_phone_number_1,
      facility_phone_number_2,
      location,
      address,
      charge_per_trip,
      number_of_trips,
      number_of_bins,
      service_charge,
      status,
      category,
      servicing_psp,
      facility_front_image,
      facility_waste_image,
      front_image_cloudinary_id,
      waste_image_cloudinary_id,
    };
    const options = { upsert: false, new: true };
    const facility = await Facility.findOneAndUpdate(query, update, options);
    if (facility) {
      message = messages['FACILITY-UPDATE-SUCCESS'];
      return { isSuccess: true, data: facility, message };
    } else {
      message = messages['FACILITY-DO-NOT-EXIST'];
      return { isSuccess: false, message };
    }
  } catch (error) {
    message = messages['FACILITY-UPDATE-ERROR'];
    return { isSuccess: false, message };
  }
};

const deleteFacility = async (id) => {
  let message;
  const facility = await Facility.findById(id);
  await cloudinary.uploader.destroy(facility.front_image_cloudinary_id);
  await cloudinary.uploader.destroy(facility.waste_image_cloudinary_id);
  await facility.remove();
  message = messages['FACILITY-DELETE-SUCCESS'];
  if (facility) return { isSuccess: true, facility, message };

  message = messages['FACLITY-DELETE-ERROR'];
  return { isSuccess: false, message };
};

module.exports = {
  createFacility,
  deleteFacility,
  getFacility,
  updateFacility,
  createEnumeratedFacility,
  getAllFacilityByStatus,
  getAllFacilityByBillingType,
  toggleStatus,
};
