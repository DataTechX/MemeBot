const discord = require('discord.js') 
const fetch = require('node-fetch') 

module.exports = {
        name: "fishing",

    execute: async (client, message, args) => {
        const vc1 = new discord.MessageEmbed()
        .setDescription(':x: | คุณไม่ได้อยู่ในห้องพูดคุย')
        .setColor('#FF0000')
        let channel = message.member.voice.channel;  
        if(!channel) return message.channel.send(vc1) 
    
        fetch(`https://discord.com/api/v9/channels/${channel.id}/invites`, { 
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,  
                max_uses: 0, 
                target_application_id: "814288819477020702",
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
            const vc2 = new discord.MessageEmbed()
            .setDescription(':x: | ไม่สารถสร้างลิ้งก์ได้')
            .setColor('#FF0000')
            if(!invite.code) return message.channel.send(vc2)
            message.channel.send(`[กดเพื่อเล่น] https://discord.com/invite/${invite.code}`) 
    
        })
    }
};