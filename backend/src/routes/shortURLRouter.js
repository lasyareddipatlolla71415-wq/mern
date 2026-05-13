import { Router } from "express";
import { nanoid } from "nanoid";
import { ShortURL } from "../models/shorturl.model.js";

const shortURLRouter = Router();

shortURLRouter.post("/", async (req, res) => {
    try {
        const { originalUrl, customUrl, title } = req.body;
        if (!originalUrl) return res.status(400).json({ message: "originalUrl is required" });
        const shortCode = customUrl || nanoid(7);
        const entry = await ShortURL.create({ originalUrl, shortCode, title: title || null });
        res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${entry.shortCode}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default shortURLRouter;
