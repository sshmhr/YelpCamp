var Camp   = require("../models/campSchema.js"),
    Comment=require("../models/comment.js");
    
var middlewareOut = {};
middlewareOut.isLogged = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You are Required to be logged in first");
    res.redirect("/login")
}

middlewareOut.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Camp.findById(req.params.id,function(err, campFound) {
           if(err){
               req.flash("error","camp not found in our database")
               res.redirect("back");
           }else{
                if(!campFound){
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
               
               if(campFound.author.id.equals(req.user._id)){
                   next();
               }else{
                   req.flash("error","you are not authorised to do that");
                   res.redirect("back");
               }
           } 
        });
    }else{
        req.flash("error","You are required to be logged in first");
        res.redirect("back");
        // redirects back to where the request came from
    }
}

middlewareOut.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,commentFound){
            if(err){
                
                if(!commentFound){
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
                
                 req.flash("error","Comment not found in the database");
                res.redirect("back");
            }else{
                if(commentFound.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","you are not authorised to do that");
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error","You are required to be logged in first");
        res.redirect("back");
    }    
}


module.exports = middlewareOut;