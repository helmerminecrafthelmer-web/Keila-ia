require("dotenv").config();
const { REST, Routes } = require("discord.js");
const commands = require("./commands");

async function main() {
  const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
  if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
    throw new Error("Faltan DISCORD_TOKEN, CLIENT_ID o GUILD_ID en .env");
  }

  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: commands.map(command => command.toJSON()) }
  );
  console.log("Comandos de KEILA IA registrados en el servidor.");
}

main().catch(error => {
  console.error("No se pudieron registrar los comandos:", error);
  process.exit(1);
});
