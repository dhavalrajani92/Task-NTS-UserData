import express from "express";
const router = express.Router();
import data from "../mocks/userData.json";

router.route('/getAllUsername')
    .get(function(req, res) {
        var allUsernames = data.userData.map(function (data){
            return data.username
        });
        res.json(allUsernames)
    });

router.route("/getSelectedUserData")
    .post(function (req,res){
        if(req.body.username){
            var perticularUserData = data.userData.filter(function (data){
                if(data.username === req.body.username){
                    return data;
                }
            });
            res.json(perticularUserData[0])
        }else{
            res.status(400).json({message:"Validation error"});
        }
    });
module.exports = router;
