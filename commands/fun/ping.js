const { SlashCommandBiulder } = require('discord.js');

module_exports = {
    data: new SlashCommandBiulder()
        .setName('ping')
        .setDescription('Respondo com Pong!'),
    async execute(interaction) {
      await interaction.reply('Pong!');
    },
};