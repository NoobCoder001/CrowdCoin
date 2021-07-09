const path = require('path'); 
const solc = require('solc'); 
const fs = require('fs-extra');  //similar to fs with some couple of helpers

//Why are we using build Folder ? 
//Because We don't always want to compile our source code 
//So we are just keeping outputs in build folder 

const buildPath = path.resolve(__dirname, 'build'); 
fs.removeSync(buildPath); //default fs module didn't have any removeSync function or ability to remove folder this simple

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol'); 
const source = fs.readFileSync(campaignPath, 'utf8'); 
const output = solc.compile(source,1).contracts;  

fs.ensureDirSync(buildPath); //it checks if the directory exits and if not, it creates a new directory 
 

for(let contract in output){ 
    fs.outputJsonSync( 
      path.resolve(buildPath, contract.replace(':', '') + '.json'), 
      output[contract]
    ); 
}