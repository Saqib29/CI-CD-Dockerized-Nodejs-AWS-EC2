import { readFileSync } from "fs";
import { parse } from "yaml";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load OpenAPI spec from YAML file
const openapiPath = join(__dirname, "openapi.yaml");
const openapiContent = readFileSync(openapiPath, "utf8");
const openapiSpec = parse(openapiContent);

// Update server URL with dynamic port
openapiSpec.servers = [
  {
    url: `http://localhost:${process.env.PORT || 3000}`,
    description: "Development server",
  },
];

export const swaggerSpec = openapiSpec;
