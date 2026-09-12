---
name: Product data integrity
description: Durable rules for the Shamim Forever reusable product-page engine and catalog QA.
---

The product engine is an adapter over the existing product record, not a second catalog. Optional category modules and digital-passport UI must render only from fields present in the product story or an explicit verified configuration.

**Why:** The catalog contains products with different levels of editorial and blockchain data. Fallback copy that looks like a real contract, serial, rating, or holder benefit creates false product claims.

**How to apply:** Keep missing data visible as an archive or needs-data state. Use the admin QA report to identify missing media, invalid assets, missing prices/descriptions, and schema/SEO readiness before publishing.