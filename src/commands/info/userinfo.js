const discord = require('discord.js');

module.exports = {
        run: async(client, message, args) => {
        message.channel.bulkDelete(1);
        let userEmbed = new discord.MessageEmbed()
                              .setTitle("User Info")
                              .addField("**Name**", message.author.username, true)
                              .addField("**Discriminator**", message.author.discriminator, true)
                              .setTimestamp()
                              .setThumbnail(message.author.displayAvatarURL())
                              .setFooter("NukeBot", client.user.displayAvatarURL());
        message.channel.send(userEmbed);
    },
    aliases: ['ui']
}