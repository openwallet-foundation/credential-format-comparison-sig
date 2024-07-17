import {replaceInFile} from 'replace-in-file';

const buildTime = new Date().toISOString();

const options = {
    files: 'src/environments/environment.ts',
    from: /buildTime: '(.*)'/g,
    to: `buildTime: '${buildTime}'`,
}

try {
    replaceInFile(options).then(results => console.log('Replacement results:', results));
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
