import {readFileSync, writeFileSync, lstatSync, readdirSync, existsSync, mkdirSync} from 'fs';
import { folder, githubPath, schemaFolder } from './values.mjs';
import { join } from 'path';

const schemaPath = `${schemaFolder}/Credential-Profile.json`;
const file = JSON.parse(readFileSync(schemaPath, 'utf8'));
const generatedFolder = "src/assets/schemas";

if(!existsSync(generatedFolder)) {
  mkdirSync(generatedFolder);
}
Object.keys(file.properties).forEach((key) => {
    const enums = getEnum(key.startsWith('Key Management') ? 'Key Management' : key);
    if(enums) {
      const enumSchema = {
        "$id": `${githubPath}/main/viewer/${generatedFolder}/${key.replace(' ', '-')}.json`,
        "$schema": "http://json-schema.org/draft-07/schema#",
        description: `The used ${key}`,
        type: "string",
        enum: enums
      }
      //TODO: maybe it's better to publish them on a separate path in git. This would allow others to pull the repo to get access to the values instead of querying the server. However placing it in the asset folder, it allows locally to use the data.
      writeFileSync(join(generatedFolder, `${key.replace(' ', '-')}.json`), JSON.stringify(enumSchema, null, 4));
    }
});

function getEnum(subFolder) {
// adds the resources to the schema file of the profile
    try {
        const info = lstatSync(`${folder}/${subFolder.replace(' ', '-')}`);
        if(info.isDirectory()) {
            return readdirSync(`${folder}/${subFolder.replace(' ', '-')}`).map((file) =>
                JSON.parse(readFileSync(`${folder}/${subFolder.replace(' ', '-')}/${file}`, 'utf8')).Name
            );
        }
    } catch (e) {
        return null;
    }
}
