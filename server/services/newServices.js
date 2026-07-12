export async function getCompanyNews(company) {
    try {

        const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(company)}&lang=en&max=5&apikey=${process.env.GNEWS_API_KEY}`;

        const response = await fetch(url);

        const data = await response.json();

        return data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            source: article.source.name
        }));

    } catch (err) {
        console.error(err);
        return [];
    }
}