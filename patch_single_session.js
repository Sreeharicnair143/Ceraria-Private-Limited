const fs = require('fs');
const path = require('path');

const serverPath = path.join(__dirname, 'server.js');
let content = fs.readFileSync(serverPath, 'utf8');

// 1. Update verifySecureAccess
const oldVerify = `// 🛡️ JWT Verification Middleware
const verifySecureAccess = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer <token>

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access denied: Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Access denied: Invalid token' });
    }
    req.user = user;
    next();
  });
};`;

const newVerify = `// 🛡️ JWT Verification Middleware
const verifySecureAccess = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer <token>

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access denied: Token missing' });
  }

  try {
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
  }
};`;

if (content.includes(oldVerify)) {
  content = content.replace(oldVerify, newVerify);
} else {
  content = content.replace(oldVerify.replace(/\n/g, '\r\n'), newVerify.replace(/\n/g, '\r\n'));
}

// 2. Update login route
const oldLoginToken = `    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: 'system_admin' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({`;

const newLoginToken = `    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: 'system_admin' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Save token to database to enforce single session
    try {
      await pool.query('UPDATE admins SET last_login_token = $1 WHERE id = $2', [token, admin.id]);
    } catch(e) {
      // Ignore if column doesn't exist yet during migration
      console.error('Migration note: last_login_token column not found in admins table');
    }

    res.json({`;

if (content.includes(oldLoginToken)) {
  content = content.replace(oldLoginToken, newLoginToken);
} else {
  content = content.replace(oldLoginToken.replace(/\n/g, '\r\n'), newLoginToken.replace(/\n/g, '\r\n'));
}

fs.writeFileSync(serverPath, content, 'utf8');
console.log('✅ Applied single-session logic to server.js');
