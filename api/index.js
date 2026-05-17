// Vercel serverless function — CJS wrapper for the pre-compiled ESM api-server bundle
  // Using dynamic import() because the bundle is pure ESM (package type: "module")
  // and CJS require() cannot load ESM modules.
  let appPromise = null;

  module.exports = async function handler(req, res) {
    try {
      if (!appPromise) {
        appPromise = import('../artifacts/api-server/api/index.js').then(m => m.default);
      }
      const app = await appPromise;
      return app(req, res);
    } catch (err) {
      console.error('API handler error:', err);
      res.status(500).json({ error: 'Internal server error', details: err.message });
    }
  };
  