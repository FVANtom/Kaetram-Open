import { build } from 'esbuild';

import { nodeExternalsPlugin } from 'esbuild-node-externals';

build({
    entryPoints: ['src/main.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    minify: true,
    platform: 'node',
    format: 'esm',
    target: 'ESNext',
    sourcemap: true,
    plugins: [
        nodeExternalsPlugin({
            allowList: ['@kaetram/common']
        })
    ]
});
