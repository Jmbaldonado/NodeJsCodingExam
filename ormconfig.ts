const ORMConfig = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'booking-management',
  port: parseInt('5432'),
  synchronize: false,
  logging: process.env.DB_LOGGING_FLAG === 'enabled',
  migrations: ['dist/src/data/migrations/*.js'],
  entities: ['dist/src/data/entities/*.js'],
  cli: {
    migrationsDir: 'src/data/migrations',
  },
};

module.exports = ORMConfig;
