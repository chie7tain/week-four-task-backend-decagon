// import { transform } from "lodash";

import { result } from 'lodash';

// const fs = require('fs');
// const path = require('path');

// function readable(data) {
//   console.log(data);
//   return fs.createReadStream(data, { encoding: 'utf8' });
// }

// const transform = (chunk) => chunk.split('\n').map((line) => line + 'ifeanyi');
// const res = readable('./fixtures/inputs/small-sample.csv');

// res.on('data', (chunk) => {
//   console.log(chunk);
//     let res = transform(chunk);
//     console.log(res);
// }).on('end', () => {
//   console.log('end');
// })
// // fs.createWriteStream(
// //   path.join(__dirname, './fixtures/outputs/small-sample.csv'),
// //   { encoding: 'utf8' },
// // ).write(stream);
function lengthOfLongestSubstring(check: string) {
  let max = 0;
  let currentString = '';
  let char = '';

  for (let i = 0; i < check.length; i++) {
    char = check[i];
    if (currentString.indexOf(char) === -1) {
      currentString += char;
      if (currentString.length > max) {
        max = currentString.length;
      }
    } else {
      currentString = currentString.slice(currentString.indexOf(char) + 1);
      currentString += char;
    }
  }
  console.log(max);
  return max;
}
function secondLengthOfLongestSubstring(check: string) {
  let max = 0;
  let currentString = '';
  let char = '';

  for (let i = 0; i < check.length; i++) {
    char = check[i];
    if (currentString.indexOf(char) === -1) {
      currentString += char;
      if (currentString.length > max) {
        console.log(currentString.length, max);
        max = currentString.length;
      }
    } else {
      currentString = currentString.slice(currentString.indexOf(char) + 1);
      console.log(currentString);
      currentString += char;
      console.log(currentString);
    }
  }
}
function thirdLengthOfLongestSubstring(check: string) {
  const holder = [];
  let max = 0;
  for (let i = 0; i < check.length; i++) {
    holder.push(check[i]);
    const res = [...new Set(holder)];
    max = Math.max(max, res.length);
  }

  console.log(max);
}
thirdLengthOfLongestSubstring('atybcabcbb');
thirdLengthOfLongestSubstring('abcbda');
secondLengthOfLongestSubstring('abcabcbb');
lengthOfLongestSubstring('aaabcabcbb');
lengthOfLongestSubstring('abcbda');
