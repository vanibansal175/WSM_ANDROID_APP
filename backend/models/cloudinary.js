import { v2 as cloudinary } from 'cloudinary';

function configure(cloud_name,api_key,api_secret) { 
     cloudinary.config({ 
        cloud_name: cloud_name, 
        api_key: api_key, 
        api_secret: api_secret
    });
}

async function upload_photo(photo,public_id,) { 
    return await cloudinary.uploader
       .upload(
           photo, {
               public_id: public_id,
           } 
       )
       .catch((error) => {
           console.log(error);
       });
}


module.exports = {configure,upload_photo}