/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */

//----------------------------------------------------------------------------------------------------------------------------------------\\


//main music
const config = require("./config/bot.json");
const token = require("./config/bot.json");
const Eris = require('eris');
const Erelajs = require("erela.js");
const Lavasfy = require("lavasfy");
const { MessageEmbed } = require('discord.js')
const bot = new Eris(config.token);

const lavasfy = new Lavasfy.LavasfyClient({
  clientID: config.spotify.clientID,
  clientSecret: config.spotify.clientSecret
}, [
  {
    id: "main",
    host: config.lavalink.host,
    port: parseInt(config.lavalink.port),
    password: config.lavalink.password
  }
])
const Manager = new Erelajs.Manager({
  nodes: [
    {
      host: config.lavalink.host,
      port: parseInt(config.lavalink.port),
      password: config.lavalink.password
    }
  ],
  send(id, payload) {
    const guild = bot.guilds.get(id);
    if (guild) {
      guild.shard.sendWS(payload.op, payload.d);
    }
  }
})

bot.on("ready", () => {
  //console.log(` Music ready!`.green)
  Manager.init(bot.user.id);
})


bot.on('rawWS', (d) => Manager.updateVoiceState(d));

Manager.on("nodeConnect", (node) => {
  console.log(` Connected to: ${node.options.identifier}`.cyan);
})

Manager.on("trackStart", (player, track) => {
  bot.createMessage(player.textChannel, { embed: { color: 0x4F1BFF, title: "meme-ii.admbot.xyz music", description: `Playing: [${track.title}](${track.uri})`, timestamp: new Date(), footer: { text: "Dev By: meme-ii.admbot.xyz", icon_url: "https://images-ext-2.discordapp.net/external/5tn7LVdHwgkJ8cpH-uDInou9iyf_YrGPurPMlqdDcpE/https/i.imgur.com/6TbmrND.png" } } });
})

bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  let prefix = "*";

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  if (cmd == "play" || cmd == 'p') {
    const channel = message.member.voiceState.channelID;
    if (!channel) return bot.createMessage(message.channel.id, "คุณควรอยู่ในช่องเสียงหากต้องการฟังเพลง");

    let res;
    let search = args.join(" ");
    if (!search) return bot.createMessage(message.channel.id, "คำสั่งไม่ถูกต้อง ลอง `*p <ชื่อเพลง|URL>`");

    const player = Manager.create({
      guild: message.guildID,
      voiceChannel: channel,
      textChannel: message.channel.id,
      selfDeafen: true
    });

    if (player.state != 'CONNECTED') await player.connect();

    let REGEX = lavasfy.spotifyPattern;
    if (search.match(REGEX)) {
      await lavasfy.requestToken()
      let node = lavasfy.nodes.get("main");
      let res = await node.load(search);
      console.log(res);

      if (res.loadType == 'NO_MATCHES') {
        return bot.createMessage(message.channel.id, `ไม่พบการแมตช์!`)
      } else if (res.loadType == 'PLAYLIST_LOADED') {
        let allSongs = [];
        for (let index = 0; index < res.tracks.length; index++) {
          const element = res.tracks[index];
          allSongs.push(Erelajs.TrackUtils.build(element, message.author));
        }
        player.queue.add(allSongs);
        if (!player.playing && !player.paused && player.queue.totalSize === allSongs.length) {
          player.play()
        }
      } else {
        player.queue.add(Erelajs.TrackUtils.build(res.tracks[0], message.author));
        if (!player.playing && !player.paused && player.queue.size) {
          player.play()
        }
      }

    } else {
      res = await player.search(search, message.author)

      if (res.loadType == 'NO_MATCHES') {
        return bot.createMessage(message.channel.id, `ไม่พบการแมตช์!`)
      } else if (res.loadType == 'PLAYLIST_LOADED') {
        player.queue.add(res.tracks);
        if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) {
          player.play()
        }
      } else {
        player.queue.add(res.tracks[0]);
        if (!player.playing && !player.paused && !player.queue.size) {
          player.play()
        }
      }
    }
  } else if (cmd == 's' || cmd == 'skip') {
    const channel = message.member.voiceState.channelID;
    if (!channel) return bot.createMessage(message.channel.id, "คุณควรอยู่ในช่องเสียงถ้าคุณต้องการฟังเพลง.");

    const player = await Manager.get(message.guildID);
    if (!player) {
      return bot.createMessage(message.channel.id, "ไม่เล่นเพลง...")
    }

    player.stop();
    return bot.createMessage(message.channel.id, "ข้ามเพลง!")
  } else if (cmd == 'dc' || cmd == 'disconnect') {
    const channel = message.member.voiceState.channelID;
    if (!channel) return bot.createMessage(message.channel.id, "คุณควรอยู่ในช่องเสียงถ้าคุณต้องการฟังเพลง.");

    const player = await Manager.get(message.guildID);
    if (!player) {

      return bot.createMessage(message.channel.id, "ไม่เล่นเพลง...")
    }

    player.disconnect();
    return bot.createMessage(message.channel.id, "ออกจากห้องแล้ว")
  }
});

bot.connect();

//----------------------------------------------------------------------------------------------------------------------------------------\\


//main button menu guild
const fs = require('fs');
const color = require('colors');
const discord = require('discord.js');
const { prefix } = require('./config/bot')
const db = require('quick.db')
const client = new discord.Client({
  presence: {
    status: 'online',
    activity: {
      name: 'meme-ii.admbot.xyz by lynn_',
      type: "WATCHING",
      disableEveryone: true
    }
  }
});
const { MessageButton, MessageActionRow } = require("discord-buttons");
const message = require('./events/message');

require('discord-buttons')(client);

if (message.content == prefix + "menu") {
  const Role1 = new MessageMenuOption()
    .setLabel('WikiPedia') // Label
    .setDescription('Get WikiPedia Role') // Description, Limit Is 50
    .setEmoji('811297151069323274') // Emoji ID
    .setValue('wiki') // To Make Its Funtion When Use Click It

  // Second Option In Menu
  const Role2 = new MessageMenuOption()
    .setLabel('YouTube') // Label
    .setDescription('Get YouTube Role') // Description, Limit Is 50
    .setEmoji('806408246733832232') // Emoji ID
    .setValue('yt') // To Make Its Funtion When Use Click It

  // Third Option In Menu
  const Role3 = new MessageMenuOption()
    .setLabel('Visual Studio Code') // Label
    .setDescription('Get Visual Studio Code Role') // Description, Limit Is 50
    .setEmoji('811297141669888040') // Emoji ID
    .setValue('vscode') // To Make Its Funtion When Use Click It

  // Fourth Option In Menu
  const Role4 = new MessageMenuOption()
    .setLabel('GitHub') // Label
    .setDescription('Get GitHub Role') // Description, Limit Is 50
    .setEmoji('811297109953347595') // Emoji ID
    .setValue('git') // To Make Its Funtion When Use Click It

  const Menu = new MessageMenu()
    .setID('menu') // To Make Its Funtion When Use Click It
    .setPlaceholder('Choose Roles')
    .addOption(Role1)
    .addOption(Role2)
    .addOption(Role3)
    .addOption(Role4)

  const RoleMenu = new MessageActionRow()
    .addComponent(Menu)

  message.channel.send(`Select Roles By Choosing Options Below In Menu`, {
    component: RoleMenu
  })
  client.on('clickMenu', async m => {
    if (m.values[0] === 'wiki') { // If User Click WikiPedia Then This Will Happen
      m.reply.defer()
      m.clicker.member.roles.add('811328887120199720') // Add WikiPedia Role
      m.channel.send(`<@${m.clicker.id}> Added WikiPedia Role`).then(msg => { // Send A Message In That Channel
        msg.delete({ timeout: 4000 }) // Delete After 4 Seconds
      })
      // m.clicker.member.send(`Added WikiPedia Role`) // Send A DM Also
    } else if (m.values[0] === 'yt') { // If User Click YouTube Then This Will Happen
      m.reply.defer()
      m.clicker.member.roles.add('811328860414541884') // Add YouTube Role
      m.channel.send(`<@${m.clicker.id}> Added YouTube Role`).then(msg => { // Send A Message In That Channel
        msg.delete({ timeout: 4000 }) // Delete After 4 Seconds
      })
      // m.clicker.member.send(`Added YouTube Role`) // Send A DM Also
    } else if (m.values[0] === 'vscode') { // If User Click VS Code Then This Will Happen
      m.reply.defer()
      m.clicker.member.roles.add('811328908468420628') // Add VS Code Role
      m.channel.send(`<@${m.clicker.id}> Added VS Code Role`).then(msg => { // Send A Message In That Channel
        msg.delete({ timeout: 4000 }) // Delete After 4 Seconds
      })
      // m.clicker.member.send(`Added VS Code Role`) // Send A DM Also
    } else if (m.values[0] === 'git') { // If User Click GitHub Then This Will Happen
      m.reply.defer()
      m.clicker.member.roles.add('811328963049553931') // Add GitHub Role
      m.channel.send(`<@${m.clicker.id}> Added GitHub Role`).then(msg => { // Send A Message In That Channel
        msg.delete({ timeout: 4000 }) // Delete After 4 Seconds
      })
      // m.clicker.member.send(`Added GitHub Role`) // Send A DM Also
    }
  })
}



//WECOME SETTINGS

// const WelcomeDBMongo = require('./commands/test/Schema/we-schma');

// client.on('guildMemberAdd', member => {
//   WelcomeDBMongo.findOne({ guildId: member.guild.id }, async (err, data) => {

//     if (!data) return;
//     const user = member.user;
//     const channel = member.guild.channels.cache.get(data.channelId);

//     const embeddsds = new discord.MessageEmbed()
//       .setDescription(`Welcome ${user} Thank for join my servers`)
//     //channel.send(`Welcome ${user}!` + MessageBot)
//     channel.send(embeddsds)
//   })
// });

// const GoodbyeDBMongo = require('./commands/test/Schema/le-schma');
// client.on('guildMemberRemove', member => {
//   GoodbyeDBMongo.findOne({ guildId: member.guild.id }, async (err, data) => {

//     if (!data) return;
//     const user = member.user;
//     const channel = member.guild.channels.cache.get(data.channelId);

//     const embeddsdsxfg = new discord.MessageEmbed()
//       .setDescription(`Goodbye ${user} Thank for join my servers`)
//     //channel.send(`Welcome ${user}!` + MessageBot)
//     channel.send(embeddsdsxfg)
//   })
// });


// LOADING FILE COMMANDS
client.config = require('./config/bot');
client.commands = new discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
  const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

  for (const file of commands) {
    const command = require(`./commands/${dirs}/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
  };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
  const event = require(`./events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client));
};


//MONGOOSE DB SETTING
const mongoose = require('mongoose');
const mongoDB = ''

mongoose
  .connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParSer: true,
  })
  .then(console.log('Connected to MongoDB'))

client.login(client.config.discord.token);


