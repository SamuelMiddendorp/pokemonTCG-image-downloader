const axios = require('axios');
const fse = require('fs-extra');

const getImagesFromSet = async (set, useLargeImages) => {
    // Inititalize here
    let images = []

    const data = await doRequest(formulatePaginatedRequest(1, set));

    images = images.concat(data.data)
    // Anno 2023 some sets are very big, luckily they are not that big that we have to recursively use pages
    if (data.totalCount > 250) {
        const data = await doRequest(formulatePaginatedRequest(2, set));
        images = images.concat(data.data);
    }

    return images.map(x => useLargeImages ? x.images.large : x.images.small);
}
const doRequest = async (url) => {
    const { data } = await axios.get(url);

    if (data.data.length == 0) {
        throw new Error("Api call yielded no results, is the setId correct?");
    } else {
        return data;
    }
}
const formulatePaginatedRequest = (page, set) => {
    return `https://api.pokemontcg.io/v2/cards?q=set.id:${set}&page=${page}&pageSize=250&orderBy=number&select=images`
}

const main = async () => {
    console.log("Thanks for using this tool, be mindfull when running large exports since images take quite some bandwidth!\nPress CTRL + c to stop at anytime");
    
    const setId = process.argv[2] || "";
    const useLargeImages = process.argv[3] || false;

    if (setId == "") {
        throw new Error("No set has been provided as input");
    }

    // Load image urls from given set;
    const images = await getImagesFromSet(setId, useLargeImages);

    for (var i = 0; i < images.length; i++) {
        let image = images[i];
        // Read image as data
        const res = await axios.get(image, {
            responseType: 'arraybuffer'
        });
        // Get correct folder and file name from image url
        const outputPath = image.split("pokemontcg.io/")[1];

        console.log(`Writing file: ${outputPath}`);
        // fse outputfile is used to leverage the same file structure of the source files. It creates folders if they do not exist
        // normal fs writefile will not do this.
        fse.outputFile(outputPath, res.data);
    }
}
main();