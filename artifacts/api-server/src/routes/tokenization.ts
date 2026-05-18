import { Router, type IRouter } from "express";
import { supabase } from "@workspace/db";

const router: IRouter = Router();

router.post("/tokenization/mint", async (req, res): Promise<void> => {
  const { productId, serialNumber, productName, productImage } = req.body as Record<string, string>;

  if (!productId || !serialNumber || !productName) {
    res.status(400).json({ error: "productId, serialNumber, and productName are required" });
    return;
  }

  const { data: existing } = await supabase.from("product_assets").select("id").eq("serial_number", serialNumber).maybeSingle();
  if (existing) {
    res.status(409).json({ error: "Asset with this serial number already exists" });
    return;
  }

  const { data: asset, error } = await supabase.from("product_assets").insert({
    product_id: productId,
    serial_number: serialNumber,
    token_status: "pending",
    token_metadata: {
      name: `${productName} - ${serialNumber}`,
      image: productImage || null,
      attributes: [
        { trait_type: "Serial Number", value: serialNumber },
        { trait_type: "Brand", value: "Shamim Forever" },
        { trait_type: "Issued At", value: new Date().toISOString() },
      ],
    },
  }).select().single();

  if (error || !asset) {
    res.status(500).json({ error: "Failed to create asset", detail: error?.message });
    return;
  }

  res.status(201).json({ assetId: (asset as Record<string, unknown>).id, serialNumber });
});

router.post("/tokenization/verify", async (req, res): Promise<void> => {
  const { serialNumber } = req.body as Record<string, string>;
  if (!serialNumber) { res.status(400).json({ error: "serialNumber is required" }); return; }

  const { data: asset } = await supabase.from("product_assets").select("*").eq("serial_number", serialNumber).maybeSingle();
  if (!asset) { res.status(404).json({ valid: false, error: "Asset not found" }); return; }

  res.json({ valid: true, asset });
});

router.get("/tokenization/assets/:id", async (req, res): Promise<void> => {
  const { data: asset } = await supabase.from("product_assets").select("*").eq("id", req.params.id).maybeSingle();
  if (!asset) { res.status(404).json({ error: "Asset not found" }); return; }
  res.json(asset);
});

export default router;
