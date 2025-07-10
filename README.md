![AI-DB](./public/og-image.png)

An open-source database of AI models with a modern web interface to explore and compare different AI models from various providers.

## Features

- **Comprehensive Model Database**: Curated collection of AI models from major providers
- **Rich Metadata**: Detailed information about capabilities, costs, limits, and modalities
- **Interactive Data Table**: Sortable and filterable interface to explore models
- **Modern UI**: Built with Next.js 15, Tailwind CSS, and Radix UI components
- **Type Safety**: Full TypeScript support with Zod schema validation
- **Dark Mode**: Elegant dark theme for better viewing experience

## Supported Providers

- **OpenAI** - GPT models and more
- **Anthropic** - Claude models
- **Google** - Gemini models
- **Mistral** - Mistral AI models
- **DeepSeek** - DeepSeek models
- **Vercel** - AI models
- **xAI** - Grok models

## Model Information

Each model includes comprehensive metadata:

- **Basic Info**: Name, provider, unique identifiers
- **Capabilities**: Tools, vision, reasoning, embedding support
- **Modalities**: Input/output support for text, audio, image, video, PDF
- **Pricing**: Input/output costs per million tokens, cache pricing
- **Limits**: Context window and output token limits
- **Features**: Temperature support, attachment handling, knowledge cutoff, model size

## Getting Started

Models are served directly from a Cloudflare Worker. You can find the worker's source code [here](https://github.com/R4ULtv/ai-db/tree/main/.cloudflare/apis/src).

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/R4ULtv/ai-db.git
cd ai-db
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser. The models will be fetched from the Cloudflare Worker.

## Adding New Models

To add a new model to the database, create a JSON file in the appropriate provider directory under [`public/`](.cloudflare/apis/public).
The file must follow the schema structure defined in `lib/schema.ts`.

You can find the complete, up-to-date JSON schema definition for models at the `/api/schema.json` endpoint of the running application.

### Example `model.json`

```json
{
  "id": "gpt-4o",
  "name": "GPT-4o",
  "provider": "OpenAI",
  "provider_id": "openai",
  "capabilities": [
    "tools",
    "vision",
    "reasoning"
  ],
  "attachment": true,
  "temperature": true,
  "knowledge": "2023-10",
  "modalities": {
    "input": [
      "text",
      "image",
      "audio"
    ],
    "output": [
      "text"
    ]
  },
  "cost": {
    "input": 5.0,
    "output": 15.0
  },
  "limit": {
    "context": 128000,
    "output": 4096
  }
}
```

### Schema Fields

- `id`: `string` - Unique identifier for the model (e.g., "gpt-4o").
- `name`: `string` - Display name of the model (e.g., "GPT-4o").
- `provider`: `string` - Human-readable provider name (e.g., "OpenAI").
- `provider_id`: `string` - Provider identifier slug (e.g., "openai").
- `capabilities`: `array` - Supported capabilities. Valid values: `"tools"`, `"vision"`, `"reasoning"`, `"embedding"`.
- `attachment`: `boolean` - Whether the model supports file attachments.
- `temperature`: `boolean` - Whether the model supports the temperature parameter.
- `knowledge`: `string` (optional) - Knowledge cutoff date (e.g., "2023-10").
- `modalities`: `object` - Contains supported input and output types. Valid values: `"text"`, `"audio"`, `"image"`, `"video"`, `"pdf"`.
    - `input`: `array` - Supported input types.
    - `output`: `array` - Supported output types.
- `cost`: `object` - Pricing information per million tokens. All fields are optional.
    - `input`: `number` - Cost for input tokens.
    - `output`: `number` - Cost for output tokens.
    - `cache_read`: `number` - Cost for reading from cache.
    - `cache_write`: `number` - Cost for writing to cache.
- `limit`: `object` - Token limits.
    - `context`: `number` - Context window size.
    - `output`: `number` - Maximum output tokens.
    - `size`: `array` (optional) - Model size in billion params (e.g., `["7", "8"]`).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Guidelines

1. Follow the existing code style and conventions
2. Add appropriate TypeScript types
3. Update documentation as needed
4. Test your changes thoroughly
5. Follow the model schema when adding new models

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## Support

If you find this project helpful, please consider giving it a star ⭐ on GitHub!

For questions or support, please open an issue on the GitHub repository.
