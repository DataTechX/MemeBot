const discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: "ytt",

    execute: async (client, message, args) => {
        let channel = message.member.voice.channel;
        if (!channel) return message.channel.send(':x: | คุณไม่ได้อยู่ในห้องพูดคุย')

        fetch(`https://discord.com/api/v9/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })


            .then(res => res.json())
            .then(invite => {
                if (!invite.code) return message.channel.send(':x: | ไม่สารถสร้างลิ้งก์ได้')
                message.channel.send(`[กดเพื่อเล่น] https://discord.com/invite/${invite.code}`)

            })
    }
};
