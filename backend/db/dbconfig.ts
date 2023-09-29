import * as dotenv from 'dotenv';
dotenv.config();

export default () => {
    console.log(process.env.DB_TYPE, process.env.DB_USERNAME, process.env.DB_TYPE);
    return {
        type: process.env.DB_TYPE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        entities: [process.env.DB_ENTITIES],
        migrations: [process.env.DB_MIGRATION]
    };
}