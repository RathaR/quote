var fs = require('fs');
import Promise from 'bluebird';

export default function (file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, function(err, data) {
      if(err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
