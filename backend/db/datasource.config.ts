import { DataSource, DataSourceOptions } from "typeorm";
import dbconfig from "./dbconfig"

const data = dbconfig()
export const dataSourceOptions: DataSourceOptions = {
      type: "postgres",
      username: data.username,
      password: String(data.password),
      host: data.host,
      port: parseInt(data.port),
      database: data.database,
      entities: data.entities,
      migrations: data.migrations  
    }

const datasource = new DataSource(dataSourceOptions)

export default datasource