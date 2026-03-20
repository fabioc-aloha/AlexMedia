/**
 * Alex T-Shirt Print Service — Create and order custom t-shirts via print-on-demand APIs
 *
 * Usage:
 *   node generate-tshirt.js --file ./design.png --service printify
 *   node generate-tshirt.js --file ./design.png --service printful
 *   node generate-tshirt.js --file ./design.png --service all
 *   node generate-tshirt.js --list --service printify
 *   node generate-tshirt.js --list --service printful
 *
 * Services:
 *   printify   — Printify Print-on-Demand (upload + catalog + product creation)
 *   printful   — Printful Print-on-Demand (upload + catalog + mockups)
 *   all        — Try all API services
 *
 * Options:
 *   --file <path>        Design artwork (PNG preferred, 4500x5400px @ 300 DPI)
 *   --service <name>     Target service or `all` (default: all)
 *   --color <str>        Shirt color: black, white, navy, red, etc. (default: black)
 *   --size <str>         Default size: S, M, L, XL, 2XL (default: L)
 *   --title <str>        Product title for the listing
 *   --description <str>  Product description
 *   --list               List available t-shirt products from API
 *   --upload             Upload artwork only (no product creation)
 *   --json               Output results as JSON
 */

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// ── Service Definitions ────────────────────────────────────────────
const SERVICES = {
  printify: {
    name: "Printify",
    apiBase: "https://api.printify.com/v1",
    envVars: ["PRINTIFY_API_TOKEN", "PRINTIFY_SHOP_ID"],
    tshirtKeywords: ["t-shirt", "tee", "unisex", "men's", "women's", "crew neck", "v-neck"],
  },
  printful: {
    name: "Printful",
    apiBase: "https://api.printful.com",
    envVars: ["PRINTFUL_API_TOKEN"],
    tshirtKeywords: ["t-shirt", "tee", "unisex", "crew-neck"],
  },
};

// ── Argument Parser ────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    file: null,
    service: "all",
    color: "black",
    size: "L",
    title: null,
    description: null,
    list: false,
    upload: false,
    json: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--file": result.file = args[++i]; break;
      case "--service": result.service = args[++i]; break;
      case "--color": result.color = args[++i]; break;
      case "--size": result.size = args[++i]; break;
      case "--title": result.title = args[++i]; break;
      case "--description": result.description = args[++i]; break;
      case "--list": result.list = true; break;
      case "--upload": result.upload = true; break;
      case "--json": result.json = true; break;
      case "--help": case "-h": showHelp(); process.exit(0);
      default:
        if (args[i].startsWith("--")) {
          console.warn(`Unknown option: ${args[i]}`);
        } else if (!result.file) {
          result.file = args[i];
        }
    }
  }
  return result;
}

function showHelp() {
  const header = fs.readFileSync(__filename, "utf8").match(/\/\*\*([\s\S]*?)\*\//);
  if (header) console.log(header[1].replace(/^ \* ?/gm, "").trim());
}

// ── HTTP Request Helper ────────────────────────────────────────────
function httpRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const proto = parsedUrl.protocol === "https:" ? https : http;
    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === "https:" ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || "GET",
      headers: options.headers || {},
    };

    const req = proto.request(reqOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    });
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

// ── File Info ──────────────────────────────────────────────────────
function getFileInfo(filePath) {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) throw new Error(`File not found: ${resolved}`);
  const stats = fs.statSync(resolved);
  const ext = path.extname(resolved).toLowerCase().replace(".", "");
  return {
    path: resolved,
    name: path.basename(resolved),
    ext,
    size: stats.size,
    sizeMB: (stats.size / (1024 * 1024)).toFixed(2),
  };
}

function checkDesignQuality(fileInfo) {
  const warnings = [];
  if (fileInfo.size < 100 * 1024) {
    warnings.push("Design is very small (< 100 KB) — may produce low-quality prints");
  }
  if (!["png", "jpg", "jpeg"].includes(fileInfo.ext)) {
    warnings.push(`${fileInfo.ext.toUpperCase()} may not be accepted — PNG is preferred for t-shirts`);
  }
  if (fileInfo.ext !== "png") {
    warnings.push("PNG with transparency recommended for best results");
  }
  return warnings;
}

// ════════════════════════════════════════════════════════════════════
// PRINTIFY API
// ════════════════════════════════════════════════════════════════════

function printifyHeaders() {
  const token = process.env.PRINTIFY_API_TOKEN;
  if (!token) return null;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": "AlexMedia/1.0",
  };
}

async function printifyListTshirts() {
  const headers = printifyHeaders();
  if (!headers) throw new Error("PRINTIFY_API_TOKEN not set in .env");

  const response = await httpRequest("https://api.printify.com/v1/catalog/blueprints.json", { headers });
  if (response.statusCode !== 200) {
    throw new Error(`Printify API error (${response.statusCode}): ${response.body.substring(0, 200)}`);
  }

  const blueprints = JSON.parse(response.body);
  const keywords = SERVICES.printify.tshirtKeywords;
  return blueprints.filter((bp) =>
    keywords.some((kw) =>
      bp.title.toLowerCase().includes(kw) || (bp.description || "").toLowerCase().includes(kw)
    )
  );
}

async function printifyGetPrintProviders(blueprintId) {
  const headers = printifyHeaders();
  const response = await httpRequest(
    `https://api.printify.com/v1/catalog/blueprints/${blueprintId}/print_providers.json`,
    { headers }
  );
  if (response.statusCode !== 200) return [];
  return JSON.parse(response.body);
}

async function printifyGetVariants(blueprintId, providerId) {
  const headers = printifyHeaders();
  const response = await httpRequest(
    `https://api.printify.com/v1/catalog/blueprints/${blueprintId}/print_providers/${providerId}/variants.json`,
    { headers }
  );
  if (response.statusCode !== 200) return [];
  const data = JSON.parse(response.body);
  return data.variants || [];
}

async function printifyUploadImage(fileInfo) {
  const headers = printifyHeaders();
  const fileData = fs.readFileSync(fileInfo.path);
  const base64 = fileData.toString("base64");

  const postData = JSON.stringify({ file_name: fileInfo.name, contents: base64 });
  const response = await httpRequest("https://api.printify.com/v1/uploads/images.json", {
    method: "POST",
    headers: { ...headers, "Content-Length": Buffer.byteLength(postData) },
    body: postData,
  });

  if (response.statusCode !== 200) {
    throw new Error(`Upload failed (${response.statusCode}): ${response.body.substring(0, 200)}`);
  }
  return JSON.parse(response.body);
}

async function printifyCreateProduct(shopId, imageId, blueprintId, providerId, variants, opts) {
  const headers = printifyHeaders();

  const productData = JSON.stringify({
    title: opts.title || "Custom T-Shirt Design",
    description: opts.description || "AI-generated artwork printed on premium quality t-shirt.",
    blueprint_id: blueprintId,
    print_provider_id: providerId,
    variants: variants.map((v) => ({
      id: v.id,
      price: v.price || 2500, // price in cents
      is_enabled: true,
    })),
    print_areas: [
      {
        variant_ids: variants.map((v) => v.id),
        placeholders: [
          {
            position: "front",
            images: [
              {
                id: imageId,
                x: 0.5,
                y: 0.5,
                scale: 1,
                angle: 0,
              },
            ],
          },
        ],
      },
    ],
  });

  const response = await httpRequest(
    `https://api.printify.com/v1/shops/${shopId}/products.json`,
    {
      method: "POST",
      headers: { ...headers, "Content-Length": Buffer.byteLength(productData) },
      body: productData,
    }
  );

  if (response.statusCode !== 200 && response.statusCode !== 201) {
    throw new Error(`Product creation failed (${response.statusCode}): ${response.body.substring(0, 300)}`);
  }
  return JSON.parse(response.body);
}

async function runPrintify(fileInfo, opts) {
  console.log("\n ── Printify ──────────────────────────────────────────────");

  const headers = printifyHeaders();
  if (!headers) {
    console.log("   ⚠️  PRINTIFY_API_TOKEN not set in .env");
    console.log("   Get your token: https://printify.com/app/account/api");
    console.log("   Add to .env:");
    console.log("     PRINTIFY_API_TOKEN=your_token_here");
    console.log("     PRINTIFY_SHOP_ID=your_shop_id_here");
    return { service: "printify", status: "no-token" };
  }

  const shopId = process.env.PRINTIFY_SHOP_ID;

  // List mode
  if (opts.list) {
    console.log("   📋 Searching t-shirt products in Printify catalog...\n");
    const blueprints = await printifyListTshirts();

    if (blueprints.length === 0) {
      console.log("   No t-shirt products found.");
      return { service: "printify", type: "catalog", blueprints: [] };
    }

    console.log(`   Found ${blueprints.length} t-shirt product(s):\n`);
    console.log("   " + "ID".padEnd(8) + "Product".padEnd(50) + "Brand");
    console.log("   " + "─".repeat(75));

    for (const bp of blueprints.slice(0, 40)) {
      console.log(`   ${String(bp.id).padEnd(8)}${bp.title.substring(0, 48).padEnd(50)}${bp.brand || "—"}`);
    }
    if (blueprints.length > 40) console.log(`   ... and ${blueprints.length - 40} more`);

    return { service: "printify", type: "catalog", count: blueprints.length, blueprints };
  }

  // Upload mode
  if (!fileInfo) {
    console.log("   ❌ No design file provided. Use --file <path>");
    return { service: "printify", status: "no-file" };
  }

  console.log(`   📤 Uploading design: ${fileInfo.name} (${fileInfo.sizeMB} MB)...`);
  const uploaded = await printifyUploadImage(fileInfo);
  console.log(`   ✅ Uploaded: ${uploaded.id}`);
  console.log(`   Dimensions: ${uploaded.width}×${uploaded.height} px`);

  if (opts.upload) {
    return { service: "printify", type: "upload", imageId: uploaded.id, dimensions: `${uploaded.width}×${uploaded.height}` };
  }

  // Find best t-shirt blueprint
  console.log("\n   🔍 Finding t-shirt blueprints...");
  const blueprints = await printifyListTshirts();
  if (blueprints.length === 0) {
    console.log("   No t-shirt blueprints found.");
    return { service: "printify", type: "upload", imageId: uploaded.id };
  }

  // Use first matching blueprint
  const blueprint = blueprints[0];
  console.log(`   📦 Using: ${blueprint.title} (Blueprint #${blueprint.id})`);

  const providers = await printifyGetPrintProviders(blueprint.id);
  if (providers.length === 0) {
    console.log("   No print providers available for this blueprint.");
    return { service: "printify", type: "upload", imageId: uploaded.id, blueprint: blueprint.title };
  }

  const provider = providers[0];
  console.log(`   🏭 Provider: ${provider.title}`);

  const variants = await printifyGetVariants(blueprint.id, provider.id);
  console.log(`   🎨 Available variants: ${variants.length}`);

  if (!shopId) {
    console.log("\n   ⚠️  PRINTIFY_SHOP_ID not set — cannot create product");
    console.log("   Set PRINTIFY_SHOP_ID in .env to auto-create products");
    console.log(`\n   Image uploaded successfully (ID: ${uploaded.id})`);
    console.log("   You can create the product manually at https://printify.com/app/editor");
    return {
      service: "printify",
      type: "upload",
      imageId: uploaded.id,
      blueprint: blueprint.title,
      provider: provider.title,
      variants: variants.length,
    };
  }

  // Create product
  console.log("\n   🛍️  Creating product...");
  const product = await printifyCreateProduct(shopId, uploaded.id, blueprint.id, provider.id, variants.slice(0, 20), opts);
  console.log(`   ✅ Product created: ${product.id}`);
  console.log(`   Title: ${product.title}`);
  console.log(`   Edit: https://printify.com/app/editor/${product.id}`);

  return {
    service: "printify",
    type: "product",
    productId: product.id,
    title: product.title,
    imageId: uploaded.id,
    blueprint: blueprint.title,
    provider: provider.title,
  };
}

// ════════════════════════════════════════════════════════════════════
// PRINTFUL API
// ════════════════════════════════════════════════════════════════════

function printfulHeaders() {
  const token = process.env.PRINTFUL_API_TOKEN;
  if (!token) return null;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": "AlexMedia/1.0",
  };
}

async function printfulListTshirts() {
  const headers = printfulHeaders();
  if (!headers) throw new Error("PRINTFUL_API_TOKEN not set in .env");

  const response = await httpRequest("https://api.printful.com/products", { headers });
  if (response.statusCode !== 200) {
    throw new Error(`Printful API error (${response.statusCode}): ${response.body.substring(0, 200)}`);
  }

  const data = JSON.parse(response.body);
  const products = data.result || [];
  const keywords = SERVICES.printful.tshirtKeywords;
  return products.filter((p) =>
    keywords.some((kw) => (p.title || p.type || "").toLowerCase().includes(kw))
  );
}

async function printfulGetProduct(productId) {
  const headers = printfulHeaders();
  const response = await httpRequest(`https://api.printful.com/products/${productId}`, { headers });
  if (response.statusCode !== 200) return null;
  const data = JSON.parse(response.body);
  return data.result || null;
}

async function printfulUploadFile(fileInfo) {
  const headers = printfulHeaders();
  const fileData = fs.readFileSync(fileInfo.path);
  const base64 = fileData.toString("base64");

  const postData = JSON.stringify({
    type: "default",
    url: `data:image/png;base64,${base64}`,
    filename: fileInfo.name,
  });

  const response = await httpRequest("https://api.printful.com/files", {
    method: "POST",
    headers: { ...headers, "Content-Length": Buffer.byteLength(postData) },
    body: postData,
  });

  if (response.statusCode !== 200) {
    throw new Error(`Upload failed (${response.statusCode}): ${response.body.substring(0, 200)}`);
  }
  const data = JSON.parse(response.body);
  return data.result || data;
}

async function printfulGenerateMockup(productId, fileUrl) {
  const headers = printfulHeaders();

  const taskData = JSON.stringify({
    variant_ids: [],
    files: [{ placement: "front", image_url: fileUrl }],
  });

  const response = await httpRequest(
    `https://api.printful.com/mockup-generator/create-task/${productId}`,
    {
      method: "POST",
      headers: { ...headers, "Content-Length": Buffer.byteLength(taskData) },
      body: taskData,
    }
  );

  if (response.statusCode !== 200) return null;
  const data = JSON.parse(response.body);
  return data.result || null;
}

async function runPrintful(fileInfo, opts) {
  console.log("\n ── Printful ──────────────────────────────────────────────");

  const headers = printfulHeaders();
  if (!headers) {
    console.log("   ⚠️  PRINTFUL_API_TOKEN not set in .env");
    console.log("   Get your token: https://www.printful.com/dashboard/developer/api");
    console.log("   Add to .env: PRINTFUL_API_TOKEN=your_token_here");
    return { service: "printful", status: "no-token" };
  }

  // List mode
  if (opts.list) {
    console.log("   📋 Searching t-shirt products in Printful catalog...\n");
    const products = await printfulListTshirts();

    if (products.length === 0) {
      console.log("   No t-shirt products found.");
      return { service: "printful", type: "catalog", products: [] };
    }

    console.log(`   Found ${products.length} t-shirt product(s):\n`);
    console.log("   " + "ID".padEnd(8) + "Product".padEnd(50) + "Type");
    console.log("   " + "─".repeat(75));

    for (const p of products.slice(0, 40)) {
      const title = (p.title || p.type || "Unknown").substring(0, 48);
      console.log(`   ${String(p.id).padEnd(8)}${title.padEnd(50)}${p.type || "—"}`);
    }
    if (products.length > 40) console.log(`   ... and ${products.length - 40} more`);

    return { service: "printful", type: "catalog", count: products.length, products };
  }

  // Upload mode
  if (!fileInfo) {
    console.log("   ❌ No design file provided. Use --file <path>");
    return { service: "printful", status: "no-file" };
  }

  console.log(`   📤 Uploading design: ${fileInfo.name} (${fileInfo.sizeMB} MB)...`);
  const uploaded = await printfulUploadFile(fileInfo);
  console.log(`   ✅ Uploaded: ${uploaded.id}`);

  if (uploaded.preview_url) {
    console.log(`   Preview: ${uploaded.preview_url}`);
  }

  if (opts.upload) {
    return { service: "printful", type: "upload", fileId: uploaded.id };
  }

  // Try to generate a mockup
  console.log("\n   🖼️  Generating mockup...");
  const tshirts = await printfulListTshirts();
  if (tshirts.length > 0 && uploaded.preview_url) {
    const tshirt = tshirts[0];
    console.log(`   Using product: ${tshirt.title || tshirt.type} (ID: ${tshirt.id})`);
    const mockupTask = await printfulGenerateMockup(tshirt.id, uploaded.preview_url);
    if (mockupTask) {
      console.log(`   📋 Mockup task queued: ${mockupTask.task_key || "pending"}`);
      console.log("   Check mockup status at https://www.printful.com/dashboard");
    }
  }

  return {
    service: "printful",
    type: "upload",
    fileId: uploaded.id,
    previewUrl: uploaded.preview_url || null,
  };
}

// ════════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════════

async function main() {
  const opts = parseArgs();
  const results = [];

  console.log("👕 T-Shirt Print Service\n");

  // Validate file
  let fileInfo = null;
  if (opts.file) {
    fileInfo = getFileInfo(opts.file);
    console.log(`   Design: ${fileInfo.name} (${fileInfo.sizeMB} MB)`);

    const warnings = checkDesignQuality(fileInfo);
    if (warnings.length > 0) {
      console.log("");
      for (const w of warnings) console.log(`   ⚠️  ${w}`);
    }

    // Print spec recommendations
    console.log("\n   📐 Print Specs:");
    console.log("   Recommended: 4500×5400 px (15\"×18\" @ 300 DPI)");
    console.log("   Minimum: 2400×3200 px for acceptable quality");
  }

  // Run services
  const servicesToRun = opts.service === "all"
    ? Object.keys(SERVICES)
    : [opts.service];

  for (const svc of servicesToRun) {
    if (!SERVICES[svc]) {
      console.log(`\n   ❌ Unknown service: ${svc}`);
      console.log(`   Available: ${Object.keys(SERVICES).join(", ")}`);
      continue;
    }

    try {
      let result;
      if (svc === "printify") result = await runPrintify(fileInfo, opts);
      else if (svc === "printful") result = await runPrintful(fileInfo, opts);
      if (result) results.push(result);
    } catch (err) {
      console.log(`\n   ❌ ${SERVICES[svc].name} error: ${err.message}`);
      results.push({ service: svc, status: "error", error: err.message });
    }
  }

  // Summary
  console.log("\n ── Summary ──────────────────────────────────────────────\n");
  for (const r of results) {
    const icon = r.status === "error" || r.status === "no-token" ? "❌" : "✅";
    console.log(`   ${icon} ${r.service}: ${r.type || r.status || "done"}`);
  }

  if (opts.json) {
    const reportPath = path.join(__dirname, "..", "projects", "tshirts", "media", `tshirt-report-${new Date().toISOString().replace(/[:.]/g, "-").substring(0, 19)}.json`);
    fs.writeFileSync(reportPath, JSON.stringify({ timestamp: new Date().toISOString(), options: opts, results }, null, 2));
    console.log(`\n   📄 Report: ${reportPath}`);
  }

  console.log("");
}

main().catch((err) => {
  console.error(`\n❌ Fatal error: ${err.message}`);
  process.exit(1);
});
