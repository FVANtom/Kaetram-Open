import path from 'node:path';

import { description, name } from '../../package.json';
import config, { type Config } from '../common/config';

import { defineConfig } from 'vite';
import ViteLegacy from '@vitejs/plugin-legacy';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { VitePWA } from 'vite-plugin-pwa';
import { internalIpV4 } from 'internal-ip';
import { viteStaticCopy } from 'vite-plugin-static-copy';

let expose = ['name', 'host', 'ssl', 'serverId'] as const;

interface ExposedConfig extends Pick<Config, typeof expose[number]> {
    debug: boolean;
    version: string;
    minor: string;
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
            minor,
            clientRemoteHost,
            clientRemotePort,
            hubEnabled,
            hubHost,
            hubPort,
            host,
            port,
            ssl
        } = config;

    for (let key of expose) env[key] = config[key] as never;

    let clientHost = clientRemoteHost || (hubEnabled ? hubHost : host),
        clientPort = clientRemotePort || (hubEnabled ? hubPort : port),
        hub = ssl ? `https://${clientHost}` : `http://${clientHost}:${clientPort}`;

    return Object.assign(env, {
        debug: !isProduction,
        version: gver,
        minor,
        host: clientHost,
        port: clientPort,
        hub: hubEnabled && hub
    });
}

export default defineConfig(async ({ mode }) => {
    let isProduction = mode === 'production',
        env = loadEnv(isProduction),
        ipv4 = await internalIpV4();

    return {
        appType: 'mpa',
        plugins: [
            VitePWA({
                registerType: 'autoUpdate',
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
            ViteLegacy(),
            ViteMinifyPlugin({ processScripts: ['application/ld+json'] }),
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
                        src: './extensions/sot/public/img/2/*.*',
                        dest: './img/2'
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
            chunkSizeWarningLimit: 4e3,
            rollupOptions: {
                input: {
                    index: path.resolve(__dirname, 'index.html'),
                    privacy: path.resolve(__dirname, 'privacy.html')
                }
            }
        },
        server: {
            host: '0.0.0.0',
            port: 9000,
            strictPort: true,
            hmr: {
                protocol: 'ws',
                host: ipv4!,
                port: 5183
            },
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
