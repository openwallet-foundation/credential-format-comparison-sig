import fs from 'fs';
import process from 'process';
import { folder, credentialProfileFolder, structureFile } from './values.mjs';

//will loop through all the files and will check if the entries match with the structure defined in the info.json file.
const structureFileContent = fs.readFileSync(`${folder}/${credentialProfileFolder}/${structureFile}.json`);
if(!structureFileContent) {
    console.log(`No structure file found for ${structureFileContent}`);
    process.exit(1);            
}
const structure = JSON.parse(structureFileContent);

fs.readdirSync(`${folder}/${credentialProfileFolder}`).filter(file => file !== `${structureFile}.json`).forEach((file) => {            
    const content = fs.readFileSync(`${folder}/${credentialProfileFolder}/${file}`);
    const keys = Object.keys(JSON.parse(content));
    keys.forEach((key) => {
        if(!structure.includes(key)) {
            console.log(`Invalid structure ${file}: key ${key} is not known in the ${structureFile} file`);
            process.exit(1);
        }
    });
    console.log(`Valid structure in ${file}`);
});