const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const FILE_PATH = "videos.json";

let videoList = [];
if (fs.existsSync(FILE_PATH)) {
    videoList = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
}

const saveVideos = () => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(videoList, null, 2));
};

app.get("/add", (req, res) => {
    const { url } = req.query;
    if (!url) return res.json({ error: "No URL provided" });

    if (!videoList.includes(url)) {
        videoList.push(url);
        saveVideos();
    }
    
    res.json({ message: "Video added", total: videoList.length });
});

app.get("/random", (req, res) => {
    if (videoList.length === 0) return res.json({ error: "No videos available" });

    const randomVideo = videoList[Math.floor(Math.random() * videoList.length)];
    res.json({ video: randomVideo });
});

app.listen(PORT, () => console.log("Server running on port "));
