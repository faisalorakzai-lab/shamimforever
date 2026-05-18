import { Router, type IRouter } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const router: IRouter = Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "shamimforever",
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Configure Multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/admin/upload", upload.single("file"), async (req, res): Promise<void> => {
  if (!cloudinary.config().api_key || !cloudinary.config().api_secret) {
    res.status(503).json({ error: "Cloudinary not configured" });
    return;
  }

  if (!req.file) {
    res.status(400).json({ error: "No file provided" });
    return;
  }

  const folder = req.body.folder || "shamimforever/products";

  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folder },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          res.status(500).json({ error: "Cloudinary upload failed", detail: error.message });
          return;
        }
        if (result) {
          res.json({ url: result.secure_url, publicId: result.public_id });
        } else {
          res.status(500).json({ error: "Cloudinary upload failed", detail: "No result from Cloudinary" });
        }
      }
    );

    uploadStream.end(req.file.buffer);

  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    res.status(500).json({ error: message });
  }
});

export default router;
