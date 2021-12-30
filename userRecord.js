const client = require("../../index");
const levelSystem = require('../../MongoDB/levelModel');

client.on('guildMemberAdd', async (member) => {
    levelSystem.insertMany([
        {
            userId: member.id,
            level: 1,
            exp: 0,
        }
    ]);
});

client.on('guildMemberRemove', async (member) => {
    levelSystem.findOne({ userId: member.id }, async (err, data) => {
        if(data) data.delete();
    })
});