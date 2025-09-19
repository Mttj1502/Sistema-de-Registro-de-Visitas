import mysql from "mysql2/promise";

export async function getConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "securiti_visitas"
  });
}
