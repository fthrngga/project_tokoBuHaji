const fs = require('fs');
const file = 'resources/js/pages/Customer/Profile.tsx';
let content = fs.readFileSync(file, 'utf8');

// Container & Borders
content = content.replace(/className=\"bg-card p-5 md:p-6 rounded-2xl border border-border\/20/g, 'className=\"bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm');
content = content.replace(/className=\"bg-card p-6 md:p-8 rounded-2xl border border-border\/20\"/g, 'className=\"bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm\"');
content = content.replace(/className=\{\`bg-card rounded-xl p-5 flex flex-col gap-3 \$\{address\.is_primary \? \'border border-\\[\#FE5F55\\]\' \: \'border border-border\\/20\'\}\`\}/g, 'className={`bg-white shadow-sm rounded-xl p-5 flex flex-col gap-3 ${address.is_primary ? \\'border-2 border-[#FE5F55]\\' : \\'border border-slate-200\\'}`}');

// Text Colors
content = content.replace(/text-foreground/g, 'text-[#1A3C6D]');
content = content.replace(/text-muted-foreground\/60/g, 'text-slate-500');
content = content.replace(/text-muted-foreground\/80/g, 'text-slate-600');
content = content.replace(/text-muted-foreground/g, 'text-slate-600');

// Modal Styles
content = content.replace(/style=\{\{ background: \"#0d1f33\", borderColor: \"rgba\(87,115,153,0\.3\)\", color: \"white\" \}\}/g, 'style={{ background: "#ffffff", borderColor: "#e2e8f0", color: "#0f172a" }}');
content = content.replace(/<DialogTitle style=\{\{ color: \"white\" \}\}>/g, '<DialogTitle style={{ color: "#1A3C6D" }}>');
content = content.replace(/<DialogDescription style=\{\{ color: \"rgba\(189,213,234,0\.6\)\" \}\}>/g, '<DialogDescription style={{ color: "#64748b" }}>');

// Input and Label inline styles
content = content.replace(/style=\{\{ color: \"#BDD5EA\" \}\}/g, 'style={{ color: "#1A3C6D", fontWeight: 600 }}');
content = content.replace(/style=\{\{ background: \"rgba\(8,15,26,0\.6\)\", border: \"1px solid rgba\(87,115,153,0\.3\)\", color: \"white\" \}\}/g, 'style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#0f172a" }}');

// Select input dynamic styles
content = content.replace(/color: addressData\.province \? \"white\" \: \"rgba\(189,213,234,0\.5\)\"/g, 'color: addressData.province ? "#0f172a" : "#94a3b8"');
content = content.replace(/color: addressData\.city \? \"white\" \: \"rgba\(189,213,234,0\.5\)\"/g, 'color: addressData.city ? "#0f172a" : "#94a3b8"');
content = content.replace(/color: addressData\.district \? \"white\" \: \"rgba\(189,213,234,0\.5\)\"/g, 'color: addressData.district ? "#0f172a" : "#94a3b8"');
content = content.replace(/color: addressData\.village \? \"white\" \: \"rgba\(189,213,234,0\.5\)\"/g, 'color: addressData.village ? "#0f172a" : "#94a3b8"');

// Select dropdown content styles
content = content.replace(/style=\{\{ background: \"#0d1f33\", border: \"1px solid rgba\(87,115,153,0\.3\)\", color: \"white\", maxHeight: \"250px\", overflowY: \"auto\" \}\}/g, 'style={{ background: "#ffffff", border: "1px solid #e2e8f0", color: "#0f172a", maxHeight: "250px", overflowY: "auto" }}');
content = content.replace(/className=\"hover:bg-slate-800 focus:bg-slate-800 focus:text-foreground cursor-pointer\"/g, 'className="hover:bg-slate-100 focus:bg-slate-100 focus:text-slate-900 cursor-pointer"');

// Password Tab borderTop inline style
content = content.replace(/borderTop: \"1px solid rgba\(87,115,153,0\.2\)\"/g, 'borderTop: "1px solid #e2e8f0"');

fs.writeFileSync(file, content);
console.log("Successfully patched styles.");
