const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


module.exports = cloudinary;
// exports.uploads = (file, folder) => {
//     try {
//         return new Promise(resolve => {
//             cloudinary.uploader.upload(file, (result) => {
//                 resolve({
//                     url: result.url,
//                     id: result.public_id
//                 })
//             }, {
//                 resource_type: "auto",
//                 folder: folder
//             })
//         })
//     } catch (error) {
//      console.log("error",error);  
//     }

// }