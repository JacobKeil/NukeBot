module.exports = {
    run: async(client, message, args) => {
        const flipCoin = () => Math.floor(Math.random() * 2) + 1;
    
        if (flipCoin() === 1) {
            message.channel.send("Heads");
        }
        else if (flipCoin() === 2){
            message.channel.send("Tails");
        }
    },
    aliases: ['flip']
}