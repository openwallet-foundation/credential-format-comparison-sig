import fs from 'fs';
import { folder, mergedStructure, structureFile } from './values.mjs';

// merges the json files to one json file
const input = {};
// loop through all subfolders
fs.readdirSync(folder).forEach((subFolder) => {
    const info = fs.lstatSync(`${folder}/${subFolder}`);
    if(info.isDirectory()) {
        // create a new json object for each subfolder
        input[subFolder] = {
          structure: JSON.parse(fs.readFileSync(`${folder}/${subFolder}/${structureFile}.json`, 'utf8')),
          values: {}
        };
        fs.readdirSync(`${folder}/${subFolder}`).filter(file => file !== `${structureFile}.json`).forEach((file) => {
            // write the content of the file to the json object
            const content = JSON.parse(fs.readFileSync(`${folder}/${subFolder}/${file}`, 'utf8'));
            input[subFolder].values[file.slice(0, -5)] = content;
        });
    }
});
// write the final json object to a file
fs.writeFileSync(mergedStructure, JSON.stringify(input, null, 2));
