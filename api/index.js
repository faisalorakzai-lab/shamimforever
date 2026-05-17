// Vercel serverless function — re-exports the pre-compiled Express API server bundle
  // The bundle in artifacts/api-server/api/index.js was compiled with all dependencies included
  export { default } from '../artifacts/api-server/api/index.js';
  