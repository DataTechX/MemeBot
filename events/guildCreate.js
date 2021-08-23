/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */

const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord-buttons")
const config = require("../config/bot")
const ee = require("../config/embedbuild.json")
module.exports = async (client, guild) => {
    var found = false;
    guild.channels.cache.forEach(async (channel, id) => {
        if (found == true || channel.type != "text") {
            return;
        }

        let xs = new MessageButton()

            .setStyle('url')
            .setURL('https://lynn-th.tk/')
            .setLabel('Support Server');

        const Rowm = new MessageActionRow()
            .addComponent(xs)

        const em = new Discord.MessageEmbed()
            .setTitle("❤️ Thanks for adding me! ❤️")
            .setDescription(`**Thank you for adding me! ✅**
     \`-\` My prefix here is \`${config.discord.prefix}\`
     \`-\` You can know more about me by typing \`${config.discord.prefix}help\`
     \`-\` If you need help, feel free to join our support server.`)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
        if (guild.me.permissionsIn(channel).has("SEND_MESSAGES") && guild.me.permissionsIn(channel).has("VIEW_CHANNEL")) {
            found = true;
            return channel.send({ embed: em, components: Rowm })
        }
    })
}