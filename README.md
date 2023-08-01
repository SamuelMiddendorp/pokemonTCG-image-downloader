# PokemonTCG image downloader

## About

Simple tool to mass download sets of images from the pokemonTCG API. Can be used to host images yourself of the cards returned by the API. Follows the same file structure as the original urls so easy to adapt. Can be used for both small and hires images.


##### Be mindful when running large exports, images take quite a bit of bandwidth (~170kb for small and ~900kb for hi-res images)

## Getting Started

Installation is very easy, the script uses AXIOS and FSE to make requests and write files and folders respectively.

### Prerequisites

You should have Node and NPM installed.

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:SamuelMiddendorp/pokemonTCG-image-downloader.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
## Usage

After installation using the script is very easy.

### Downloading a set of small images by id

```sh
node index.js swsh8
```
This will create folder swsh8 in the directory the script is located in and will put all images in there.

### Downloading a set of large images by id

```sh
node index.js swsh8 true
```


### Small note on extending

It is not that difficult to download every image from every set this way yourself. You can get a list of all sets by calling the pokemonTCG API and pipe them through.





