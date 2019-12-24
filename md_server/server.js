var express = require("express");

//to access and interact with file paths
var path = require('path');


var markdown = require("markdown-js");

//to access physical file system
var fs = require("fs");


app = express();

//md files path
md_files_path = "C:\\Users\\DELL\\Desktop\\cloudfiles\\cloudYuga-tech\\assignment\\"


// to get MD files list
var getFileList = function (md_files_path, filelist) {
    files = fs.readdirSync(md_files_path);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(md_files_path + file).isDirectory()) {
            filelist = getFileList(md_files_path + file + '\\', filelist);
        } else {
            filelist.push((path.dirname(md_files_path + file).split(path.sep).pop() + '/' + file).split('.')[0]);
        }
    });
    console.log(filelist);
    return filelist;

};

var filelist = getFileList(md_files_path);
//to run index file
app.get('/', function (req, res) {
    console.log("*******Opening index file********* ")
    res.sendFile("C:\\Users\\DELL\\Desktop\\md_server\\view\\index.html");
});

// to display parsed html files
app.get('/:type(' + filelist.join('|') + ')/', function (req, res) {
    console.log("**************converting MD files into html files************")
    console.log(req.path)
    console.log(path.join(md_files_path, req.path));
    var file_content = fs.readFileSync(path.join(md_files_path, req.path) + '.md', "utf8");
    var md_content = markdown.makeHtml(file_content);
    res.send(md_content);
});

console.log('******running on port number 5000******');
app.listen(5000);
