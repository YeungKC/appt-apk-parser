'use strict';

const path = require('path');
const os   = require('os');
const exec = require('child_process').exec;
const fs   = require('fs');

module.exports = function(apkPath, aaptPath) {
  return new Promise((resolve, reject) => {
    const aapt = aaptPath || path.join(__dirname, 'aapt_' + os.platform());

    try {
      fs.chmodSync(aapt, '777');
    } catch (e) {
    }

    const command = aapt + ' d badging ' + apkPath;

    exec(command, function(err, stdout, stderr) {
      if (err) reject(err);
      if (stderr) reject(new Error(stderr));

      resolve(stdout);
    });
  });
};
