/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */

const db = require('quick.db')

module.exports = {
    name: 'antispam',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args) => {
        if (args[0] === 'on') {
            await db.set(`antispam~${message.guild.id}`, true)
            message.channel.send('antispam {1}')
        } else if (args[0] === 'off') {
            await db.delete(`antispam~${message.guild.id}`)
            message.channel.send('antispam {0}')
        }
    }
}