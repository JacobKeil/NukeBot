const discord = require('discord.js');
const fetch = require('node-fetch');
const { red } = require('../../Utils/colors.json');
const { stripIndents } = require('common-tags');
const apex_token = process.env.tracker_token;

module.exports = {
        run: async(client, message, args) => {
        if(!args[0]) {
            let m = await message.channel.send("Please supply a username.")
            setTimeout(() => {m.delete()}, 5000);
            return;
        }
        
        try {
            const api_url = `https://public-api.tracker.gg/v2/apex/standard/profile/origin/${args[0]}?TRN-Api-Key=${apex_token}`;
    
            const response = await fetch(api_url);
            const dataAPI = await response.json();
    
            const root = dataAPI.data;
            const stats = dataAPI.data.segments[0].stats;
    
            let apexEmbed = new discord.MessageEmbed()
                              .setTitle(`Apex Legends Stats`)
                              .setColor(red)
                              .setThumbnail(root.platformInfo.avatarUrl)
                              .setAuthor(`${root.platformInfo.platformUserId}`, message.author.displayAvatarURL())
                              .setDescription(stripIndents`
                                    **Active Legend:** ${root.metadata.activeLegendName || "Not Found."}
                                    **Level:** ${stats.level.displayValue || 0}
                                    **Rank:** ${stats.rankScore.metadata.rankName || "Not Found"} 
                                    **Rank Score:** ${stats.rankScore.displayValue || 0}
                              `)
                              .setTimestamp()
                              .setFooter("NukeBot", client.user.displayAvatarURL());
            message.channel.send(apexEmbed);
        }
        catch(err) {
            let s = await message.channel.send(`Could not find player by the name of "${args[0]}"`)
                                         .catch(err => console.error(err));
            setTimeout(() => {s.delete()}, 5000);
        }
    },
    aliases: ['apex', 'ai']   
}