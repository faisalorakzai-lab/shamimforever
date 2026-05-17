import { Router, type IRouter } from "express";
import { createHash, createHmac } from "crypto";

const router: IRouter = Router();

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "shamimforever";
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

function generateSignature(params: Record<string, string | number>): string {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha256").update(sorted + API_SECRET).digest("hex");
}

router.post("/admin/upload", async (req, res): Promise<void> => {
  if (!API_KEY || !API_SECRET) {
    res.status(503).json({ error: "Cloudinary not configured" });
    return;
  }

  const { file, folder = "shamimforever/products" } = req.body as {
    file: string;
    folder?: string;
  };

  if (!file) {
    res.status(400).json({ error: "No file provided" });
    return;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const params: Record<string, string | number> = { folder, timestamp };
  const signature = generateSignature(params);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", API_KEY);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("folder", folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData },
    );

    if (!response.ok) {
      const err = await response.text();
      res.status(response.status).json({ error: "Cloudinary upload failed", detail: err });
      return;
    }

    const data = (await response.json()) as { secure_url: string; public_id: string };
    res.json({ url: data.secure_url, publicId: data.public_id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    res.status(500).json({ error: message });
  }
});

export default router;
