# Credential Format Comparison

A viewer that will visualize the algorithms and the credential profiles.

## Getting Started

Install the dependencies with `npm ci` and run the viewer with `npm start`. It will run the merge command that will merge all files from the `./data` folder in one file that will be used by the viewer.
When you update the entries in the `./data` folder, you can run `npm run merge:watch` which will generate the `structure.json` file.

## Data folder structure

On the first level of the `./data` folder, you will find the algorithms and the credential profiles. The name of the folder will be used as the name of the algorithm or the credential profile. On the second level there are elements of the algorithms or the credential profiles. Therefore each algorithm needs a unique name.

### Algorithms

The `structure.json` file contains all the headers of the tables, where the key is name and the value is the description of the row. The different algorithms MUST NOT define all values defined in the `structure.json`, but extra values are ignored during the rendering process.

TODO: implement checks during the CICD if all files are compliant with the `structure.json` file.

### Credential profiles

The profiles are linking to entries of the different algorithms. If the specified algorithm is not defined, the viewer will will display it, but will not link to the defined algorithm.

## CICD

Before merging a PR, the CI pipeline will validate if the data has a valid format. If so, the data will be prepared for the web application that can be used to visualize the data.
