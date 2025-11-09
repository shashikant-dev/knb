import mysql from 'mysql2/promise';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'knb_group';

async function fixContactsTable() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      charset: 'utf8mb4'
    });

    // Get current table structure
    const [columns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'contacts'
    `, [DB_NAME]);

    const existingColumns = columns.map(col => col.COLUMN_NAME);
    console.log('Existing columns:', existingColumns);

    // Add missing columns
    const requiredColumns = [
      { name: 'mobile', definition: 'VARCHAR(50) AFTER email' },
      { name: 'phone', definition: 'VARCHAR(50) AFTER mobile' },
      { name: 'service', definition: 'VARCHAR(100) DEFAULT \'general\' AFTER phone' },
      { name: 'subject', definition: 'VARCHAR(255) DEFAULT \'Contact Inquiry\' AFTER service' },
      { name: 'status', definition: 'ENUM(\'new\', \'in-progress\', \'resolved\') DEFAULT \'new\' AFTER message' }
    ];

    for (const column of requiredColumns) {
      if (!existingColumns.includes(column.name)) {
        await connection.execute(`ALTER TABLE contacts ADD COLUMN ${column.name} ${column.definition}`);
        console.log(`Added column: ${column.name}`);
      } else {
        console.log(`Column ${column.name} already exists`);
      }
    }
    
  } catch (error) {
    console.error('Error fixing contacts table:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fixContactsTable().catch(console.error);