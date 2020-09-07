const discord = require('discord.js');
const fetch = require('node-fetch');
const { blue } = require('../../Utils/colors.json');
const { stripIndents } = require('common-tags');
const crypt_token = process.env.crypto_api;

module.exports = {
    run: async(client, message, args) => {
        message.channel.bulkDelete(1);
        if(!args[0]) {
            let s = await message.channel.send("Please enter a valid Cryptocurrency ID (ex. `BTC` `ETH` `LTC`)")
                                         .catch(err => console.error(err));
            setTimeout(() => {s.delete()}, 15000);
            return;
        }

        try {
            const api_url = `https://api.nomics.com/v1/currencies/ticker?key=${crypt_token}&ids=${args[0]}&interval=1h`;
            const response = await fetch(api_url);
            const dataAPI = await response.json();
    
            const icon_args = args[0].toLowerCase();
            const icon_url = `https://cryptoicons.org/api/white/${icon_args}/200`;       
            const info = dataAPI[0];

            let currencyEmbed = new discord.MessageEmbed()
                                .setTitle(`${info.name} (${info.symbol})`)
                                .setColor(blue)
                                .setThumbnail(icon_url)
                                .setDescription(stripIndents`
                                    **Rank:** ${info.rank}
                                    **Price:** $${Math.floor(info.price)}
                                    **Price High:** $${Math.floor(info.high)}
                                    **Circulating:** ${Math.floor(info.circulating_supply)}
                                    **Market Cap:** $${Math.floor(info.market_cap)}
                                `)
                                .setTimestamp()
                                .setFooter(`Sent by ${message.author.username}`, message.author.displayAvatarURL());
            message.channel.send(currencyEmbed);
        }
        catch (err) {
            console.error(err.message);
            let s = await message.channel.send("Please enter a valid Cryptocurrency ID (ex. `BTC` `ETH` `LTC`)")
                                         .catch(err => console.error(err));
            setTimeout(() => {s.delete()}, 15000);
            return;
        }
    },
    aliases: []
}