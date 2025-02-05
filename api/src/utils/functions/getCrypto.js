const cheerio = require('cheerio'); // Utilise require pour cheerio
// Fonction pour récupérer les valeurs que je souhaite
const getCrypto = async (html) => {
    const $ = cheerio.load(html);
    const arr = [];

    $('.tw-text-gray-700.dark\\:tw-text-moon-100.tw-font-semibold.tw-text-sm.tw-leading-5').each(function (index) {
        if (index >= 51) return false; // Arrête après 51 éléments

        try {
            let fullText = $(this).text().replace(/\r?\n?/g, '').trim();
            const parts = fullText.split(' ');
            const coinName = parts.slice(0, parts.length - 1).join(' '); // Nom sans le symbole
            const symbol = parts[parts.length - 1]; // Dernier élément comme symbole

            const priceElement = $(this).closest('tr').find('span[data-price-target="price"]').first();
            let price = priceElement.length > 0 ? priceElement.text().trim() : null;

            if (price) {
                price = price.replace(/\s/g, ''); // Supprime les espaces (ex: 97 552,78 → 97552,78)
                price = price.replace(',', '.'); // Remplace la virgule par un point (ex: 97552,78 → 97552.78)
                price = Number(price.replace(/[$]/g, '')); // Supprime "$" et convertit en Number

                if (!isNaN(price)) {
                    arr.push({
                        name: coinName.trim(),
                        symbol: symbol,
                        price: price,
                        date: new Date()
                    });
                }
            }
        } catch (error) {
            console.error('Erreur lors du traitement des données de la cryptomonnaie:', error);
        }
    });

    return arr;
};


module.exports = {
    getCrypto
};