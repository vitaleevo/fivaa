const { execSync } = require("child_process");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// Generate Ed25519 key pair
const { privateKey } = crypto.generateKeyPairSync("ed25519");
const pem = privateKey.export({ type: "pkcs8", format: "pem" }).toString().trim();

// Write key to temp file for reference
const keyFile = path.join(__dirname, ".jwt-key.tmp");
fs.writeFileSync(keyFile, pem);

console.log("Generated JWT key. Setting via convex env set...");

// Convex CLI expects the value as a single-line string.
// The PEM needs newlines escaped as literal \n for env var storage.
const singleLineKey = pem.replace(/\n/g, "\\n");

try {
  execSync(`npx convex env set JWT_PRIVATE_KEY -- "${singleLineKey}"`, {
    stdio: "inherit",
    cwd: __dirname,
  });
  console.log("✅ JWT_PRIVATE_KEY set!");
} catch (e) {
  console.log("Trying alternative method...");
  try {
    execSync(`npx convex env set -- JWT_PRIVATE_KEY "${singleLineKey}"`, {
      stdio: "inherit",
      cwd: __dirname,
    });
    console.log("✅ JWT_PRIVATE_KEY set (method 2)!");
  } catch (e2) {
    console.log("⚠️  Could not set via CLI. Please set manually in dashboard.");
    console.log("Key (single-line for env var):");
    console.log(singleLineKey);
  }
}

// Set SITE_URL
try {
  execSync(`npx convex env set SITE_URL http://localhost:3000`, {
    stdio: "inherit",
    cwd: __dirname,
  });
  console.log("✅ SITE_URL set!");
} catch (e) {
  console.log("⚠️  SITE_URL may already be set or failed.");
}

// Clean up
try { fs.unlinkSync(keyFile); } catch {}
