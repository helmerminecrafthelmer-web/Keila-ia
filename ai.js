const SYSTEM_PROMPT = `
Eres KEILA IA, una asistente virtual útil, clara y respetuosa.
Responde en español salvo que el usuario pida otro idioma.
No afirmes que has realizado acciones que no puedes ejecutar.
Si no sabes algo, dilo claramente.
`;

async function askAI(message, history = []) {
  const key = process.env.AI_API_KEY;
  if (!key) {
    return "Todavía no tengo conectada la IA. Configura AI_API_KEY en el archivo .env y reinicia el bot.";
  }

  const base = (process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
  const model = process.env.AI_MODEL || "gpt-4o-mini";

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.slice(-10),
    { role: "user", content: message }
  ];

  const response = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ model, messages, temperature: 0.7 })
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Proveedor IA:", response.status, detail.slice(0, 500));
    return "No pude conectar con el servicio de IA. Revisa la clave, el modelo y la dirección AI_BASE_URL.";
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "No recibí una respuesta válida de la IA.";
}

module.exports = { askAI };
