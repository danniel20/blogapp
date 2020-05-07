const path = require('path')
const { Seeder } = require('mongo-seeding')

const config = {
  database: {
    name: 'blogapp',
  },
  dropDatabase: true
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(
  path.resolve('./src/seeds'),
  {
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
  },
);

seeder
  .import(collections)
  .then(() => {
    console.log('Seeds OK!');
  })
  .catch(err => {
    console.log('Erro ao executar seeds!', err)
  });
