# mnh-backend

## Starting
``
node server.js
``

## API

All are POST requests.

### /import
Converts an odt or doc(x) to commonmark and copies media (and serves
these). It returns a JSON with two fields: "markdown" (containing the
markdown string) and "media" (containing a list of media).

### /upload
Uploads to "files" dir on server. Responds with url for the file.

### /export/:type
Converts commonmark markdown to anything pandoc supports. The "type"
parameter has to be the file ending, such as "/export/pdf". Will
return the file as response. 

### static file server
All files in the "files" folder are statically served 

## Examples
See test.html for convert, upload and export tests

