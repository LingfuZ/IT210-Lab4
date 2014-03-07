/****************************************************************
This file contains the the routing and rendering information 
needed to process information and pass it to the various 
controllers and views.  You should not touch this file at all 
unless you want to rework the routing and rendering 
****************************************************************/

exports.render_function = function(req,res,template,logic){
        logic(req,res,function(data){
            res.render(template,data);
        });
};

exports.new_render_function = function(template,logic){
    var func = function(req,res){
        logic(req,res,function(data){
            res.render(template,data);
        });
    };
    return func;
};

exports.new_redirect_function = function(uri,logic){
    var func = function(req,res){
        logic(req,res,function(new_uri){
            uri = new_uri ? new_uri : uri;
            res.redirect(uri);
        });
    };
    return func;
};

exports.redirect_function = function(req,res,uri,logic){
    logic(req,res,function(new_uri){
        uri = new_uri ? new_uri : uri;
        res.redirect(uri);
    });
};

exports.handle_error = function(res,exception){
    console.error(exception);
    res.writeHead(500);
    res.write("Server Error");
    res.end();
};