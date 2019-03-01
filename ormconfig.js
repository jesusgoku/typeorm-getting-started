const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: isDev,
  synchronize: isDev,
  entities: [__dirname + '/src/entity/*.ts'],
  migrations: [__dirname + '/src/migration/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
};
