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
const fs = require('fs');
const path = require('path');
const dns = require('dns');
//     const email = 'arjunphp@gmail.com';
//  const domain = email.split('@')[1];
// dns.resolve(domain, 'MX', function(err, addresses) {
//  if (err) {
//     console.log('No MX record exists, so email is invalid.');
// } else if (addresses && addresses.length > 0) {
//     console.log('This MX records exists So I will accept this email as valid.');
// }
// create template object
// create interface for a function that receives an array of emails
type Options = {
  types?: {
    [typeName: string]:
      | false
      | string
      | {
          message: string;
          fixWith?: string;
        };
  };
  extendDefaults?: boolean;
};
interface Email {
  email: string;
  domain: string;
}

// function memoizer(fun: Options) {
//   interface Cache {
//     [key: string]: string;
//   }

//   const cache: Cache = {};

//   return function (n: string) {
//     if (cache[n] !== undefined) {
//       return cache[n];
//     } else {
//       const result = fun(n);
//       cache[n] = result;

//       return result;
//     }
//   };
// }

const cleanEmails = (data: string) => {
  let strArr = data.split('\n');

  strArr = strArr.filter(Boolean);
  if (strArr[0] === 'Emails') {
    strArr.shift();
  }
  // template.totalEmailsParsed = strArr.length;
  console.log(strArr);
  // find well formed emails using regex
  const filteredEmails = strArr.filter((str) => {
    return str.match(/^[a-zA-Z+0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
  });
  console.log(filteredEmails);

  return filteredEmails;
};

function getDomain(emails: string[]) {
  const domains = emails.map((email) => {
    const domain = email.split('@')[1];
    return domain;
  });
  console.log(domains);
  return domains;
}

// const inputPaths = [
//   path.join(__dirname, '../fixtures/inputs/small-sample.csv'),
//   path.join(__dirname, '../fixtures/inputs/medium-sample.csv'),
// ];

function validateEmailAddresses(inputPath: string[], outputFile: string) {
  // const output = fs.createWriteStream(outputFile);
  inputPath.forEach((inputPath) => {
    const stream = fs.createReadStream(inputPath, { encoding: 'utf8' });
    stream.on('data', (chunk: string) => {
      const wellformedEmails = cleanEmails(chunk);
      // const domains = getDomain(wellformedEmails);
      console.log(wellformedEmails);

      const validEmails = wellformedEmails.forEach((email) => {
        const domain = email.split('@')[1];
        dns.resolve(domain, 'MX', function (err: Error, addresses: string) {
          if (err) {
            console.log('No MX record exists, so email is invalid.');
          } else if (addresses && addresses.length > 0) {
            fs.appendFile(outputFile, `${email}\n`, (err: unknown) => {
              if (err) throw err;
              console.log('The "data to append" was appended to file!');
            });
            console.log(email);
          }
        });
      });
    });
  });

  console.log('Complete the implementation in src/validation.ts');
}

export default validateEmailAddresses;
