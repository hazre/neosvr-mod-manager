# NeosVR Mod Manager

[![Built for Neos](https://raw.githubusercontent.com/CytraX-Team/NeosRepoBadges/main/built-for-neos.svg)](https://neos.com/)

A Mod Manager For [NeosModLoader](https://github.com/neos-modding-group/NeosModLoader).
Easily install mods and maintain them with ease.

Want to give it a try? [Click here](https://neom.hazre.dev)

<p>
  <a href="#about">About</a> •
  <a href="#features">Features</a> •
  <a href="#limitations">Limiations</a> •
  <a href="#building-and-development">Building and Development</a>
</p>

## Features

- No installation Required! (100% Web based)
- Accessible by a [Single Link](https://neom.hazre.dev)
- Search for [all available mods](https://www.neosmodloader.com/mods)
- Install and uninstall mods without hassle
- Update your mods with one click
- Responsive design
- Filter by Categories and Installed
- Dark mode based on system preference
- View Changelogs

### Roadmap

- Disable/Enable Mods
- A Progressive Web App
- Ablity to Downgrade mods
- Install Dependencies automatically
- Install NeosModLoader right from the manager.
- Get instant Notifications about mod updates
- Drag and drop integration (initial setup)
- Display unknown/private mods
- i18 (Internationalization)

## Limitations

- Due to nature of how [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) is implemented in the browsers, Neosvr Mod Manager requires a user interaction on each page load to be able to access local files.
- Firefox currently not supported (Check [here](https://caniuse.com/mdn-api_filesystemhandle))
- Downloads are proxied via a cloudflare worker due to CORS limitation.

## Tech stack

- Sveltekit
- Tailwind CSS + Flowbite CSS Components
- Cloudflare Pages (Workers)

## About

Having to keep up with mod updates and installing them was too much of a manual process. That's why I ended up making this.

## Special Thanks

- [Neos Modding Group](https://github.com/neos-modding-group/) - for maintaining an awesome up-to-date list of mods that the mod manager is built upon.
- [@ThaUnknown](https://github.com/ThaUnknown) - helped me figure out how the new Web File API works.
- [@Sox-NeosVR](https://github.com/Sox-NeosVR) - provided me with the Neos Modding Group logo, so I can use it in this project
- All the awesome people that answer questions on Stack overflow.

## Building and Development

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

Once you've cloned the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `npm run preview`.
