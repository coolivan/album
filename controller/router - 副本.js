var file = require("../models/file");

exports.showIndex = function(req,res){
    // res.render("index",{
    //     "albums":file.getAllAlbums(),
    // });
    file.getAllAlbums(function(err,allAlbums){
        if(err){
            res.send(err);
            return;
        }
        res.render("index",{
            "albums": allAlbums
        })
    })

}

exports.showAlbum = function(req,res){
    res.send("album.html")
}