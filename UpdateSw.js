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
let swFile = './build/sw.js'

let data    = fs.readFileSync(swFile, "utf8")

console.log('Inserting Hashed-File-Names...');
let result = data.replace(/'<HASHED_BUILD_FILES>'/g, hashedFileNames);
// Also generate a new version number for versioning cache for each build
const versionNo = new Date().getTime();
console.log('Inserting Version No:', versionNo);
result = result.replace(/<VERSION>/g, versionNo);
fs.writeFileSync(swFile, result, 'utf8')

console.log('Update Completed.')

