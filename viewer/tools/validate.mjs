import fs from 'fs';
import process from 'process';
import { folder, structureFile } from './values.mjs';
import Ajv from 'ajv';

let error = false;
//will loop through all the files and will check if the entries match with the structure defined in the info.json file.
fs.readdirSync(folder).forEach((subFolder) => {        
    const infoFile = fs.readFileSync(`../data/${subFolder}/${structureFile}`, 'utf8');
    if(!infoFile) {
        console.log(`No schema file found for ${subFolder}`);
        process.exit(1);            
    }
    const ajv = new Ajv({allowUnionTypes: true});    
    const validate = ajv.compile(JSON.parse(infoFile));
        
    fs.readdirSync(`${folder}/${subFolder}`).filter(file => file !== structureFile).forEach((file) => {        
        const content = JSON.parse(fs.readFileSync(`${folder}/${subFolder}/${file}`));
        if(!validate(content)) {
            console.log(`File ${file} is invalid`);
            console.log(validate.errors);
            error = true;
        }
    });
});
if(error) {
    console.error(`At least one file is invalid`);
    process.exit(1);
} else {
    console.log(`All files are valid`);
}