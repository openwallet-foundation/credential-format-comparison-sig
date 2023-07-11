import fs from 'fs';
import { credentialProfileFolder, folder, mergedStructure, structureFile } from './values.mjs';

const schemaPath = `${folder}/${credentialProfileFolder}/schema.json`;
const file = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

Object.keys(file.properties).forEach((key) => {    
    const enums = getEnum(key.startsWith('Key Management') ? 'Key Management' : key);
    if(enums) {
        file.properties[key].enum = [...enums, 'tbd'];        
    }
});
fs.writeFileSync(schemaPath, JSON.stringify(file, null, 2));

function getEnum(subFolder) {
// adds the resources to the schema file of the profile
    try {
        const info = fs.lstatSync(`${folder}/${subFolder.replace(' ', '-')}`);
        if(info.isDirectory()) {
            return fs.readdirSync(`${folder}/${subFolder.replace(' ', '-')}`).filter(file => file !== structureFile).map((file) => 
                JSON.parse(fs.readFileSync(`${folder}/${subFolder.replace(' ', '-')}/${file}`, 'utf8'))[subFolder]
            );
        }
    } catch (e) {
        return null;
    }
}
