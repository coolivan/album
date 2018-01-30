var fs = require("fs");


exports.getAllAlbums = function(callback){//导步，需要回调
    fs.readdir('./uploads/',function(err,files){
        if(err){
            callback("没有找到文件夹",null);
        }
        var allAlbums = [];
        (function iterator(i){
            if(i == files.length){
                //return allAlbums; //导步，返回空
                callback(null,allAlbums);
                return;
            }
            fs.stat("./uploads/" + files[i],function(err,stats){
                if(err){
                    callback("找不到文件" + files[i],null);
                }
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i+1);
            })
        })(0);
    });

    // return ["111","222"]
}

exports.getAllImagesByAlbumName = function(albumName,callback){
    fs.readdir('./uploads/' + albumName,function(err,files){
        if(err){
            callback("没有找到文件夹：" + albumName,null);
            return;
        }
        var allImages = [];
        (function iterator(i){
            if(i == files.length){
                // console.log(allImages);
                callback(null,allImages);
                return;
            }
            fs.stat("./uploads/" + albumName + "/" + files[i],function(err,stats){
                if(err){
                    callback("找不到文件" + files[i],null);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i+1);
            })
        })(0);
    });
}