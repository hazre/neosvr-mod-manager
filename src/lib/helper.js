// @ts-nocheck
import { get, set } from 'idb-keyval';
import { writable } from 'svelte/store';

export const hashes = writable(new Set());

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

/**
 *
 * @param {} fileHandle
 * @param {boolean} readWrite
 * @returns
 */
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
	let list = new Set();
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

// FIX: some nightmare fuel over here welp (refactor)
export const getHandle = async () => {
	const options = {
		mode: 'readwrite'
	};
	try {
		const dirHandle = await window.showDirectoryPicker(options);

		let file;
		try {
			file = !!(
				(await dirHandle.getDirectoryHandle('nml_mods')) &&
				(await dirHandle.getDirectoryHandle('nml_libs'))
			);
		} catch (error) {
			file = false;
			return await getHandle();
		}

		let folders = ['nml_mods', 'nml_libs'];

		for await (const entry of dirHandle.values()) {
			if (entry.kind !== 'directory') {
				continue;
			}
			if (!folders.some((dir) => dir.includes(entry.name))) {
				continue;
			}
			await set(entry.name, entry);
		}
		await set(dirHandle.name, dirHandle);

		return dirHandle;
	} catch (error) {
		console.error(error.name, error.message);
	}
};

export const getLatestVersion = (data) => {
	const latest = data.reduce((a, b) =>
		0 < a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }) ? a : b
	);
	return latest;
};

export const isMobile = () =>
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const checkFile = async (releaseObj) => {
	let folder;
	if (releaseObj?.installLocation === '/nml_libs') {
		folder = await get('nml_libs');
	} else {
		folder = await get('nml_mods');
	}
	if (!folder) {
		return null;
	}
	await verifyPermission(folder, true);
	return folder;
};

export const getFilenameUrl = (url) => {
	return new URL(url).pathname.split('/').reverse()[0];
};

export const downloadFile = async (releaseObj) => {
	const folder = await checkFile(releaseObj);
	if (!folder) {
		return null;
	}
	const handle = await folder.getFileHandle(getFilenameUrl(releaseObj.url), {
		create: true
	});
	try {
		const writer = await handle.createWritable();
		const res = await fetch(`/api/dl?url=${releaseObj.url}`);
		const ab = await res.arrayBuffer();
		writer.truncate(ab.byteLength);
		writer.write(ab);
		writer.close();
		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const deleteFile = async (releaseObj) => {
	const folder = await checkFile(releaseObj);
	if (!folder) {
		return null;
	}
	try {
		const handle = await folder.removeEntry(getFilenameUrl(releaseObj.url));
		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const updateCategoryFilter = (categories, category) => {
	if (categories.some((cat) => cat === category)) {
		categories = categories.filter((m) => m !== category);
		return categories;
	} else {
		categories = [...categories, category];
		return categories;
	}
};
