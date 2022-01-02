/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */

import fs from 'fs';
import path from 'path';

// create interface for template
interface Template {
  'valid-domains': string[];
  totalEmailsParsed: number;
  totalValidEmails: number;
  categories: {
    [key: string]: number;
  };
}

const template: Template = {
  'valid-domains': [],
  totalEmailsParsed: 0,
  totalValidEmails: 0,
  categories: {},
};

const readFiles = (data: string) => {
  let strArr = data.split('\n');

  strArr = strArr.filter(Boolean);
  if (strArr[0] === 'Emails') {
    strArr.shift();
  }
  template.totalEmailsParsed = strArr.length;

  // find well formed emails using regex
  const emails = strArr.filter((str) => {
    return str.match(/^[a-zA-Z+0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
  });

  emails.forEach((email) => {
    const domain = email.split('@')[1];
    if (template.categories[domain]) {
      template.categories[domain] += 1;
    } else {
      template.categories[domain] = 1;
    }

    if (template['valid-domains'].indexOf(domain) === -1) {
      template['valid-domains'].push(domain);
    }
  });
  template.totalValidEmails = emails.length;
};

function analyseFiles(inputPaths: string[], outputPath: string) {
  inputPaths.forEach((inputPath) => {
    fs.readFile(inputPath, 'utf8', (err, data: string) => {
      if (err) {
        console.log(err);
      } else {
        readFiles(data);

        fs.writeFile(
          outputPath,
          JSON.stringify(template, null, 2),
          (err: string) => {
            if (err) {
              console.log(err);
            } else {
              console.log('Successfully written to file');
            }
          },
        );
      }
    });
  });
}

export default analyseFiles;
// First, we'd like to analyse the emails and determine which addresses are well-formed and the providers they belong to.

// It'll be best to categorize the emails by domain names and specify which are valid or invalid. That would help tell us which channel is more reliable.
