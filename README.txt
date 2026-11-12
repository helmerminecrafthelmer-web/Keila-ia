KEILA IA — BOT PRIVADO DE DISCORD
=================================

REQUISITOS
- Node.js 20 o superior.
- Una aplicación y un bot creados en Discord Developer Portal.
- Un proveedor compatible con la API Chat Completions y su clave.
- Un proceso/servidor donde mantener Node.js ejecutándose.

INSTALACIÓN
1. Descomprime este ZIP.
2. Crea un archivo llamado .env en la carpeta principal.
3. Copia dentro el contenido de .env.example.
4. Completa los valores. No compartas DISCORD_TOKEN ni AI_API_KEY.
5. Abre una terminal en esta carpeta y ejecuta:
   npm install
   npm run deploy
   npm start

CONFIGURACIÓN DE DISCORD
- En Discord Developer Portal crea una aplicación y agrega un Bot.
- Copia el token del bot en DISCORD_TOKEN.
- CLIENT_ID es el Application ID.
- GUILD_ID es el ID de tu servidor.
- OWNER_ID puede guardarse para futuras funciones administrativas.
- Invita el bot al servidor con los permisos de aplicaciones/comandos necesarios.
- Los comandos registrados son /keila, /ayuda y /estado.

CONFIGURACIÓN DE IA
- AI_API_KEY: clave del proveedor.
- AI_BASE_URL: dirección base compatible con /chat/completions.
- AI_MODEL: nombre exacto del modelo disponible en tu proveedor.

IMPORTANTE
- GitHub guarda el código, pero no ejecuta el bot continuamente.
- Sin Render, necesitas otro equipo/servidor compatible con Node.js que permanezca encendido.
- No subas el archivo .env a GitHub. El .gitignore ya lo excluye.
- Si el token se publica por error, revócalo y genera uno nuevo en Discord Developer Portal.
- El bot no descarga ni ejecuta actualizaciones enviadas por usuarios.
- El historial de conversación es temporal y se pierde al reiniciar el proceso.
