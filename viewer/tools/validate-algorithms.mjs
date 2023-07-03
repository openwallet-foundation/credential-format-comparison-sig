import fs from 'fs';
import process from 'process';
import { folder, credentialProfileFolder, structureFile } from './values.mjs';

//will loop through all the files and will check if the entries match with the structure defined in the info.json file.
fs.readdirSync(folder).filter(folder => 
    folder !== credentialProfileFolder).forEach((subFolder) => {
    const infoFile = fs.readFileSync(`../data/${subFolder}/${structureFile}.json`, 'utf8');
    if(!infoFile) {
        console.log(`No info file found for ${subFolder}`);
        process.exit(1);            
    }
    const structure = Object.keys(JSON.parse(infoFile));        
    fs.readdirSync(`${folder}/${subFolder}`).filter(file => file !== structureFile).forEach((file) => {
        const content = fs.readFileSync(`${folder}/${subFolder}/${file}`);
        const keys = Object.keys(JSON.parse(content));
        keys.forEach((key) => {
            if(!structure.includes(key)) {
                console.log(`Invalid structure in ${subFolder}/${file}: key ${key} is not known in the ${structureFile} file`);
                process.exit(1);
            }
        });
        console.log(`Valid structure in ${subFolder}/${file}`);
    });
});