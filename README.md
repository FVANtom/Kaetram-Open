# Spirits of Terra

[![Version](https://img.shields.io/github/package-json/v/FVANtom/SpiritsOfTerra-Open)](https://github.com/FVANtom/SpiritsOfTerra-Open/releases/latest 'Version')
[![MPL-2.0 License](https://img.shields.io/github/license/FVANtom/SpiritsOfTerra-Open)][license]
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fkaetram.com&style=flat)](https://kaetram.com 'Website')
[![Workflow Status](https://img.shields.io/github/workflow/status/FVANtom/SpiritsOfTerra-Open/Kaetram-Open%20CI)](https://github.com/FVANtom/SpiritsOfTerra-Open/actions 'Workflow Status')
[![Open Issues](https://img.shields.io/github/issues/FVANtom/SpiritsOfTerra-Open)][issues]

[![Watch](https://img.shields.io/github/watchers/FVANtom/SpiritsOfTerra-Open?style=social&icon=github)](https://github.com/FVANtom/SpiritsOfTerra-Open/subscription 'Watch')
[![Stars](https://img.shields.io/github/stars/FVANtom/SpiritsOfTerra-Open?style=social&icon=github)](https://github.com/FVANtom/SpiritsOfTerra-Open/stargazers 'Stars')
[![Fork](https://img.shields.io/github/forks/FVANtom/SpiritsOfTerra-Open?style=social&icon=github)](https://github.com/FVANtom/SpiritsOfTerra-Open/fork 'Fork')
[![Discord](https://img.shields.io/discord/630113679454765056?logo=discord&color=7289da&style=flat)][discord]

This repo contains the open source part of the Spirits of Terra (SOT) game project.

Live Version &ndash; <https://spiritsofterra.com>

Join us on Discord &ndash; <https://discord.gg/E8M5gPC>

## Backstory

The world of Terra died.. Years of pollution and neglect killing it slowly. Its population fleeing, until nothing was left. Or so we thought..

Something stirs.. a new wind blows.. the spirits are awakening, bringing with them new life..

But Terra still needs help. The spirits need guidance. They need you!
Answer their call and bind your soul with them to embark on the greatest quest of all.

Save the world! Restore life!

## The spirit of collaboration

Spirits of Terra (SOT) is based on the open-source Kaetram game engine.
In the same spirit (pun intended) we will also create a big portion of our project with the same open-source license.

Partly because we strive to form a symbiotic relationship with the Kaetram project so we can share updates and fixes both ways.
And partly to allow members of our community to help build the game.

Join us on [Discord](https://discord.gg/E8M5gPC) for more information about helping out with development.

Consider supporting the Kaetram project. Without them, we would not exist. More information can be found inside their repo https://github.com/Kaetram/Kaetram-Open

## Get Started
### Prerequisites

You must first [install Node.js](https://nodejs.org/en/download) to run the project, and
_optionally_ [install MongoDB](https://www.mongodb.com/try/download/community) to store user data on
the server.

#### NOTE: Node.js

> You need to use a Node.js version greater than or equal to `14.19.0`, following the
> [Long Term Support (LTS) schedule](https://nodejs.org/en/about/releases), to have the most stable
> experience when developing/experimenting with Kaetram. Older versions would not work with our
> current dependencies and package manager.

#### NOTE: MongoDB

> MongoDB is not a requirement for Kaetram to run, but you can store and save user data if you
> install it and run an online environment with all the features enabled. To do this, see
> [Configuration](#configuration), and set `SKIP_DATABASE=false`. _If you do choose to install
> MongoDB, a user is not necessary, but you can enable authentication with the `MONGODB_AUTH`
> setting._

#### Yarn

You will also need to enable Yarn to manage your dependencies.

> The preferred way to manage Yarn is through
> [Corepack](https://nodejs.org/dist/latest/docs/api/corepack.html)
>
> <https://yarnpkg.com/getting-started/install>

Starting from Node.js `14.19.0`, Corepack is included by default with, but is currently opt-in.

To enable it, run

```console
corepack enable
```

### Installing

Install the dependencies by simply running

```console
yarn
```

### Running

To run live development builds, use

```console
yarn dev
```

To create production builds, run

```console
yarn build
```

Then, to run each production build, use

```console
yarn start
```

Add `--host` at the end to make the game visible on your network.

### Configuration

Optionally, if you want some additional configuration, There is a file named
[`.env.defaults`](.env.defaults), and it's values will be used unless overridden by a new `.env`
file, or by setting environmental variables.

Copy and rename [`.env.defaults`](.env.defaults) to `.env`, and modify the contents to fit your
needs.

_Keep in mind_, you have to rebuild the client and restart the server every time you change your
configuration.

## Testing

### End to End

As a [prerequisite](#prerequisites) to run the E2E tests, you need a MongoDB server running as well.

[Configuration](#configuration) for test-only environments can be configured on
[`.env.e2e`](`.env.e2e`). All it's values will fallback to `.env`, then to
[`.env.defaults`](.env.defaults), if present.

To run test on your console, use

```console
yarn test:run
```

Alternatively, if you want to have the test environment open interactively, so you can select the
test you want to run in a UI, use

```console
yarn test:open
```
## Ideas and wishes

### In-game world editor

A world editor which is available to every player and with which players can submit suggestions for changes to the world. Those suggested changes will be vetted and approved by a team of moderators.
Instead of building separate admin tools for this, we would like to have it as an integral part of the gameplay.

## General notes

While it should be possible to build and run this project on Windows,
this is not actively maintained at the moment and is a lower priority.
If you have any info about this, feel free to share it.

## License info

This project is distributed under the
**[Mozilla Public License Version 2.0](https://choosealicense.com/licenses/mpl-2.0/)**. See
[`LICENSE`][license] for more information.

[license]: LICENSE 'Project License'
[issues]: https://github.com/FVANtom/Kaetram-Open/issues 'Open Issues'
[discord]: https://discord.gg/E8M5gPC 'Join Discord of TerraNovita'
[discord]: https://discord.gg/MmbGAaw 'Join Discord of Kaetram'
