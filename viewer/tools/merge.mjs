import { readFileSync, writeFileSync } from 'fs';
import { schemaFolder, folder, mergedStructure, structureFile, defFile, githubPath } from './values.mjs';
import { join } from 'path';
// merges the json files to one json file
const input = {};
// loop through all subfolders
readdirSync(schemaFolder).forEach((resource) => {
    if(resource === defFile) {
      input['defs'] = JSON.parse(readFileSync(join(schemaFolder, resource), 'utf8'));
      return;
    }
    // create a new json object for each subfolder
    const subFolder = resource.slice(0, -5);

    let content = readFileSync(join(schemaFolder, resource), 'utf8');
    content = content.replaceAll('"$ref": "defs.json', `"$ref": "${githubPath}/main/schemas/defs.json`);
    const structure = JSON.parse(content);

    input[subFolder.replace(/-/g, ' ')] = {
        structure,
        values: {}
    };
    // write the content of the file to the json object
    readdirSync(join(folder, subFolder)).filter(file => file !== structureFile).forEach((file) => {
        // write the content of the file to the json object
        const content = JSON.parse(readFileSync(join(folder, subFolder, file), 'utf8'));
        content['$schema'] = content['$schema'].replace('../..', `/main/${githubPath}`);

        input[subFolder.replace(/-/g, ' ')].values[content.Name] = content;
    });
});
//TODO: think about to separate the structure and the values files in the future so others can query only the information they need
// write the final json object to a file
writeFileSync(mergedStructure, JSON.stringify(input));
