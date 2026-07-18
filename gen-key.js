const crypto = require("crypto");
const { execSync } = require("child_process");

console.log("Generating RSA 2048-bit key pair...");
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

// Private key in PEM (PKCS#8)
const privatePem = privateKey.export({ type: "pkcs8", format: "pem" }).toString().trim();

// Public key as JWK for JWKS
const publicJwk = publicKey.export({ format: "jwk" });
publicJwk.alg = "RS256";
publicJwk.use = "sig";
publicJwk.kid = "convex";

// JWKS is a JSON object with a "keys" array
const jwks = JSON.stringify({ keys: [publicJwk] });

console.log("Setting JWT_PRIVATE_KEY...");
try {
  execSync("npx convex env set JWT_PRIVATE_KEY", {
    input: privatePem,
    stdio: ["pipe", "inherit", "inherit"],
  });
  console.log("✅ JWT_PRIVATE_KEY set!");
} catch (e) {
  console.error("Failed JWT_PRIVATE_KEY:", e.message);
}

console.log("Setting JWKS...");
try {
  execSync("npx convex env set JWKS", {
    input: jwks,
    stdio: ["pipe", "inherit", "inherit"],
  });
  console.log("✅ JWKS set!");
} catch (e) {
  console.error("Failed JWKS:", e.message);
}

console.log("\nDone! Both keys configured.");
