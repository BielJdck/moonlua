const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
  console.log(`Conectado em ${c.user.tag}`);
});

client.login(token);