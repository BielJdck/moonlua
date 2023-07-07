const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[PERIGO] O comando em ${filePath} está faltando uma propriedade "data" ou "execute" necessária.`)
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
       console.error(`Nenhum comando corresponde a ${interaction.commandName} foi encontrado.`)
        return;
}
    try {
        await command.execute(interaction);
    } catch(error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.folowUp ({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true });
        } else {
            await interaction.replay({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true});
        }
    }
});
          
client.once(Events.ClientReady, c => {
  console.log(`Conectado em ${c.user.tag}`);
});

client.login(token);