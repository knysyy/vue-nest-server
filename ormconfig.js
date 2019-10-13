const dotenv = require('dotenv');
const fs = require('fs');

const config = dotenv.parse(fs.readFileSync('development.env'));
module.exports = {
  name: 'default',
  type: config['TYPEORM_CONNECTION'],
  host: config['TYPEORM_HOST'],
  port: parseInt(config['TYPEORM_PORT'], 10),
  username: config['TYPEORM_USERNAME'],
  password: config['TYPEORM_PASSWORD'],
  database: config['TYPEORM_DATABASE'],
  entities: [config['TYPEORM_ENTITIES'].split(',')[1]],
  migrations: [config['TYPEORM_MIGRATIONS']],
  subscribers: [config['TYPEORM_SUBSCRIBERS']],
  seeds: [config['TYPEORM_SEEDS']],
  factories: [config['TYPEORM_FACTORIES']],
  cli: {
    entitiesDir: config['TYPEORM_ENTITIES_DIR'],
    migrationsDir: config['TYPEORM_MIGRATIONS_DIR'],
    subscribersDir: config['TYPEORM_SUBSCRIBERS_DIR'],
  },
};
