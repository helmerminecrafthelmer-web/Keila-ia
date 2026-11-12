const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("keila")
    .setDescription("Habla con KEILA IA")
    .addStringOption(option =>
      option.setName("mensaje").setDescription("Escribe tu mensaje").setRequired(true).setMaxLength(2000)
    ),
  new SlashCommandBuilder()
    .setName("ayuda")
    .setDescription("Muestra cómo usar KEILA IA"),
  new SlashCommandBuilder()
    .setName("estado")
    .setDescription("Comprueba si KEILA IA está conectada")
];

module.exports = commands;
