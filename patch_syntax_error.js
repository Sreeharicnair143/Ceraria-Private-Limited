const fs = require('fs');
const path = require('path');

const serverPath = path.join(__dirname, 'server.js');
let content = fs.readFileSync(serverPath, 'utf8');

const targetContent1 = `  } catch (err) {
    console.error('POST /api/admin/login error:', err);
    res.status(500).json({ success: false, error: 'Login failed' });
// ── POST /api/admin/register ───────────────────────────────`;

const replacementContent1 = `  } catch (err) {
    console.error('POST /api/admin/login error:', err);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// ── POST /api/admin/register ───────────────────────────────`;

// Handle CRLF
const targetCRLF = targetContent1.replace(/\n/g, '\r\n');
const replacementCRLF = replacementContent1.replace(/\n/g, '\r\n');

if (content.includes(targetCRLF)) {
  content = content.replace(targetCRLF, replacementCRLF);
  fs.writeFileSync(serverPath, content, 'utf8');
  console.log('✅ Fixed missing closing bracket in server.js (CRLF)');
} else if (content.includes(targetContent1)) {
  content = content.replace(targetContent1, replacementContent1);
  fs.writeFileSync(serverPath, content, 'utf8');
  console.log('✅ Fixed missing closing bracket in server.js (LF)');
} else {
  console.log('⚠️ Could not find target text in server.js');
}
