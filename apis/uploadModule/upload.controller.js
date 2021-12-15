const cloudinary = require('../../helpers/cloudinary.service');
const multer = require('multer');
const { sendSuccess, sendError } = require('../../helpers/response.format');

const uploadImage = async (request, response) => {
    try {
        const path = request.file.path;
  
        const file = await cloudinary.uploader.upload(path);
    
        if (file) {
          const image_url = file.secure_url;
          const image_id = file.public_id;
    
          return sendSuccess({ response, data: { image_url, image_id } });
        }
    } catch (error) {
          return sendError({ response, error });
    }
  };


  module.exports = { uploadImage };