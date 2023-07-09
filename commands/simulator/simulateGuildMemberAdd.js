const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('simularguildmemberadd')
        .setDescription('simula o evento GuildMemberAdd'),
    async execute(interaction) {
    const member = interaction.member;
    interaction.client.emit('guildMemberAdd', member)
    await interaction.reply({content: `Evento GuildMemberAdd simulado para ${member}`, ephemeral: true})
      
    }
}