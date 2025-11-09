import dbConnect from '../lib/mysql.js';

async function testDeleteFunctionality() {
  console.log('Testing delete functionality...');
  
  try {
    const connection = await dbConnect();
    console.log('✓ Database connection successful');
    
    // Test if we can perform a simple SELECT
    const [selectResult] = await connection.execute('SELECT COUNT(*) as count FROM properties');
    console.log(`✓ Properties count: ${selectResult[0].count}`);
    
    // Test if we can perform a DELETE with a non-existent ID (should not affect any rows)
    const [deleteResult] = await connection.execute('DELETE FROM properties WHERE id = ?', [999999]);
    console.log(`✓ Delete test result - affected rows: ${deleteResult.affectedRows}`);
    
    // Check if the connection supports transactions
    await connection.beginTransaction();
    console.log('✓ Transaction support available');
    await connection.rollback();
    console.log('✓ Transaction rollback successful');
    
    console.log('All tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState
    });
  }
}

testDeleteFunctionality();