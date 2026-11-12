require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder
} = require("discord.js");
const { askAI } = require("./ai");

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error("Falta DISCORD_TOKEN. Crea el archivo .env usando .env.example.");
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// Historial temporal por usuario; se borra al reiniciar el bot.
const histories = new Map();

client.once(Events.ClientReady, readyClient => {
  console.log(`KEILA IA está en línea como ${readyClient.user.tag}`);
  readyClient.user.setPresence({
    activities: [{ name: "usa /keila para hablar conmigo" }],
    status: "online"
  });
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "estado") {
    return interaction.reply({
      content: "🟢 KEILA IA está conectada y funcionando.",
      ephemeral: true
    });
  }

  if (interaction.commandName === "ayuda") {
    const embed = new EmbedBuilder()
      .setColor(0x8b5cf6)
      .setTitle("KEILA IA — Ayuda")
      .setDescription([
        "**/keila mensaje:** conversa conmigo.",
        "**/estado:** comprueba si estoy conectada.",
        "**/ayuda:** muestra esta ayuda."
      ].join("\n"))
      .setFooter({ text: "KEILA IA" });
    return interaction.reply({ embeds: [embed], ephemeral: true });
  }

  if (interaction.commandName === "keila") {
    const prompt = interaction.options.getString("mensaje", true);
    await interaction.deferReply();

    try {
      const history = histories.get(interaction.user.id) || [];
      const answer = await askAI(prompt, history);

      history.push({ role: "user", content: prompt });
      history.push({ role: "assistant", content: answer });
      histories.set(interaction.user.id, history.slice(-10));

      // Discord limita cada mensaje a 2000 caracteres.
      const chunks = answer.match(/[\s\S]{1,1900}/g) || ["No tengo respuesta."];
      await interaction.editReply(chunks[0]);
      for (const chunk of chunks.slice(1)) {
        await interaction.followUp({ content: chunk, ephemeral: true });
      }
    } catch (error) {
      console.error("Error atendiendo /keila:", error);
      await interaction.editReply("Ocurrió un error. Revisa los registros del servidor.");
    }
  }
});

client.on(Events.Error, error => console.error("Discord client error:", error));
process.on("unhandledRejection", error => console.error("Promesa rechazada:", error));

client.login(token).catch(error => {
  console.error("No se pudo iniciar sesión en Discord. Revisa DISCORD_TOKEN.", error);
  process.exit(1);
});
