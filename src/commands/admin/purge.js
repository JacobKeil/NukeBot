module.exports = {
        run: async(client, message, args) => {
        let s = await message.channel.send("You don't have permission to use this command.")
        setTimeout(() => {s.delete()}, 3000);
        
        const msgNum = parseInt(args[0]);
        let offset = 1;
        let msgFinal = msgNum + offset;
        message.channel.bulkDelete(msgFinal);
        let m = await message.channel.send(`Purge of ${msgNum} message(s) completed.`)
                                .catch(err => console.error(err));
        setTimeout(() => {m.delete()}, 3000);
    },
    aliases: [] 
}