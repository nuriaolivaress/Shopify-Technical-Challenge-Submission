import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default async function (req, res) {
  const response = await openai.createCompletion("text-curie-001", {
    prompt: "Brainstorm some ideas combining VR and fitness:",
    temperature: 0.6,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 1,
    presence_penalty: 1,
  });
  
  res.status(200).json({ result: response.data.choices[0].text });
}
