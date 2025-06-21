import fs from "fs";
import path from "path";
import { modelSchema, Model } from "@/lib/schema";

function getAllJsonFiles(directory: string): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(directory);

  for (const item of items) {
    const fullPath = path.join(directory, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllJsonFiles(fullPath));
    } else if (item.endsWith(".json")) {
      files.push(fullPath);
    }
  }

  return files;
}

export function getModels(): Model[] {
  const modelsDirectory = path.join(process.cwd(), "models");
  const jsonFiles = getAllJsonFiles(modelsDirectory);

  const models = jsonFiles.reduce<Model[]>((acc, filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const modelData = JSON.parse(fileContents);

    const validationResult = modelSchema.safeParse(modelData);

    if (validationResult.success) {
      acc.push({
        ...validationResult.data,
      });
    }
    return acc;
  }, []);

  return models;
}
