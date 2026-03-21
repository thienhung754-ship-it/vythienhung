const fs = require('fs');
const path = require('path');

const bookDir = path.join(__dirname);
const files = [
  '00-bia-sach.md',
  'phan-1-nhap-mon.md',
  'phan-2-chuan-bi.md',
  'phan-3-thuc-hanh.md',
  'phan-4-5-nang-cao.md',
  'phu-luc.md'
];

function mdToHtml(md) {
  let html = md;
  html = html.replace(/```[\w]*\n([\s\S]*?)```/g, '<pre style="background:#1e1e2e;color:#cdd6f4;padding:16px;border-radius:8px;font-family:Consolas,monospace;font-size:9pt;line-height:1.5;white-space:pre-wrap;margin:12px 0;">$1</pre>');
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  html = html.replace(/\*(.+?)\*/g, '<i>$1</i>');
  html = html.replace(/`([^`\n]+)`/g, '<code style="background:#f0f0f0;padding:2px 5px;border-radius:3px;font-family:Consolas;">$1</code>');
  html = html.replace(/!\[([^\]]*)\]\([^)]+\)/g, '<p style="text-align:center;padding:16px;background:#f0f4ff;border:2px dashed #6366f1;border-radius:8px;color:#6366f1;margin:16px 0;"><b>📸 $1</b></p>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#6366f1;">$1</a>');
  html = html.replace(/^---+$/gm, '<hr style="border:none;border-top:2px solid #e5e7eb;margin:32px 0;">');
  html = html.replace(/\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/g, (match, header, body) => {
    const th = header.split('|').filter(c=>c.trim()).map(c=>'<th style="border:1px solid #d1d5db;padding:8px 12px;background:#f3f4f6;">'+c.trim()+'</th>').join('');
    const rows = body.trim().split('\n').map(row => {
      const cells = row.split('|').filter(c=>c.trim()).map(c=>'<td style="border:1px solid #d1d5db;padding:8px 12px;">'+c.trim()+'</td>').join('');
      return '<tr>'+cells+'</tr>';
    }).join('');
    return '<table style="border-collapse:collapse;width:100%;margin:12px 0;"><tr>'+th+'</tr>'+rows+'</table>';
  });
  html = html.replace(/^>\s*(.+)$/gm, '<blockquote style="border-left:4px solid #6366f1;padding:10px 16px;margin:12px 0;background:#f8f7ff;">$1</blockquote>');
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
  return html;
}

let all = '';
for (const file of files) {
  const fp = path.join(bookDir, file);
  if (fs.existsSync(fp)) {
    all += fs.readFileSync(fp, 'utf8') + '\n\n<br style="page-break-after:always;">\n\n';
    console.log('Added: ' + file);
  }
}

const body = mdToHtml(all);
const doc = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>Vibe Coding Step By Step</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View></w:WordDocument></xml><![endif]-->
<style>
@page{size:A4;margin:2.5cm}
body{font-family:'Segoe UI',Arial,sans-serif;font-size:11pt;color:#1a1a1a;line-height:1.8}
h1{font-size:22pt;color:#1e1b4b;margin-top:36px;border-bottom:3px solid #6366f1;padding-bottom:8px}
h2{font-size:16pt;color:#312e81;margin-top:28px}
h3{font-size:13pt;color:#4338ca;margin-top:20px}
h4{font-size:11pt;color:#4f46e5;margin-top:16px}
</style></head><body>${body}</body></html>`;

const out = path.join(bookDir, 'Vibe-Coding-Step-By-Step.doc');
fs.writeFileSync(out, doc, 'utf8');
console.log('\\nDONE! File: ' + out);
