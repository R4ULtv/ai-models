![ai-models](./public/og-image.png)

**AI Models** is an open-source, community-driven database and web interface for exploring and comparing AI models from all major providers. Discover capabilities, compare costs, and find the right model for your needs—all in a modern, intuitive UI.

## 🚀 Features

- **Comprehensive Model Database:** Curated collection of AI models from leading providers
- **Rich Metadata:** Capabilities, costs, context limits, modalities, and more
- **Interactive Data Table:** Sort, filter, and search models with ease
- **Modern UI:** Built with [Next.js 15](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Radix UI](https://www.radix-ui.com/)
- **Type Safety:** End-to-end TypeScript with [Zod](https://zod.dev/) schema validation
- **Dark Mode:** Elegant dark theme for comfortable viewing
- **Open Contribution:** Easily add or update models via simple JSON files

## 🌐 Supported Providers

- **OpenAI** – GPT models and more
- **Anthropic** – Claude models
- **xAI** (Grok) – Grok models
- **DeepSeek** – DeepSeek models
- **Mistral AI** – Mistral models
- **Google** – Gemini and Vertex models
- **Vercel** – Vercel AI models
- **Groq** – Groq models
- **Microsoft Azure** – Azure OpenAI and more
- **Meta** (Llama) – Llama models
- **GitHub Copilot** – Copilot models
- **Amazon Bedrock** – Bedrock models
- **OpenRouter** – Aggregated provider
- **Google Vertex** – Vertex AI models
- **Ollama** – Local model serving

## 📦 Model Information

Each model entry includes:

- **Basic Info:** Name, provider, unique identifiers
- **Capabilities:** Tools, vision, reasoning, embedding support
- **Modalities:** Input/output for text, audio, image, video, PDF
- **Pricing:** Input/output costs per million tokens, cache pricing
- **Limits:** Context window and output token limits
- **Features:** Temperature, attachment support, knowledge cutoff, model size

## 🛠️ Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/R4ULtv/ai-models.git
   cd ai-models
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Run the development server:**
   ```bash
   pnpm dev
   ```
4. **Open** [http://localhost:3000](http://localhost:3000) in your browser. Models are fetched from the Cloudflare Worker.

## ➕ Adding New Models

To add a new model, create a JSON file in the appropriate provider directory under [`public/`](.cloudflare/apis/public). The file must follow the schema in [`lib/schema.ts`](lib/schema.ts).

- The full, up-to-date JSON schema is available at `/api/schema.json` when the app is running.

### Example `model.json`

```json
{
  "id": "gpt-4o",
  "name": "GPT-4o",
  "provider": "OpenAI",
  "provider_id": "openai",
  "capabilities": ["tools", "vision", "reasoning"],
  "attachment": true,
  "temperature": true,
  "knowledge": "2023-10",
  "modalities": {
    "input": ["text", "image", "audio"],
    "output": ["text"]
  },
  "cost": { "input": 5.0, "output": 15.0 },
  "limit": { "context": 128000, "output": 4096 }
}
```

See the schema for all available fields and valid values.

## 🤝 Contributing

Contributions are welcome! To get started:

1. **Fork the repo** and create your branch
2. **Follow code style and conventions** (TypeScript, formatting, etc.)
3. **Add or update TypeScript types** as needed
4. **Update documentation** if your change affects usage
5. **Test your changes** thoroughly
6. **Submit a Pull Request**

For major changes, please [open an issue](https://github.com/R4ULtv/ai-models/issues) first to discuss your ideas.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Serverless infrastructure by [Cloudflare](https://cloudflare.com/)
- API framework powered by [Hono](https://hono.dev/)

## ⭐ Support

If you find this project helpful, please consider giving it a star ⭐ on [GitHub](https://github.com/R4ULtv/ai-models)!

For questions or support, [open an issue](https://github.com/R4ULtv/ai-models/issues) on the repository.
