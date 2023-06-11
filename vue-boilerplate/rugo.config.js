export default {
  space: {
    id: '648485885816cbcba8a4cbdd',
    assets: [
      { name: 'statics', type: 'static', mount: '/' },
      { name: 'views', type: 'view', mount: '/' },
      {
        name: 'todos',
        type: 'db',
        properties: {
          todo: { type: 'String' },
        },
      },
    ],
  },
};
