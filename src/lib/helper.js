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
 * Checks that the permissions exist to a given file/dir handle.
 * @param {} fileHandle
 * @param {boolean} readWrite
 * @returns {boolean}
 */
export async function verifyPermission(fileHandle, readWrite) {
	// Assuming we'll always have permissions on tauri
	if (window.__TAURI__) {
		return true;
	}
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
	if (window.__TAURI__ !== undefined) {
		return;
	}

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


/**
 * Stores handles to the files in the idb-keyval store
 * @returns {Promise<FileSystemDirectoryHandle>} A handle which is used to verify file permissions
 */
const getHandleJs = async () => {
	// FIX: some nightmare fuel over here welp (refactor)
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
			await set(entry.name, entry.values());
		}
		await set(dirHandle.name, dirHandle.values());

		return dirHandle;
	} catch (error) {
		console.error(error.name, error.message);
	}
}

/**
 * Stores file names to paths in the idb-keyval store
 * @returns {Promise<void>}
 */
const getHandleTauri = async () => {
	const { open } = window.__TAURI__.dialog;
	const { readDir } = window.__TAURI__.fs;
	const { appDir } = window.__TAURI__.path;
	const dir = await appDir();
	console.log("opdirir", dir);
	const selected = await open({
		directory: true,
		multiple: false,
		defaultPath: dir
	});
	console.log("select:", selected);
	if (selected !== null) {
		const fileEntries = await readDir(selected);
		const targetFolders = ['nml_mods', 'nml_libs'];

		for await (const entry of fileEntries) {
			if (!Array.isArray(entry.children)) {
				continue;
			}
			if (!targetFolders.some((dir) => dir.includes(entry.name))) {
				continue;
			}
			await set(entry.name, entry.path);
		}
		await set(selected.name, selected.path);
	} else {
		throw new Error("No selection");
	}
}

export const getHandle = () => {
	if (window.__TAURI__ !== undefined) return getHandleTauri();
	else return getHandleJs();
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
	const filename = getFilenameUrl(releaseObj.url);
	if (process.env['TAURI_PLATFORM'] === undefined) {
		const handle = await folder.getFileHandle(filename, {
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
	} else {
		const { fetch } = window.__TAURI__.http;
		const { writeBinaryFile } = window.__TAURI__.fs;
		const response = await fetch('http://localhost:3003/users/2', {
			method: 'GET',
			timeout: 30,
		});
		if (!response.ok) throw new Error("file fetch failed");
		await writeBinaryFile(filename, response.data);
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
