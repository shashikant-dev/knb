import mysql from 'mysql2/promise';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'knb_group';

async function migrateContacts() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      charset: 'utf8mb4'
    });

    console.log('Connected to database. Starting migration...');

    // Add missing columns if they don't exist
    const alterQueries = [
      'ALTER TABLE contacts ADD COLUMN IF NOT EXISTS mobile VARCHAR(50)',
      'ALTER TABLE contacts ADD COLUMN IF NOT EXISTS service VARCHAR(100) DEFAULT "general"',
      'ALTER TABLE contacts ADD COLUMN IF NOT EXISTS subject VARCHAR(255) DEFAULT "Contact Inquiry"',
      'ALTER TABLE contacts ADD COLUMN IF NOT EXISTS status ENUM("new", "in-progress", "resolved") DEFAULT "new"'
    ];

    for (const query of alterQueries) {
      try {
        await connection.execute(query);
        console.log('Executed:', query);
      } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
          console.log('Column already exists, skipping:', query);
        } else {
          console.error('Error executing query:', query, error.message);
        }
      }
    }

    // Update existing records to have default values
    await connection.execute(`
      UPDATE contacts 
      SET 
        service = COALESCE(service, 'general'),
        subject = COALESCE(subject, 'Contact Inquiry'),
        status = COALESCE(status, 'new')
      WHERE service IS NULL OR subject IS NULL OR status IS NULL
    `);

    console.log('Migration completed successfully!');
    
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateContacts().catch(console.error);
}

export default migrateContacts;