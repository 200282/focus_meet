const axios = require('axios');
const fs = require('fs');

// Read image file as binary data
const imageBuffer = fs.readFileSync('path/to/image.jpg');

// Convert binary data to Base64 string
const base64Image = Buffer.from(imageBuffer).toString('base64');

// Example POST request with Axios
axios.post('http://example.com/upload', {
    image: base64Image,
    description: 'A base64-encoded image'
})
.then(response => {
    console.log('Image uploaded:', response.data);
})
.catch(error => {
    console.error('Error uploading image:', error);
});
