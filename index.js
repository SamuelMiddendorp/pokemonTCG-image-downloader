const axios = require('axios');
const fse = require('fs-extra');
const sampleSet = "sm2";

const getImagesFromSet = async (set) => {

    const {
        data
    } = await axios.get(`https://api.pokemontcg.io/v2/cards?q=set.id:${set}&page=1&pageSize=250&orderBy=number`);
    return data.data.map(x => x.images.small);
}
const main = async () => {

    // Load image urls from given set;
    const images = await getImagesFromSet(sampleSet);
    for (var i = 0; i < images.length; i++) {

        let image = images[i];
        const res = await axios.get(image, {
            responseType: 'arraybuffer'
        });
        console.log(image);
        // Get correct folder and file name from image url
        fse.outputFile(image.split("pokemontcg.io/")[1], res.data);
    }
}
main();