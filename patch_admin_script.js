const fs = require('fs');

const scriptFile = 'public/admin_script_4.js';
let content = fs.readFileSync(scriptFile, 'utf-8');

const helperFunction = `
function getDropdownValue(id) {
  const select = document.getElementById(id);
  if (!select) return "";
  if (select.value === "other") {
    const otherInput = document.getElementById(id + "-other");
    return otherInput ? otherInput.value : "other";
  }
  return select.value;
}
`;

if (!content.includes('function getDropdownValue')) {
  // Add it before initFormSubmission
  content = content.replace('function initFormSubmission() {', helperFunction + '\nfunction initFormSubmission() {');
}

// Replace the formData.append calls
content = content.replace(/formData\.append\("category", document\.getElementById\("tile-category"\)\.value\);/, 'formData.append("category", getDropdownValue("tile-category"));');
content = content.replace(/formData\.append\("size", document\.getElementById\("tile-size"\)\.value\);/, 'formData.append("size", getDropdownValue("tile-size"));');

// Thickness is multi-line
content = content.replace(
/formData\.append\(\s*"thickness",\s*document\.getElementById\("tile-thickness"\)\.value\s*\|\|\s*"",\s*\);/,
'formData.append("thickness", getDropdownValue("tile-thickness"));'
);

// Finish is multi-line
content = content.replace(
/formData\.append\(\s*"finish",\s*document\.getElementById\("tile-finish"\)\.value\s*\|\|\s*"",\s*\);/,
'formData.append("finish", getDropdownValue("tile-finish"));'
);

// Color
content = content.replace(
/formData\.append\("color", document\.getElementById\("tile-color"\)\.value \|\| ""\);/,
'formData.append("color", getDropdownValue("tile-color"));'
);

// Surface texture multi-line
content = content.replace(
/formData\.append\(\s*"surface_texture",\s*document\.getElementById\("tile-texture"\)\.value\s*\|\|\s*"",\s*\);/,
'formData.append("surface_texture", getDropdownValue("tile-texture"));'
);

// Handle edit mode correctly
// In editProduct(id), it sets the values of the fields:
// document.getElementById("tile-category").value = p.category;
// If the value isn't in the options, it won't be set correctly. We need to handle that.
// Let's add a helper function for setting values
const setHelper = `
function setDropdownValue(id, value) {
  const select = document.getElementById(id);
  if (!select) return;
  
  // check if value exists in options
  let found = false;
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].value === value) {
      found = true;
      break;
    }
  }
  
  if (found) {
    select.value = value;
    if(typeof toggleOther === 'function') toggleOther(select); // hide 'other'
  } else if (value) {
    select.value = 'other';
    if(typeof toggleOther === 'function') toggleOther(select);
    const otherInput = document.getElementById(id + '-other');
    if (otherInput) otherInput.value = value;
  } else {
    select.value = '';
    if(typeof toggleOther === 'function') toggleOther(select);
  }
}
`;

if (!content.includes('function setDropdownValue')) {
  content = content.replace('async function editProduct(id) {', setHelper + '\nasync function editProduct(id) {');
}

// Replace the setting logic inside editProduct
content = content.replace(/document\.getElementById\("tile-category"\)\.value = p\.category;/, 'setDropdownValue("tile-category", p.category);');
content = content.replace(/document\.getElementById\("tile-size"\)\.value = p\.size;/, 'setDropdownValue("tile-size", p.size);');
content = content.replace(/document\.getElementById\("tile-thickness"\)\.value = p\.thickness \|\| "";/, 'setDropdownValue("tile-thickness", p.thickness || "");');
content = content.replace(/document\.getElementById\("tile-finish"\)\.value = p\.finish \|\| "";/, 'setDropdownValue("tile-finish", p.finish || "");');
content = content.replace(/document\.getElementById\("tile-color"\)\.value = p\.color \|\| "";/, 'setDropdownValue("tile-color", p.color || "");');
content = content.replace(/document\.getElementById\("tile-texture"\)\.value = p\.surface_texture \|\| "";/, 'setDropdownValue("tile-texture", p.surface_texture || "");');


fs.writeFileSync(scriptFile, content, 'utf-8');
console.log('Patched admin_script_4.js');
