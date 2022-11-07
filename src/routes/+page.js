/** @type {import('./$types').PageLoad} */
export async function load() {
	const manifest = await fetch(
		'https://raw.githubusercontent.com/neos-modding-group/neos-mod-manifest/master/manifest.json'
	);
	const last_commit = await fetch(
		'https://api.github.com/repos/neos-modding-group/neos-mod-manifest/commits?path=manifest.json&per_page=1',
		{
			headers: {
				'User-Agent': 'neosvr-mod-manager'
			}
		}
	);
	const schema = await fetch(
		'https://raw.githubusercontent.com/neos-modding-group/neos-mod-manifest/master/schema.json'
	);
	const list = await manifest.json();
	const date = await last_commit.json();
	const categories = await schema.json();

	return { list, date, categories };
}
