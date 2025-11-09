import mysql from 'mysql2/promise';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'knb_group';

async function migrateProd() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      charset: 'utf8mb4'
    });

    console.log('Connected to production database');

    // Check if mobile column exists in contacts table
    const [mobileColumns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'contacts' AND COLUMN_NAME = 'mobile'
    `, [DB_NAME]);

    if (mobileColumns.length === 0) {
      await connection.execute(`
        ALTER TABLE contacts 
        ADD COLUMN mobile VARCHAR(50) AFTER email
      `);
      console.log('✓ Added mobile column to contacts table');
    } else {
      console.log('✓ Mobile column already exists');
    }

    // Get all existing columns
    const [existingColumns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'contacts'
    `, [DB_NAME]);
    
    const columnNames = existingColumns.map(col => col.COLUMN_NAME);
    
    // Add missing columns
    const requiredColumns = [
      { name: 'service', type: 'VARCHAR(255)', after: 'mobile' },
      { name: 'subject', type: 'VARCHAR(255)', after: 'service' },
      { name: 'phone', type: 'VARCHAR(50)', after: 'mobile' },
      { name: 'status', type: 'VARCHAR(50) DEFAULT "new"', after: 'message' }
    ];
    
    for (const col of requiredColumns) {
      if (!columnNames.includes(col.name)) {
        await connection.execute(`
          ALTER TABLE contacts 
          ADD COLUMN ${col.name} ${col.type} AFTER ${col.after}
        `);
        console.log(`✓ Added ${col.name} column to contacts table`);
      } else {
        console.log(`✓ ${col.name} column already exists`);
      }
    }
    
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

migrateProd().catch(console.error);