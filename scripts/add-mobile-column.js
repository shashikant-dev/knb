import mysql from 'mysql2/promise';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'knb_group';

async function addMobileColumn() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      charset: 'utf8mb4'
    });

    // Check if mobile column exists
    const [columns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'contacts' AND COLUMN_NAME = 'mobile'
    `, [DB_NAME]);

    if (columns.length === 0) {
      // Add mobile column if it doesn't exist
      await connection.execute(`
        ALTER TABLE contacts 
        ADD COLUMN mobile VARCHAR(50) AFTER email
      `);
      console.log('Mobile column added successfully!');
    } else {
      console.log('Mobile column already exists.');
    }
    
  } catch (error) {
    console.error('Error adding mobile column:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addMobileColumn().catch(console.error);