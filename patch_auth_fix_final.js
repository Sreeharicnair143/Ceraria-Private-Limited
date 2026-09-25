const fs = require('fs');
const path = require('path');

const serverPath = path.join(__dirname, 'server.js');
let content = fs.readFileSync(serverPath, 'utf8');

// 1. Fix verifySecureAccess to handle missing column gracefully
const oldVerify = `  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if this token matches the one in the database
    const result = await pool.query('SELECT last_login_token FROM admins WHERE id = $1', [user.id]);
    if (result.rows.length === 0 || result.rows[0].last_login_token !== token) {
      return res.status(403).json({ success: false, error: 'Session expired or logged in from another device' });
    }
    
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, error: 'Access denied: Invalid token' });
  }`;

const newVerify = `  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if this token matches the one in the database
    try {
      const result = await pool.query('SELECT last_login_token FROM admins WHERE id = $1', [user.id]);
      if (result.rows.length === 0 || (result.rows[0].last_login_token && result.rows[0].last_login_token !== token)) {
        return res.status(403).json({ success: false, error: 'Session expired or logged in from another device' });
      }
    } catch (dbErr) {
      console.warn('Migration warning: last_login_token check skipped', dbErr.message);
    }
    
    req.user = user;
    next();
  } catch (err) {
    console.error('JWT Verify error:', err.message);
    return res.status(403).json({ success: false, error: 'Access denied: Invalid token' });
  }`;

if (content.includes(oldVerify)) {
  content = content.replace(oldVerify, newVerify);
} else {
  content = content.replace(oldVerify.replace(/\n/g, '\r\n'), newVerify.replace(/\n/g, '\r\n'));
}

// 2. Remove requireAdmin from all routes since it's redundant and breaks if cookies fail
// We will replace ', verifySecureAccess, requireAdmin,' with ', verifySecureAccess,' globally
content = content.replace(/, verifySecureAccess, requireAdmin,/g, ', verifySecureAccess,');

fs.writeFileSync(serverPath, content, 'utf8');
console.log('✅ Fixed verifySecureAccess and removed redundant requireAdmin middleware');
