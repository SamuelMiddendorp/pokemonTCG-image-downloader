const axios = require('axios');
const fs = require('fs');
const sampleUrl = "https://images.pokemontcg.io/base1/9.png";


const main = async () => {
    const res = await axios.get(sampleUrl, {
        responseType: 'arraybuffer'
    });
    fs.writeFileSync("bar.png", res.data);
}
main();