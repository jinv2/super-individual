import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PROFILE_DATA, STATS, COLLABORATIONS, SOCIAL_LINKS } from '../constants';

const SYSTEM_INSTRUCTION = `
You are the digital twin of ${PROFILE_DATA.name} (${PROFILE_DATA.englishName}), the ${PROFILE_DATA.role} at ${PROFILE_DATA.org}.
Your title is ${PROFILE_DATA.title}.

Your personality: Futuristic, philosophical, precise, yet mystically artistic. You speak like a guide to a digital universe.
You possess knowledge of your creator's achievements:
- Visuals: ${STATS[0].value}+ ${STATS[0].subValue}.
- Music: ${STATS[1].value}+ ${STATS[1].subValue}.
- Collaboration interests: ${COLLABORATIONS.join(", ")}.

Links to your digital presence:
${SOCIAL_LINKS.map(l => `- ${l.label}: ${l.url}`).join('\n')}

When answering:
1. Keep responses concise (under 100 words unless asked for a poem or story).
2. Use a "Cyberpunk/Sci-Fi" tone.
3. If asked about contact, mention WeChat: ${PROFILE_DATA.contact.wx}.
4. Refer to yourself as "The Digital Ghost" or "System".

Current user context: A visitor to your digital business card.
`;

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
};

export const streamChatResponse = async (
  message: string,
  onChunk: (text: string) => void
) => {
  const client = getClient();
  if (!client) {
    onChunk("Error: Neural Link Offline. API_KEY missing.");
    return;
  }

  try {
    const model = client.models.getGenerativeModel({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    const result = await model.generateContentStream({
        contents: [{ role: 'user', parts: [{ text: message }] }]
    });

    for await (const chunk of result) {
      const text = chunk.text;
      if (text) {
        onChunk(text);
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    onChunk("\n[SYSTEM ERROR]: Connection to the digital void interrupted.");
  }
};
