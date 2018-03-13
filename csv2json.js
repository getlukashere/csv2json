const path = require('path');
const csv = require('csvtojson');
const fs = require('fs');
const converter = csv();  //default noheader is false
var array = [];
const csvFilepath = path.join(__dirname,"customer-data.csv");
const outputFilepath = path.join(__dirname,"customer-data.json");
converter
.fromFile(csvFilepath)
.on('json',(jsonObj,rowIndex)=>{
    // combine csv header row and csv line to a json object
	array.push(jsonObj);
})
.on('done',(error)=>{
	if(error) {
		console.log("somthing went wrong1:"+  error);
		process.exit(1);
	}
    fs.writeFile(outputFilepath, array,'utf-8', (error)=>{
    	if(error) {
    		console.log("somthing went wrong2:" + error);
    		process.exit(1);
    	}
    	console.log("json created at : " + outputFilepath);
    	process.exit(0); 
    });
})
.on('error',(error)=>{
	console.log("somthing went wrong3:"+  error);
});
