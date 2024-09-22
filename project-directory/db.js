const postgres = require('postgres');
require('dotenv').config();

// Configuration de la connexion PostgreSQL
const sql = postgres({
    host: process.env.PGHOST,
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: { rejectUnauthorized: false },  // Si SSL est utilisé
    connection: {
        options: `project=${process.env.ENDPOINT_ID}` // Option spécifique pour Neon
    }
});

// Fonction générique pour sauvegarder des données dans n'importe quelle table
async function saveToDB(tableName, data) {
    for (const item of data) {
        try {
            await sql`
                INSERT INTO ${sql(tableName)} 
                ${sql(item)}
            `;
        } catch (error) {
            console.error(`Erreur lors de l'insertion des données dans la table ${tableName} :`, error);
        }
    }
}

module.exports = { sql, saveToDB };  // Exporter la fonction et la connexion
