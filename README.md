<div align="center">
  <a href="https://neom.hazre.dev">
    <img src="static/nml.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">NeosVR Mod Manager</h3>

  <p align="center">
    A Mod Manager For <a href="https://github.com/neos-modding-group/NeosModLoader">NeosModLoader</a>.
    <br />
    Easily install mods and maintain them with ease.
    <br />
    <br />
    <a href="https://neos.com/">
      <img src="https://raw.githubusercontent.com/CytraX-Team/NeosRepoBadges/main/built-for-neos.svg" alt="Logo" height="28">
    </a>
    <br />
    <p>
      <a href="#about">About</a> •
      <a href="#features">Features</a> •
      <a href="#limitations">Limiations</a> •
      <a href="#building-and-development">Building and Development</a>
    </p>
    Want to give it a try? <a href="https://neom.hazre.dev">Click here</a>
</div>
<br />

[Preview](https://user-images.githubusercontent.com/37149950/201496329-7e0cbf73-008b-4e37-a791-b2dff1878e64.mp4)



## Features

- No installation Required! (100% Web based, though an app version is under development)
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

- Due to nature of how [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) is implemented in the browsers, NeosVR Mod Manager requires a user interaction on each page load to be able to access local files.
- Firefox currently not supported (Check [here](https://caniuse.com/mdn-api_filesystemhandle))
- Downloads are proxied via a cloudflare worker due to CORS limitation.

In the future when the native app is fully implemented it won't have the last two limitations, but it requires installation.

## Tech stack

- Sveltekit
- Tailwind CSS + Flowbite CSS Components
- Cloudflare Pages (Workers) - for web app
- Tauri - for desktop app

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

# or start the app dev version
pnpm tauri dev
```

To create a production version of your app:

```bash
# Web version
pnpm run build
# App version
pnpm tauri build
```

You can preview the web production build with `npm run preview`.
