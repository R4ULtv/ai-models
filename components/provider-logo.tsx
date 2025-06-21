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
