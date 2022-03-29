const fs = require('fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientID, guildID, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    console.log(`[${new Date().toLocaleString()}] [INFO] Loaded command: ${command.data.name}`);
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
    .then(() => {
        for (const i in commandFiles) {
            console.log(`[${new Date().toLocaleString()}] [SUCCESS] Registered command: ${commandFiles[i]}`);
        }
        console.log(`[${new Date().toLocaleString()}] [SUCCESS] Successfully registered commands`)
    })
    .catch(console.error);
