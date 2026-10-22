import fs from "node:fs";

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    const value = match[2].replace(/^["']|["']$/g, "");
    process.env[match[1]] = value;
  }
}

loadEnv(".env");
loadEnv(".env.local");
loadEnv(".env.production");

const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ?? "";
let host = "";
try {
  host = raw ? new URL(raw).host : "";
} catch {
  host = "";
}

const usable = host && !host.startsWith("localhost") && !host.startsWith("127.0.0.1");
const apex = host.replace(/^www\./, "");
const redirects = usable
  ? [
      { source: "/:path*", has: [{ type: "host", value: `www.${apex}` }], destination: `https://${apex}/:path*`, permanent: true },
    ]
  : [];

fs.writeFileSync(
  "vercel.json",
  `${JSON.stringify({ redirects }, null, 2)}\n`,
);

const netlify = usable
  ? [
      `http://${apex}/* https://${apex}/:splat 301`,
      `http://www.${apex}/* https://${apex}/:splat 301`,
      `https://www.${apex}/* https://${apex}/:splat 301`,
      "",
    ].join("\n")
  : "# Set NEXT_PUBLIC_SITE_URL to a public https origin to generate www and http redirects.\n";

fs.mkdirSync("public", { recursive: true });
fs.writeFileSync("public/_redirects", netlify);
