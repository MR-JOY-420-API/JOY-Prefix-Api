const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const FILE_PATH = path.join(__dirname, "videos.json");

let videoList = [];

// ভিডিও লিস্ট লোড করা
try {
    if (fs.existsSync(FILE_PATH)) {
        const data = fs.readFileSync(FILE_PATH, "utf8");
        videoList = JSON.parse(data);
    }
} catch (err) {
    console.error("videos.json পড়তে সমস্যা হয়েছে:", err);
    videoList = [];
}

const saveVideos = () => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(videoList, null, 2));
};

// ভিডিও যোগ
app.get("/add", (req, res) => {
    const { url } = req.query;
    if (!url) return res.send("URL দেওয়া হয়নি");

    if (!videoList.includes(url)) {
        videoList.push(url);
        saveVideos();
    }

    res.send("ভিডিও যোগ হয়েছে");
});

// ভিডিও পাঠানো (/JOY)
app.get("/JOY", (req, res) => {
    if (videoList.length === 0) return res.send("কোনো ভিডিও নেই");

    const video = videoList.shift(); // প্রথম ভিডিও remove
    saveVideos();

    res.send(video); // শুধু ভিডিও URL
});

// Vercel-এ export করা
module.exports = app;
