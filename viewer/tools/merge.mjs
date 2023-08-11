import fs from 'fs';
import { schemaFolder, folder, mergedStructure, structureFile, defFile } from './values.mjs';
import { join } from 'path';

// merges the json files to one json file
const input = {};
// loop through all subfolders
fs.readdirSync(schemaFolder).filter(file => file !== defFile).forEach((resource) => {    
    // create a new json object for each subfolder
    const subFolder = resource.slice(0, -5);
    input[subFolder.replace(/-/g, ' ')] = {
        structure: JSON.parse(fs.readFileSync(join(schemaFolder, resource), 'utf8')),
        values: {}
    };            
    // write the content of the file to the json object
    fs.readdirSync(join(folder, subFolder)).filter(file => file !== structureFile).forEach((file) => {
        // write the content of the file to the json object
        const content = JSON.parse(fs.readFileSync(join(folder, subFolder, file), 'utf8'));                        
        const name = content[subFolder === 'Credential-Profile' ? 'Credential Profile is commonly called' : subFolder.replace(/-/g, ' ')];            
        input[subFolder.replace(/-/g, ' ')].values[name] = content;
    });
});
// write the final json object to a file
fs.writeFileSync(mergedStructure, JSON.stringify(input, null, 2));
