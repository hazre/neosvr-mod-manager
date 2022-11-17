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

- No installation Required! (100% Web based)
- Accessible by a [Single Link](https://neom.hazre.dev)
- Search for [all available mods](https://www.neosmodloader.com/mods)
- Install and uninstall mods without hassle
- Update your mods with one click
- Responsive design
- Filter by installed, updates and categories
- Dark mode Toggle
- View Changelogs
- Browse Mods without installing them. (Alternative to [neosmodloader.com](https://www.neosmodloader.com/mods))

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
- Editing Mode is currently not supported in Firefox (Check [here](https://caniuse.com/mdn-api_filesystemhandle))
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
