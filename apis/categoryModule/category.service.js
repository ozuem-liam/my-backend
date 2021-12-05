const { Category } = require('./category.model');
const { Facility } = require('../facilityModule/facility.model');
const cloudinary = require('../../helpers/cloudinary.service');
const messages = require('../../translation/messages.json');

const getCategory = async ({ per_page, page }) => {
  const offset = (page - 1) * per_page;
  const category = await Category.find().skip(offset).limit(per_page);
  if (category) return { isSuccess: true, data: category };
  const message = messages['NO-CATEGORY-FOUND'];
  return { isSuccess: false, message };
};

const createCategory = async ({
  facility_id,
  category,
}) => {
  let message;
  try {
    const exist = await Category.exists({ category });
    if (exist) {
      message = messages['CATEGORY-EXIST'];
      return { isSuccess: false, message };
    }
    const category_data = await Category.create({
      facility_id,
      category,
    });
    if (category_data) {
      message = messages['CATEGORY-CREATED-SUCCESS'];
      const query = { $push: { categories: category_data._id } };
      const options = { new: true, useFindAndModify: false };

      const facility = await Facility.findByIdAndUpdate(facility_id, query, options);

      if (category_data && facility) return { isSuccess: true, data: category_data, message };
    }
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

const updateCategory = async ({
  id,
  category
}) => {
  let message;
  const query = { _id: id };
  const update = {
    category
  };
  const options = { upsert: false, new: true };
  const exist = await Category.exists({ category });
  if (exist) {
    message = messages['CATEGORY-EXIST'];
    return { isSuccess: false, message };
  }
  const category_data = await Category.findOneAndUpdate(query, update, options);
  message = messages['CATEGORY-UPDATE-SUCCESS'];
  if (category_data) return { isSuccess: true, data: category_data };

  message = messages['CATEGORY-UPDATE-ERROR'];
  return { isSuccess: false, message };
};

const deleteCategory = async (id) => {
  let message;
  try {
    const query = { _id: id };
    const category = await Category.findOneAndRemove(query);
    message = messages['CATEGORY-DELETE-SUCCESS'];
    if (category) return { isSuccess: true, category, message };
  } catch (error) {
    message = messages['CATEGORY-DELETE-ERROR'];
    return { isSuccess: false, message };
  }
};

module.exports = { createCategory, deleteCategory, getCategory, updateCategory };
