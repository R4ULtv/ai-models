import React from "react";
import {
  OpenAI,
  Anthropic,
  XAIGrok,
  DeepSeek,
  MistralAI,
  Google,
  Vercel,
  Groq,
  MicrosoftAzure,
  Meta,
  GitHubCopilot,
  AmazonWebServices,
  OpenRouter,
  GoogleCloud,
  Ollama,
  v0,
  HuggingFace,
} from "@/components/icons";

const providerLogoMap: Record<string, React.FC> = {
  openai: OpenAI,
  anthropic: Anthropic,
  xai: XAIGrok,
  deepseek: DeepSeek,
  mistral: MistralAI,
  google: Google,
  vercel: Vercel,
  groq: Groq,
  azure: MicrosoftAzure,
  llama: Meta,
  "github-copilot": GitHubCopilot,
  "amazon-bedrock": AmazonWebServices,
  openrouter: OpenRouter,
  "google-vertex": GoogleCloud,
  ollama: Ollama,
  v0: v0,
  huggingface: HuggingFace,
};

export function ProviderLogo({
  provider_id,
  ...props
}: { provider_id: string } & React.SVGProps<SVGSVGElement>) {
  const Logo = providerLogoMap[provider_id];
  if (!Logo) return null;
  return <Logo {...props} />;
}

export default ProviderLogo;
