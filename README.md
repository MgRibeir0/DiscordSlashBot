# Model files

This is a public model that i created to make it easier to create a new Discord Bot from scratch.

Just clone and change the credentials at [configs.json](https://github.com/MgRibeir0/DiscordSlashBot/blob/master/config.json)

All your commands need to be created inside the commands folder.

To install needed dependencies, just run `npm i` on the root folder.

## Guild commands and Global commands

In the [dc.js](https://github.com/MgRibeir0/DiscordSlashBot/blob/master/dc.js) file, we have the following code:

</br>

<code>
  rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
    .then(() => console.log(`[${new Date().toLocaleString()}] [INFO] Successfully registered commands`))
    .catch(console.error);
</code>

</br>
</br>

This sends a request to the Discord API and register your commands to a guild.
To make it global, you just need to change to this

</br>

<code>
  rest.put(Routes.applicationCommands(clientID), { body: commands })
    .then(() => console.log(`[${new Date().toLocaleString()}] [INFO] Successfully registered commands`))
    .catch(console.error);
</code>

</br>
</br>

Ps: All the Date objects are fully optional, i use them to better control execution time and delay between things.

</br>
