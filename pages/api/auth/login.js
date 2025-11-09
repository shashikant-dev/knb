export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'knbgrp@gmail.com';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'N4r!z8VqF7#pL2xM';

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = 'authenticated';

    res.status(200).json({
      success: true,
      token,
      user: { username, role: 'admin' }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
}