import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
let catImages = [];

const fetchCatImages = async () => {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
        catImages = response.data.map(img => img.url);
    } catch (error) {
        console.error('Failed to fetch cat images:', error);
    }
};

// Fetch images on server start
// fetchCatImages();

app.get('/', async (req, res) => {
    try {
        if (catImages.length <= 1) {
            fetchCatImages();
        }
        if (catImages.length >= 10) {
            catImages = catImages.slice(0, 10);
        }
        const factResponse = await axios.get('https://catfact.ninja/fact');
        const randomImage = catImages[Math.floor(Math.random() * catImages.length)];
        // const imageResponse = await axios.get('https://api.thecatapi.com/v1/images/search');
        res.render('index.ejs', {
            catFact: factResponse.data.fact,
            catImage: randomImage
            // catImage: imageResponse.data[0].url
        });
    } catch (error) {
        console.error(error);
        res.render('index.ejs', {
            error: 'Failed to load cat fact or image. Please try again later!'
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
