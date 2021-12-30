const { Client, CommandInteraction } = require('discord.js');
const levelSystem = require('./levelModel');

module.exports = {
    name: 'level-system',
    description: '🧰 Staff | Commands for level system',
    userPermissions: ['ADMINISTRATOR'],
    options: [
        {
            name: 'manual-add',
            description: '🧰 Staff | Manual adds user to level system',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'User to add',
                    type: 'USER',
                    required: true
                }
            ],
        },
        {
            name: 'manual-remove',
            description: '🧰 Staff | Manual remove user from level system',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'member',
                    description: 'User to remove',
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
                if(data) return interaction.followUp({ content: `\`🧰\` This user is already in the level system` })
            })

            levelSystem.insertMany([
                {
                    userId: user.id,
                    level: 1,
                    exp: 0,
                }
            ]);
            interaction.followUp({ content: `\`🧰\` Added ${user.username} to level system` })

        } else if(subcommand === 'manual-remove') {
            const member = interaction.options.getUser('member');

            levelSystem.findOne({ userId: member.id }, async (err, data) => {
                if(data) data.delete();
                if(!data) return interaction.followUp({ content: `\`🧰\` This user is not in the level system` })
                interaction.followUp({ content: `\`🧰\` Removed ${member.username} from level system` })
            })
        }
    },
};
