import { Router, type IRouter } from "express";
import { supabase } from "@workspace/db";
import { z } from "zod";

const router: IRouter = Router();

// Validation schemas
const MintTokenSchema = z.object({
  productId: z.string().min(1),
  serialNumber: z.string().min(1),
  productName: z.string().min(1),
  productImage: z.string().url().optional(),
});

const TransferAssetSchema = z.object({
  assetId: z.string().min(1),
  newOwnerId: z.string().min(1),
  proofOfOwnership: z.string().url().optional(),
});

const VerifyAssetSchema = z.object({
  serialNumber: z.string().min(1),
});

/**
 * POST /api/tokenization/mint
 * Initiate minting of a product asset as a digital token
 */
router.post("/tokenization/mint", async (req, res): Promise<void> => {
  try {
    const parsed = MintTokenSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request", details: parsed.error.message });
      return;
    }

    const { productId, serialNumber, productName, productImage } = parsed.data;

    // Check if asset already exists
    const { data: existingAsset } = await supabase
      .from("product_assets")
      .select("id")
      .eq("serial_number", serialNumber)
      .maybeSingle();

    if (existingAsset) {
      res.status(409).json({ error: "Asset with this serial number already exists" });
      return;
    }

    // Create product asset record
    const { data: asset, error: assetError } = await supabase
      .from("product_assets")
      .insert({
        product_id: productId,
        serial_number: serialNumber,
        token_status: "pending",
        token_metadata: {
          name: `${productName} - ${serialNumber}`,
          description: `Shamim Forever luxury product with serial number ${serialNumber}`,
          image: productImage || "https://shamimforever.com/default-product.png",
          attributes: [
            { trait_type: "Serial Number", value: serialNumber },
            { trait_type: "Brand", value: "Shamim Forever" },
            { trait_type: "Issued At", value: new Date().toISOString() },
          ],
        },
      })
      .select()
      .single();

    if (assetError || !asset) {
      res.status(500).json({ error: "Failed to create asset", detail: assetError?.message });
      return;
    }

    // Add to minting queue
    const { data: queueItem, error: queueError } = await supabase
      .from("token_minting_queue")
      .insert({
        asset_id: asset.id,
        status: "queued",
        priority: "5",
      })
      .select()
      .single();

    if (queueError) {
      res.status(500).json({ error: "Failed to queue for minting", detail: queueError.message });
      return;
    }

    // Log event
    await supabase.from("asset_tokenization_events").insert({
      asset_id: asset.id,
      event_type: "minted",
      event_data: { serialNumber, productName },
    });

    res.status(201).json({
      assetId: asset.id,
      serialNumber: asset.serial_number,
      status: "queued_for_minting",
      message: "Asset queued for tokenization. You will receive a notification when minting is complete.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Minting failed";
    res.status(500).json({ error: message });
  }
});

/**
 * GET /api/tokenization/asset/:serialNumber
 * Retrieve asset and token information by serial number
 */
router.get("/tokenization/asset/:serialNumber", async (req, res): Promise<void> => {
  try {
    const { serialNumber } = req.params;

    const { data: asset, error } = await supabase
      .from("product_assets")
      .select(
        `
        id,
        serial_number,
        token_id,
        token_status,
        token_metadata,
        certificate_url,
        is_verified,
        verification_date,
        created_at
      `
      )
      .eq("serial_number", serialNumber)
      .maybeSingle();

    if (error || !asset) {
      res.status(404).json({ error: "Asset not found" });
      return;
    }

    res.json(asset);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to retrieve asset";
    res.status(500).json({ error: message });
  }
});

/**
 * POST /api/tokenization/verify
 * Verify the authenticity of an asset
 */
router.post("/tokenization/verify", async (req, res): Promise<void> => {
  try {
    const parsed = VerifyAssetSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request", details: parsed.error.message });
      return;
    }

    const { serialNumber } = parsed.data;

    const { data: asset, error } = await supabase
      .from("product_assets")
      .select("*")
      .eq("serial_number", serialNumber)
      .maybeSingle();

    if (error || !asset) {
      res.status(404).json({ error: "Asset not found" });
      return;
    }

    // Mark as verified
    const { data: updated, error: updateError } = await supabase
      .from("product_assets")
      .update({
        is_verified: true,
        verification_date: new Date().toISOString(),
      })
      .eq("id", asset.id)
      .select()
      .single();

    if (updateError) {
      res.status(500).json({ error: "Failed to verify asset", detail: updateError.message });
      return;
    }

    // Log verification event
    await supabase.from("asset_tokenization_events").insert({
      asset_id: asset.id,
      event_type: "verified",
      event_data: { verifiedAt: new Date().toISOString() },
    });

    res.json({
      isVerified: true,
      asset: updated,
      message: "Asset authenticity verified successfully.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Verification failed";
    res.status(500).json({ error: message });
  }
});

/**
 * POST /api/tokenization/transfer
 * Transfer ownership of a tokenized asset
 */
router.post("/tokenization/transfer", async (req, res): Promise<void> => {
  try {
    const parsed = TransferAssetSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request", details: parsed.error.message });
      return;
    }

    const { assetId, newOwnerId, proofOfOwnership } = parsed.data;

    // Record new ownership
    const { data: ownership, error: ownershipError } = await supabase
      .from("asset_ownership_records")
      .insert({
        asset_id: assetId,
        owner_id: newOwnerId,
        acquired_at: new Date().toISOString(),
        proof_of_ownership: proofOfOwnership,
      })
      .select()
      .single();

    if (ownershipError) {
      res.status(500).json({ error: "Failed to transfer asset", detail: ownershipError.message });
      return;
    }

    // Log transfer event
    await supabase.from("asset_tokenization_events").insert({
      asset_id: assetId,
      event_type: "transferred",
      event_data: { newOwnerId, transferredAt: new Date().toISOString() },
    });

    res.json({
      success: true,
      ownership,
      message: "Asset ownership transferred successfully.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Transfer failed";
    res.status(500).json({ error: message });
  }
});

/**
 * GET /api/tokenization/events/:assetId
 * Retrieve the event history for an asset
 */
router.get("/tokenization/events/:assetId", async (req, res): Promise<void> => {
  try {
    const { assetId } = req.params;

    const { data: events, error } = await supabase
      .from("asset_tokenization_events")
      .select("*")
      .eq("asset_id", assetId)
      .order("timestamp", { ascending: false });

    if (error) {
      res.status(500).json({ error: "Failed to retrieve events", detail: error.message });
      return;
    }

    res.json(events || []);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to retrieve events";
    res.status(500).json({ error: message });
  }
});

export default router;

