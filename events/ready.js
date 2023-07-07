const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
      console.log(`Starting in ${client.user.tag}`);
    },
};