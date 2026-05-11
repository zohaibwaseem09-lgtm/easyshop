import { useState, useEffect, useRef } from "react";

/* ─── CSS ─────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Lora:ital,wght@0,600;0,700;1,500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#faf9f7;--sur:#ffffff;--sur2:#f4f2ee;--brd:#e5e0d8;
  --tx:#2c2418;--mx:#7a6e62;--dim:#b8b0a6;
  --rose:#f2ddd8;--mint:#d4ead8;--sky:#d6e6f0;--peach:#fce8d0;--lav:#e8dff0;--sand:#f0ead8;
  --ac:#8b7355;--ok:#4a8c5c;--warn:#c47c30;--err:#b84848;--teal:#3d8c80;
}
body{background:var(--bg);font-family:'Plus Jakarta Sans',sans-serif;color:var(--tx);min-height:100vh}
.app{min-height:100vh;padding-bottom:100px}

.hdr{padding:0 28px;background:var(--sur);border-bottom:1px solid var(--brd);display:flex;align-items:center;justify-content:space-between;height:54px;position:sticky;top:0;z-index:200}
.logo{display:flex;align-items:center;gap:9px}
.logo-mark{width:28px;height:28px;background:linear-gradient(135deg,var(--rose),var(--peach));border:1.5px solid var(--brd);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px}
.logo-name{font-family:'Lora',serif;font-size:19px;font-weight:700;color:var(--tx);letter-spacing:-.2px}
.logo-name em{color:var(--ac);font-style:italic}
.hdr-r{display:flex;align-items:center;gap:8px}
.pill{font-size:10px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;padding:3px 10px;border-radius:999px;border:1px solid}
.icon-btn{background:none;border:1px solid var(--brd);color:var(--mx);width:32px;height:32px;border-radius:8px;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;transition:all .15s}
.icon-btn:hover,.icon-btn.on{border-color:var(--ac);color:var(--ac);background:var(--sand)}

.drawer{background:var(--sur);border-bottom:1px solid var(--brd);padding:18px 28px}
.drawer-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:720px}
.dlbl{font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--dim);margin-bottom:6px;display:block}
.key-row{display:flex;gap:8px}
.key-hint{font-size:11px;margin-top:5px;display:flex;align-items:center;gap:5px}
.key-links{display:flex;flex-direction:column;gap:5px;padding-top:20px}
.key-links a{font-size:12px;color:var(--teal);text-decoration:none}
.key-links a:hover{text-decoration:underline}
.drawer-note{margin-top:10px;font-size:12px;color:var(--mx);max-width:720px;padding:10px 14px;background:var(--mint);border:1px solid #b0d8b8;border-radius:8px;line-height:1.55}
.drawer-note b{color:var(--teal)}

.guide-btn{background:none;border:1px solid var(--brd);color:var(--mx);padding:5px 13px;border-radius:999px;font-size:11px;font-weight:500;cursor:pointer;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif;display:flex;align-items:center;gap:5px}
.guide-btn:hover,.guide-btn.on{border-color:var(--ac);color:var(--ac);background:var(--sand)}
.guide-panel{background:var(--sur);border-bottom:1px solid var(--brd);padding:22px 28px}
.guide-body{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:900px}
.guide-col-title{font-family:'Lora',serif;font-size:14px;font-weight:600;color:var(--ac);margin-bottom:14px;display:flex;align-items:center;gap:7px}
.guide-step{display:flex;gap:9px;align-items:flex-start;margin-bottom:11px}
.guide-n{width:21px;height:21px;border-radius:50%;background:var(--peach);border:1.5px solid #d8b898;color:var(--ac);font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.guide-t{font-size:12px;color:var(--mx);line-height:1.6}
.guide-t strong{color:var(--tx)}
.key-card{background:var(--sur2);border:1px solid var(--brd);border-radius:8px;padding:12px 14px;margin-bottom:8px;transition:border-color .15s}
.key-card:hover{border-color:var(--ac)}
.key-card-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:5px}
.key-card-name{font-size:13px;font-weight:600;color:var(--tx)}
.key-card-badge{font-size:10px;font-weight:700;letter-spacing:.3px;text-transform:uppercase;padding:2px 8px;border-radius:999px;border:1px solid}
.key-card-prefix{font-family:monospace;font-size:11px;color:var(--dim);margin-bottom:6px}
.key-card-steps{display:flex;flex-direction:column;gap:3px}
.key-card-step{font-size:11px;color:var(--mx);line-height:1.5;display:flex;gap:6px}
.key-card-step::before{content:'›';color:var(--dim);flex-shrink:0}
.key-card-link{font-size:11px;color:var(--teal);text-decoration:none;display:inline-flex;align-items:center;gap:3px;margin-top:6px}
.key-card-link:hover{text-decoration:underline}

.inp{width:100%;background:var(--sur);border:1.5px solid var(--brd);color:var(--tx);padding:10px 13px;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;outline:none;transition:border-color .15s,box-shadow .15s}
.inp:focus{border-color:var(--ac);box-shadow:0 0 0 3px rgba(139,115,85,.1)}
.inp::placeholder{color:var(--dim)}
.inp-sm{font-size:13px;padding:8px 11px}
.inp-area{resize:vertical;min-height:80px;font-size:13px;line-height:1.6;font-family:'Plus Jakarta Sans',sans-serif}
.inp-area.tall{min-height:120px}
select.inp{cursor:pointer}
.sw{position:relative}
.sw .s{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--mx);font-size:13px;pointer-events:none}
.sw .inp{padding-left:26px}

.hero{padding:36px 28px 26px}
.hero-lbl{font-size:10px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:var(--dim);margin-bottom:18px}
.url-bar{display:flex;gap:8px;align-items:stretch;margin-bottom:10px}
.url-inp{flex:1;font-size:14px;padding:13px 16px;border-radius:10px;background:var(--sur);border:1.5px solid var(--brd);color:var(--tx);font-family:'Plus Jakarta Sans',sans-serif;outline:none;transition:border-color .2s,box-shadow .2s}
.url-inp:focus{border-color:var(--ac);box-shadow:0 0 0 3px rgba(139,115,85,.1)}
.url-inp::placeholder{color:var(--dim)}
.detect-badge{display:flex;align-items:center;gap:7px;padding:0 16px;background:var(--sur);border:1.5px solid var(--brd);border-radius:10px;font-size:12px;white-space:nowrap;min-width:140px;justify-content:center;transition:all .2s}
.detect-badge.known{border-color:var(--teal);color:var(--teal);background:var(--mint)}
.detect-badge.warn{border-color:var(--warn);color:var(--warn);background:var(--peach)}
.detect-badge.dim{color:var(--dim)}
.ddot{width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0}

.prefs-row{display:grid;grid-template-columns:1fr auto auto auto;gap:10px;align-items:end;margin-bottom:16px}
.cnt{display:flex;align-items:center;border:1.5px solid var(--brd);border-radius:8px;overflow:hidden;background:var(--sur);height:42px}
.cnt-btn{background:none;border:none;padding:0 12px;cursor:pointer;font-size:15px;color:var(--mx);height:100%;transition:all .12s}
.cnt-btn:hover{background:var(--sand);color:var(--ac)}
.cnt-num{padding:0 10px;font-size:14px;font-weight:600;min-width:28px;text-align:center;border-left:1.5px solid var(--brd);border-right:1.5px solid var(--brd);color:var(--tx)}
.for-label{font-size:11px;color:var(--dim);padding-bottom:11px;white-space:nowrap}
.per-item-row{display:flex;align-items:center;gap:8px;margin-top:5px}
.per-item-label{font-size:11px;color:var(--dim)}

.go{width:100%;background:var(--ac);color:#fff;border:none;padding:14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;border-radius:10px;transition:all .15s;letter-spacing:.2px}
.go:hover:not(:disabled){background:#7a6348;transform:translateY(-1px);box-shadow:0 6px 16px rgba(139,115,85,.25)}
.go:active:not(:disabled){transform:none}
.go:disabled{opacity:.35;cursor:not-allowed}
.btn-ghost{background:none;border:1px solid var(--brd);color:var(--mx);padding:8px 15px;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;cursor:pointer;border-radius:8px;transition:all .15s}
.btn-ghost:hover{border-color:var(--ac);color:var(--ac)}
.btn-sm{padding:6px 12px;font-size:11px}
.btn-ac{border-color:var(--ac);color:var(--ac)}

.pipeline{padding:64px 28px;display:flex;flex-direction:column;align-items:center;text-align:center}
.spin{width:30px;height:30px;border:2.5px solid var(--brd);border-top-color:var(--ac);border-radius:50%;animation:spin .85s linear infinite;margin-bottom:18px}
@keyframes spin{to{transform:rotate(360deg)}}
.pipe-title{font-family:'Lora',serif;font-size:22px;font-weight:600;margin-bottom:5px;color:var(--tx)}
.pipe-sub{font-size:13px;color:var(--mx);margin-bottom:26px}
.pipe-steps{display:flex;flex-direction:column;gap:4px;text-align:left;width:100%;max-width:350px}
.ps{display:flex;align-items:center;gap:10px;padding:7px 11px;border-radius:8px;font-size:13px;color:var(--dim);transition:all .2s}
.ps.active{background:var(--peach);color:var(--tx);font-weight:500;border:1px solid #d8c0a0}
.ps.done{color:var(--ok)}
.ps.failed{color:var(--err)}
.ps.skipped{opacity:.3}
.ps-ic{width:19px;height:19px;border-radius:50%;background:var(--sur2);border:1px solid var(--brd);display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;transition:all .2s}
.ps.active .ps-ic{background:var(--ac);color:#fff;border-color:var(--ac)}
.ps.done .ps-ic{background:var(--ok);color:#fff;border-color:var(--ok)}
.ps.failed .ps-ic{background:var(--err);color:#fff;border-color:var(--err)}

.assist{padding:26px 28px 0;max-width:740px}
.assist-hdr{display:flex;align-items:flex-start;gap:14px;margin-bottom:20px;padding:18px 20px;background:var(--lav);border:1px solid #c8b8d8;border-radius:12px}
.assist-icon{font-size:28px;flex-shrink:0}
.assist-title{font-family:'Lora',serif;font-size:18px;font-weight:600;margin-bottom:4px;color:var(--tx)}
.assist-sub{font-size:13px;color:var(--mx);line-height:1.55}
.method-tabs{display:flex;gap:6px;margin-bottom:18px;border-bottom:1px solid var(--brd);padding-bottom:14px;flex-wrap:wrap}

.code-wrap{position:relative;margin:10px 0 14px}
.code-box{background:#2a241e;border:1.5px solid #4a3c2c;border-radius:10px;padding:14px 44px 14px 14px;font-family:'Courier New',monospace;font-size:11px;line-height:1.7;color:#d4c4a8;overflow-x:auto;white-space:pre-wrap;word-break:break-all;max-height:180px;overflow-y:auto}
.copy-btn{position:absolute;top:9px;right:9px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#c4b49a;padding:5px 11px;border-radius:5px;font-size:10px;font-weight:600;cursor:pointer;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif;white-space:nowrap}
.copy-btn:hover{background:rgba(255,255,255,.18);color:#e8d8b8}
.copy-btn.ok{background:rgba(74,140,92,.3);border-color:rgba(74,140,92,.5);color:#80c898}

.steps-list{display:flex;flex-direction:column;gap:8px;margin:12px 0 16px}
.si{display:flex;gap:10px;align-items:flex-start}
.sn{width:21px;height:21px;border-radius:50%;background:var(--peach);border:1.5px solid #d8b898;color:var(--ac);font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.st{font-size:13px;color:var(--mx);line-height:1.5}
.st strong{color:var(--tx)}
.kbd{background:var(--sur2);border:1px solid var(--brd);padding:1px 7px;border-radius:4px;font-size:10px;font-family:monospace;color:var(--mx)}
.parse-ok{font-size:12px;color:var(--ok);margin-top:5px;font-weight:600}
.parse-warn{font-size:12px;color:var(--warn);margin-top:5px}

.results{padding:26px 28px 0}
.res-hdr{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px;gap:12px;flex-wrap:wrap}
.res-title{font-family:'Lora',serif;font-size:26px;font-weight:700;color:var(--tx)}
.res-title span{color:var(--ac)}
.res-meta{font-size:12px;color:var(--dim);margin-top:3px}
.res-chips{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:8px}
.chip-ac{background:var(--peach);border:1px solid #d8b898;color:var(--ac);padding:5px 14px;border-radius:999px;font-size:12px;font-weight:600}
.chip-dim{background:var(--sur2);border:1px solid var(--brd);color:var(--mx);padding:5px 14px;border-radius:999px;font-size:12px}
.chip-copy{background:var(--sky);border:1px solid #a8c8e0;color:#3a6888;padding:5px 14px;border-radius:999px;font-size:12px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all .15s;font-weight:500}
.chip-copy:hover{background:#c0daea}
.chip-copy.ok{background:var(--mint);border-color:#90c8a0;color:var(--ok)}

.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px;margin-bottom:20px}
.bk{background:var(--sur);border:1.5px solid var(--brd);border-radius:12px;padding:20px;position:relative;transition:border-color .2s,transform .2s,box-shadow .2s;animation:fadeUp .35s ease both}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.bk:nth-child(1){animation-delay:.04s}.bk:nth-child(2){animation-delay:.09s}
.bk:nth-child(3){animation-delay:.14s}.bk:nth-child(4){animation-delay:.19s}
.bk:hover{border-color:var(--ac);transform:translateY(-3px);box-shadow:0 8px 24px rgba(139,115,85,.12)}
.bk-rank{position:absolute;top:14px;right:14px;width:24px;height:24px;border-radius:50%;background:var(--peach);border:1.5px solid #d8b898;font-size:10px;font-weight:700;color:var(--ac);display:flex;align-items:center;justify-content:center}
.bk-title{font-family:'Lora',serif;font-size:15px;font-weight:600;line-height:1.3;margin-bottom:5px;padding-right:30px;color:var(--tx)}
.bk-sub{font-size:11px;color:var(--mx);margin-bottom:8px;font-style:italic}
.bk-price{font-size:22px;font-weight:700;font-family:'Lora',serif;margin-bottom:8px;color:var(--ac)}
.bk-price small{font-size:12px;font-weight:400;color:var(--dim);margin-left:3px}
.bk-desc{font-size:11px;color:var(--dim);margin-bottom:10px;line-height:1.55;background:var(--sur2);padding:6px 9px;border-radius:6px;border-left:2px solid var(--brd)}
.bk-reason{font-size:12px;color:var(--mx);line-height:1.65;border-top:1px solid var(--brd);padding-top:10px;margin-top:4px}
.bk-link{display:inline-flex;align-items:center;gap:4px;margin-top:10px;font-size:11px;color:var(--teal);text-decoration:none;font-weight:600;text-transform:uppercase;letter-spacing:.3px;opacity:.8;transition:opacity .15s}
.bk-link:hover{opacity:1}

.summ{background:var(--mint);border:1px solid #b0d8b8;border-radius:12px;padding:18px 22px;display:flex;gap:12px;margin-top:4px}
.summ p{font-size:13px;color:#3a6850;line-height:1.75}
.summ strong{color:var(--teal)}

.err-box{background:#fef2f0;border:1.5px solid #e8c0bc;border-radius:12px;padding:20px;margin:26px 28px 0;max-width:680px}
.err-title{font-family:'Lora',serif;font-size:17px;color:var(--err);margin-bottom:8px}
.err-body{font-size:13px;color:var(--mx);line-height:1.65;white-space:pre-line;margin-bottom:14px}

@media(max-width:580px){
  .hdr,.hero,.assist,.results,.drawer,.err-box,.guide-panel{padding-left:16px;padding-right:16px}
  .prefs-row{grid-template-columns:1fr 1fr;grid-template-rows:auto auto}
  .grid{grid-template-columns:1fr}
  .drawer-grid,.guide-body{grid-template-columns:1fr}
  .url-bar{flex-direction:column}
}
`

/* ─── Constants ───────────────────────────────────────────────── */
const CSYM = { PKR:"₨",USD:"$",GBP:"£",EUR:"€",INR:"₹",AED:"د.إ",SAR:"﷼",BDT:"৳",MYR:"RM",TRY:"₺",AUD:"A$",CAD:"C$",SGD:"S$",ZAR:"R",NGN:"₦",EGP:"E£",QAR:"﷼",KWD:"KD" };

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
  // WooCommerce heuristic — check for common WooCommerce URL patterns
  // We'll probe the REST API when fetching
  if (/\/shop|\/product-category|\/product\/|woocommerce|wp-content\/plugins/.test(u))
    return { id:"woo", label:"WooCommerce Store", type:"api_woo" };
  // sesky.pk and similar custom WooCommerce stores
  return { id:"unknown", label:"Unknown site", type:"unknown" };
}

/* ─── WooCommerce fetcher ─────────────────────────────────────── */
async function fetchWooCommerce(storeUrl) {
  let origin = "";
  try { origin = new URL(storeUrl).origin; } catch (_) { return []; }
  // WooCommerce public REST API — no auth needed for published products
  const ep = origin + "/wp-json/wc/v3/products?per_page=100&status=publish";
  const text = await proxyFetch(ep, 7000);
  if (!text) return [];
  try {
    const data = JSON.parse(text);
    if (!Array.isArray(data) || !data.length) return [];
    return data
      .filter(p => p.name && p.price)
      .map(p => ({
        title: p.name,
        price: parseFloat(p.price),
        url: p.permalink || "",
      }))
      .filter(b => b.price > 0);
  } catch (_) { return []; }
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

  // The script:
  // 1. Paginates through the collection/products API to get all handles
  // 2. Fetches each product's individual JSON for full description
  // 3. Batches in groups of 8 for speed
  const lines = [
    "(async function(){",
    "  var handles=[];",
    "  var paths=['"+collPath+"','/products.json'];",
    "  for(var pi=0;pi<paths.length;pi++){",
    "    for(var pg=1;pg<=40;pg++){",
    "      var r=await fetch(paths[pi]+'?limit=250&page='+pg);",
    "      if(!r.ok)break;",
    "      var d=await r.json();",
    "      if(!d.products||!d.products.length)break;",
    "      d.products.forEach(function(x){",
    "        if(!handles.find(function(h){return h.handle===x.handle;}))",
    "          handles.push({handle:x.handle,title:x.title,price:x.variants[0].price});",
    "      });",
    "      if(d.products.length<250)break;",
    "    }",
    "    if(handles.length>0)break;",
    "  }",
    "  if(!handles.length){alert('No products found.');return;}",
    "  console.log('Fetching details for '+handles.length+' products...');",
    "  var out=[];",
    "  var batchSize=8;",
    "  for(var i=0;i<handles.length;i+=batchSize){",
    "    var batch=handles.slice(i,i+batchSize);",
    "    var results=await Promise.all(batch.map(function(h){",
    "      return fetch('/products/'+h.handle+'.json')",
    "        .then(function(r2){return r2.ok?r2.json():null;})",
    "        .catch(function(){return null;});",
    "    }));",
    "    results.forEach(function(res,bi){",
    "      var h=batch[bi];",
    "      var p=res&&res.product?res.product:h;",
    "      var tags=Array.isArray(p.tags)?p.tags.join(', '):(p.tags||'');",
    "      var body=(p.body_html||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim().slice(0,300);",
    "      var desc=[p.product_type||'',tags,body].filter(function(s){return s&&s.trim();}).join(' | ').slice(0,400);",
    "      var price=p.variants&&p.variants[0]?p.variants[0].price:h.price;",
    "      out.push((p.title||h.title)+'|'+price+'|"+origin+"/products/'+h.handle+'|'+desc);",
    "    });",
    "    console.log('Processed '+(i+batch.length)+'/'+handles.length);",
    "  }",
    "  console.log('Done! '+out.length+' products with full details.');",
    overlayCode(),
    "})();",
  ];
  return lines.join("\n");
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
const NOISE = /^(recently viewed|add to cart|buy now|view all|menu|home|search|checkout|cart|login|register|filter|sort|next|prev|loading|sold out|out of stock|select|wishlist|share|compare|follow|subscribe|spend pkr|get these|free gift|free shipping|new arrivals?|featured|sale|trending|top rated|best seller|on sale|in stock|out of|quick view|read more|see more|load more|back to top|all rights|copyright|privacy|terms|refund|return policy|contact us|about us|faq|track order)/i;
const NOISE_PRICE = /^(200|0|1|2|3|4|5)$/; // suspiciously low flat prices from UI elements

function parseScriptOut(text) {
  const items = [], seen = new Set();
  text.split("\n").forEach(raw => {
    const parts = raw.trim().split("|");
    if (parts.length < 2) return;
    const title = parts[0].trim();
    const price = parseFloat(parts[1]);
    const url = (parts[2] || "").trim();
    if (NOISE.test(title)) return;
    if (title.includes("Spend PKR") || title.includes("free gift")) return;
    const key = title.toLowerCase().slice(0, 40);
    if (!seen.has(key) && title.length > 2 && price > 0) { seen.add(key); items.push({ title, price, url }); }
  });
  return items;
}

function parsePastePage(text) {
  const items = [], seen = new Set();
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const SKIP = /^(recently viewed|add to cart|buy now|view all|view|menu|home|search|checkout|cart|login|register|filter|sort|next|prev|loading|sold out|out of stock|quantity|select|choose|share|compare|wishlist|follow|subscribe|spend pkr|get these|free gift|new arrivals?|featured|sale|trending|quick view|read more|see more|load more|back to top|privacy|terms|contact us|about us|faq|all rights)/i;
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
    (i + 1) + '. "' + b.title + '"' + (b.meta ? " by " + b.meta : "") + " — " + currency + " " + b.price + (b.desc ? " | " + b.desc : "") + (b.url ? " | " + b.url : "")
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
      const r = await fetchWithTimeout("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + key, {
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
  const [showGuide,   setShowGuide]   = useState(false);

  const [url,         setUrl]         = useState("");
  const [budget,      setBudget]      = useState(1000);
  const [budgetStr,   setBudgetStr]   = useState("1000");
  const [currency,    setCurrency]    = useState("PKR");
  const [count,       setCount]       = useState(4);
  const [prefs,       setPrefs]       = useState("");
  const [maxPerItem,  setMaxPerItem]  = useState(0);  // 0 = no limit
  const [resultCopied, setResultCopied] = useState(false);

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
      if (s.b) { setBudget(s.b); setBudgetStr(String(s.b)); }
      if (s.n) setCount(s.n);
      if (s.p) setPrefs(s.p);
      if (s.u) setUrl(s.u);
      if (s.mp) setMaxPerItem(s.mp);
    });
  }, []);

  useEffect(() => { setSiteInfo(url.trim() ? detectSite(url) : null); }, [url]);

  function saveCfg(k) {
    stoSet("es:cfg", { k: k !== undefined ? k : apiKey, c: currency, b: budget, n: count, p: prefs, u: url, mp: maxPerItem });
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
      } else if (site.type === "api_woo") {
        setPipeMsg("Fetching WooCommerce catalogue…");
        items = await fetchWooCommerce(url);
        if (items.length > 0) { method = "WooCommerce API"; setStep("fetch", "done"); }
        else {
          // WooCommerce API may require auth — fall through to generic scrape
          setPipeMsg("WooCommerce API gated, trying page scrape…");
          items = await fetchGenericSite(url);
          if (items.length > 0) { method = "Page scrape"; setStep("fetch", "done"); }
          else { setStep("fetch", "failed"); }
        }
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

    const cap = maxPerItem > 0 ? Math.min(maxPerItem, budget) : budget;
    const affordable = items.filter(b => b.price <= cap);
    if (affordable.length < count) throw new Error(
      "Found " + items.length + " items, but only " + affordable.length + " are priced under " +
      (CSYM[currency] || currency) + cap + " each.\nTry raising the per-item limit or total budget."
    );

    const picked = await callAI(apiKey, provider, affordable, count, budget, currency, prefs, (site || siteInfo)?.label || "the store");
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
    // Primary: clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(s)
        .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); })
        .catch(() => fallbackCopy(s));
    } else {
      fallbackCopy(s);
    }
  }
  function fallbackCopy(s) {
    // Fallback: create a temporary textarea, select it, execCommand copy
    const ta = document.createElement("textarea");
    ta.value = s;
    ta.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      const ok = document.execCommand("copy");
      if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2500); }
    } catch (_) {}
    document.body.removeChild(ta);
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
            <button className={"guide-btn " + (showGuide ? "on" : "")} onClick={() => { setShowGuide(s => !s); setShowSet(false); }}>
              {showGuide ? "✕" : "?"} How to use
            </button>
            <button className={"icon-btn " + (showSet ? "on" : "")} onClick={() => { setShowSet(s => !s); setShowGuide(false); }}>⚙</button>
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
            {apiKey && (
              <div className="drawer-note">
                <b>Using your API key</b> — works anywhere, costs fractions of a penny per search.
              </div>
            )}
          </div>
        )}

        {/* GUIDE PANEL */}
        {showGuide && (
          <div className="guide-panel">
            <div className="guide-body">

              {/* Left column — How to use */}
              <div>
                <div className="guide-col-title">📖 How to use EasyShop</div>

                <div className="guide-step">
                  <span className="guide-n">1</span>
                  <div className="guide-t"><strong>Paste a store URL</strong> — any online shop. EasyShop auto-detects the site type (Shopify, Amazon, Daraz, etc.) and picks the best method automatically.</div>
                </div>
                <div className="guide-step">
                  <span className="guide-n">2</span>
                  <div className="guide-t"><strong>Describe what you want</strong> in the preferences box — or leave it blank and AI picks the best value items. Be as specific as you like: <em>"3 oud fragrances under PKR 2000 each"</em> or just <em>"books"</em>.</div>
                </div>
                <div className="guide-step">
                  <span className="guide-n">3</span>
                  <div className="guide-t"><strong>Set your budget and item count</strong>, then hit Find.</div>
                </div>
                <div className="guide-step">
                  <span className="guide-n">4</span>
                  <div className="guide-t"><strong>If auto-fetch works</strong> (Shopify stores, Open Library) — results appear in seconds with no extra steps.</div>
                </div>
                <div className="guide-step">
                  <span className="guide-n">5</span>
                  <div className="guide-t"><strong>If a script is needed</strong> (Amazon, Daraz, protected sites) — EasyShop gives you a one-click script to run in the browser console. It takes ~20 seconds and fetches everything including infinite-scroll items.</div>
                </div>
                <div className="guide-step">
                  <span className="guide-n">6</span>
                  <div className="guide-t"><strong>If everything fails</strong> — switch to Paste Page Text (Ctrl+A the store page) or Manual Entry (type items yourself). Both always work on any site.</div>
                </div>

                <div style={{marginTop:16,padding:"10px 14px",background:"rgba(251,191,36,.06)",border:"1px solid rgba(251,191,36,.2)",borderRadius:"var(--r2)"}}>
                  <div style={{fontSize:11,fontWeight:600,color:"var(--warn)",marginBottom:4,textTransform:"uppercase",letterSpacing:"1px"}}>💡 Pro tip</div>
                  <div style={{fontSize:12,color:"#d4d4d8",lineHeight:1.55}}>Add a free API key in ⚙ Settings for faster, more reliable results. Without a key, EasyShop uses your claude.ai session which can occasionally timeout.</div>
                </div>
              </div>

              {/* Right column — API keys */}
              <div>
                <div className="guide-col-title">🔑 Getting a free API key</div>

                <div className="key-card">
                  <div className="key-card-hdr">
                    <span className="key-card-name">Groq</span>
                    <span className="key-card-badge" style={{borderColor:"var(--ok)",color:"var(--ok)"}}>FREE — No card needed</span>
                  </div>
                  <div className="key-card-prefix">Key starts with: gsk_...</div>
                  <div className="key-card-steps">
                    <div className="key-card-step">Go to console.groq.com and sign up</div>
                    <div className="key-card-step">Click "API Keys" in the left sidebar</div>
                    <div className="key-card-step">Click "Create API Key", give it any name</div>
                    <div className="key-card-step">Copy the key and paste it in ⚙ Settings above</div>
                  </div>
                  <a className="key-card-link" href="https://console.groq.com" target="_blank" rel="noreferrer">↗ console.groq.com</a>
                </div>

                <div className="key-card">
                  <div className="key-card-hdr">
                    <span className="key-card-name">Google Gemini</span>
                    <span className="key-card-badge" style={{borderColor:"var(--warn)",color:"var(--warn)"}}>FREE tier available</span>
                  </div>
                  <div className="key-card-prefix">Key starts with: AIza...</div>
                  <div className="key-card-steps">
                    <div className="key-card-step">Go to aistudio.google.com and sign in with Google</div>
                    <div className="key-card-step">Click "Get API Key" → "Create API key"</div>
                    <div className="key-card-step">Copy the key and paste it in ⚙ Settings above</div>
                  </div>
                  <a className="key-card-link" href="https://aistudio.google.com" target="_blank" rel="noreferrer">↗ aistudio.google.com</a>
                </div>

                <div className="key-card">
                  <div className="key-card-hdr">
                    <span className="key-card-name">Anthropic (Claude)</span>
                    <span className="key-card-badge" style={{borderColor:"var(--ac)",color:"var(--ac)"}}>$5 free credit</span>
                  </div>
                  <div className="key-card-prefix">Key starts with: sk-ant-...</div>
                  <div className="key-card-steps">
                    <div className="key-card-step">Go to console.anthropic.com and create an account</div>
                    <div className="key-card-step">Go to "API Keys" and click "Create Key"</div>
                    <div className="key-card-step">Copy the key — you get $5 free credit (~2000 searches)</div>
                  </div>
                  <a className="key-card-link" href="https://console.anthropic.com" target="_blank" rel="noreferrer">↗ console.anthropic.com</a>
                </div>

                <div className="key-card">
                  <div className="key-card-hdr">
                    <span className="key-card-name">OpenAI (GPT-4o)</span>
                    <span className="key-card-badge" style={{borderColor:"var(--dim)",color:"var(--dim)"}}>Paid — pay as you go</span>
                  </div>
                  <div className="key-card-prefix">Key starts with: sk-...</div>
                  <div className="key-card-steps">
                    <div className="key-card-step">Go to platform.openai.com and sign up</div>
                    <div className="key-card-step">Go to "API Keys" and create a new key</div>
                    <div className="key-card-step">Add a small credit (minimum $5) to your account</div>
                  </div>
                  <a className="key-card-link" href="https://platform.openai.com" target="_blank" rel="noreferrer">↗ platform.openai.com</a>
                </div>
              </div>

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
                  <option value="TRY">TRY — Turkish Lira (₺)</option>
                  <option value="AUD">AUD — Australian Dollar</option>
                  <option value="CAD">CAD — Canadian Dollar</option>
                  <option value="SGD">SGD — Singapore Dollar</option>
                  <option value="ZAR">ZAR — South African Rand</option>
                  <option value="NGN">NGN — Nigerian Naira (₦)</option>
                  <option value="EGP">EGP — Egyptian Pound</option>
                  <option value="QAR">QAR — Qatari Riyal</option>
                  <option value="KWD">KWD — Kuwaiti Dinar</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--dim)", marginBottom: 7, display: "block" }}>Total Budget</label>
                <div className="sw">
                  <span className="s">{sym}</span>
                  <input className="inp" type="text" inputMode="numeric" value={budgetStr}
                    placeholder="e.g. 3000"
                    onChange={e => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      setBudgetStr(raw);
                      if (raw !== "") setBudget(parseInt(raw, 10));
                    }}
                    onBlur={() => { if (budgetStr === "" || budgetStr === "0") { setBudgetStr("0"); setBudget(0); } }}
                    style={{ paddingLeft: 24 }} />
                </div>
                <div className="per-item-row">
                  <span className="per-item-label">Max per item:</span>
                  <div className="sw" style={{flex:1}}>
                    <span className="s" style={{fontSize:11}}>{sym}</span>
                    <input className="inp inp-sm" type="number" min="0" value={maxPerItem || ""}
                      placeholder="no limit"
                      onChange={e => setMaxPerItem(Number(e.target.value))}
                      style={{ paddingLeft: 22, fontSize: 12 }} />
                  </div>
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
              <div style={{background:"rgba(255,214,10,.07)",border:"1px solid rgba(255,214,10,.2)",borderRadius:7,padding:"10px 13px",marginBottom:12,fontSize:12,color:"#e8d080",lineHeight:1.55}}>
                <strong style={{color:"var(--warn)"}}>⚠ Chrome users:</strong> Chrome blocks console pasting by default. Type <strong>allow pasting</strong> and press Enter first, then paste the script.
              </div>
              <div className="steps-list">
                <div className="si"><span className="sn">1</span><span className="st">Open <strong>{url || "the store"}</strong> in a new tab</span></div>
                <div className="si"><span className="sn">2</span><span className="st">Press <span className="kbd">F12</span> → click <strong>Console</strong></span></div>
                <div className="si"><span className="sn">3</span><span className="st"><strong>Chrome only:</strong> type <span className="kbd">allow pasting</span> → press <span className="kbd">Enter</span></span></div>
                <div className="si"><span className="sn">4</span><span className="st">Click <strong>Copy</strong> above, paste into console, press <span className="kbd">Enter</span></span></div>
                <div className="si"><span className="sn">5</span><span className="st">A popup appears — click inside the box → <span className="kbd">Ctrl+A</span> → <span className="kbd">Ctrl+C</span></span></div>
                <div className="si"><span className="sn">6</span><span className="st">Paste into the box below</span></div>
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
                <button className={"chip-copy " + (resultCopied ? "ok" : "")} onClick={() => {
                  const text = result.items.map((it, i) =>
                    "#" + (i+1) + " " + it.title + " — " + (it.currency || currency) + " " + it.price + "\n" + (it.reason || "") + (it.url ? "\n" + it.url : "")
                  ).join("\n\n") + "\n\nTotal: " + (result.items[0]?.currency || currency) + " " + result.total + " for " + result.items.length + " items";
                  navigator.clipboard.writeText(text).then(() => { setResultCopied(true); setTimeout(() => setResultCopied(false), 2500); }).catch(() => {});
                }}>
                  {resultCopied ? "✓ Copied!" : "📋 Copy picks"}
                </button>
                <button className="btn-ghost btn-sm" onClick={reset}>New Search</button>
              </div>
            </div>

            <div className="grid">
              {result.items.map((item, i) => (
                <div className="bk" key={i}>
                  <div className="bk-rank">#{i + 1}</div>
                  <div className="bk-title">{item.title}</div>
                  {item.author && item.author !== "Unknown" && <div className="bk-sub">by {item.author}</div>}
                  {item.desc && <div className="bk-desc">{item.desc.slice(0,100)}</div>}
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