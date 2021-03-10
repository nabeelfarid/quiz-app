// The build generates new hased file names after each  build,
// And the service worker needs the list of these new file names for caching, 
// and there they can't be hard coded in service worker app shell array list
// This is a nodeJS script that rums after each build to insert names of these new files in SW array 


// using the asset-manifest.json file to retrieve the newly generated hased file names
let assetsJson = require("./build/asset-manifest.json");
let fileNames = Object.keys(assetsJson.files);


hashedFileNames = fileNames.map((fileName) => {
  return `'${assetsJson.files[fileName]}'`;
}).join(",\n")
console.log('Updating sw.js to include newly build hashed-named files for caching App shell...');

let fs = require('fs')
let jsonManifestFile = './build/sw.js'
fs.readFile(jsonManifestFile, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let result = data.replace(/'<HASHED_BUILD_FILES>'/g, hashedFileNames);
  // Also generate a new version number for versioning cache for each build
  result = result.replace(/<VERSION>/g, new Date().getTime());
  fs.writeFile(jsonManifestFile, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

console.log('Update Completed.')

