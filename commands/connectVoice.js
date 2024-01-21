const { Client, EmbedBuilder, PermissionsBitField} = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice');

const mustifixdb = require("croxydb")
const Discord = require("discord.js")
module.exports = {
    name: "connect",
    description: "Bir kanala bağlanırsınız.",
    type: 1,
    options: [
        {
            name: "kanal",
            description: "Uptime botun bağlanacağı kanalı seçin.",
            type: 7,
            required: true,
            channel_types: [2]
        }
    ],

    run: async (client, interaction) => {
        const baglandi = new EmbedBuilder().setDescription("Kanala bağlantı sağlandı.")
        const yetki = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("Yetersiz Yetki!")
            .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

        let channel = interaction.options.getChannel("kanal");
        const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true })

        interaction.reply({ embeds: [baglandi], ephemeral: true })

    }

};