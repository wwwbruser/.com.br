export default async function handler(req, res) {
  // Libera o acesso para o seu site
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { origem, destino, data } = req.query;

  if (!origem || !destino || !data) {
    return res.status(400).json({ error: 'Faltando parâmetros' });
  }

  try {
    // API de busca da ClickBus (usada pelo próprio site deles)
    const url = `https://api.clickbus.com.br/v1/trips/search?origin=${encodeURIComponent(origem)}&destination=${encodeURIComponent(destino)}&date=${data}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const dataJson = await response.json();
    res.status(200).json(dataJson);

  } catch (error) {
    console.error("Erro na ClickBus:", error);
    res.status(500).json({ error: 'Erro ao buscar viagens' });
  }
}
