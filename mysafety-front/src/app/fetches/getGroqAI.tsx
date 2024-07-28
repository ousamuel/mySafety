import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

type SearchBy = {
  zipcode: string;
  address: string;
};
export async function getGroqChatCompletion(data: SearchBy) {
  const chatCompletion = await main(data);
  console.log(chatCompletion.choices[0]?.message?.content || "");
}
export async function main(data: SearchBy) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Using this website (https://www.latlong.net/convert-address-to-lat-long.html), Please return a string in the format of "latitude,longitude" for this address: 59-23 162nd St, Flushing, NY 11365. Please don't include any other filler text, just the string`,
      },
    ],
    model: "llama3-8b-8192",
  });
}
