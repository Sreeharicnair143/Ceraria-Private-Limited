const fs = require('fs');
const path = require('path');

const portalPath = path.join(__dirname, 'public', 'management-portal-v9-x72.html');
let content = fs.readFileSync(portalPath, 'utf8');

let changes = 0;

// Fix 1: fetchAllProducts() — replace plain fetch(url) with secureFetch(url)
// Line 931: "const res = await fetch(url);"
const oldFetchAll = `const res = await fetch(url);
        const json = await res.json();
        if (json.success) {
          allProductsData = json.data;
          renderTable(json.data);
          document.getElementById('product-count-label').textContent = \`\${json.data.length} Products\`;
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    }`;

const newFetchAll = `const res = await secureFetch(url);
        const json = await res.json();
        if (json.success) {
          allProductsData = json.data;
          renderTable(json.data);
          document.getElementById('product-count-label').textContent = \`\${json.data.length} Products\`;
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    }`;

if (content.includes(oldFetchAll)) {
  content = content.replace(oldFetchAll, newFetchAll);
  changes++;
  console.log('✅ Fix 1: fetchAllProducts() now uses secureFetch()');
} else {
  // Try with \r\n line endings
  const oldCRLF = oldFetchAll.replace(/\n/g, '\r\n');
  if (content.includes(oldCRLF)) {
    content = content.replace(oldCRLF, newFetchAll.replace(/\n/g, '\r\n'));
    changes++;
    console.log('✅ Fix 1: fetchAllProducts() now uses secureFetch() (CRLF)');
  } else {
    console.log('⚠️  Fix 1: Could not find fetchAllProducts plain fetch block');
  }
}

// Fix 2: Product form submission — replace plain fetch(url, {...}) with secureFetch(url, {...})
// Line 1105: "const res = await fetch(url, {"
const oldFormFetch = `const res = await fetch(url, {
            method: method,
            body: formData,
          });`;

const newFormFetch = `const res = await secureFetch(url, {
            method: method,
            body: formData,
          });`;

if (content.includes(oldFormFetch)) {
  content = content.replace(oldFormFetch, newFormFetch);
  changes++;
  console.log('✅ Fix 2: Product form submission now uses secureFetch()');
} else {
  const oldCRLF2 = oldFormFetch.replace(/\n/g, '\r\n');
  if (content.includes(oldCRLF2)) {
    content = content.replace(oldCRLF2, newFormFetch.replace(/\n/g, '\r\n'));
    changes++;
    console.log('✅ Fix 2: Product form submission now uses secureFetch() (CRLF)');
  } else {
    console.log('⚠️  Fix 2: Could not find product form plain fetch block');
  }
}

fs.writeFileSync(portalPath, content, 'utf8');
console.log(`\n🛡️  Frontend patched: ${changes} fix(es) applied.`);
