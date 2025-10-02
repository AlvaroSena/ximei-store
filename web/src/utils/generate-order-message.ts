export function generateOrderMessage(orderId: string) {
  const lines: string[] = [];

  const summaryUrl = `${import.meta.env.VITE_APP_URL}/orders/${orderId}`;

  lines.push("🛒 Quero finalizar meu pedido");
  lines.push("");
  lines.push("Resumo do meu pedido (clique para ver todos os itens):");
  lines.push(`👉 ${summaryUrl}`);
  lines.push("");
  lines.push("✅ Confira no link acima");
  lines.push("✅ Não precisa me pedir o modelo, já está tudo no link");

  const text = lines.join("\n");
  const encoded = encodeURIComponent(text);

  return encoded;
}
