import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import inject from '@rollup/plugin-inject';

export default {
    input: 'Prefabs/Weapon/build.ts',
    output: [
        {
            file: `Prefabs/Weapon/dist/prefab.js`,
            format: 'cjs',
            sourcemap: true,
        }
    ],
    plugins: [
        resolve({
            moduleDirectories: ['E:/mw/launcher/online/WindowsNoEditor/MW/Saved/MetaWorld/Projects/Odin_Learn/node_modules/@types']
        }),
        commonjs(),
        inject({
             Common: 'Common',
            cpp: 'cpp',
            DataStorage: 'DataStorage',
            Debug: 'Debug',
            Events: 'Events',
            GamePlay: 'GamePlay',
            Global: 'Global',
            GoogleAnalytics: 'GoogleAnalytics',
            MathLibrary: 'MathLibrary',
            MWCore: 'MWCore',
            MWDesignerUI: 'MWDesignerUI',
            MWGameUI: 'MWGameUI',
            MWMGS: 'MWMGS',
            MWMobileEditor: 'MWMobileEditor',
            MWTSMessageChannel: 'MWTSMessageChannel',
            Type: 'Type',
        }),
        typescript({
            sourceMap: true,
        })
    ],
    external: [ 'react', 'ue', 'puerts',  'Common', 'cpp', 'DataStorage', 'Debug', 'Events', 'GamePlay', 'Global', 'GoogleAnalytics', 'MathLibrary', 'MWCore', 'MWDesignerUI', 'MWGameUI', 'MWMGS', 'MWMobileEditor', 'MWTSMessageChannel', 'Type', ], 
    onwarn(warning) { 
     
        if (['TS2304'].includes(warning.pluginCode)) { 
           console.log(warning.message.replace('@rollup/plugin-typescript', 'error')); 
           console.log(`${warning.loc.file} (${warning.loc.line}:${warning.loc.column})`); 
           console.log(warning.frame.replace('\r\n', '')); 
        } 
    } 
};

