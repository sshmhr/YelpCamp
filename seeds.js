var mongoose = require("mongoose");
var Camp = require("./models/campSchema.js")
var Comment = require("./models/comment.js")

var seed = [
    
    {
        name:"My campground 1",
        image:"https://www.whatsuplife.in/gurgaon/blog/wp-content/uploads/2014/03/summer-camps-gurgaon.jpg",
        description:" badhiya badhiyaLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum. badhiya",
    },
    {
        name:"My campground 2",
        image:"https://s-ec.bstatic.com/images/hotel/max1024x768/744/74474652.jpg",
        description:" badhiya badhiyaLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum. badhiya",

    },
    {
        name:"My campground 3",
        image:"http://www.naturetrails.in/images/Adventure-camps-Resorts-Near-Mumbai.jpg",
        description:" badhiya badhiyaLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum. badhiya",
    },
    
    ];

function seedDB() {
    // removeall camps
        Camp.remove({},function(err){
            if(err){
                console.log("err");
            }else{
            //     console.log("removed");
            //         seed.forEach(function(camp){
            //             Camp.create(camp,function(err,campground){
            //                 if(err){
            //                     console.log(err);
            //                 }else{
            //                     console.log("camp added");
            //                     Comment.create({
            //                       text:"this is a very bad place lots of litter",
            //                       author:"critic"
            //                     },function(err,comment){
            //                         if(err){
            //                             console.log(err);
            //                         }else{
            //                           campground.comments.push(comment);
            //                           campground.save();
            //                           console.log("comment created");
            //                         }
            //                     });
            //                 }
            //             });
            //         });
                }
            });
}

module.exports = seedDB;