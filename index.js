require("dotenv").config();
const OpenAI = require("openai");

const { Client, Events, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
openAiToken = process.env.openAiToken;
const openai = new OpenAI({
  apiKey: openAiToken, // This is also the default, can be omitted
});

client.on("messageCreate", async function (message) {
  try {
    if (message.author.bot) return;
    const r = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message.content }],
    });
    message.reply(r.choices[0].message.content);
  } catch (err) {
    console.log(err);
  }
});
client.login(process.env.DISCORD_TOKEN);
console.log("LMCR's bot is online on Discord");
