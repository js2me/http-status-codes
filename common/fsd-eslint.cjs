/* eslint-disable @typescript-eslint/no-var-requires,@typescript-eslint/no-unused-vars */
const { layersLib } = require('@feature-sliced/eslint-config/utils');

const FS_LAYERS = [
  'app',
  'processes',
  'pages',
  'widgets',
  'features',
  'entities',
  'shared',
];

const FS_SEGMENTS = ['ui', 'model', 'lib', 'api', 'config', 'assets', 'util'];

const getLowerLayers = (layer) => FS_LAYERS.slice(FS_LAYERS.indexOf(layer) + 1);
const getUpperLayers = (layer) => FS_LAYERS.slice(0, FS_LAYERS.indexOf(layer));

const FS_SLICED_LAYERS_REG = getUpperLayers('shared').join('|');
const FS_SEGMENTS_REG = [
  'types',
  'types.*',
  ...FS_SEGMENTS,
  ...FS_SEGMENTS.map((seg) => `${seg}.*`),
].join('|');

const getNotSharedLayersRules = () =>
  layersLib.getUpperLayers('shared').map((layer) => ({
    from: layer,
    allow: layersLib.getLowerLayers(layer),
  }));

const sharedLayerRule = {
  from: 'shared',
  allow: 'shared',
};

const getLayersBoundariesElements = () =>
  layersLib.FS_LAYERS.map((layer) => ({
    type: layer,
    pattern: `${layer}/!(_*){,/*}`,
    mode: 'folder',
    capture: ['slices'],
  }));

const getGodModeRules = () =>
  layersLib.FS_LAYERS.map((layer) => ({
    from: `gm_${layer}`,
    allow: [layer, ...layersLib.getLowerLayers(layer)],
  }));

const getGodModeElements = () =>
  layersLib.FS_LAYERS.map((layer) => ({
    type: `gm_${layer}`,
    pattern: `${layer}/_*`,
    mode: 'folder',
    capture: ['slices'],
  }));

module.exports = {
  eslint: {
    plugins: ['import', 'boundaries'],
    extends: ['plugin:boundaries/recommended'],
    settings: {
      'boundaries/elements': [
        ...getLayersBoundariesElements(),
        // ...getGodModeElements(),
      ],
    },
    rules: {
      'boundaries/element-types': [
        2,
        {
          default: 'disallow',
          message:
            '"${file.type}" is not allowed to import "${dependency.type}" | See rules: https://feature-sliced.design/docs/reference/layers/overview ',
          rules: [...getNotSharedLayersRules(), sharedLayerRule],
        },
      ],
      'import/no-internal-modules': [
        'error',
        {
          allow: [
            /**
             * Allow not segments import from slices
             * @example
             * 'entities/form/ui' // Fail
             * 'entities/form' // Pass
             */
            `**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})`,

            /**
             * Allow slices with structure grouping
             * @example
             * 'features/auth/form' // Pass
             */
            `**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

            /**
             * Allow not segments import in shared segments
             * @example
             * 'shared/ui/button' // Pass
             */
            `**/*shared/*(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

            /**
             * Allow import from segments in shared
             * @example
             * 'shared/ui' // Pass
             */
            `**/*shared/*(${FS_SEGMENTS_REG})`,
            /**
             * Allow all import in shared/lib
             */
            `**/*shared/lib/**/*`,

            /** allow global modules */
            `**/node_modules/**`,

            /**
             * allow custom shared segments with _prefix
             */
            `**/*shared/_*`,
            `**/*shared/_*/*`,

            /**
             *  Used for allow import local modules
             * @example
             * './model/something' // Pass
             */
            `./**`,
          ],
        },
      ],
      'import/order': [
        2,
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: FS_LAYERS.map((layer) => ({
            pattern: `**/?(*)${layer}{,/**}`,
            group: 'internal',
            position: 'after',
          })),
          pathGroupsExcludedImportTypes: ['builtin'],
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
        },
      ],
    },
  },
};
