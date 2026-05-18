import { Router, type IRouter } from "express";
import crypto from "node:crypto";

const router: IRouter = Router();

router.post("/admin/upload", async (req, res): Promise<void> => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "faisalorakzai";
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!apiKey || !apiSecret) {
    res.status(503).json({ error: "Cloudinary not configured on server" });
    return;
  }

  const { data } = req.body as { data?: string; filename?: string };
  if (!data) {
    res.status(400).json({ error: "No file data provided. Send { data: 'data:image/...' }" });
    return;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "shamimforever/products";

  const signStr = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(signStr).digest("hex");

  const fd = new FormData();
  fd.append("file", data);
  fd.append("api_key", apiKey);
  fd.append("timestamp", String(timestamp));
  fd.append("folder", folder);
  fd.append("signature", signature);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: fd },
    );

    if (!response.ok) {
      const errText = await response.text();
      res.status(500).json({ error: "Cloudinary upload failed", detail: errText });
      return;
    }

    const result = (await response.json()) as { secure_url: string; public_id: string };
    res.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    res.status(500).json({ error: message });
  }
});

export default router;
