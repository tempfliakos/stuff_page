const PLACEHOLDER = '$PLACEHOLDER$'
const MOVIES_API_URL = `${process.env.TMDB_LINK}&query=${PLACEHOLDER}`;

const BOOKS_API_BASE_URL = 'https://moly.hu/api';
const BOOKS_API_KEY = process.env.BOOKS_API_KEY;
const BOOKS_API_SEARCH_TITLE_URL = BOOKS_API_BASE_URL + `/books.json?q=${PLACEHOLDER}&key=${BOOKS_API_KEY}`;
const BOOKS_API_SEARCH_ISBN_URL = BOOKS_API_BASE_URL + `/book_by_isbn.json?q=${PLACEHOLDER}&key=${BOOKS_API_KEY}`;
const BOOKS_API_SEARCH_BOOK_ID_URL = BOOKS_API_BASE_URL + `/book/${PLACEHOLDER}.json?key=${BOOKS_API_KEY}`;

const GTA_SERVER_LINK = process.env.GTA_SERVER_LINK;

const IGDB_API_URL = 'https://api.igdb.com/v4/games';
const IGDB_OAUTH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';

function getUrl(url, replaceValues = []) {
	let result = url;
	for (let replace of replaceValues) {
		result = result.replace(PLACEHOLDER, replace);
	}
	return result;
}

module.exports = {
	MOVIES_API_URL,
	BOOKS_API_SEARCH_TITLE_URL,
	BOOKS_API_SEARCH_ISBN_URL,
	BOOKS_API_SEARCH_BOOK_ID_URL,
	GTA_SERVER_LINK,
	IGDB_API_URL,
	IGDB_OAUTH_TOKEN_URL,
	getUrl,
}