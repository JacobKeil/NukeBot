const discord = require('discord.js');

module.exports = {
        run: async(client, message, args) => {
        message.channel.bulkDelete(1);
        let serverEmbed = new discord.MessageEmbed()
                              .setTitle("Server Info")
                              .addField("**Name**", message.guild.name, true)
                              .addField("**Owner**", message.guild.owner, true)
                              .addField("**Members**", message.guild.memberCount, true)
                              .setTimestamp()
                              .setThumbnail(message.guild.iconURL())
                              .setFooter("NukeBot", client.user.displayAvatarURL());
        message.channel.send(serverEmbed);
    },
    aliases: ['si']
}