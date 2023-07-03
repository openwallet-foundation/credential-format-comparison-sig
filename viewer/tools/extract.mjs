import fs from 'fs';
import XLSX from 'xlsx';
import { structureFile, folder } from './values.mjs';
const workbook = XLSX.readFile('./tools/Credential Comparison Matrix.xlsx');
const sheet_name_list = workbook.SheetNames;

fs.existsSync(folder) && fs.rmSync(folder, { recursive: true }) || fs.mkdirSync(folder);
for(let i = 2; i < sheet_name_list.length - 2; i++){
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[i]]);
  xlData.pop();
  let folderName = `${folder}/${sheet_name_list[i].replace('_', ' ')}`;
    fs.existsSync(folderName) || fs.mkdirSync(folderName);
    xlData.forEach((data) => {
        let fileName = data[sheet_name_list[i].replace('_', ' ')].replace('/', '-');
        if(fileName === 'Glossary') fileName = structureFile;
        fs.writeFileSync(`${folderName}/${fileName}.json`, JSON.stringify(data, null, 2));
    });
}

const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
const topics = Object.values(xlData[0]).slice(1, 12);
console.log(topics);
const subFolder = `${folder}/Credential Profile`;
fs.existsSync(subFolder) || fs.mkdirSync(subFolder);
fs.writeFileSync(`${subFolder}/${structureFile}.json`, JSON.stringify(topics, null, 2));
xlData.slice(2, 20).forEach((row) => {
  const obj = {};
    const values = Object.values(row).slice(1);    
    for(let i = 0; i < topics.length; i++) {
      obj[topics[i]] = values[i];
    }
    fs.writeFileSync(`${subFolder}/${row['Credential Profile'].replace('/', '-')}.json`, JSON.stringify(obj, null, 2));
});
