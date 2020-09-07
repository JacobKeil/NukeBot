const discord = require('discord.js');
const { orange } = require('../../Utils/colors.json');
const { stripIndents } = require('common-tags');

module.exports = {
    run: async(client, message, args) => {
        let helpEmbed = new discord.MessageEmbed()
                                .setTitle(`Bot Commands`)
                                .setColor(orange)
                                .setDescription(stripIndents`
                                    **Help**: ex.( ?help )
                                    **Assign Role**: ex.( ?addrole Cybersecurity )
                                    **Play Music**: ex.( ?play queen bohemian rhapsody )
                                    **User Info**: ex.( ?ui )
                                    **Server Info**: ex.( ?si )
                                `)
                                .setTimestamp()
                                .setFooter(`Sent by ${message.author.username}`, message.author.displayAvatarURL());
            message.channel.send(helpEmbed);
    },
    aliases:[]
}