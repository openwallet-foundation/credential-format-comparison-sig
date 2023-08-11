import {readFileSync, writeFileSync, lstatSync, readdirSync} from 'fs';
import { folder, schemaFolder } from './values.mjs';

const schemaPath = `${schemaFolder}/Credential-Profile.json`;
const file = JSON.parse(readFileSync(schemaPath, 'utf8'));

Object.keys(file.properties).forEach((key) => {    
    const enums = getEnum(key.startsWith('Key Management') ? 'Key Management' : key);
    if(enums) {
        file.properties[key].enum = [...enums];        
    }
});
writeFileSync(schemaPath, JSON.stringify(file, null, 2));

function getEnum(subFolder) {
// adds the resources to the schema file of the profile
    try {
        const info = lstatSync(`${folder}/${subFolder.replace(' ', '-')}`);
        if(info.isDirectory()) {
            return readdirSync(`${folder}/${subFolder.replace(' ', '-')}`).map((file) => 
                JSON.parse(readFileSync(`${folder}/${subFolder.replace(' ', '-')}/${file}`, 'utf8'))[subFolder]
            );
        }
    } catch (e) {
        return null;
    }
}
