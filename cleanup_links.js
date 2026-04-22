const fs = require('fs');
const path = require('path');

const targetDirs = ['app', 'components', 'model'];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

targetDirs.forEach(dir => {
  const fullPath = path.resolve(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    const files = walk(fullPath);
    files.forEach(file => {
      let content = fs.readFileSync(file, 'utf8');
      let originalContent = content;
      
      content = content.replace(/(-skm-physiotherapy)+/g, '-skm-physiotherapy');
      content = content.replace(/(-physiotherapy)+/g, '-physiotherapy');
      
      if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Cleaned up ${file}`);
      }
    });
  }
});
