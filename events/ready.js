const presser = String.raw`

 ██╗░░░░░██╗░░░██╗███╗░░██╗███╗░░██╗
 ██║░░░░░╚██╗░██╔╝████╗░██║████╗░██║
 ██║░░░░░░╚████╔╝░██╔██╗██║██╔██╗██║
 ██║░░░░░░░╚██╔╝░░██║╚████║██║╚████║
 ███████╗░░░██║░░░██║░╚███║██║░╚███║
 ╚══════╝░░░╚═╝░░░╚═╝░░╚══╝╚═╝░░╚══╝

`;

module.exports = async (client) => {
    console.log((presser) .brightRed);
    console.log(` Music ready!`.brightGreen)
    console.log(` Bot ready!`.brightGreen)
    console.clear()
    console.log(` Logged in as: ${client.user.username}#${client.user.discriminator}` .brightGreen);
    console.log(' Discord Bot Editions By: Sansamit_#1449' .brightGreen)
    
    //client.user.setActivity(client.config.discord.activity);
};

/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */