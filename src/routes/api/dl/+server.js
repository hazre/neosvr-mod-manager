/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const assetLink = url.searchParams.get('url');
	if (!assetLink) {
		return new Response(JSON.stringify({ message: 'invalid request, url parameter missing' }));
	}

	const asset = await fetch(new URL(assetLink));

	let body = asset.body;
	let headers = Object.fromEntries(asset.headers.entries());

	headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';

	return new Response(body, {
		headers: headers
	});
}
