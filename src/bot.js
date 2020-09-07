require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();
const prefix = process.env.prefix;
const fs = require('fs').promises;
const path = require('path');

client.commands = new Map();
client.login(process.env.bot_token);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`)
    client.user.setActivity('Being a bot')
});

client.on('message', function(message) {
    if(message.author.bot) return;
    if(message.content.charAt(0) !== prefix) return;
    let cmdArgs = message.content.substring(message.content.indexOf(prefix) + 1).split(new RegExp(/\s+/));
    let cmdName = cmdArgs.shift();
    if(client.commands.get(cmdName)) {
        client.commands.get(cmdName).run(client, message, cmdArgs);
    }
    else {
        return;
    }
});

// client.on('inviteCreate', function(invite) {
//     console.log(`${invite.inviter.username} created an invite in "${invite.guild.name}"`);
//     invite.delete();
//     console.log(`Invite Deleted!`);
// });

client.on('guildMemberAdd', function(member) {
    let role =  member.guild.roles.cache.find(r => r.name === `Member`);
    if (!role) {
        return;
    }
    else {
        member.roles.add(role);
    }
});

(async function registerCommands(dir = 'Commands') {
    let files = await fs.readdir(path.join(__dirname, dir));
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory())
            registerCommands(path.join(dir, file));
        else {
            try {
                if(file.endsWith(".js")){
                    let cmdName = file.substring(0, file.indexOf(".js"));
                    let cmdModule = require(path.join(__dirname, dir, file));
                    let { aliases } = cmdModule;
                    //console.log(cmdName);
                    client.commands.set(cmdName, cmdModule);
                    if (aliases.length !== 0) {
                        aliases.forEach(alias => client.commands.set(alias, cmdModule));
                    }
                }
            }
            catch(err) {
                console.error(err);
            }
        }
    }
})()