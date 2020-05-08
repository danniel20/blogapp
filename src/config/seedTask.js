const path = require('path')
const { Seeder } = require('mongo-seeding')

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env

const connectionString =  process.env.NODE_ENV == 'production' ?
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin` :
  `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

const config = {
  database: connectionString,
  dropDatabase: true
}
const seeder = new Seeder(config)
const collections = seeder.readCollectionsFromPath(
  path.resolve('./src/seeds'),
  {
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
  },
)

seeder
  .import(collections)
  .then(() => {
    console.log('Seeds OK!');
  })
  .catch(err => {
    console.log('Erro ao executar seeds!', err)
  })
