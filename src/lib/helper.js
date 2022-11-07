// @ts-nocheck
import { get, set } from 'idb-keyval';
import { writable } from 'svelte/store';

export const hashes = writable(new Set());
export const mods = writable([]);

/**
 * @param {"SHA-1"|"SHA-256"|"SHA-384"|"SHA-512"} algorithm https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 * @param {string|Blob|File} data
 */
export async function getHash(algorithm, data) {
	const main = async (msgUint8) => {
		// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
		const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		return hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
	};

	if (data instanceof File) {
		const arrayBuffer = await data.arrayBuffer();
		const msgUint8 = new Uint8Array(arrayBuffer);
		return await main(msgUint8);
	}
	const encoder = new TextEncoder();
	const msgUint8 = encoder.encode(data);
	return await main(msgUint8);
}

export function findNested(obj, key, value) {
	// Base case
	if (obj[key] === value) {
		return obj;
	} else {
		var keys = Object.keys(obj); // add this line to iterate over the keys

		for (var i = 0, len = keys.length; i < len; i++) {
			var k = keys[i]; // use this key for iteration, instead of index "i"

			// add "obj[k] &&" to ignore null values
			if (obj[k] && typeof obj[k] == 'object') {
				var found = findNested(obj[k], key, value);
				if (found) {
					// If the object was found in the recursive call, bubble it up.
					return found;
				}
			}
		}
	}
}

export async function verifyPermission(fileHandle, readWrite) {
	const options = {};
	if (readWrite) {
		options.mode = 'readwrite';
	}
	// Check if permission was already granted. If so, return true.
	if ((await fileHandle.queryPermission(options)) === 'granted') {
		return true;
	}
	// Request permission. If the user grants permission, return true.
	if ((await fileHandle.requestPermission(options)) === 'granted') {
		return true;
	}
	// The user didn't grant permission, so return false.
	return false;
}

export const setHandleHashes = async (dirHandle) => {
	let promises = [];
	let files = [];
	for await (const entry of dirHandle.values()) {
		if (entry.kind !== 'file' && !entry.name.toString().toLowerCase().includes('.dll')) {
			continue;
		}
		promises.push(entry.getFile().then((file) => file));
	}
	try {
		files = await Promise.all(promises);
		for (let i = 0; i < files.length; i++) {
			const hash = await getHash('SHA-256', files[i]);
			hashes.update((list) => {
				list.add(hash);
				return list;
			});
		}
		let newlist;
		hashes.subscribe((list) => (newlist = list));
		return newlist;
	} catch (error) {
		console.error(error);
	}
};

export const getHandle = async () => {
	const options = {
		mode: 'readwrite'
	};
	try {
		const dirHandle = await window.showDirectoryPicker(options);
		await set(dirHandle.name, dirHandle);
		return dirHandle;
	} catch (error) {
		console.error(error.name, error.message);
	}
};

export const getHighest = (data) => {
	const highest = data.reduce((a, b) =>
		0 < a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }) ? a : b
	);
	return highest;
};

// transition:scale={{ duration: 1000, easing: expoInOut }}

// bind:offsetHeight={listOffsetHeight}

// let matched = findNested(
//   sortedList,
//   'sha256',
//   'f741de990b9fb502fb71a052d04ad178ecde2e7717955eca37d5ffebc2968b81'
// );
// if (matched) {
//   console.log(new URL(matched.url).pathname.split('/').reverse()[1]);
// }

// const folder = await window.showDirectoryPicker()

// const promises = []
// for await (const [name, handle] = folder.entries()) {
//     promises.push((async()=>{
//         const writer = await handle.createWritable()
//         const res = await fetch(api + name)
//         const ab = await res.arrayBuffer()
//         writer.truncate(ab.byteLength)
//         writer.write(ab)
//         writer.close()
//         const hash = await new Promise(resolve => sha1(ab, resolve))
//         return { hash, name }
//     })())
// }
// const results = await Promise.all(promises)
