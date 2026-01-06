const Url = require("../model/Url");
const { nanoid } = require("nanoid");



const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;
    const userId = req.user.id;

    

    try {
        new URL(originalUrl);
    } catch (err) {
        return res.status(400).json({ message: "Invalid URL format" });
    }

    console.log("Original URL:", originalUrl);
    console.log("User ID:", userId);

    const urlCount = await Url.countDocuments({ user: userId });
    if (urlCount >= 100) {
        return res.status(403).json({ message: "URL limit reached. Upgrade your plan to add more URLs." });
    }

    //generate unique shortcode
    let attempts = 0;
    const maxAttempts = 100;
    let shortcode;
    let urlExists = true;

    while (urlExists) {
        shortcode = nanoid(8);
        const existingUrl = await Url.findOne({ shortcode });
        if (!existingUrl) {
            urlExists = false;
        }
        attempts++;
        if (attempts === maxAttempts) {
            return res.status(500).json({ message: "Could not generate a unique shortcode. Please try again." });
        }
    }



    //save to db
    try {
        const newUrl = new Url({ user: userId, originalUrl, shortcode });
        await newUrl.save();
        res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${shortcode}` });
    } catch (err) {
        res.status(500).json({ message: "Failed to save URL." });
    }
}


const getUrls = async (req, res) => {
    const urls = await Url.find({ user: req.user.id }).sort({ createdAt: -1 });

    const baseUrl = `${process.env.BASE_URL}/`;

    const response = urls.map(url => ({
        originalUrl: url.originalUrl,
        shortUrl: baseUrl + url.shortcode,
        clicks: url.clicks,
        createdAt: url.createdAt
    }));
    res.status(200).json(response);
}

const deleteUrl = async (req, res) =>{
    const url = await Url.findonebyId(req.params.id);
    if(!url){
        return res.status(404).json({message: "URL not found"});
    }

    if (url.user.toString() !== req.user.id.toString()){
        return res.status(403).json({message: "Unauthorized"});
    }
    await url.deleteOne();
    res.status(200).json({message: "URL deleted successfully"});

}


module.exports = { shortenUrl, getUrls, deleteUrl };