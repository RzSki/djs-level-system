const { Client, CommandInteraction } = require('discord.js');
const levelSystem = require('../../MongoDB/levelModel');

module.exports = {
    name: 'level-system',
    description: '🧰 Staff | Specjalne komendy systemu poziomów',
    userPermissions: ['ADMINISTRATOR'],
    options: [
        {
            name: 'manual-add',
            description: '🧰 Staff | Manualnie dodaje użytkownika do systemu poziomów',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'Użytkownik za którym chcesz wykonać operację',
                    type: 'USER',
                    required: true
                }
            ],
        },
        {
            name: 'manual-remove',
            description: '🧰 Staff | Manualnie usuwa użytkownika z systemu poziomów',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'member',
                    description: 'Użytkownik za którym chcesz wykonać operację',
                    type: 'USER',
                    required: true
                }
            ],
        },
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const [ subcommand ] = args;

        if(subcommand === 'manual-add') {
            const user = interaction.options.getUser('user');

            levelSystem.findOne({ userId: user.id }, async (err, data) => {
                if(data) return interaction.followUp({ content: `\`🧰\` Ten użytkownik jest już w systemie poziomów` })
            })

            levelSystem.insertMany([
                {
                    userId: user.id,
                    level: 1,
                    exp: 0,
                }
            ]);
            interaction.followUp({ content: `\`🧰\` Dodano ${user.username} do systemu poziomów` })

        } else if(subcommand === 'manual-remove') {
            const member = interaction.options.getUser('member');

            levelSystem.findOne({ userId: member.id }, async (err, data) => {
                if(data) data.delete();
                if(!data) return interaction.followUp({ content: `\`🧰\` Tego użytkownika nie ma w systemie poziomów` })
                interaction.followUp({ content: `\`🧰\` Usunięto ${member.username} z systemu poziomów` })
            })
        }
    },
};