const client = require("./index");
const levelSystem = require('./levelModel');

client.on('messageCreate', async (message) => {
    if(message.author.bot) return;
    const levelsChannel = message.guild.channels.cache.get('<channel-id>');
    const userId = message.author.id
    const userLevel = await levelSystem.findOne({ userId });

    if(userLevel === null) {
        levelSystem.insertMany([
            {
                userId: message.author.id,
                level: 1,
                exp: 0,
            }
        ]);
    }

    const nextLevel = userLevel.level + 1;
    const nextLevelXp = userLevel.level * 10;
    
    await levelSystem.updateOne({ userId }, { exp: (userLevel.exp + 1) });
    console.log(`EXP: ${userLevel.exp}\nLEVEL: ${userLevel.level}\nNEXT LEVEL: ${nextLevel}\nNEXT LEVEL EXP: ${nextLevelXp}`);

    if(userLevel.exp === nextLevelXp) {
        await levelSystem.updateOne({ userId }, { level: nextLevel, exp: 0 });
        levelsChannel.send({ content: `<@${message.author.id}> has leveled up! Level: \`${userLevel.level}\`` })
    }

})
