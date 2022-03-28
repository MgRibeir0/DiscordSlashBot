const { Client, Intents, Collection } = require('discord.js')
const fs = require('fs')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

const commands = []

client.commands = new Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
    console.log(`[${new Date().toLocaleString()}] [INFO] Loaded command: ${command.data.name}`)
}

client.on('ready', () => {
    console.log(`[${new Date().toLocaleString()}] [READY] Logged in as ${client.user.tag}!`)
});

client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(`[${new Date().toLocaleString()}] [ERROR] ${error}`);
        interaction.reply(`An error occured while executing the command`, { ephemeral: true });
    }
});