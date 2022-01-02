// const dns = require('dns');
// const dnsLookup = (domain: string) => {
//   dns.lookup(domain, (err, address, family) => {
//     console.log('address: %j family: IPv%s', address, family);
//   });
// };

/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
import fs from 'fs';
import path from 'path';
import dns from 'dns';

const cleanEmails = (data: string) => {
  let strArr = data.split('\n');

  strArr = strArr.filter(Boolean);

  if (strArr[0] === 'Emails') {
    strArr.shift();
  }

  // find well formed emails using regex
  const filteredEmails = strArr.filter((str) => {
    return str.match(/^[a-zA-Z+0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
  });

  return filteredEmails;
};

function validateEmailAddresses(inputPath: string[], outputFile: string) {
  inputPath.forEach((inputPath) => {
    const readStream = fs.createReadStream(inputPath, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });
    readStream.on('data', async (chunk: string) => {
      const wellformedEmails = cleanEmails(chunk);

      wellformedEmails.map((email) => {
        const domain = email.split('@')[1];
        dns.resolve(domain, 'MX', function (err, addresses) {
          if (err) {
            console.log('No MX record exists, so email is invalid.');
          } else if (addresses && addresses.length > 0) {
            writeStream.write(email + '\n');
          }
        });
      });
    });
    writeStream.on('end', () => {
      console.log('The end');
    });
  });

  console.log('Complete the implementation in src/validation.ts');
}

export default validateEmailAddresses;
