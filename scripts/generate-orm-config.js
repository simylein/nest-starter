const dotenv = require('dotenv');
const fs = require('fs');
const rimraf = require('rimraf');

dotenv.config({
	path: '.env',
});

rimraf('ormconfig.json', () => {
	const ormConfig = {
		type: process.env.DATABASE_TYPE,
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		entities: ['src/**/*.entity.{ts,js}'],
		migrations: ['src/migration/*.ts'],
		cli: {
			migrationsDir: 'src/migration',
		},
	};

	fs.writeFileSync('ormconfig.json', JSON.stringify(ormConfig));
});
