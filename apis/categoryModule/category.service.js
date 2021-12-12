const { Category } = require('./category.model');
const messages = require('../../translation/messages.json');

const getCategory = async ({ per_page, page }) => {
  const offset = (page - 1) * per_page;
  const category = await Category.find().skip(offset).limit(per_page);
  if (category) return { isSuccess: true, data: category };
  const message = messages['NO-CATEGORY-FOUND'];
  return { isSuccess: false, message };
};

const createCategory = async ({ category }) => {
  let message;
  try {
    const exist = await Category.exists({ category });
    if (exist) {
      message = messages['CATEGORY-EXIST'];
      return { isSuccess: false, message };
    }
    const category_data = await Category.create({
      category,
    });
    if (category_data) {
      message = messages['CATEGORY-CREATED-SUCCESS'];
      return { isSuccess: true, data: category_data, message };
    }
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

const updateCategory = async ({ id, category }) => {
  let message;
  const query = { _id: id };
  const update = {
    category,
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
