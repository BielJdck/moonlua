const { Events, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const Canvas = require('canvas')

    const channel_id = '1127300353617047713';
    const channel = member.guild.channels.cache.get(channel_id);

    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage(path.join(__dirname, '../background.png'))
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = '32px sans';
    ctx.fillStyle = '#ffffff';

    const text = `Bem vindo ${member.use.tag} !`
    const textWidth = ctx.measureText(text).width;
    ctx.fillText(text, canvas.width / 2 - textWidth / 2, canvas.height / 5);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), {name: 'welcome-image.png'});
    channel.send({files: [attachment]});
  }
};