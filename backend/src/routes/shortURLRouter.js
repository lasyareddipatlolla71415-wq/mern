import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import createShortUrl, { redirectToLongUrl } from "../controllers/shortUrlController.js";
import { ShortURL } from "../models/shorturl.model.js";

const shortURLRouter = Router();

shortURLRouter.post("/", protect, createShortUrl);

shortURLRouter.get("/my/urls", protect, async (req, res) => {
    try {
        const data = await ShortURL.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

shortURLRouter.patch("/:shortCode", protect, async (req, res) => {
    try {
        const { originalUrl, title } = req.body;
        const record = await ShortURL.findOneAndUpdate(
            { shortCode: req.params.shortCode, userId: req.user.id },
            { originalUrl, title },
            { new: true }
        );
        if (!record) return res.status(404).json({ message: "URL not found" });
        res.json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

shortURLRouter.get("/:shortCode", redirectToLongUrl);

export default shortURLRouter;
