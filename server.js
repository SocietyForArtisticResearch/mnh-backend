//const http = require("http");
const path = require("path");
const fs = require("fs");
const child = require('child_process');
const process = require('process');
const express = require('express');
const fileUpload = require('express-fileupload');

const port = 3000;

const app = express();

// default options
app.use(fileUpload());
 
app.post('/import', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let convertFile = req.files.convertFile;
    let type = convertFile.mimetype;
    let correctType = false;
    let converted = {};
    if ((type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||
	(type == "application/msword") ||
	(type == "application/vnd.oasis.opendocument.text")) {
	correctType = true;
	console.log("correct type");
    }
    
    if (correctType) {
	// Use the mv() method to place the file somewhere on your server
	convertFile.mv('files/' + convertFile.name, function(err) {
	    if (err) {
		return res.status(500).send(err);
	    }

	    child.exec(`pandoc files/${convertFile.name} --to=markdown`, (error, stdout, stderr) => {
		if (error) {
		    return res.status(500).send(err);
		} else {
		    converted.markdown = stdout;
		    return converted;
		}
	    });
	    
	    return res.json(converted);
	    
	});
    } else {
	return res.status(500).send("Wrong file type");
    }
});



app.listen(port, function () {
  console.log(`NMH backend app listening on port ${port}!`);
});
