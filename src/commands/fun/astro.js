const discord = require('discord.js');
const fetch = require('node-fetch');
const { blue } = require('../../Utils/colors.json');
const nasa_token = process.env.nasa_api;

module.exports = {
    run: async(client, message, args) => {
        message.channel.bulkDelete(1);
        if(args[0]) {
            let s = await message.channel.send("Just type `?astro` for a picture of the day.")
                                         .catch(err => console.error(err));
            setTimeout(() => {s.delete()}, 10000);
            return;
        }

        var d = new Date();

        try {
            const api_url = `https://api.nasa.gov/planetary/apod?api_key=${nasa_token}&date=${`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`}`;
            const response = await fetch(api_url);
            const dataAPI = await response.json();

            let apodEmbed = new discord.MessageEmbed()
                                .setAuthor("Astronomy Picture of the Day (NASA)")
                                .setTitle(`${dataAPI.title}`)
                                .setColor(blue)
                                .setImage(dataAPI.hdurl)
                                .setTimestamp()
                                .setFooter(`Sent by ${message.author.username}`, message.author.displayAvatarURL());
            message.channel.send(apodEmbed);
        }
        catch (err) {
            console.error(err.message);
            let s = await message.channel.send("Just type `?astro` for a picture of the day.")
                                         .catch(err => console.error(err));
            setTimeout(() => {s.delete()}, 10000);
            return;
        }
},
aliases: [] 
}