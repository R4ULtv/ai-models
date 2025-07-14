const fs = require("node:fs/promises");
const path = require("node:path");

const API_URL = "https://models.dev/api.json";

const outputDirArg = process.argv[2];
if (!outputDirArg) {
  console.error("Output directory not provided");
  process.exit(1);
}
const OUTPUT_DIR = path.resolve(outputDirArg);

/**
 * Transforms a model object from the source API to the target schema format.
 *
 * @param {object} modelData - The source model object from the API.
 * @param {object} providerData - The parent provider object from the API.
 * @returns {object} The transformed model object.
 */
function transformModelData(modelData, providerData) {
  const capabilities = [];
  if (modelData.tool_call) {
    capabilities.push("tools");
  }
  if (modelData.reasoning) {
    capabilities.push("reasoning");
  }
  if (
    modelData.modalities?.input?.includes("image") ||
    modelData.modalities?.input?.includes("video")
  ) {
    capabilities.push("vision");
  }
  // The source data does not contain an 'embedding' flag, so we omit it.
  const transformedModel = {
    id: modelData.id,
    name: modelData.name,
    provider: providerData.name,
    provider_id: providerData.id,
    capabilities: capabilities,
    attachment: modelData.attachment,
    temperature: modelData.temperature,
    knowledge: modelData.knowledge, // Will be undefined if not present, which is fine for optional
    modalities: {
      input: modelData.modalities.input,
      output: modelData.modalities.output,
    },
    cost: {
      input: modelData.cost?.input,
      output: modelData.cost?.output,
      cache_read: modelData.cost?.cache_read, // Will be undefined if not present
      cache_write: modelData.cost?.cache_write, // Will be undefined if not present
    },
    limit: {
      context: modelData.limit.context,
      output: modelData.limit.output,
    },
  };
  return transformedModel;
}

/**
 * Sanitizes a model ID to be used as a valid filename.
 * Replaces characters like '/', '%' and ':' which are problematic in file paths.
 * @param {string} modelId - The original model ID.
 * @returns {string} A safe filename string.
 */
function sanitizeModelId(modelId) {
  return modelId.replace(/[\/%:]/g, "_");
}

/**
 * Sorts models alphabetically by provider_id first, then by id.
 * @param {Array} models - Array of model objects to sort.
 * @returns {Array} Sorted array of models.
 */
function sortModels(models) {
  return models.sort((a, b) => {
    // First, compare by provider_id
    const providerComparison = a.provider_id.localeCompare(b.provider_id);
    if (providerComparison !== 0) {
      return providerComparison;
    }
    // If provider_id is the same, compare by id
    return a.id.localeCompare(b.id);
  });
}

/**
 * Main function to fetch, transform, and save the model data.
 */
async function generateModelFiles() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    const apiData = await response.json();

    // Create output directory
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Array to store all transformed models for the consolidated file
    const allModels = [];

    // Process all providers and their models
    for (const providerId in apiData) {
      const providerData = apiData[providerId];
      const providerModels = providerData.models;
      const providerOutputDir = path.join(OUTPUT_DIR, providerId);
      await fs.mkdir(providerOutputDir, { recursive: true });

      for (const modelId in providerModels) {
        const modelData = providerModels[modelId];
        const transformedData = transformModelData(modelData, providerData);
        // Fix types for booleans and arrays
        transformedData.attachment = Boolean(modelData.attachment);
        transformedData.temperature = Boolean(modelData.temperature);

        // Ensure modalities.input/output are arrays
        if (!Array.isArray(transformedData.modalities.input)) {
          transformedData.modalities.input = [
            transformedData.modalities.input,
          ].filter(Boolean);
        }
        if (!Array.isArray(transformedData.modalities.output)) {
          transformedData.modalities.output = [
            transformedData.modalities.output,
          ].filter(Boolean);
        }

        // Add to the consolidated list
        allModels.push(transformedData);
        // Create individual model file
        const safeFileName = `${sanitizeModelId(modelData.id)}.json`;
        const filePath = path.join(providerOutputDir, safeFileName);
        await fs.writeFile(filePath, JSON.stringify(transformedData, null, 2));
      }
    }
    // Sort all models alphabetically by provider_id, then by id
    const sortedModels = sortModels(allModels);
    // Write all models to a single models.json file in the main directory
    const modelsFilePath = path.join(OUTPUT_DIR, "models.json");
    await fs.writeFile(modelsFilePath, JSON.stringify(sortedModels, null, 2));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

generateModelFiles();
