import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#09090b;--sur:#18181b;--sur2:#27272a;--brd:#3f3f46;
  --tx:#fafafa;--mx:#a1a1aa;--dim:#52525b;
  --ac:#22d3ee;--ac2:#a78bfa;--ok:#4ade80;--warn:#fb923c;--err:#f87171;
  --r:10px;--r2:6px;
}
body{background:var(--bg);font-family:'Outfit',sans-serif;color:var(--tx);min-height:100vh}
.app{min-height:100vh;padding-bottom:80px}

/* ── header ── */
.hdr{padding:0 32px;background:var(--sur);border-bottom:1px solid var(--brd);display:flex;align-items:center;justify-content:space-between;height:56px;position:sticky;top:0;z-index:100}
.logo{display:flex;align-items:center;gap:10px}
.logo-mark{width:28px;height:28px;background:var(--ac);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}
.logo-name{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:var(--tx);letter-spacing:-.3px}
.logo-name span{color:var(--ac)}
.hdr-right{display:flex;align-items:center;gap:8px}
.icon-btn{background:none;border:1px solid var(--brd);color:var(--mx);width:34px;height:34px;border-radius:var(--r2);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;transition:all .15s}
.icon-btn:hover{border-color:var(--ac);color:var(--ac)}
.icon-btn.on{border-color:var(--ac);color:var(--ac);background:rgba(34,211,238,.1)}
.provider-pill{font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;padding:3px 10px;border-radius:999px;border:1px solid}

/* ── settings panel ── */
.settings{background:var(--sur);border-bottom:1px solid var(--brd);padding:20px 32px;animation:slideDown .2s ease}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
.settings-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:780px}
.api-section{display:flex;flex-direction:column;gap:8px}
.api-label{font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--mx)}
.api-input-row{display:flex;gap:8px}
.key-detected{font-size:12px;margin-top:4px;display:flex;align-items:center;gap:6px}
.links-section{display:flex;flex-direction:column;gap:6px;padding-top:22px}
.key-link{font-size:12px;color:var(--ac);text-decoration:none;display:flex;align-items:center;gap:5px}
.key-link:hover{text-decoration:underline}
.mode-note{background:rgba(34,211,238,.08);border:1px solid rgba(34,211,238,.2);border-radius:var(--r2);padding:10px 14px;font-size:12px;color:var(--mx);line-height:1.6;max-width:780px;margin-top:12px}
.mode-note strong{color:var(--ac)}

/* ── main content ── */
.main{padding:28px 32px 0;max-width:900px}

/* ── inputs ── */
.field{display:flex;flex-direction:column;gap:7px}
.lbl{font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--mx)}
.inp{width:100%;background:var(--sur);border:1px solid var(--brd);color:var(--tx);padding:10px 13px;border-radius:var(--r2);font-family:'Outfit',sans-serif;font-size:14px;outline:none;transition:border-color .15s}
.inp:focus{border-color:var(--ac)}
.inp::placeholder{color:var(--dim)}
.inp-area{resize:vertical;min-height:80px;font-size:13px;line-height:1.6}
.inp-area.tall{min-height:120px}
select.inp{cursor:pointer}

/* ── url row ── */
.url-row{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:end;margin-bottom:20px}
.site-badge{display:flex;align-items:center;gap:6px;background:var(--sur);border:1px solid var(--brd);padding:10px 14px;border-radius:var(--r2);font-size:13px;color:var(--mx);white-space:nowrap;height:40px}
.site-badge.detected{border-color:var(--ac);color:var(--ac);background:rgba(34,211,238,.06)}

/* ── method tabs ── */
.method-row{display:flex;gap:6px;margin-bottom:20px;flex-wrap:wrap}
.method-tab{background:var(--sur);border:1px solid var(--brd);color:var(--mx);padding:8px 14px;border-radius:999px;font-family:'Outfit',sans-serif;font-size:12px;font-weight:500;cursor:pointer;transition:all .15s;display:flex;align-items:center;gap:6px;white-space:nowrap}
.method-tab:hover{border-color:var(--ac);color:var(--ac)}
.method-tab.on{background:var(--ac);border-color:var(--ac);color:#000;font-weight:600}
.method-tab .rec{font-size:9px;background:var(--ok);color:#000;padding:1px 5px;border-radius:999px;font-weight:700;letter-spacing:.3px}
.method-tab.on .rec{background:rgba(0,0,0,.25);color:#000}

/* ── method panels ── */
.method-panel{background:var(--sur);border:1px solid var(--brd);border-radius:var(--r);padding:20px;margin-bottom:20px}
.code-wrap{position:relative;margin:10px 0}
.code-box{background:#0d0d14;border:1px solid var(--brd);border-radius:var(--r2);padding:14px 44px 14px 14px;font-family:monospace;font-size:11.5px;line-height:1.65;color:#7dd3fc;overflow-x:auto;white-space:pre-wrap;word-break:break-all;max-height:200px}
.copy-btn{position:absolute;top:8px;right:8px;background:var(--sur2);border:1px solid var(--brd);color:var(--mx);padding:5px 10px;border-radius:4px;font-size:11px;font-weight:600;cursor:pointer;transition:all .15s;font-family:'Outfit',sans-serif;letter-spacing:.5px}
.copy-btn:hover{border-color:var(--ac);color:var(--ac)}
.copy-btn.ok{background:rgba(74,222,128,.15);border-color:var(--ok);color:var(--ok)}
.steps-list{display:flex;flex-direction:column;gap:8px;margin:12px 0}
.step-item{display:flex;gap:10px;align-items:flex-start}
.step-n{width:20px;height:20px;border-radius:50%;background:var(--ac);color:#000;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.step-t{font-size:13px;color:#d4d4d8;line-height:1.55}
.step-t strong{color:var(--tx)}
.kbd{background:var(--sur2);border:1px solid var(--brd);padding:1px 7px;border-radius:4px;font-size:11px;font-family:monospace;color:var(--mx)}
.parse-ok{font-size:12px;color:var(--ok);margin-top:6px;font-weight:500}
.parse-err{font-size:12px;color:var(--err);margin-top:6px}
.manual-hint{font-size:12px;color:var(--dim);margin-top:6px;line-height:1.5}

/* ── prefs section ── */
.prefs-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px}
.count-row{display:flex;align-items:center;gap:10px}
.cnt-btns{display:flex;align-items:center;border:1px solid var(--brd);border-radius:var(--r2);overflow:hidden;background:var(--sur)}
.cnt-btn{background:none;border:none;padding:6px 12px;cursor:pointer;font-size:15px;color:var(--mx);transition:background .12s}
.cnt-btn:hover{background:var(--sur2)}
.cnt-num{padding:6px 10px;font-size:14px;font-weight:600;min-width:28px;text-align:center;border-left:1px solid var(--brd);border-right:1px solid var(--brd);color:var(--tx)}
.sym-wrap{position:relative}
.sym-wrap .sym{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--mx);font-size:14px;pointer-events:none}
.sym-wrap .inp{padding-left:26px}

/* ── divider ── */
.divider{height:1px;background:var(--brd);margin:20px 0}

/* ── buttons ── */
.btn-primary{background:var(--ac);color:#000;border:none;padding:12px 24px;font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;cursor:pointer;border-radius:var(--r2);transition:all .15s;width:100%}
.btn-primary:hover:not(:disabled){background:#06b6d4}
.btn-primary:disabled{opacity:.35;cursor:not-allowed}
.btn-ghost{background:none;border:1px solid var(--brd);color:var(--mx);padding:9px 16px;font-family:'Outfit',sans-serif;font-size:12px;font-weight:500;letter-spacing:.5px;cursor:pointer;border-radius:var(--r2);transition:all .15s}
.btn-ghost:hover{border-color:var(--tx);color:var(--tx)}
.btn-warn{background:rgba(251,146,60,.12);border:1px solid var(--warn);color:var(--warn);padding:9px 16px;font-family:'Outfit',sans-serif;font-size:12px;cursor:pointer;border-radius:var(--r2)}

/* ── loading ── */
.loading{padding:48px 32px;display:flex;flex-direction:column;align-items:center;text-align:center}
.spin{width:36px;height:36px;border:3px solid var(--brd);border-top-color:var(--ac);border-radius:50%;animation:spin .8s linear infinite;margin-bottom:20px}
@keyframes spin{to{transform:rotate(360deg)}}
.load-title{font-family:'Syne',sans-serif;font-size:20px;margin-bottom:6px}
.load-sub{font-size:13px;color:var(--mx);margin-bottom:24px}
.load-steps{display:flex;flex-direction:column;gap:6px;text-align:left}
.ls{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--dim)}
.ls.on{color:var(--tx);font-weight:500}
.ls.done{color:var(--ok)}
.ld{width:6px;height:6px;border-radius:50%;background:var(--dim);flex-shrink:0}
.ls.on .ld{background:var(--ac)}
.ls.done .ld{background:var(--ok)}

/* ── error ── */
.err-box{background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.3);border-radius:var(--r);padding:20px;margin:28px 32px 0;max-width:700px}
.err-title{font-family:'Syne',sans-serif;font-size:17px;color:var(--err);margin-bottom:8px}
.err-body{font-size:13px;color:#d4d4d8;line-height:1.65;white-space:pre-line;margin-bottom:16px}
.fallback-label{font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--mx);margin-bottom:10px}
.fallback-cards{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
.fb-card{background:var(--sur);border:1px solid var(--brd);border-radius:var(--r2);padding:14px;cursor:pointer;transition:all .15s;text-align:left}
.fb-card:hover{border-color:var(--ac);background:rgba(34,211,238,.05)}
.fb-icon{font-size:20px;margin-bottom:6px}
.fb-name{font-size:13px;font-weight:600;color:var(--tx);margin-bottom:3px}
.fb-desc{font-size:12px;color:var(--mx);line-height:1.4}

/* ── results ── */
.results{padding:28px 32px 0}
.res-hdr{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px;gap:16px;flex-wrap:wrap}
.res-title{font-family:'Syne',sans-serif;font-size:24px;font-weight:700}
.res-title span{color:var(--ac)}
.res-meta{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.total-chip{background:rgba(34,211,238,.12);border:1px solid rgba(34,211,238,.3);color:var(--ac);padding:5px 14px;border-radius:999px;font-size:12px;font-weight:600}
.scanned-chip{background:var(--sur);border:1px solid var(--brd);color:var(--mx);padding:5px 14px;border-radius:999px;font-size:12px}
.items-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px;margin-bottom:20px}
.item-card{background:var(--sur);border:1px solid var(--brd);border-radius:var(--r);padding:18px;position:relative;transition:border-color .2s,transform .2s;animation:fadeUp .4s ease both}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.item-card:nth-child(1){animation-delay:.04s}.item-card:nth-child(2){animation-delay:.1s}
.item-card:nth-child(3){animation-delay:.16s}.item-card:nth-child(4){animation-delay:.22s}
.item-card:hover{border-color:var(--ac);transform:translateY(-2px)}
.item-rank{position:absolute;top:12px;right:12px;width:22px;height:22px;border-radius:50%;background:var(--sur2);border:1px solid var(--brd);font-size:10px;font-weight:700;color:var(--mx);display:flex;align-items:center;justify-content:center}
.item-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:var(--tx);line-height:1.3;margin-bottom:4px;padding-right:28px}
.item-sub{font-size:12px;color:var(--mx);margin-bottom:10px;font-style:italic}
.item-price{font-size:22px;font-weight:600;color:var(--ac);margin-bottom:8px;font-family:'Syne',sans-serif}
.item-price small{font-size:12px;font-weight:400;color:var(--dim);margin-left:2px}
.item-reason{font-size:12px;color:#a1a1aa;line-height:1.6;border-top:1px solid var(--brd);padding-top:10px}
.item-link{display:inline-flex;align-items:center;gap:4px;margin-top:10px;font-size:11px;color:var(--ac);text-decoration:none;letter-spacing:.5px;text-transform:uppercase;font-weight:600;opacity:.8;transition:opacity .15s}
.item-link:hover{opacity:1}
.summary-bar{background:linear-gradient(135deg,rgba(34,211,238,.08),rgba(167,139,250,.08));border:1px solid var(--brd);border-radius:var(--r);padding:16px 20px;display:flex;gap:12px;align-items:flex-start}
.summary-bar strong{color:var(--ac)}
.summary-bar p{font-size:13px;color:#a1a1aa;line-height:1.7}

/* ── misc ── */
.badge-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.badge{font-size:10px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;padding:3px 8px;border-radius:999px;border:1px solid}
.sep{color:var(--dim);font-size:12px;padding:0 4px}
@media(max-width:600px){
  .hdr,.main,.results,.err-box,.settings{padding-left:16px;padding-right:16px}
  .prefs-grid{grid-template-columns:1fr 1fr}
  .items-grid{grid-template-columns:1fr}
  .fallback-cards{grid-template-columns:1fr}
  .settings-grid{grid-template-columns:1fr}
  .url-row{grid-template-columns:1fr}
}
`;

/* ═══════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════ */
const CSYM = { PKR:"₨",USD:"$",GBP:"£",EUR:"€",INR:"₹",AED:"د.إ",SAR:"﷼",BDT:"৳",LKR:"Rs",MYR:"RM" };

const PROVIDER_META = {
  anthropic:{ label:"Anthropic / Claude", color:"#22d3ee", hint:"Best quality" },
  openai:   { label:"OpenAI / GPT",       color:"#4ade80", hint:"Great quality" },
  groq:     { label:"Groq (Free)",        color:"#a78bfa", hint:"Free tier" },
  gemini:   { label:"Gemini (Free tier)", color:"#fb923c", hint:"Free tier" },
  session:  { label:"claude.ai session",  color:"#22d3ee", hint:"Your subscription" },
  unknown:  { label:"Unknown key format", color:"#f87171", hint:"Check key" },
};

const KEY_LINKS = [
  { label:"Anthropic — $5 free credit on signup", url:"https://console.anthropic.com/", prefix:"sk-ant-" },
  { label:"Groq — completely free tier",           url:"https://console.groq.com/",       prefix:"gsk_" },
  { label:"Gemini — free tier available",          url:"https://aistudio.google.com/",    prefix:"AIza" },
  { label:"OpenAI — pay-as-you-go",               url:"https://platform.openai.com/",    prefix:"sk-" },
];

const LOAD_STEPS = ["Parsing item data…","Checking budget constraints…","AI selecting best picks…"];

/* ═══════════════════════════════════════════════════════
   DETECTION HELPERS
═══════════════════════════════════════════════════════ */
function detectProvider(key) {
  if (!key || !key.trim()) return "session";
  const k = key.trim();
  if (k.startsWith("sk-ant-")) return "anthropic";
  if (k.startsWith("gsk_"))    return "groq";
  if (k.startsWith("AIza"))    return "gemini";
  if (k.startsWith("sk-"))     return "openai";
  return "unknown";
}

function detectSiteType(url) {
  if (!url) return null;
  const u = url.toLowerCase();
  if (u.includes("amazon."))   return "amazon";
  if (u.includes("daraz."))    return "daraz";
  if (u.includes("shopify."))  return "shopify";
  // Default — try shopify script, it's the most common
  return "shopify";
}

const SITE_LABELS = { amazon:"Amazon", daraz:"Daraz", shopify:"Shopify store", null:"Paste the URL" };

/* ═══════════════════════════════════════════════════════
   SCRIPT GENERATORS
   All scripts: DOM-only overlay (no innerHTML), no nested quotes
═══════════════════════════════════════════════════════ */
function overlayLines() {
  return [
    "var ov=document.createElement('div');",
    "ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:16px';",
    "var bx=document.createElement('div');",
    "bx.style.cssText='background:#fff;border-radius:12px;padding:22px;width:100%;max-width:520px;display:flex;flex-direction:column;font-family:system-ui,sans-serif;gap:10px';",
    "var hd=document.createElement('div');",
    "hd.style.cssText='font-size:15px;font-weight:700;color:#111';",
    "hd.textContent=out.length+' items found';",
    "var info=document.createElement('div');",
    "info.style.cssText='font-size:12px;color:#555;line-height:1.5';",
    "info.textContent='Click inside the text box \u2192 Ctrl+A \u2192 Ctrl+C \u2192 then paste into EasyShop.';",
    "var ta=document.createElement('textarea');",
    "ta.readOnly=true;ta.value=out.join('\\n');",
    "ta.style.cssText='height:180px;font-size:11px;font-family:monospace;border:1px solid #d1d5db;border-radius:6px;padding:8px;width:100%;box-sizing:border-box;resize:none;outline:none';",
    "var cl=document.createElement('button');",
    "cl.textContent='Close';cl.onclick=function(){ov.remove()};",
    "cl.style.cssText='align-self:flex-start;padding:7px 18px;background:#111;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px';",
    "bx.appendChild(hd);bx.appendChild(info);bx.appendChild(ta);bx.appendChild(cl);",
    "ov.appendChild(bx);document.body.appendChild(ov);",
    "ta.focus();ta.select();",
  ];
}

function makeShopifyScript(storeUrl) {
  let collPath = "/products.json", origin = "";
  try {
    const u = new URL(storeUrl);
    origin = u.origin;
    const m = u.pathname.match(/\/collections\/([^/?#]+)/);
    if (m) collPath = "/collections/" + m[1] + "/products.json";
  } catch(_) {}
  return [
    "(async function(){",
    "var out=[];",
    "for(var p=1;p<=20;p++){",
    "  var r=await fetch('" + collPath + "?limit=250&page='+p);",
    "  if(!r.ok)break;",
    "  var d=await r.json();",
    "  if(!d.products||!d.products.length)break;",
    "  d.products.forEach(function(x){",
    "    out.push(x.title+'|'+x.variants[0].price+'|" + origin + "/products/'+x.handle);",
    "  });",
    "  if(d.products.length<250)break;",
    "}",
    "if(!out.length){alert('No products found. Try /collections/all in the URL.');return;}",
    ...overlayLines(),
    "})();",
  ].join("\n");
}

function makeAmazonScript() {
  return [
    "(function(){",
    "var out=[];",
    "document.querySelectorAll('[data-asin][data-asin!=\"\"]').forEach(function(el){",
    "  var asin=el.getAttribute('data-asin');",
    "  if(!asin||asin.length<5)return;",
    "  var t=el.querySelector('h2 .a-text-normal,h2 span,.a-size-medium,.a-size-base-plus');",
    "  var pr=el.querySelector('.a-price .a-offscreen,.a-price-whole');",
    "  var lk=el.querySelector('h2 a,a[href*=\"/dp/\"]');",
    "  if(!t||!pr)return;",
    "  var price=parseFloat(pr.textContent.replace(/[^0-9.]/g,''));",
    "  if(price<=0)return;",
    "  var href=lk?lk.href.split('?')[0]:'';",
    "  out.push(t.textContent.trim()+'|'+price+'|'+href);",
    "});",
    "if(!out.length){alert('No priced products found. Make sure you are on an Amazon search or category results page.');return;}",
    ...overlayLines(),
    "})();",
  ].join("\n");
}

function makeDarazScript() {
  return [
    "(function(){",
    "var out=[];",
    // Try Next.js data first
    "try{",
    "  var arr=((window.__NEXT_DATA__||{}).props||{});",
    "  arr=((arr.pageProps||{}).data||{});",
    "  arr=((arr.mainInfo||{}).itemsArray)||[];",
    "  arr.forEach(function(x){",
    "    var t=x.name||x.title||'';",
    "    var p=parseFloat(x.price||x.salePrice||0);",
    "    var u='https://www.daraz.pk'+(x.productUrl||x.itemUrl||'');",
    "    if(t&&p>0)out.push(t+'|'+p+'|'+u);",
    "  });",
    "}catch(e){}",
    // DOM fallback
    "if(!out.length){",
    "  var sels='[data-qa-locator=\"product-item\"],[class*=\"Card\"],[class*=\"product-card\"],[class*=\"ProductCard\"]';",
    "  document.querySelectorAll(sels).forEach(function(el){",
    "    var t=el.querySelector('[class*=\"title\"],[class*=\"Title\"],[class*=\"name\"],h2,h3');",
    "    var p=el.querySelector('[class*=\"price\"],[class*=\"Price\"]');",
    "    var l=el.querySelector('a[href]');",
    "    if(!t||!p)return;",
    "    var price=parseFloat(p.textContent.replace(/[^0-9.]/g,''));",
    "    if(price<=0)return;",
    "    out.push(t.textContent.trim()+'|'+price+'|'+(l?l.href:''));",
    "  });",
    "}",
    "if(!out.length){alert('No products found. Try a Daraz search or category results page.');return;}",
    ...overlayLines(),
    "})();",
  ].join("\n");
}

/* ═══════════════════════════════════════════════════════
   DATA PARSERS
═══════════════════════════════════════════════════════ */
// Title|Price|URL lines from scripts
function parseScriptOutput(text) {
  const items = [], seen = new Set();
  for (const raw of text.split("\n")) {
    const parts = raw.trim().split("|");
    if (parts.length < 2) continue;
    const title = parts[0].trim();
    const price = parseFloat(parts[1]);
    const url   = (parts[2] || "").trim();
    const key   = title.toLowerCase().slice(0, 40);
    if (!seen.has(key) && title.length > 1 && price > 0) {
      seen.add(key);
      items.push({ title, price, url });
    }
  }
  return items;
}

// Raw page text (Ctrl+A copy) — smart extraction
function parsePastedPage(text) {
  const items = [], seen = new Set();
  const lines = text.split(/\n/).map(l => l.trim()).filter(Boolean);
  const SKIP = /^(add to cart|buy now|view|menu|home|search|checkout|cart|login|register|filter|sort|page \d|next|prev|loading|sold out|out of stock|quantity|select|choose|share|compare|wishlist)/i;
  const priceRe = /(?:rs\.?\s*|pkr\s*|\$|£|€|₹|₨|usd\s*|inr\s*|aed\s*|sar\s*)?([\d,]+(?:\.\d{1,2})?)/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length < 3 || line.length > 150 || SKIP.test(line)) continue;

    // Inline: "Title ... Rs 350" or "Title | 350"
    const inM = line.match(/^(.+?)\s*[|–—]\s*(?:rs\.?\s*|pkr\s*|\$|£|€|₹)?\s*([\d,]+(?:\.\d{1,2})?)$/i);
    if (inM) {
      const title = inM[1].trim(), price = parseFloat(inM[2].replace(/,/g,""));
      const key = title.toLowerCase().slice(0,40);
      if (!seen.has(key) && price > 5 && price < 1e6) { seen.add(key); items.push({ title, price, url:"" }); }
      continue;
    }

    // Look for price in next 4 lines
    for (let j = i+1; j < Math.min(i+5, lines.length); j++) {
      const m = lines[j].match(priceRe);
      if (m) {
        const price = parseFloat(m[1].replace(/,/g,""));
        if (price >= 5 && price < 1e6) {
          const key = line.toLowerCase().slice(0,40);
          if (!seen.has(key)) { seen.add(key); items.push({ title: line, price, url:"" }); }
          break;
        }
      }
    }
  }
  return items.slice(0, 120);
}

// Manual entry: "Title | Price" or "Title | Price | URL" per line
function parseManualEntry(text) {
  const items = [], seen = new Set();
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const parts = line.split("|").map(p => p.trim());
    if (parts.length < 2) continue;
    const title = parts[0];
    const price = parseFloat(parts[1].replace(/[^0-9.]/g,""));
    const url   = parts[2] || "";
    const key   = title.toLowerCase().slice(0,40);
    if (!seen.has(key) && title.length > 0 && price > 0) {
      seen.add(key); items.push({ title, price, url });
    }
  }
  return items;
}

/* ═══════════════════════════════════════════════════════
   AI CALLER — multi-provider
═══════════════════════════════════════════════════════ */
async function callAI({ key, provider, items, count, budget, currency, prefs }) {
  const sample = [...items].sort((a,b) => a.price - b.price).slice(0, 150);
  const list = sample.map((b,i) =>
    (i+1) + '. "' + b.title + '" — ' + currency + " " + b.price + (b.url ? " | " + b.url : "")
  ).join("\n");

  const prompt =
    "You are a smart shopping assistant. The customer wants exactly " + count + " item(s), total budget " + currency + " " + budget + ".\n\n" +
    (prefs ? "Customer preferences / requirements:\n" + prefs + "\n\n" : "") +
    "Available items:\n" + list + "\n\n" +
    "Rules:\n" +
    "1. The COMBINED price of all picks must be STRICTLY under " + currency + " " + budget + ".\n" +
    "2. Follow the customer preferences as closely as possible.\n" +
    "3. If no preferences given, prioritise quality and value.\n" +
    "4. Do NOT just pick the cheapest — pick the BEST matching the preferences.\n\n" +
    "Respond ONLY with valid JSON, no markdown fences, no extra text:\n" +
    '{"items":[{"title":"exact title from list","price":299,"currency":"' + currency + '","reason":"1-2 sentences why this is a great pick given preferences","url":"url from list or empty string"}],' +
    '"total":950,"summary":"2-3 sentences on why this selection fits the requirements","store_type":"what kind of store this is"}';

  let text;

  if (provider === "session") {
    // claude.ai session — no key needed, auth injected by platform
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role:"user", content:prompt }] }),
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e?.error?.message || "Request failed ("+r.status+")"); }
    const d = await r.json();
    text = d.content.filter(b=>b.type==="text").map(b=>b.text).join("");

  } else if (provider === "anthropic") {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type":"application/json", "x-api-key":key, "anthropic-version":"2023-06-01", "anthropic-dangerous-direct-browser-access":"true" },
      body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{ role:"user", content:prompt }] }),
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e?.error?.message || "Anthropic error "+r.status); }
    const d = await r.json();
    text = d.content[0].text;

  } else if (provider === "openai") {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type":"application/json", "Authorization":"Bearer "+key },
      body: JSON.stringify({ model:"gpt-4o-mini", max_tokens:1000, messages:[{ role:"user", content:prompt }] }),
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e?.error?.message || "OpenAI error "+r.status); }
    const d = await r.json();
    text = d.choices[0].message.content;

  } else if (provider === "groq") {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type":"application/json", "Authorization":"Bearer "+key },
      body: JSON.stringify({ model:"llama-3.3-70b-versatile", max_tokens:1000, messages:[{ role:"user", content:prompt }] }),
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e?.error?.message || "Groq error "+r.status); }
    const d = await r.json();
    text = d.choices[0].message.content;

  } else if (provider === "gemini") {
    const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="+key, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ contents:[{ parts:[{ text:prompt }] }] }),
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e?.error?.message || "Gemini error "+r.status); }
    const d = await r.json();
    text = d.candidates[0].content.parts[0].text;

  } else {
    throw new Error("Unrecognised API key format. Supported: Anthropic (sk-ant-...), OpenAI (sk-...), Groq (gsk_...), Gemini (AIza...).");
  }

  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("AI returned an unexpected format. Please try again.");
  return JSON.parse(m[0]);
}

/* ═══════════════════════════════════════════════════════
   STORAGE
═══════════════════════════════════════════════════════ */
async function storeSave(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch(_) {}
}
async function storeLoad(key) {
  try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; } catch(_) { return null; }
}

/* ═══════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════ */
export default function App() {
  // Settings
  const [apiKey, setApiKey]         = useState("");
  const [apiKeyDraft, setApiKeyDraft] = useState("");
  const [provider, setProvider]     = useState("session");
  const [showSettings, setShowSettings] = useState(false);

  // Form
  const [url, setUrl]               = useState("");
  const [siteType, setSiteType]     = useState(null);
  const [method, setMethod]         = useState("shopify"); // shopify|amazon|daraz|paste|manual
  const [scriptData, setScriptData] = useState("");
  const [pasteData, setPasteData]   = useState("");
  const [manualData, setManualData] = useState("");
  const [budget, setBudget]         = useState(1000);
  const [currency, setCurrency]     = useState("PKR");
  const [count, setCount]           = useState(4);
  const [prefs, setPrefs]           = useState("");

  // Script copy feedback
  const [copied, setCopied]         = useState(false);

  // Run state
  const [phase, setPhase]           = useState("idle"); // idle|loading|done|error
  const [loadStep, setLoadStep]     = useState(0);
  const [result, setResult]         = useState(null);
  const [foundItems, setFoundItems] = useState([]);
  const [errMsg, setErrMsg]         = useState("");
  const [suggestMethods, setSuggestMethods] = useState(false);
  const tmr = useRef(null);

  // Load persisted settings on mount
  useEffect(() => {
    (async () => {
      const s = await storeLoad("easyshop:settings");
      if (s) {
        if (s.apiKey)   { setApiKey(s.apiKey); setApiKeyDraft(s.apiKey); setProvider(detectProvider(s.apiKey)); }
        if (s.currency) setCurrency(s.currency);
        if (s.budget)   setBudget(s.budget);
        if (s.count)    setCount(s.count);
        if (s.prefs)    setPrefs(s.prefs);
      }
    })();
  }, []);

  // Auto-detect site type
  useEffect(() => {
    const t = detectSiteType(url);
    setSiteType(t);
    if (t === "amazon") setMethod("amazon");
    else if (t === "daraz") setMethod("daraz");
    else setMethod("shopify");
  }, [url]);

  function saveKey() {
    const k = apiKeyDraft.trim();
    setApiKey(k);
    const p = detectProvider(k);
    setProvider(p);
    storeSave("easyshop:settings", { apiKey: k, currency, budget, count, prefs });
  }

  function savePrefs() {
    storeSave("easyshop:settings", { apiKey, currency, budget, count, prefs });
  }

  function copyScript(script) {
    navigator.clipboard.writeText(script).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  }

  function tickLoad(i) {
    setLoadStep(i);
    if (i < LOAD_STEPS.length - 1) tmr.current = setTimeout(() => tickLoad(i+1), 3000);
  }

  async function run() {
    // Parse items based on active method
    let items = [];
    if (method === "shopify" || method === "amazon" || method === "daraz") {
      items = parseScriptOutput(scriptData);
    } else if (method === "paste") {
      items = parsePastedPage(pasteData);
    } else if (method === "manual") {
      items = parseManualEntry(manualData);
    }

    if (!items.length) {
      setErrMsg(
        method === "manual"
          ? "No items found. Format: one item per line — Title | Price or Title | Price | URL"
          : method === "paste"
          ? "No items with prices could be extracted from the pasted text. Try scrolling the page to the bottom before copying, or switch to Manual Entry."
          : "No data found. Make sure you ran the script, copied from the popup box, and pasted here."
      );
      setSuggestMethods(true);
      setPhase("error");
      return;
    }

    setFoundItems(items);
    setPhase("loading");
    setResult(null);
    setErrMsg("");
    setSuggestMethods(false);
    tickLoad(0);
    savePrefs();

    try {
      const affordable = items.filter(b => b.price <= budget);
      if (affordable.length < count) throw new Error(
        `Found ${items.length} items, but only ${affordable.length} are individually priced under ${CSYM[currency]||currency}${budget}.\nYou want ${count}. Try raising the budget or reducing the count.`
      );
      clearTimeout(tmr.current); setLoadStep(2);
      const picked = await callAI({ key: apiKey, provider, items, count, budget, currency, prefs });
      clearTimeout(tmr.current);
      if (!picked.items?.length) throw new Error("AI returned no picks. Please try again.");
      setResult(picked);
      setPhase("done");
    } catch(e) {
      clearTimeout(tmr.current);
      setErrMsg(e.message || "Something went wrong.");
      setSuggestMethods(false);
      setPhase("error");
    }
  }

  function switchMethod(m) { setMethod(m); setPhase("idle"); setErrMsg(""); setSuggestMethods(false); }
  function reset() { clearTimeout(tmr.current); setPhase("idle"); setResult(null); setFoundItems([]); setSuggestMethods(false); }

  const sym = CSYM[currency] || currency;
  const shopifyScript = makeShopifyScript(url);
  const amazonScript  = makeAmazonScript();
  const darazScript   = makeDarazScript();

  const activeScript = method === "amazon" ? amazonScript : method === "daraz" ? darazScript : shopifyScript;

  const hasData = (
    (["shopify","amazon","daraz"].includes(method) && parseScriptOutput(scriptData).length > 0) ||
    (method === "paste"  && parsePastedPage(pasteData).length > 0) ||
    (method === "manual" && parseManualEntry(manualData).length > 0)
  );

  const provMeta = PROVIDER_META[provider] || PROVIDER_META.session;

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* ── HEADER ── */}
        <div className="hdr">
          <div className="logo">
            <div className="logo-mark">🛍</div>
            <div className="logo-name">Easy<span>Shop</span></div>
          </div>
          <div className="hdr-right">
            <span className="provider-pill" style={{ borderColor: provMeta.color, color: provMeta.color }}>
              {provMeta.label}
            </span>
            <button className={"icon-btn " + (showSettings ? "on" : "")} onClick={() => setShowSettings(s => !s)} title="Settings">
              ⚙
            </button>
          </div>
        </div>

        {/* ── SETTINGS PANEL ── */}
        {showSettings && (
          <div className="settings">
            <div className="settings-grid">
              <div className="api-section">
                <div className="api-label">API Key <span style={{fontWeight:400,textTransform:"none",letterSpacing:0,color:"var(--dim)"}}>(optional)</span></div>
                <div className="api-input-row">
                  <input className="inp" type="password" value={apiKeyDraft}
                    placeholder="sk-ant-...  or  sk-...  or  gsk_...  or  AIza..."
                    onChange={e => setApiKeyDraft(e.target.value)}
                    style={{ fontSize:13 }} />
                  <button className="btn-ghost" onClick={saveKey} style={{whiteSpace:"nowrap"}}>Save</button>
                </div>
                {apiKeyDraft.trim() && (
                  <div className="key-detected">
                    <span style={{ width:8, height:8, borderRadius:"50%", background: provMeta.color, flexShrink:0, display:"inline-block" }} />
                    <span style={{ fontSize:12, color: provMeta.color }}>{provMeta.label} — {provMeta.hint}</span>
                  </div>
                )}
              </div>
              <div className="links-section">
                <div style={{fontSize:10,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--dim)",marginBottom:4}}>Get a free key</div>
                {KEY_LINKS.map((l,i) => (
                  <a key={i} className="key-link" href={l.url} target="_blank" rel="noreferrer">
                    ↗ {l.label} <span style={{color:"var(--dim)",fontSize:11}}>({l.prefix}...)</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="mode-note">
              {apiKey
                ? <><strong>Using your API key</strong> — EasyShop works outside claude.ai too. Costs fractions of a penny per search.</>
                : <><strong>No API key set</strong> — using your claude.ai subscription automatically. Works great right now, but only on claude.ai. Add a key to use EasyShop anywhere.</>
              }
            </div>
          </div>
        )}

        {/* ── MAIN FORM ── */}
        {(phase === "idle" || phase === "error") && (
          <div className="main">

            {/* URL */}
            <div style={{marginBottom:20}}>
              <div className="field">
                <label className="lbl">Store URL</label>
                <div className="url-row">
                  <input className="inp" type="url" value={url}
                    placeholder="https://bookvogue.com/collections/english  or  https://amazon.com/s?k=books"
                    onChange={e => setUrl(e.target.value)} />
                  <div className={"site-badge " + (siteType ? "detected" : "")}>
                    {siteType ? "⚡ " + SITE_LABELS[siteType] : "Paste URL above"}
                  </div>
                </div>
              </div>
            </div>

            {/* Method tabs */}
            <div className="field" style={{marginBottom:6}}>
              <label className="lbl">Method — how to get the products</label>
            </div>
            <div className="method-row">
              {[
                { id:"shopify", icon:"⚡", label:"Shopify Script", rec: siteType==="shopify" },
                { id:"amazon",  icon:"🛒", label:"Amazon Script",  rec: siteType==="amazon"  },
                { id:"daraz",   icon:"📦", label:"Daraz Script",   rec: siteType==="daraz"   },
                { id:"paste",   icon:"📋", label:"Any Site — Paste Page", rec: false },
                { id:"manual",  icon:"✏️", label:"Manual Entry",  rec: false },
              ].map(m => (
                <button key={m.id} className={"method-tab " + (method===m.id?"on":"")} onClick={() => setMethod(m.id)}>
                  {m.icon} {m.label}
                  {m.rec && <span className="rec">REC</span>}
                </button>
              ))}
            </div>

            {/* Method panels */}
            <div className="method-panel">

              {/* ── Shopify / Amazon / Daraz script methods ── */}
              {["shopify","amazon","daraz"].includes(method) && (<>
                <div style={{fontSize:13,color:"var(--mx)",marginBottom:12,lineHeight:1.55}}>
                  {method === "shopify" && "Fetches ALL products via Shopify's built-in API — includes items hidden behind infinite scroll. Works on BookVogue, Liberty Books, Readings, and any Shopify store."}
                  {method === "amazon" && "Scrapes the product cards currently visible on an Amazon search or category results page."}
                  {method === "daraz"  && "Reads Daraz product listings from the page data or DOM. Works best on search results and category pages."}
                </div>
                <div style={{fontSize:10,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--dim)",marginBottom:8}}>Step 1 — Run this in the browser console</div>
                <div className="code-wrap">
                  <div className="code-box">{activeScript}</div>
                  <button className={"copy-btn " + (copied?"ok":"")} onClick={() => copyScript(activeScript)}>
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <div className="steps-list">
                  <div className="step-item"><span className="step-n">1</span><span className="step-t">Open <strong>{url || "the store"}</strong> in a new tab</span></div>
                  <div className="step-item"><span className="step-n">2</span><span className="step-t">Press <span className="kbd">F12</span> → click <strong>Console</strong></span></div>
                  <div className="step-item"><span className="step-n">3</span><span className="step-t">Click <strong>Copy</strong> above → paste into console → press <span className="kbd">Enter</span></span></div>
                  <div className="step-item"><span className="step-n">4</span><span className="step-t">A popup appears — click inside the text box → <span className="kbd">Ctrl+A</span> → <span className="kbd">Ctrl+C</span></span></div>
                  <div className="step-item"><span className="step-n">5</span><span className="step-t">Paste into the box below</span></div>
                </div>
                <div style={{fontSize:10,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--dim)",margin:"14px 0 8px"}}>Step 2 — Paste the data here</div>
                <textarea className="inp inp-area" value={scriptData}
                  placeholder={"Paste the data from the popup here…\n\nEach line looks like:\nAtomic Habits|450|https://store.com/products/atomic-habits"}
                  onChange={e => setScriptData(e.target.value)} />
                {parseScriptOutput(scriptData).length > 0 && (
                  <div className="parse-ok">✓ {parseScriptOutput(scriptData).length} items detected</div>
                )}
              </>)}

              {/* ── Any Site — Paste Page ── */}
              {method === "paste" && (<>
                <div style={{fontSize:13,color:"var(--mx)",marginBottom:14,lineHeight:1.55}}>
                  Works on any website. You copy the full page text — EasyShop extracts product names and prices automatically.
                  <strong style={{color:"var(--warn)"}}>  Important: scroll all the way to the bottom first</strong> to load all infinite-scroll items, then copy.
                </div>
                <div className="steps-list" style={{marginBottom:14}}>
                  <div className="step-item"><span className="step-n">1</span><span className="step-t">Open the store page → scroll all the way to the <strong>bottom</strong> (loads all products)</span></div>
                  <div className="step-item"><span className="step-n">2</span><span className="step-t">Press <span className="kbd">Ctrl+A</span> to select all → <span className="kbd">Ctrl+C</span> to copy</span></div>
                  <div className="step-item"><span className="step-n">3</span><span className="step-t">Paste into the box below</span></div>
                </div>
                <textarea className="inp inp-area tall" value={pasteData}
                  placeholder="Paste the full page text here — product names and prices will be extracted automatically…"
                  onChange={e => setPasteData(e.target.value)} />
                {parsePastedPage(pasteData).length > 0 && <div className="parse-ok">✓ {parsePastedPage(pasteData).length} items detected</div>}
                {pasteData.trim() && parsePastedPage(pasteData).length === 0 && <div className="parse-err">Couldn't extract prices. Make sure the page has visible prices, or try Manual Entry.</div>}
              </>)}

              {/* ── Manual Entry ── */}
              {method === "manual" && (<>
                <div style={{fontSize:13,color:"var(--mx)",marginBottom:12,lineHeight:1.55}}>
                  Type in products yourself. Works on any site, always reliable. One item per line.
                </div>
                <textarea className="inp inp-area tall" value={manualData}
                  placeholder={"One item per line:\nTitle | Price\nTitle | Price | URL\n\nExample:\nAtomic Habits | 450\nThe Alchemist | 380 | https://store.com/products/alchemist\nSapiens | 420"}
                  onChange={e => setManualData(e.target.value)} />
                <div className="manual-hint">Format: Title | Price  or  Title | Price | URL  — the | character separates fields</div>
                {parseManualEntry(manualData).length > 0 && <div className="parse-ok">✓ {parseManualEntry(manualData).length} items entered</div>}
              </>)}

            </div>{/* end method-panel */}

            {/* ── Error + fallback suggestions ── */}
            {phase === "error" && (
              <div className="err-box" style={{margin:"0 0 20px",background:"rgba(248,113,113,.06)"}}>
                <div className="err-title" style={{fontSize:15}}>⚠ {errMsg.split("\n")[0]}</div>
                {errMsg.includes("\n") && <div className="err-body" style={{fontSize:12,marginBottom: suggestMethods ? 14 : 0}}>{errMsg.split("\n").slice(1).join("\n")}</div>}
                {suggestMethods && (<>
                  <div className="fallback-label">Try a different method instead</div>
                  <div className="fallback-cards">
                    <div className="fb-card" onClick={() => switchMethod("paste")}>
                      <div className="fb-icon">📋</div>
                      <div className="fb-name">Paste Page Text</div>
                      <div className="fb-desc">Copy the whole page with Ctrl+A → Ctrl+C. Works on any site.</div>
                    </div>
                    <div className="fb-card" onClick={() => switchMethod("manual")}>
                      <div className="fb-icon">✏️</div>
                      <div className="fb-name">Manual Entry</div>
                      <div className="fb-desc">Type in product names and prices yourself. Always works.</div>
                    </div>
                  </div>
                </>)}
              </div>
            )}

            <div className="divider" />

            {/* ── Preferences ── */}
            <div className="field" style={{marginBottom:16}}>
              <label className="lbl">What are you looking for?</label>
              <textarea className="inp inp-area" value={prefs}
                placeholder={"Be as specific or vague as you like. Examples:\n• 4 thriller novels, nothing by Pakistani authors, prefer modern\n• electronics under PKR 300 each, prefer Sony or Samsung, no refurbished\n• healthy snacks, no nuts, kid-friendly\n• leave blank to let AI pick the best value items"}
                onChange={e => setPrefs(e.target.value)} />
            </div>

            <div className="prefs-grid">
              <div className="field">
                <label className="lbl">Currency</label>
                <select className="inp" value={currency} onChange={e => setCurrency(e.target.value)}>
                  <option value="PKR">PKR — Pakistani Rupee</option>
                  <option value="USD">USD — US Dollar</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="INR">INR — Indian Rupee</option>
                  <option value="AED">AED — UAE Dirham</option>
                  <option value="SAR">SAR — Saudi Riyal</option>
                  <option value="BDT">BDT — Bangladeshi Taka</option>
                  <option value="MYR">MYR — Malaysian Ringgit</option>
                </select>
              </div>
              <div className="field">
                <label className="lbl">Total Budget</label>
                <div className="sym-wrap">
                  <span className="sym">{sym}</span>
                  <input className="inp" type="number" min="1" value={budget} onChange={e => setBudget(Number(e.target.value))} />
                </div>
              </div>
              <div className="field">
                <label className="lbl">Number of Items</label>
                <div className="count-row">
                  <div className="cnt-btns">
                    <button className="cnt-btn" onClick={() => setCount(c => Math.max(1,c-1))}>−</button>
                    <span className="cnt-num">{count}</span>
                    <button className="cnt-btn" onClick={() => setCount(c => Math.min(20,c+1))}>+</button>
                  </div>
                  <span style={{fontSize:12,color:"var(--mx)"}}>for under {sym}{budget.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button className="btn-primary" onClick={run} disabled={!hasData || budget <= 0}>
              {hasData ? "Find Best " + count + " Items →" : "Add items using a method above first"}
            </button>

          </div>
        )}

        {/* ── LOADING ── */}
        {phase === "loading" && (
          <div className="loading">
            <div className="spin" />
            <div className="load-title">Finding your best picks…</div>
            <div className="load-sub">Analysing {foundItems.length} items against your {sym}{budget.toLocaleString()} budget</div>
            <div className="load-steps">
              {LOAD_STEPS.map((s,i) => (
                <div key={i} className={"ls " + (i < loadStep ? "done" : i === loadStep ? "on" : "")}>
                  <span className="ld" />{s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ERROR (standalone, no form) ── */}
        {phase === "error" && !["idle"].includes(phase) && result === null && errMsg && !suggestMethods && (
          <div className="err-box">
            <div className="err-title">⚠ Something went wrong</div>
            <div className="err-body">{errMsg}</div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn-ghost" onClick={() => { setPhase("idle"); setErrMsg(""); }}>← Try Again</button>
              <button className="btn-ghost" onClick={reset}>Start Over</button>
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {phase === "done" && result && (
          <div className="results">
            <div className="res-hdr">
              <div>
                <div className="res-title">Your <span>{result.items.length}</span> picks</div>
                {result.store_type && <div style={{fontSize:13,color:"var(--mx)",marginTop:3}}>{result.store_type}</div>}
              </div>
              <div className="res-meta">
                <span className="total-chip">Total: {result.items[0]?.currency || currency} {result.total?.toLocaleString()}</span>
                <span className="scanned-chip">Scanned {foundItems.length} items</span>
                <button className="btn-ghost" onClick={reset}>New Search</button>
              </div>
            </div>

            <div className="items-grid">
              {result.items.map((item, i) => (
                <div className="item-card" key={i}>
                  <div className="item-rank">#{i+1}</div>
                  <div className="item-title">{item.title}</div>
                  {item.author && item.author !== "Unknown" && <div className="item-sub">by {item.author}</div>}
                  <div className="item-price">
                    {item.currency || currency} {item.price?.toLocaleString()}
                    <small>/ item</small>
                  </div>
                  {item.reason && <div className="item-reason">{item.reason}</div>}
                  {item.url && (
                    <a className="item-link" href={item.url} target="_blank" rel="noreferrer">
                      View item ↗
                    </a>
                  )}
                </div>
              ))}
            </div>

            {result.summary && (
              <div className="summary-bar">
                <span style={{fontSize:18,flexShrink:0,marginTop:2}}>✦</span>
                <p><strong>Why this selection? </strong>{result.summary}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}