---
name: Production data path
description: How to safely distinguish the workspace, GitHub/Vercel build, and Supabase production credentials.
---

The published Shamim Forever site may serve an older Vercel build even after GitHub receives the latest commit, and a Replit secret named like a Supabase service key may still belong to a different Supabase project. Treat code delivery, deployment health, and database mutation as separate checks.

**Why:** A public product POST used the read-only path and was rejected by Supabase RLS; a later secure key attempt returned `401 Invalid API key`, while the live domain did not contain the new protected route. Assuming one credential/deployment path could overwrite or misdiagnose production data.

**How to apply:** Confirm the exact Supabase project URL and a valid service-role key before inserting rows. Confirm the actual production deployment/build separately before claiming live pages or schema are updated. Keep one-time seed routes protected and remove them after use.