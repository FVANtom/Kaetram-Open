import { defineConfig } from 'vite';

import config, { type Config } from '../common/config';

import { VitePWA as pwa } from 'vite-plugin-pwa';
import legacy from '@vitejs/plugin-legacy';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { name, description } from '../../package.json';

let expose = ['name', 'host', 'ssl', 'worldSwitch', 'serverId'] as const;

interface ExposedConfig extends Pick<Config, typeof expose[number]> {
    debug: boolean;
    version: string;
    port: number;
    hub: string | false;
}

declare global {
    interface Window {
        config: ExposedConfig;
    }
}

function loadEnv(isProduction: boolean): ExposedConfig {
    let env = {} as ExposedConfig,
        {
            gver,
            clientRemoteHost,
            clientRemotePort,
            hubEnabled,
            hubHost,
            hubPort,
            host,
            socketioPort,
            ssl,
            worldSwitch
        } = config;

    for (let key of expose) env[key] = config[key] as never;

    let clientHost = clientRemoteHost || (hubEnabled ? hubHost : host),
        clientPort = clientRemotePort || (hubEnabled ? hubPort : socketioPort),
        hub = ssl ? `https://${clientHost}` : `http://${clientHost}:${clientPort}`;

    return Object.assign(env, {
        debug: !isProduction,
        version: gver,
        host: clientHost,
        port: clientPort,
        hub: hubEnabled && hub,
        worldSwitch: hubEnabled && worldSwitch
    });
}

export default defineConfig(({ mode }) => {
    let isProduction = mode === 'production',
        env = loadEnv(isProduction);

    return {
        plugins: [
            pwa({
                registerType: 'autoUpdate',
                includeAssets: '**/*',
                workbox: { cacheId: name },
                manifest: {
                    name: config.name,
                    short_name: config.name,
                    description,
                    display: 'fullscreen',
                    background_color: '#000000',
                    theme_color: '#000000',
                    icons: [144].map((size) => {
                        let sizes = `${size}x${size}`;

                        return {
                            src: `/img/icons/android-chrome-${sizes}.png`,
                            sizes,
                            type: 'image/png',
                            purpose: 'any maskable'
                        };
                    }),
                    screenshots: [
                        {
                            src: 'screenshot.png',
                            sizes: '750x1334',
                            type: 'image/png'
                        }
                    ],
                    categories: ['entertainment', 'games']
                }
            }),
            legacy(),
            createHtmlPlugin({
                minify: isProduction && { processScripts: ['application/ld+json'] }
            }),
            viteStaticCopy({
                targets: [
                    {
                        src: './extensions/sot/public/img/tilesets/*.*',
                        dest: './img/tilesets/'
                    },
                    {
                        src: './extensions/sot/public/img/sprites/*.*',
                        dest: './img/sprites/'
                    },
                    {
                        src: './extensions/sot/public/*.*',
                        dest: '.'
                    },
                    {
                        src: './extensions/sot/public/img/icons',
                        dest: './img'
                    },
                    {
                        src: './extensions/sot/public/img/*.*',
                        dest: './img'
                    },
                    {
                        src: './extensions/sot/public/img/3/*.*',
                        dest: './img/3'
                    }
                ]
            })
        ],
        build: {
            sourcemap: true,
            chunkSizeWarningLimit: 4e3
        },
        server: {
            port: 9000,
            watch: {
                ignored: ['!**/src/**'],
                followSymlinks: true
            }
        },
        define: {
            'window.config': env,
            'process.env': {},
            'import.meta.env': {}
        },
        resolve: {
            preserveSymlinks: true
        }
    };
});
