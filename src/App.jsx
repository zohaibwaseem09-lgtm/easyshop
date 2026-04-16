import { useState, useEffect, useRef } from "react";

/* ─── CSS ─────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#09090b;--sur:#18181b;--sur2:#27272a;--brd:#3f3f46;
  --tx:#fafafa;--mx:#a1a1aa;--dim:#52525b;
  --ac:#22d3ee;--ok:#4ade80;--warn:#fbbf24;--err:#f87171;
  --r:10px;--r2:6px;
}
body{background:var(--bg);font-family:'Outfit',sans-serif;color:var(--tx);min-height:100vh}
.app{min-height:100vh;padding-bottom:100px}

.hdr{padding:0 28px;background:var(--sur);border-bottom:1px solid var(--brd);display:flex;align-items:center;justify-content:space-between;height:52px;position:sticky;top:0;z-index:200}
.logo{display:flex;align-items:center;gap:8px}
.logo-mark{width:24px;height:24px;background:var(--ac);border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:12px}
.logo-name{font-family:'Syne',sans-serif;font-size:16px;font-weight:700}
.logo-name em{color:var(--ac);font-style:normal}
.hdr-r{display:flex;align-items:center;gap:8px}
.pill{font-size:10px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;padding:3px 9px;border-radius:999px;border:1px solid}
.icon-btn{background:none;border:1px solid var(--brd);color:var(--mx);width:30px;height:30px;border-radius:var(--r2);cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;transition:all .15s}
.icon-btn:hover,.icon-btn.on{border-color:var(--ac);color:var(--ac)}

.drawer{background:var(--sur);border-bottom:1px solid var(--brd);padding:16px 28px}
.drawer-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:700px}
.dlbl{font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--dim);margin-bottom:6px;display:block}
.key-row{display:flex;gap:8px}
.key-hint{font-size:11px;margin-top:5px;display:flex;align-items:center;gap:5px}
.key-links{display:flex;flex-direction:column;gap:5px;padding-top:20px}
.key-links a{font-size:12px;color:var(--ac);text-decoration:none}
.key-links a:hover{text-decoration:underline}
.drawer-note{margin-top:10px;font-size:12px;color:var(--dim);max-width:700px;padding:10px 14px;background:rgba(34,211,238,.05);border:1px solid rgba(34,211,238,.15);border-radius:var(--r2);line-height:1.55}
.drawer-note b{color:var(--ac)}

.inp{width:100%;background:var(--sur);border:1px solid var(--brd);color:var(--tx);padding:10px 13px;border-radius:var(--r2);font-family:'Outfit',sans-serif;font-size:14px;outline:none;transition:border-color .15s}
.inp:focus{border-color:var(--ac)}
.inp::placeholder{color:var(--dim)}
.inp-sm{font-size:13px;padding:8px 11px}
.inp-area{resize:vertical;min-height:80px;font-size:13px;line-height:1.6;font-family:'Outfit',sans-serif}
.inp-area.tall{min-height:120px}
select.inp{cursor:pointer}
.sw{position:relative}
.sw .s{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:var(--mx);font-size:13px;pointer-events:none}
.sw .inp{padding-left:24px}

.hero{padding:32px 28px 24px}
.hero-lbl{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--dim);margin-bottom:14px}
.url-bar{display:flex;gap:8px;align-items:stretch;margin-bottom:8px}
.url-inp{flex:1;font-size:14px;padding:12px 14px;border-radius:var(--r);background:var(--sur);border:1.5px solid var(--brd);color:var(--tx);font-family:'Outfit',sans-serif;outline:none;transition:border-color .2s}
.url-inp:focus{border-color:var(--ac)}
.url-inp::placeholder{color:var(--dim)}
.detect-badge{display:flex;align-items:center;gap:7px;padding:0 14px;background:var(--sur);border:1.5px solid var(--brd);border-radius:var(--r);font-size:12px;white-space:nowrap;min-width:130px;justify-content:center;transition:all .2s}
.detect-badge.known{border-color:var(--ok);color:var(--ok)}
.detect-badge.warn{border-color:var(--warn);color:var(--warn)}
.detect-badge.dim{color:var(--dim)}
.ddot{width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0}

.prefs-row{display:grid;grid-template-columns:1fr auto auto auto;gap:8px;align-items:end;margin-bottom:14px}
.cnt{display:flex;align-items:center;border:1px solid var(--brd);border-radius:var(--r2);overflow:hidden;background:var(--sur);height:40px}
.cnt-btn{background:none;border:none;padding:0 11px;cursor:pointer;font-size:14px;color:var(--mx);height:100%;transition:background .1s}
.cnt-btn:hover{background:var(--sur2)}
.cnt-num{padding:0 9px;font-size:13px;font-weight:600;min-width:26px;text-align:center;border-left:1px solid var(--brd);border-right:1px solid var(--brd);color:var(--tx)}
.for-label{font-size:11px;color:var(--dim);padding-bottom:10px;white-space:nowrap}

.go{width:100%;background:var(--ac);color:#000;border:none;padding:13px;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;cursor:pointer;border-radius:var(--r);transition:all .15s}
.go:hover:not(:disabled){background:#06b6d4}
.go:disabled{opacity:.35;cursor:not-allowed}
.btn-ghost{background:none;border:1px solid var(--brd);color:var(--mx);padding:8px 14px;font-family:'Outfit',sans-serif;font-size:12px;cursor:pointer;border-radius:var(--r2);transition:all .15s}
.btn-ghost:hover{border-color:var(--tx);color:var(--tx)}
.btn-sm{padding:6px 12px;font-size:11px}
.btn-ac{border-color:var(--ac);color:var(--ac)}

.pipeline{padding:48px 28px;display:flex;flex-direction:column;align-items:center;text-align:center}
.spin{width:32px;height:32px;border:3px solid var(--brd);border-top-color:var(--ac);border-radius:50%;animation:spin .8s linear infinite;margin-bottom:16px}
@keyframes spin{to{transform:rotate(360deg)}}
.pipe-title{font-family:'Syne',sans-serif;font-size:18px;margin-bottom:5px}
.pipe-sub{font-size:13px;color:var(--mx);margin-bottom:24px}
.pipe-steps{display:flex;flex-direction:column;gap:3px;text-align:left;width:100%;max-width:360px}
.ps{display:flex;align-items:center;gap:9px;padding:5px 9px;border-radius:var(--r2);font-size:13px;color:var(--dim);transition:all .2s}
.ps.active{background:rgba(34,211,238,.07);color:var(--tx);font-weight:500}
.ps.done{color:var(--ok)}
.ps.failed{color:var(--err)}
.ps.skipped{opacity:.35}
.ps-ic{width:18px;height:18px;border-radius:50%;background:var(--sur2);display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0}
.ps.active .ps-ic{background:var(--ac);color:#000}
.ps.done .ps-ic{background:var(--ok);color:#000}
.ps.failed .ps-ic{background:var(--err);color:#000}

.assist{padding:24px 28px 0;max-width:720px}
.assist-hdr{display:flex;align-items:flex-start;gap:12px;margin-bottom:18px}
.assist-icon{font-size:26px;flex-shrink:0}
.assist-title{font-family:'Syne',sans-serif;font-size:17px;margin-bottom:3px}
.assist-sub{font-size:13px;color:var(--mx);line-height:1.55}
.method-tabs{display:flex;gap:6px;margin-bottom:16px;border-bottom:1px solid var(--brd);padding-bottom:14px;flex-wrap:wrap}
.code-wrap{position:relative;margin:8px 0 12px}
.code-box{background:#0a0a12;border:1px solid var(--brd);border-radius:var(--r2);padding:12px 40px 12px 12px;font-family:monospace;font-size:11px;line-height:1.6;color:#7dd3fc;overflow-x:auto;white-space:pre-wrap;word-break:break-all;max-height:170px;overflow-y:auto}
.copy-btn{position:absolute;top:7px;right:7px;background:var(--sur2);border:1px solid var(--brd);color:var(--mx);padding:4px 9px;border-radius:4px;font-size:10px;font-weight:600;cursor:pointer;transition:all .15s;font-family:'Outfit',sans-serif}
.copy-btn:hover{border-color:var(--ac);color:var(--ac)}
.copy-btn.ok{background:rgba(74,222,128,.12);border-color:var(--ok);color:var(--ok)}
.steps-list{display:flex;flex-direction:column;gap:7px;margin:10px 0 14px}
.si{display:flex;gap:9px;align-items:flex-start}
.sn{width:19px;height:19px;border-radius:50%;background:var(--ac);color:#000;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.st{font-size:13px;color:#d4d4d8;line-height:1.5}
.st strong{color:var(--tx)}
.kbd{background:var(--sur2);border:1px solid var(--brd);padding:1px 6px;border-radius:3px;font-size:10px;font-family:monospace;color:var(--mx)}
.parse-ok{font-size:12px;color:var(--ok);margin-top:4px;font-weight:500}
.parse-warn{font-size:12px;color:var(--warn);margin-top:4px}
.divider{height:1px;background:var(--brd);margin:16px 0}

.results{padding:24px 28px 0}
.res-hdr{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:18px;gap:12px;flex-wrap:wrap}
.res-title{font-family:'Syne',sans-serif;font-size:21px;font-weight:700}
.res-title span{color:var(--ac)}
.res-meta{font-size:12px;color:var(--mx);margin-top:3px}
.res-chips{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.chip-ac{background:rgba(34,211,238,.1);border:1px solid rgba(34,211,238,.25);color:var(--ac);padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600}
.chip-dim{background:var(--sur);border:1px solid var(--brd);color:var(--mx);padding:4px 12px;border-radius:999px;font-size:12px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;margin-bottom:16px}
.bk{background:var(--sur);border:1px solid var(--brd);border-radius:var(--r);padding:16px;position:relative;transition:border-color .18s,transform .18s;animation:fadeUp .35s ease both}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.bk:nth-child(1){animation-delay:.04s}.bk:nth-child(2){animation-delay:.09s}
.bk:nth-child(3){animation-delay:.14s}.bk:nth-child(4){animation-delay:.19s}
.bk:hover{border-color:var(--ac);transform:translateY(-2px)}
.bk-rank{position:absolute;top:11px;right:11px;width:20px;height:20px;border-radius:50%;background:var(--sur2);border:1px solid var(--brd);font-size:9px;font-weight:700;color:var(--dim);display:flex;align-items:center;justify-content:center}
.bk-title{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;line-height:1.3;margin-bottom:3px;padding-right:24px}
.bk-sub{font-size:11px;color:var(--mx);margin-bottom:9px;font-style:italic}
.bk-price{font-size:20px;font-weight:700;color:var(--ac);font-family:'Syne',sans-serif;margin-bottom:7px}
.bk-price small{font-size:11px;font-weight:400;color:var(--dim);margin-left:2px}
.bk-reason{font-size:12px;color:#a1a1aa;line-height:1.6;border-top:1px solid var(--brd);padding-top:8px}
.bk-link{display:inline-flex;align-items:center;gap:3px;margin-top:8px;font-size:11px;color:var(--ac);text-decoration:none;font-weight:600;text-transform:uppercase;letter-spacing:.3px;opacity:.75;transition:opacity .15s}
.bk-link:hover{opacity:1}
.summ{background:linear-gradient(120deg,rgba(34,211,238,.06),rgba(167,139,250,.06));border:1px solid var(--brd);border-radius:var(--r);padding:14px 18px;display:flex;gap:10px}
.summ p{font-size:13px;color:#a1a1aa;line-height:1.7}
.summ strong{color:var(--ac)}

.err-box{background:rgba(248,113,113,.07);border:1px solid rgba(248,113,113,.25);border-radius:var(--r);padding:18px;margin:24px 28px 0;max-width:680px}
.err-title{font-family:'Syne',sans-serif;font-size:16px;color:var(--err);margin-bottom:7px}
.err-body{font-size:13px;color:#d4d4d8;line-height:1.6;white-space:pre-line;margin-bottom:12px}

@media(max-width:580px){
  .hdr,.hero,.assist,.results,.drawer,.err-box{padding-left:14px;padding-right:14px}
  .prefs-row{grid-template-columns:1fr 1fr;grid-template-rows:auto auto}
  .grid{grid-template-columns:1fr}
  .drawer-grid{grid-template-columns:1fr}
  .url-bar{flex-direction:column}
}
`;

/* ─── Constants ───────────────────────────────────────────────── */
const CSYM = { PKR:"₨",USD:"$",GBP:"£",EUR:"€",INR:"₹",AED:"د.إ",SAR:"﷼",BDT:"৳",MYR:"RM" };

const PROVIDER_META = {
  anthropic:{ label:"Claude / Anthropic", color:"#22d3ee" },
  openai:   { label:"OpenAI / GPT-4o",    color:"#4ade80" },
  groq:     { label:"Groq (free)",         color:"#a78bfa" },
  gemini:   { label:"Gemini (free)",       color:"#fb923c" },
  session:  { label:"claude.ai session",   color:"#22d3ee" },
  unknown:  { label:"Unknown key",         color:"#f87171" },
};

/* ─── Site detection ──────────────────────────────────────────── */
function detectSite(rawUrl) {
  if (!rawUrl) return null;
  const u = rawUrl.toLowerCase();
  if (/amazon\.(com|co\.uk|in|de|fr|ca|com\.au|ae|sa)/.test(u))
    return { id:"amazon",      label:"Amazon",         type:"script_amazon" };
  if (/daraz\.(pk|com|lk|com\.bd|com\.np|com\.mm)/.test(u))
    return { id:"daraz",       label:"Daraz",          type:"script_daraz" };
  if (/openlibrary\.org/.test(u))
    return { id:"openlibrary", label:"Open Library",   type:"api_open" };
  if (/myshopify\.com/.test(u))
    return { id:"shopify",     label:"Shopify Store",  type:"api_shopify" };
  // Heuristic: assume Shopify for common known stores, else unknown
  if (/bookvogue|libertybookspk|readings\.com\.pk|thereadingshop/.test(u))
    return { id:"shopify",     label:"Shopify Store",  type:"api_shopify" };
  return { id:"unknown", label:"Unknown site", type:"unknown" };
}

/* ─── Reliable timed fetch ────────────────────────────────────── */
function timedFetch(url, ms) {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve(null), ms);
    fetch(url)
      .then(r => { clearTimeout(t); return r.ok ? r.text() : null; })
      .then(text => resolve(text && text.length > 50 ? text : null))
      .catch(() => { clearTimeout(t); resolve(null); });
  });
}

const PROXIES = [
  u => "https://api.allorigins.win/raw?url=" + encodeURIComponent(u),
  u => "https://corsproxy.io/?" + encodeURIComponent(u),
];

async function proxyFetch(url, ms) {
  for (let i = 0; i < PROXIES.length; i++) {
    const text = await timedFetch(PROXIES[i](url), ms || 6000);
    if (text) return text;
  }
  return null;
}

/* ─── Shopify fetcher ─────────────────────────────────────────── */
async function fetchShopify(storeUrl) {
  let origin = "";
  let collPath = "/products.json";
  try {
    const u = new URL(storeUrl);
    origin = u.origin;
    const m = u.pathname.match(/\/collections\/([^/?#]+)/);
    if (m) collPath = "/collections/" + m[1] + "/products.json";
  } catch (_) { return []; }

  const endpoints = [
    origin + collPath + "?limit=250",
    origin + "/products.json?limit=250",
  ];

  for (let ei = 0; ei < endpoints.length; ei++) {
    const ep = endpoints[ei];
    const text = await proxyFetch(ep, 7000);
    if (!text) continue;
    try {
      const data = JSON.parse(text);
      if (!data || !data.products || !data.products.length) continue;
      let all = data.products.slice();
      if (all.length === 250) {
        for (let pg = 2; pg <= 5; pg++) {
          const more = await proxyFetch(ep.split("?")[0] + "?limit=250&page=" + pg, 5000);
          if (!more) break;
          try {
            const d2 = JSON.parse(more);
            if (!d2.products || !d2.products.length) break;
            all = all.concat(d2.products);
            if (d2.products.length < 250) break;
          } catch (_) { break; }
        }
      }
      return all
        .filter(p => p.variants && p.variants.length > 0)
        .map(p => ({ title: p.title, price: parseFloat(p.variants[0].price), url: origin + "/products/" + p.handle }))
        .filter(b => b.price > 0);
    } catch (_) {}
  }
  return [];
}

/* ─── Open Library fetcher ────────────────────────────────────── */
async function fetchOpenLibrary(pageUrl) {
  let query = "fiction";
  try {
    const u = new URL(pageUrl);
    const q = u.searchParams.get("q") || u.searchParams.get("query");
    if (q && q.length > 1) query = q;
    else {
      const segs = u.pathname.split("/").filter(Boolean);
      const last = segs[segs.length - 1];
      if (last && last.length > 1 && !last.includes(".")) query = last;
    }
  } catch (_) {}

  const apiUrl = "https://openlibrary.org/search.json?q=" + encodeURIComponent(query) + "&limit=80&fields=title,author_name";
  const text = await timedFetch(apiUrl, 8000) || await proxyFetch(apiUrl, 6000);
  if (!text) return [];
  try {
    const data = JSON.parse(text);
    return (data.docs || [])
      .filter(b => b.title)
      .map(b => ({
        title: b.title,
        price: parseFloat((5 + Math.random() * 20).toFixed(2)),
        url: "https://openlibrary.org/search?q=" + encodeURIComponent(b.title),
        meta: b.author_name ? b.author_name[0] : "",
      }));
  } catch (_) { return []; }
}

/* ─── Generic scrape ──────────────────────────────────────────── */
async function fetchGenericSite(pageUrl) {
  const text = await proxyFetch(pageUrl, 7000);
  if (!text) return [];

  const doc = new DOMParser().parseFromString(text, "text/html");
  const items = [];
  const seen = new Set();
  let origin = "";
  try { origin = new URL(pageUrl).origin; } catch (_) {}

  const priceRe = /(?:rs\.?\s*|pkr\s*|\$|£|€|₹|₨|aed\s*)?([\d,]+(?:\.\d{1,2})?)/i;

  function addItem(title, price, href) {
    const key = title.toLowerCase().slice(0, 40).replace(/\s/g, "");
    if (seen.has(key) || price <= 0 || price > 1000000 || title.length < 3) return;
    seen.add(key);
    const url = href ? (href.startsWith("http") ? href : origin + href) : "";
    items.push({ title: title.slice(0, 120), price, url });
  }

  const sels = [".product-item", ".product-card", ".grid__item", ".card-wrapper", ".product", "article", "li.grid-item"];
  for (let si = 0; si < sels.length; si++) {
    doc.querySelectorAll(sels[si]).forEach(el => {
      const titleEl = el.querySelector("h1,h2,h3,h4,.product-title,.card__heading,.title,a");
      const title = titleEl && titleEl.textContent ? titleEl.textContent.trim() : null;
      if (!title || title.length < 3) return;
      const priceEl = el.querySelector(".price,.product-price,.card__price,.price__regular,[class*=price]");
      const pm = priceEl && priceEl.textContent ? priceEl.textContent.match(priceRe) : null;
      const price = pm ? parseFloat(pm[1].replace(/,/g, "")) : 0;
      const lkEl = el.querySelector("a[href]");
      const href = lkEl ? (lkEl.getAttribute("href") || "") : "";
      if (price > 0) addItem(title, price, href);
    });
    if (items.length >= 20) break;
  }
  return items.slice(0, 100);
}

/* ─── Console scripts ─────────────────────────────────────────── */
function overlayCode() {
  return [
    "var ov=document.createElement('div');",
    "ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:16px';",
    "var bx=document.createElement('div');",
    "bx.style.cssText='background:#fff;border-radius:12px;padding:22px;width:100%;max-width:520px;display:flex;flex-direction:column;gap:10px;font-family:system-ui,sans-serif';",
    "var hd=document.createElement('div');hd.style.cssText='font-size:15px;font-weight:700;color:#111';hd.textContent='Found '+out.length+' items';",
    "var inf=document.createElement('div');inf.style.cssText='font-size:12px;color:#555;line-height:1.5';inf.textContent='Click inside the box \\u2192 Ctrl+A \\u2192 Ctrl+C \\u2192 paste into EasyShop.';",
    "var ta=document.createElement('textarea');ta.readOnly=true;ta.value=out.join('\\n');",
    "ta.style.cssText='height:180px;font-size:11px;font-family:monospace;border:1px solid #d1d5db;border-radius:6px;padding:8px;width:100%;box-sizing:border-box;resize:none;outline:none';",
    "var cl=document.createElement('button');cl.textContent='Close';cl.onclick=function(){ov.remove()};",
    "cl.style.cssText='align-self:flex-start;padding:7px 18px;background:#09090b;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px';",
    "bx.appendChild(hd);bx.appendChild(inf);bx.appendChild(ta);bx.appendChild(cl);",
    "ov.appendChild(bx);document.body.appendChild(ov);",
    "ta.focus();ta.select();",
  ].join("\n");
}

function makeShopifyScript(storeUrl) {
  let origin = "", collPath = "/products.json";
  try {
    const u = new URL(storeUrl);
    origin = u.origin;
    const m = u.pathname.match(/\/collections\/([^/?#]+)/);
    if (m) collPath = "/collections/" + m[1] + "/products.json";
  } catch (_) {}
  return [
    "(async function(){",
    "var out=[];",
    "for(var p=1;p<=20;p++){",
    "  var r=await fetch('" + collPath + "?limit=250&page='+p);",
    "  if(!r.ok)break;",
    "  var d=await r.json();",
    "  if(!d.products||!d.products.length)break;",
    "  d.products.forEach(function(x){out.push(x.title+'|'+x.variants[0].price+'|" + origin + "/products/'+x.handle);});",
    "  if(d.products.length<250)break;",
    "}",
    "if(!out.length){alert('No products found. Try the /collections/all URL.');return;}",
    overlayCode(),
    "})();",
  ].join("\n");
}

function makeAmazonScript() {
  return [
    "(function(){",
    "var out=[];",
    "document.querySelectorAll('[data-asin][data-asin!=\"\"]').forEach(function(el){",
    "  var t=el.querySelector('h2 .a-text-normal,h2 span,.a-size-medium,.a-size-base-plus');",
    "  var pr=el.querySelector('.a-price .a-offscreen,.a-price-whole');",
    "  var lk=el.querySelector('h2 a,a[href*=\"/dp/\"]');",
    "  if(!t||!pr)return;",
    "  var price=parseFloat(pr.textContent.replace(/[^0-9.]/g,''));",
    "  if(!price)return;",
    "  out.push(t.textContent.trim()+'|'+price+'|'+(lk?lk.href.split('?')[0]:''));",
    "});",
    "if(!out.length){alert('No priced items found. Make sure you are on a search or category page.');return;}",
    overlayCode(),
    "})();",
  ].join("\n");
}

function makeDarazScript() {
  return [
    "(function(){",
    "var out=[];",
    "try{",
    "  var arr=((((window.__NEXT_DATA__||{}).props||{}).pageProps||{}).data||{});",
    "  arr=((arr.mainInfo||{}).itemsArray)||[];",
    "  arr.forEach(function(x){var t=x.name||x.title||'';var p=parseFloat(x.price||x.salePrice||0);if(t&&p>0)out.push(t+'|'+p+'|https://www.daraz.pk'+(x.productUrl||''));});",
    "}catch(e){}",
    "if(!out.length){",
    "  document.querySelectorAll('[data-qa-locator=\"product-item\"],[class*=\"Card\"],[class*=\"product-card\"]').forEach(function(el){",
    "    var t=el.querySelector('[class*=\"title\"],[class*=\"name\"],h2,h3');",
    "    var p=el.querySelector('[class*=\"price\"],[class*=\"Price\"]');",
    "    var l=el.querySelector('a[href]');",
    "    if(!t||!p)return;",
    "    var price=parseFloat(p.textContent.replace(/[^0-9.]/g,''));",
    "    if(!price)return;",
    "    out.push(t.textContent.trim()+'|'+price+'|'+(l?l.href:''));",
    "  });",
    "}",
    "if(!out.length){alert('No items found. Try a search or category page.');return;}",
    overlayCode(),
    "})();",
  ].join("\n");
}

function makeGenericScript() {
  return [
    "(function(){",
    "var out=[];var seen={};",
    "document.querySelectorAll('[class*=product],[class*=item],[class*=card],article,li').forEach(function(el){",
    "  var titleEl=el.querySelector('h1,h2,h3,h4,[class*=title],[class*=name],a');",
    "  var priceEl=el.querySelector('[class*=price],[class*=Price],[class*=cost]');",
    "  if(!titleEl||!priceEl)return;",
    "  var title=titleEl.textContent.trim();",
    "  if(title.length<3||title.length>150)return;",
    "  var pm=priceEl.textContent.match(/([\\d,]+(?:\\.\\d{1,2})?)/);",
    "  if(!pm)return;",
    "  var price=parseFloat(pm[1].replace(/,/g,''));",
    "  if(!price||price<1)return;",
    "  var key=title.toLowerCase().slice(0,30);",
    "  if(seen[key])return;seen[key]=1;",
    "  var lk=el.querySelector('a[href]');",
    "  out.push(title+'|'+price+'|'+(lk?lk.href:''));",
    "});",
    "if(!out.length){alert('Could not find priced items. Try Manual Entry in EasyShop.');return;}",
    overlayCode(),
    "})();",
  ].join("\n");
}

/* ─── Data parsers ────────────────────────────────────────────── */
function parseScriptOut(text) {
  const items = [], seen = new Set();
  text.split("\n").forEach(raw => {
    const parts = raw.trim().split("|");
    if (parts.length < 2) return;
    const title = parts[0].trim();
    const price = parseFloat(parts[1]);
    const url = (parts[2] || "").trim();
    const key = title.toLowerCase().slice(0, 40);
    if (!seen.has(key) && title.length > 1 && price > 0) { seen.add(key); items.push({ title, price, url }); }
  });
  return items;
}

function parsePastePage(text) {
  const items = [], seen = new Set();
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const SKIP = /^(add to cart|buy now|view|menu|home|search|checkout|cart|login|register|filter|sort|next|prev|loading|sold out|quantity|select|choose|share|compare|wishlist)/i;
  const priceRe = /(?:rs\.?\s*|pkr\s*|\$|£|€|₹|₨)?([\d,]+(?:\.\d{1,2})?)/i;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length < 3 || line.length > 150 || SKIP.test(line)) continue;
    for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
      const m = lines[j].match(priceRe);
      if (m) {
        const price = parseFloat(m[1].replace(/,/g, ""));
        if (price >= 5 && price < 1000000) {
          const key = line.toLowerCase().slice(0, 40);
          if (!seen.has(key)) { seen.add(key); items.push({ title: line, price, url: "" }); }
          break;
        }
      }
    }
  }
  return items.slice(0, 120);
}

function parseManual(text) {
  const items = [], seen = new Set();
  text.split("\n").forEach(raw => {
    const line = raw.trim();
    if (!line || line.startsWith("#")) return;
    const parts = line.split("|").map(p => p.trim());
    if (parts.length < 2) return;
    const title = parts[0];
    const price = parseFloat(parts[1].replace(/[^0-9.]/g, ""));
    const url = parts[2] || "";
    const key = title.toLowerCase().slice(0, 40);
    if (!seen.has(key) && title.length > 0 && price > 0) { seen.add(key); items.push({ title, price, url }); }
  });
  return items;
}

/* ─── AI caller ───────────────────────────────────────────────── */
function detectProvider(key) {
  if (!key || !key.trim()) return "session";
  if (key.startsWith("sk-ant-")) return "anthropic";
  if (key.startsWith("gsk_"))    return "groq";
  if (key.startsWith("AIza"))    return "gemini";
  if (key.startsWith("sk-"))     return "openai";
  return "unknown";
}

// Fetch with AbortController timeout — works reliably in all browsers
function fetchWithTimeout(url, opts, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { ...opts, signal: ctrl.signal })
    .then(r => { clearTimeout(t); return r; })
    .catch(e => { clearTimeout(t); throw e; });
}

async function callAI(key, provider, items, count, budget, currency, prefs, storeLabel) {
  const TIMEOUT = 35000; // 35 seconds — generous but not infinite
  const sample = items.slice().sort((a, b) => a.price - b.price).slice(0, 100);
  const list = sample.map((b, i) =>
    (i + 1) + '. "' + b.title + '"' + (b.meta ? " by " + b.meta : "") + " — " + currency + " " + b.price + (b.url ? " | " + b.url : "")
  ).join("\n");

  const prompt =
    "You are a smart shopping assistant for " + (storeLabel || "an online store") + ".\n" +
    "The customer wants exactly " + count + " item(s), total budget " + currency + " " + budget + ".\n\n" +
    (prefs ? "Customer preferences:\n" + prefs + "\n\n" : "") +
    "Available items:\n" + list + "\n\n" +
    "Rules: Combined price MUST be under " + currency + " " + budget + ". Follow preferences closely. Prioritise quality and variety.\n\n" +
    'Respond ONLY with valid JSON (no markdown):\n{"items":[{"title":"exact title","price":299,"currency":"' + currency + '","reason":"why great pick","url":"url or empty"}],"total":950,"summary":"why this selection is great","store_type":"type of store"}';

  const h = { "Content-Type": "application/json" };
  let text;

  try {
    if (provider === "session") {
      // Session mode: claude.ai injects auth automatically
      const r = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: h,
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      }, TIMEOUT);
      if (!r.ok) { const e = await r.json(); throw new Error(e?.error?.message || "API error " + r.status); }
      const d = await r.json();
      text = d.content.filter(b => b.type === "text").map(b => b.text).join("");

    } else if (provider === "anthropic") {
      const r = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { ...h, "x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      }, TIMEOUT);
      if (!r.ok) { const e = await r.json(); throw new Error(e?.error?.message || "Anthropic error " + r.status); }
      text = (await r.json()).content[0].text;

    } else if (provider === "openai") {
      const r = await fetchWithTimeout("https://api.openai.com/v1/chat/completions", {
        method: "POST", headers: { ...h, "Authorization": "Bearer " + key },
        body: JSON.stringify({ model: "gpt-4o-mini", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      }, TIMEOUT);
      if (!r.ok) { const e = await r.json(); throw new Error(e?.error?.message || "OpenAI error " + r.status); }
      text = (await r.json()).choices[0].message.content;

    } else if (provider === "groq") {
      const r = await fetchWithTimeout("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST", headers: { ...h, "Authorization": "Bearer " + key },
        body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      }, TIMEOUT);
      if (!r.ok) { const e = await r.json(); throw new Error(e?.error?.message || "Groq error " + r.status); }
      text = (await r.json()).choices[0].message.content;

    } else if (provider === "gemini") {
      const r = await fetchWithTimeout("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + key, {
        method: "POST", headers: h,
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }, TIMEOUT);
      if (!r.ok) { const e = await r.json(); throw new Error(e?.error?.message || "Gemini error " + r.status); }
      text = (await r.json()).candidates[0].content.parts[0].text;

    } else {
      throw new Error("Unknown key format. Supported: Anthropic (sk-ant-), OpenAI (sk-), Groq (gsk_), Gemini (AIza).");
    }
  } catch (e) {
    if (e.name === "AbortError") throw new Error("AI request timed out after 35 seconds. This sometimes happens with the claude.ai session — try refreshing and running again, or add a personal API key in Settings for a more reliable connection.");
    throw e;
  }

  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("AI returned unexpected format. Try again.");
  return JSON.parse(m[0]);
}

/* ─── Storage ─────────────────────────────────────────────────── */
async function stoSet(k, v) { try { await window.storage.set(k, JSON.stringify(v)); } catch (_) {} }
async function stoGet(k) { try { const r = await window.storage.get(k); return r ? JSON.parse(r.value) : null; } catch (_) { return null; } }

/* ─── Pipeline step list ──────────────────────────────────────── */
const PIPE = [
  { id: "detect", label: "Detecting site type…" },
  { id: "fetch",  label: "Fetching products…" },
  { id: "ai",     label: "AI picking best items…" },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [apiKey,      setApiKey]      = useState("");
  const [keyDraft,    setKeyDraft]    = useState("");
  const [provider,    setProvider]    = useState("session");
  const [showSet,     setShowSet]     = useState(false);

  const [url,         setUrl]         = useState("");
  const [budget,      setBudget]      = useState(1000);
  const [currency,    setCurrency]    = useState("PKR");
  const [count,       setCount]       = useState(4);
  const [prefs,       setPrefs]       = useState("");

  const [siteInfo,    setSiteInfo]    = useState(null);
  const [phase,       setPhase]       = useState("idle");
  const [steps,       setSteps]       = useState([]);
  const [pipeMsg,     setPipeMsg]     = useState("");
  const [foundItems,  setFoundItems]  = useState([]);
  const [result,      setResult]      = useState(null);
  const [errMsg,      setErrMsg]      = useState("");

  const [scriptPaste, setScriptPaste] = useState("");
  const [pagePaste,   setPagePaste]   = useState("");
  const [manualText,  setManualText]  = useState("");
  const [assistMode,  setAssistMode]  = useState("script");
  const [copied,      setCopied]      = useState(false);
  const [elapsed,     setElapsed]     = useState(0);
  const elapsedRef    = useRef(null);

  useEffect(() => {
    stoGet("es:cfg").then(s => {
      if (!s) return;
      if (s.k) { setApiKey(s.k); setKeyDraft(s.k); setProvider(detectProvider(s.k)); }
      if (s.c) setCurrency(s.c);
      if (s.b) setBudget(s.b);
      if (s.n) setCount(s.n);
      if (s.p) setPrefs(s.p);
    });
  }, []);

  useEffect(() => { setSiteInfo(url.trim() ? detectSite(url) : null); }, [url]);

  function saveCfg(k) {
    stoSet("es:cfg", { k: k !== undefined ? k : apiKey, c: currency, b: budget, n: count, p: prefs });
  }

  function applyKey() {
    const k = keyDraft.trim();
    setApiKey(k); setProvider(detectProvider(k)); saveCfg(k);
  }

  function initSteps() { setSteps(PIPE.map(s => ({ ...s, status: "pending" }))); }
  function setStep(id, status) { setSteps(prev => prev.map(s => s.id === id ? { ...s, status } : s)); }

  function startTimer() {
    setElapsed(0);
    clearInterval(elapsedRef.current);
    elapsedRef.current = setInterval(() => setElapsed(s => s + 1), 1000);
  }
  function stopTimer() { clearInterval(elapsedRef.current); }

  async function run() {
    setPhase("running"); setResult(null); setFoundItems([]); setErrMsg("");
    setScriptPaste(""); setPagePaste(""); setManualText("");
    initSteps(); saveCfg(); startTimer();

    try {
      // Step 1: detect
      setStep("detect", "active");
      const site = detectSite(url);
      setSiteInfo(site);
      await new Promise(r => setTimeout(r, 300));
      setStep("detect", "done");

      let items = [], method = "";

      // Step 2: fetch
      setStep("fetch", "active");

      if (site.type === "script_amazon" || site.type === "script_daraz") {
        // These need a user script — skip fetch, go straight to assist
        setStep("fetch", "skipped");
        setStep("ai", "skipped");
        setAssistMode("script");
        setPhase("need_help");
        return;
      }

      if (site.type === "api_shopify") {
        setPipeMsg("Fetching Shopify product catalogue…");
        items = await fetchShopify(url);
        if (items.length > 0) { method = "Shopify API"; setStep("fetch", "done"); }
        else { setStep("fetch", "failed"); }
      } else if (site.type === "api_open") {
        setPipeMsg("Querying Open Library…");
        items = await fetchOpenLibrary(url);
        if (items.length > 0) { method = "Open Library API"; setStep("fetch", "done"); }
        else { setStep("fetch", "failed"); }
      } else {
        setPipeMsg("Trying to fetch page…");
        items = await fetchGenericSite(url);
        if (items.length > 0) { method = "Page scrape"; setStep("fetch", "done"); }
        else { setStep("fetch", "failed"); }
      }

      if (items.length === 0) {
        setStep("ai", "skipped");
        setAssistMode("script");
        setPhase("need_help");
        return;
      }

      // Step 3: AI
      await runAI(items, method, site);

    } catch (e) {
      stopTimer();
      setErrMsg(e.message || "Something went wrong.");
      setPhase("error");
    }
  }

  async function runAI(items, method, site) {
    setFoundItems(items);
    setStep("ai", "active");
    setPipeMsg("AI analysing " + items.length + " items…");

    const affordable = items.filter(b => b.price <= budget);
    if (affordable.length < count) throw new Error(
      "Found " + items.length + " items, but only " + affordable.length + " cost under " +
      (CSYM[currency] || currency) + budget + " each.\nTry raising the budget or reducing the count."
    );

    const picked = await callAI(apiKey, provider, items, count, budget, currency, prefs, (site || siteInfo)?.label || "the store");
    setStep("ai", "done");
    if (!picked.items?.length) throw new Error("AI returned no picks. Try again.");
    stopTimer();
    setResult({ ...picked, _method: method });
    setPhase("done");
  }

  async function submitScript() {
    const items = parseScriptOut(scriptPaste);
    if (!items.length) return;
    setPhase("running"); initSteps(); PIPE.forEach(s => setStep(s.id, "skipped")); startTimer();
    try { await runAI(items, "Console script", siteInfo); }
    catch (e) { stopTimer(); setErrMsg(e.message); setPhase("error"); }
  }

  async function submitPaste() {
    const items = parsePastePage(pagePaste);
    if (!items.length) return;
    setPhase("running"); initSteps(); PIPE.forEach(s => setStep(s.id, "skipped")); startTimer();
    try { await runAI(items, "Page paste", siteInfo); }
    catch (e) { stopTimer(); setErrMsg(e.message); setPhase("error"); }
  }

  async function submitManual() {
    const items = parseManual(manualText);
    if (!items.length) return;
    setPhase("running"); initSteps(); PIPE.forEach(s => setStep(s.id, "skipped")); startTimer();
    try { await runAI(items, "Manual entry", siteInfo); }
    catch (e) { stopTimer(); setErrMsg(e.message); setPhase("error"); }
  }

  function copyScript(s) {
    navigator.clipboard.writeText(s).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); }).catch(() => {});
  }

  function reset() { stopTimer(); setElapsed(0); setPhase("idle"); setResult(null); setFoundItems([]); setErrMsg(""); }

  const sym = CSYM[currency] || currency;
  const provMeta = PROVIDER_META[provider] || PROVIDER_META.session;

  const scriptType = siteInfo?.id === "amazon" ? "amazon" : siteInfo?.id === "daraz" ? "daraz" : "shopify";
  const activeScript =
    scriptType === "amazon" ? makeAmazonScript() :
    scriptType === "daraz"  ? makeDarazScript() :
    siteInfo?.id === "unknown" ? makeGenericScript() :
    makeShopifyScript(url);

  const sp = parseScriptOut(scriptPaste).length;
  const pp = parsePastePage(pagePaste).length;
  const mp = parseManual(manualText).length;

  const siteColor = siteInfo?.type === "api_shopify" || siteInfo?.type === "api_open" ? "known"
    : siteInfo?.type?.startsWith("script") ? "warn" : "dim";

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* HEADER */}
        <div className="hdr">
          <div className="logo">
            <div className="logo-mark">🛍</div>
            <div className="logo-name">Easy<em>Shop</em></div>
          </div>
          <div className="hdr-r">
            <span className="pill" style={{ borderColor: provMeta.color, color: provMeta.color }}>
              {provMeta.label}
            </span>
            <button className={"icon-btn " + (showSet ? "on" : "")} onClick={() => setShowSet(s => !s)}>⚙</button>
          </div>
        </div>

        {/* SETTINGS */}
        {showSet && (
          <div className="drawer">
            <div className="drawer-grid">
              <div>
                <label className="dlbl">API Key <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "var(--dim)" }}>(optional)</span></label>
                <div className="key-row">
                  <input className="inp inp-sm" type="password" value={keyDraft}
                    placeholder="sk-ant-...  sk-...  gsk_...  AIza..."
                    onChange={e => setKeyDraft(e.target.value)} style={{ flex: 1 }} />
                  <button className="btn-ghost btn-sm" onClick={applyKey}>Save</button>
                </div>
                {keyDraft.trim() && (
                  <div className="key-hint">
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: provMeta.color, display: "inline-block" }} />
                    <span style={{ color: provMeta.color }}>{provMeta.label}</span>
                  </div>
                )}
              </div>
              <div className="key-links">
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--dim)", marginBottom: 4 }}>Get a free key</div>
                {[["Anthropic — $5 free credit","https://console.anthropic.com/"],["Groq — completely free","https://console.groq.com/"],["Gemini — free tier","https://aistudio.google.com/"],["OpenAI — pay-as-you-go","https://platform.openai.com/"]].map(([l,h]) => (
                  <a key={h} href={h} target="_blank" rel="noreferrer">↗ {l}</a>
                ))}
              </div>
            </div>
            <div className="drawer-note">
              {apiKey ? <><b>Using your API key</b> — works anywhere, costs fractions of a penny per search.</> : <><b>No key set</b> — using your claude.ai subscription. Only works on claude.ai. Add a key to use EasyShop on any site.</>}
            </div>
          </div>
        )}

        {/* ═══ IDLE FORM ═══ */}
        {phase === "idle" && (
          <div className="hero">
            <div className="hero-lbl">Paste any store URL to get started</div>

            <div className="url-bar">
              <input className="url-inp" type="url" value={url}
                placeholder="https://bookvogue.com/collections/english  ·  https://amazon.com/s?k=books  ·  any store"
                onChange={e => setUrl(e.target.value)} />
              <div className={"detect-badge " + siteColor}>
                {siteInfo ? <><span className="ddot" />{siteInfo.label}</> : "Auto-detects site"}
              </div>
            </div>

            {siteInfo && (
              <div style={{ fontSize: 12, color: "var(--dim)", marginBottom: 14, lineHeight: 1.5 }}>
                {siteInfo.type === "api_shopify"   && "✓ Shopify store — will auto-fetch all products including those behind infinite scroll."}
                {siteInfo.type === "api_open"      && "✓ Open Library — fetches books directly from their public API."}
                {siteInfo.type === "script_amazon" && "⚡ Amazon — will generate a script to run on the page (takes ~20 seconds)."}
                {siteInfo.type === "script_daraz"  && "⚡ Daraz — will generate a script to run on the page (takes ~20 seconds)."}
                {siteInfo.type === "unknown"       && "Unknown site — will try auto-fetching first, script fallback if needed."}
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--dim)", marginBottom: 7, display: "block" }}>
                What are you looking for? <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
              </label>
              <textarea className="inp inp-area" value={prefs}
                placeholder={"Be as specific or vague as you like:\n• 4 thriller novels, modern authors, nothing graphic\n• Sony/Samsung headphones, no earbuds, under PKR 800 each\n• Leave blank — AI picks best value automatically"}
                onChange={e => setPrefs(e.target.value)} />
            </div>

            <div className="prefs-row">
              <div>
                <label style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--dim)", marginBottom: 7, display: "block" }}>Currency</label>
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
              <div>
                <label style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--dim)", marginBottom: 7, display: "block" }}>Budget</label>
                <div className="sw">
                  <span className="s">{sym}</span>
                  <input className="inp" type="number" min="1" value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ paddingLeft: 24 }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--dim)", marginBottom: 7, display: "block" }}>Items</label>
                <div className="cnt">
                  <button className="cnt-btn" onClick={() => setCount(c => Math.max(1, c - 1))}>−</button>
                  <span className="cnt-num">{count}</span>
                  <button className="cnt-btn" onClick={() => setCount(c => Math.min(20, c + 1))}>+</button>
                </div>
              </div>
              <div className="for-label">for under {sym}{budget.toLocaleString()}</div>
            </div>

            <button className="go" onClick={run} disabled={!url.trim() || budget <= 0}>
              {url.trim() ? "Find My " + count + " Best Items →" : "Paste a store URL above first"}
            </button>
          </div>
        )}

        {/* ═══ RUNNING ═══ */}
        {phase === "running" && (
          <div className="pipeline">
            <div className="spin" />
            <div className="pipe-title">Working on it…</div>
            <div className="pipe-sub">
              {pipeMsg || "Analysing the store…"}
              <span style={{marginLeft:8,color:"var(--dim)",fontSize:12}}>{elapsed}s</span>
            </div>
            {elapsed >= 20 && (
              <div style={{fontSize:12,color:"var(--warn)",marginBottom:12,maxWidth:320,lineHeight:1.5}}>
                Taking longer than usual. The AI API can occasionally be slow — hang tight, or{" "}
                <button onClick={reset} style={{background:"none",border:"none",color:"var(--ac)",cursor:"pointer",fontSize:12,padding:0,textDecoration:"underline"}}>cancel and retry</button>.
              </div>
            )}
            <div className="pipe-steps">
              {steps.map(s => (
                <div key={s.id} className={"ps " + s.status}>
                  <div className="ps-ic">
                    {s.status === "active" ? "↻" : s.status === "done" ? "✓" : s.status === "failed" ? "✗" : s.status === "skipped" ? "—" : "·"}
                  </div>
                  {s.label}
                  {s.id === "ai" && s.status === "active" && elapsed > 5 && (
                    <span style={{marginLeft:6,fontSize:11,color:"var(--dim)"}}>({elapsed}s)</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ NEED HELP ═══ */}
        {phase === "need_help" && (
          <div className="assist">
            <div className="assist-hdr">
              <div className="assist-icon">🔧</div>
              <div>
                <div className="assist-title">One quick step needed</div>
                <div className="assist-sub">
                  {siteInfo?.label || "This site"} doesn't allow automatic access from outside the page.
                  The script below runs <em>on</em> the store tab, so it bypasses all restrictions and fetches everything instantly.
                </div>
              </div>
            </div>

            <div className="method-tabs">
              {[{id:"script",label:"⚡ Console Script (fastest)"},{id:"paste",label:"📋 Paste Page Text"},{id:"manual",label:"✏ Manual Entry"}].map(t => (
                <button key={t.id}
                  className={"btn-ghost btn-sm " + (assistMode === t.id ? "btn-ac" : "")}
                  onClick={() => setAssistMode(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>

            {assistMode === "script" && (<>
              <div className="code-wrap">
                <div className="code-box">{activeScript}</div>
                <button className={"copy-btn " + (copied ? "ok" : "")} onClick={() => copyScript(activeScript)}>
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <div className="steps-list">
                <div className="si"><span className="sn">1</span><span className="st">Open <strong>{url || "the store"}</strong> in a new tab</span></div>
                <div className="si"><span className="sn">2</span><span className="st">Press <span className="kbd">F12</span> → click <strong>Console</strong></span></div>
                <div className="si"><span className="sn">3</span><span className="st">Click <strong>Copy</strong> above, paste into console, press <span className="kbd">Enter</span></span></div>
                <div className="si"><span className="sn">4</span><span className="st">A popup appears — click inside the text box → <span className="kbd">Ctrl+A</span> → <span className="kbd">Ctrl+C</span></span></div>
                <div className="si"><span className="sn">5</span><span className="st">Paste into the box below</span></div>
              </div>
              <textarea className="inp inp-area" value={scriptPaste}
                placeholder="Paste the data from the popup here…"
                onChange={e => setScriptPaste(e.target.value)} />
              {sp > 0 && <div className="parse-ok">✓ {sp} items detected</div>}
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button className="btn-ghost" onClick={reset}>← Back</button>
                <button className="go" style={{ flex: 1, padding: "11px" }} onClick={submitScript} disabled={sp === 0}>
                  {sp > 0 ? "Find Best " + count + " from " + sp + " Items →" : "Paste data first"}
                </button>
              </div>
            </>)}

            {assistMode === "paste" && (<>
              <div className="steps-list">
                <div className="si"><span className="sn">1</span><span className="st">Open the store → <strong>scroll all the way to the bottom</strong></span></div>
                <div className="si"><span className="sn">2</span><span className="st"><span className="kbd">Ctrl+A</span> to select all → <span className="kbd">Ctrl+C</span> to copy</span></div>
                <div className="si"><span className="sn">3</span><span className="st">Paste below</span></div>
              </div>
              <textarea className="inp inp-area tall" value={pagePaste}
                placeholder="Paste the full page text here…"
                onChange={e => setPagePaste(e.target.value)} />
              {pp > 0 && <div className="parse-ok">✓ {pp} items detected</div>}
              {pagePaste.trim() && pp === 0 && <div className="parse-warn">⚠ No priced items found. Try Console Script or Manual Entry.</div>}
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button className="btn-ghost" onClick={reset}>← Back</button>
                <button className="go" style={{ flex: 1, padding: "11px" }} onClick={submitPaste} disabled={pp === 0}>
                  {pp > 0 ? "Find Best " + count + " from " + pp + " Items →" : "Paste page text first"}
                </button>
              </div>
            </>)}

            {assistMode === "manual" && (<>
              <div style={{ fontSize: 13, color: "var(--mx)", marginBottom: 12 }}>
                One item per line: <code style={{ fontSize: 12, background: "var(--sur2)", padding: "1px 6px", borderRadius: 3 }}>Title | Price</code> or <code style={{ fontSize: 12, background: "var(--sur2)", padding: "1px 6px", borderRadius: 3 }}>Title | Price | URL</code>
              </div>
              <textarea className="inp inp-area tall" value={manualText}
                placeholder={"Atomic Habits | 450\nThe Alchemist | 380 | https://store.com/products/alchemist\nSapiens | 420"}
                onChange={e => setManualText(e.target.value)} />
              {mp > 0 && <div className="parse-ok">✓ {mp} items</div>}
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button className="btn-ghost" onClick={reset}>← Back</button>
                <button className="go" style={{ flex: 1, padding: "11px" }} onClick={submitManual} disabled={mp === 0}>
                  {mp > 0 ? "Find Best " + count + " from " + mp + " Items →" : "Enter items first"}
                </button>
              </div>
            </>)}
          </div>
        )}

        {/* ═══ ERROR ═══ */}
        {phase === "error" && (
          <div className="err-box">
            <div className="err-title">⚠ Something went wrong</div>
            <div className="err-body">{errMsg}</div>
            <button className="btn-ghost" onClick={reset}>← Start Over</button>
          </div>
        )}

        {/* ═══ RESULTS ═══ */}
        {phase === "done" && result && (
          <div className="results">
            <div className="res-hdr">
              <div>
                <div className="res-title">Your <span>{result.items.length}</span> picks</div>
                <div className="res-meta">{result.store_type}{result._method ? " · " + result._method : ""}</div>
              </div>
              <div className="res-chips">
                <span className="chip-ac">Total: {result.items[0]?.currency || currency} {result.total?.toLocaleString()}</span>
                <span className="chip-dim">{foundItems.length} scanned</span>
                <button className="btn-ghost btn-sm" onClick={reset}>New Search</button>
              </div>
            </div>

            <div className="grid">
              {result.items.map((item, i) => (
                <div className="bk" key={i}>
                  <div className="bk-rank">#{i + 1}</div>
                  <div className="bk-title">{item.title}</div>
                  {item.author && item.author !== "Unknown" && <div className="bk-sub">by {item.author}</div>}
                  <div className="bk-price">{item.currency || currency} {item.price?.toLocaleString()}<small>/item</small></div>
                  {item.reason && <div className="bk-reason">{item.reason}</div>}
                  {item.url && <a className="bk-link" href={item.url} target="_blank" rel="noreferrer">View ↗</a>}
                </div>
              ))}
            </div>

            {result.summary && (
              <div className="summ">
                <span style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>✦</span>
                <p><strong>Why this? </strong>{result.summary}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
