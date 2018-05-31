/*
 * This file returns an api version composed of:
 * package.version+gitshortcommit[-dirty]
 */

module.exports = () => {
  const fs = require('fs');
  const childProcess = require('child_process');

  const package = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  try {
    const gitShortCommit = childProcess.execSync('git rev-parse --short HEAD').toString().trim();
    let isDirty = false;
    try {
      childProcess.execSync('git diff --no-ext-diff --quiet --exit-code')
    } catch (error) {
      isDirty = true;
    }
    return `${package.version}+${gitShortCommit}${isDirty ? "-dirty" : ""}`;
  } catch (error) {
    return package.version;
  }
}
