/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const assetLink = url.searchParams.get('url');
	if (!assetLink) {
		return new Response(JSON.stringify({ message: 'invalid request, url parameter missing' }));
	}

	const asset = await fetch(new URL(assetLink));

	// let body = asset.body;
	// let headers = Object.fromEntries(asset.headers.entries());

	const data = await asset.arrayBuffer();

	return new Response(new Uint8Array(data));

	// return new Response(body, {
	// 	headers: headers
	// });
}
