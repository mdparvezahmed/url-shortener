const express = require("express");
const Url = require("../model/Url");

const router = express.Router();



router.get(
    "/:shortcode",
    async (req, res) =>{
        try{
            const url = await Url.findOneAndUpdate(
                {
                    shortcode: req.params.shortcode
                },
                { $inc: { clicks: 1 }
                },
                { new: true }
            );

            if (!url) {
                return res.status(404).json({message: "Url not found"})
            }
            res.redirect(url.originalUrl);

            
        }catch(err){
            res.status(500).json({message: "Server error"});
        }

    }
);


module.exports = router;