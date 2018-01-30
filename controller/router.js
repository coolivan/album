var file = require("../models/file");
var formidable =  require("formidable");
var fs = require("fs");
var path = require("path");
var dateFormat = require('dateformat');
var randomize = require('randomatic');

exports.showIndex = function(req,res,next){
    // res.render("index",{
    //     "albums":file.getAllAlbums(),
    // });
    file.getAllAlbums(function(err,allAlbums){
        if(err){
           // res.send(err);
           //  res.render("404");
            next();
            return;
        }
        res.render("index",{
            "albums": allAlbums
        })
    })

}

exports.showAlbum = function(req,res,next){
    var albumName = req.params.albumName;

    file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
        if(err){
            // res.send(err);
            // res.render("404");
            next();
            return;
        }
        res.render("album",{
            "albumName":albumName,
            "images":imagesArray,
            // "images":["1.jpg","2.jpg"]
        })
    })
    // res.send("album.html")
}

//显示上传
exports.showUpLoad = function(req,res){
    file.getAllAlbums(function(err,albums){
        res.render("upload",{
            albums:albums
        });
    })
}
//上传图片
exports.doPost = function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = "./temp";
    form.parse(req, function(err, fields, files,next) {
        if(err){
            next();
            return;
        }

        var size = parseInt(files.oimg.size);

        if(size > 2097152){
            fs.unlink(files.oimg.path,function(){});
            res.send("图片尺寸应该小于2M");
            return;
        }

        var time = dateFormat(new Date(),"yyyymmddhhMMss");
        var rand = randomize('0', 5);
        var ext = path.extname(files.oimg.name);

        var oldpath = files.oimg.path;
        var newpath = "./uploads/" + fields.odir + "/" + time + rand + ext;
        fs.rename(oldpath,newpath,function(err,next){
            if(err){
                console.log('Fename Failed!')
                next();
                return;
            }
            res.send("成功");
        })

    });
    // res.send('ok');
    // return;
}