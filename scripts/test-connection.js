import dbConnect from '../lib/mysql.js';
import { config } from 'dotenv';

config({ path: '.env.local' });

async function testConnection() {
  try {
    console.log('Testing MySQL connection...');
    const connection = await dbConnect();
    console.log('✅ MySQL connection successful!');
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Query test successful:', rows[0]);
    
    await connection.end();
    console.log('✅ Connection closed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();