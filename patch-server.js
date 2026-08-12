const fs = require('fs');
let serverJS = fs.readFileSync('server.js', 'utf8');

const endpoints = `
// ==========================================
// CATALOGUE ENDPOINTS
// ==========================================

// GET all catalogues
app.get('/api/catalogues', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM catalogues ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new catalogue
app.post('/api/catalogues', requireAdmin, upload.single('pdf_url'), async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    let pdf_url = null;
    if (req.file) {
      pdf_url = '/uploads/' + req.file.filename;
    } else {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const result = await pool.query(
      'INSERT INTO catalogues (title, pdf_url) VALUES ($1, $2) RETURNING *',
      [title, pdf_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a catalogue
app.delete('/api/catalogues/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM catalogues WHERE id = $1', [id]);
    res.json({ message: 'Catalogue deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
`;

if (!serverJS.includes('/api/catalogues')) {
  serverJS = serverJS.replace('app.listen(port', endpoints + '\napp.listen(port');
  fs.writeFileSync('server.js', serverJS);
  console.log('server.js patched with catalogue endpoints');
} else {
  console.log('server.js already has catalogue endpoints');
}
