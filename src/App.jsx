import { useState, useRef } from "react";

const S = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#f5f0e8;font-family:'DM Sans',sans-serif;min-height:100vh}
.app{min-height:100vh;background:#f5f0e8;color:#1a1208;padding-bottom:80px}
.hdr{background:#1a1208;color:#f5f0e8;padding:30px 40px 26px;position:relative;overflow:hidden}
.hdr::before{content:'📚';position:absolute;right:36px;top:50%;transform:translateY(-50%);font-size:80px;opacity:.1}
.hdr-eye{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#c9a96e;margin-bottom:8px}
.hdr h1{font-family:'Playfair Display',serif;font-size:clamp(22px,5vw,38px);font-weight:700;line-height:1.15;max-width:500px}
.hdr h1 em{font-style:italic;color:#c9a96e}
.hdr-sub{margin-top:8px;font-size:13px;color:#9a8060;max-width:460px;line-height:1.5}
.pad{padding:28px 40px 0}
.card{background:#fff;border:1.5px solid #e0d8c8;border-radius:4px;padding:26px;max-width:700px;box-shadow:0 2px 14px rgba(26,18,8,.07)}
label.lbl{display:block;font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#7a6845;margin-bottom:7px}
.inp{width:100%;border:1.5px solid #d5cdb8;background:#fdfaf4;padding:11px 13px;font-family:'DM Sans',sans-serif;font-size:14px;color:#1a1208;border-radius:3px;outline:none;transition:border-color .2s}
.inp:focus{border-color:#c9a96e;background:#fff}
.inp-area{resize:vertical;min-height:110px;font-size:13px;line-height:1.5;font-family:monospace}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px}
.fg{display:flex;flex-direction:column}
.sym-wrap{position:relative}
.sym-wrap .sym{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#7a6845;font-size:14px;pointer-events:none}
.sym-wrap .inp{padding-left:28px}
.cntbtns{display:flex;align-items:center;border:1.5px solid #d5cdb8;border-radius:3px;overflow:hidden;background:#fdfaf4;height:42px;width:fit-content}
.cb{background:none;border:none;padding:6px 14px;cursor:pointer;font-size:16px;color:#7a6845;transition:background .15s}
.cb:hover{background:#f0e8d5}
.cn{padding:6px 10px;font-size:14px;font-weight:500;min-width:30px;text-align:center;border-left:1px solid #d5cdb8;border-right:1px solid #d5cdb8}
.btn{width:100%;background:#1a1208;color:#f5f0e8;border:none;padding:13px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;border-radius:3px;transition:background .15s}
.btn:hover:not(:disabled){background:#2d1e0e}
.btn:disabled{opacity:.5;cursor:not-allowed}
.btn-ghost{background:none;border:1.5px solid #1a1208;color:#1a1208;padding:8px 18px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;border-radius:3px;transition:background .15s,color .15s}
.btn-ghost:hover{background:#1a1208;color:#f5f0e8}
.btn-copy{background:#f5f0e8;border:1.5px solid #c9a96e;color:#7a4a10;padding:8px 16px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border-radius:3px;transition:all .15s;white-space:nowrap}
.btn-copy:hover{background:#c9a96e;color:#fff}
.btn-copy.ok{background:#4a8060;border-color:#4a8060;color:#fff}
.steps-nav{display:flex;align-items:center;margin-bottom:24px}
.sn{display:flex;align-items:center;gap:7px;font-size:12px;font-weight:500;color:#b0a080;cursor:pointer}
.sn.on{color:#1a1208}
.sn.done{color:#4a8060}
.sn-num{width:23px;height:23px;border-radius:50%;background:#e0d8c8;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#9a8060;flex-shrink:0}
.sn.on .sn-num{background:#1a1208;color:#c9a96e}
.sn.done .sn-num{background:#4a8060;color:#fff}
.sn-div{flex:1;height:1px;background:#d5cdb8;margin:0 8px}
.code-wrap{position:relative;margin:12px 0 16px}
.code-box{background:#1a1208;color:#b8d4a0;padding:14px 110px 14px 16px;border-radius:3px;font-family:monospace;font-size:12px;line-height:1.6;overflow-x:auto;white-space:pre-wrap;word-break:break-all}
.code-copy{position:absolute;top:10px;right:10px}
.instr{display:flex;flex-direction:column;gap:11px;margin:14px 0 18px}
.ins{display:flex;gap:11px;align-items:flex-start}
.ins-n{width:21px;height:21px;background:#c9a96e;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px}
.ins-t{font-size:13px;color:#3a2a10;line-height:1.55}
.ins-t strong{color:#1a1208}
.key{background:#f0e8d5;border:1px solid #d5c8a0;padding:1px 6px;border-radius:3px;font-size:11px;font-family:monospace;color:#5a3a10;display:inline-block}
.load-card{background:#fff;border:1.5px solid #e0d8c8;border-radius:4px;padding:40px;text-align:center;max-width:700px}
.spin{width:30px;height:30px;border:3px solid #e0d8c8;border-top-color:#c9a96e;border-radius:50%;animation:spin .85s linear infinite;margin:0 auto 14px}
@keyframes spin{to{transform:rotate(360deg)}}
.load-title{font-family:'Playfair Display',serif;font-size:17px;color:#1a1208;margin-bottom:4px}
.load-sub{font-size:13px;color:#9a8060}
.lsteps{text-align:left;display:inline-block;margin-top:16px}
.lstep{display:flex;align-items:center;gap:8px;font-size:13px;color:#9a8060;padding:3px 0}
.lstep.on{color:#1a1208;font-weight:500}
.lstep.done{color:#4a8060}
.ldot{width:7px;height:7px;border-radius:50%;background:#d5cdb8;flex-shrink:0}
.lstep.on .ldot{background:#c9a96e}
.lstep.done .ldot{background:#4a8060}
.res-hdr{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:18px;flex-wrap:wrap;gap:10px}
.res-title{font-family:'Playfair Display',serif;font-size:22px;color:#1a1208}
.badge{background:#1a1208;color:#c9a96e;padding:5px 14px;border-radius:2px;font-size:12px;font-weight:500}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:15px;max-width:980px}
.bk{background:#fff;border:1.5px solid #e0d8c8;border-radius:4px;padding:20px;position:relative;transition:box-shadow .2s,transform .2s;animation:up .4s ease both}
@keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.bk:nth-child(1){animation-delay:.04s}.bk:nth-child(2){animation-delay:.1s}.bk:nth-child(3){animation-delay:.17s}.bk:nth-child(4){animation-delay:.24s}
.bk:hover{box-shadow:0 5px 20px rgba(26,18,8,.1);transform:translateY(-2px)}
.bk-num{position:absolute;top:13px;right:13px;width:23px;height:23px;background:#f5f0e8;border:1.5px solid #d5cdb8;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#7a6845}
.bk-title{font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:#1a1208;line-height:1.3;margin-bottom:4px;padding-right:26px}
.bk-author{font-size:12px;color:#7a6845;margin-bottom:10px;font-style:italic}
.bk-price{font-size:19px;font-weight:500;color:#1a1208;margin-bottom:8px}
.bk-price span{font-size:12px;font-weight:300;color:#9a8060;margin-left:2px}
.bk-reason{font-size:13px;color:#5a4a30;line-height:1.6;border-top:1px solid #f0e8d8;padding-top:10px}
.bk-link{display:inline-block;margin-top:10px;font-size:11px;color:#c9a96e;text-decoration:none;letter-spacing:1px;text-transform:uppercase;font-weight:500;border-bottom:1px solid transparent;transition:border-color .2s}
.bk-link:hover{border-color:#c9a96e}
.summ{max-width:980px;background:#1a1208;color:#f5f0e8;border-radius:4px;padding:18px 24px;margin-top:18px;display:flex;gap:12px;align-items:flex-start}
.summ-txt{font-size:13px;line-height:1.7;color:#d5c8a8}
.summ-txt strong{color:#c9a96e}
.info{background:#fffbf0;border:1.5px solid #e8d898;border-radius:3px;padding:10px 14px;font-size:13px;color:#6a5020;margin-bottom:14px;max-width:980px}
.err-title{font-family:'Playfair Display',serif;font-size:18px;color:#1a1208;margin-bottom:9px}
.err-body{font-size:13px;color:#5a4a30;line-height:1.65;white-space:pre-line;margin-bottom:14px}
@media(max-width:580px){.hdr,.pad{padding-left:18px;padding-right:18px}.row2{grid-template-columns:1fr}.grid{grid-template-columns:1fr}}
`;

const CSYM = { PKR:"₨", USD:"$", GBP:"£", EUR:"€", INR:"₹", AED:"د.إ", SAR:"﷼" };

// Builds the script string using only string concatenation — no nested backticks,
// no innerHTML, no quote escaping issues whatsoever.
function makeScript(storeUrl) {
  let collPath = "/products.json";
  let origin = "";
  try {
    const u = new URL(storeUrl);
    origin = u.origin;
    const m = u.pathname.match(/\/collections\/([^/?#]+)/);
    if (m) collPath = "/collections/" + m[1] + "/products.json";
  } catch (_) {}

  // We build the script as a plain string so there are zero template-literal
  // or quote-nesting issues. Every DOM element is created via createElement.
  const lines = [
    "(async function(){",
    "  var out = [];",
    "  for (var p = 1; p <= 20; p++) {",
    "    var r = await fetch('" + collPath + "?limit=250&page=' + p);",
    "    var d = await r.json();",
    "    if (!d.products || !d.products.length) break;",
    "    d.products.forEach(function(x){",
    "      out.push(x.title + '|' + x.variants[0].price + '|" + origin + "/products/' + x.handle);",
    "    });",
    "    if (d.products.length < 250) break;",
    "  }",
    "  var txt = out.join('\\n');",
    "",
    "  // Build overlay using DOM — no innerHTML, no quote issues",
    "  var ov = document.createElement('div');",
    "  ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:999999;display:flex;align-items:center;justify-content:center;padding:20px';",
    "",
    "  var box = document.createElement('div');",
    "  box.style.cssText = 'background:#fff;border-radius:8px;padding:24px;width:100%;max-width:560px;font-family:sans-serif';",
    "",
    "  var heading = document.createElement('div');",
    "  heading.style.cssText = 'font-size:16px;font-weight:bold;margin-bottom:8px';",
    "  heading.textContent = 'Books fetched: ' + out.length;",
    "",
    "  var info = document.createElement('p');",
    "  info.style.cssText = 'font-size:13px;color:#555;margin-bottom:10px';",
    "  info.textContent = 'Click inside the text box below, press Ctrl+A then Ctrl+C to copy everything, then paste into Book Budget Finder.';",
    "",
    "  var ta = document.createElement('textarea');",
    "  ta.readOnly = true;",
    "  ta.value = txt;",
    "  ta.style.cssText = 'width:100%;height:200px;font-size:11px;font-family:monospace;border:1px solid #ccc;border-radius:4px;padding:8px;box-sizing:border-box;display:block';",
    "",
    "  var closeBtn = document.createElement('button');",
    "  closeBtn.textContent = 'Close';",
    "  closeBtn.style.cssText = 'margin-top:10px;padding:8px 20px;background:#1a1208;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px';",
    "  closeBtn.onclick = function(){ ov.remove(); };",
    "",
    "  box.appendChild(heading);",
    "  box.appendChild(info);",
    "  box.appendChild(ta);",
    "  box.appendChild(closeBtn);",
    "  ov.appendChild(box);",
    "  document.body.appendChild(ov);",
    "",
    "  ta.focus();",
    "  ta.select();",
    "})();",
  ];

  return lines.join("\n");
}

function parseCopiedData(text) {
  const books = [];
  const seen = new Set();
  for (const raw of text.split(/\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const parts = line.split("|");
    if (parts.length < 2) continue;
    const title = parts[0].trim();
    const price = parseFloat(parts[1]);
    const url = parts[2]?.trim() ?? "";
    const key = title.toLowerCase().slice(0, 40);
    if (!seen.has(key) && title.length > 1 && price > 0) {
      seen.add(key);
      books.push({ title, price, url });
    }
  }
  return books;
}

async function pickBooks(books, count, budget, currency) {
  const sample = [...books].sort((a, b) => a.price - b.price).slice(0, 150);
  const list = sample
    .map((b, i) => `${i + 1}. "${b.title}" — ${currency} ${b.price}${b.url ? " | " + b.url : ""}`)
    .join("\n");

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content:
          "You are a book curator. A customer wants exactly " + count + " books, total budget " + currency + " " + budget + ".\n\n" +
          "Books available:\n" + list + "\n\n" +
          "Pick the BEST " + count + " books whose combined price is strictly under " + currency + " " + budget + ".\n" +
          "Favour acclaimed authors, literary classics, award-winners, genre variety — NOT just cheapest.\n\n" +
          "Respond ONLY with valid JSON (no markdown fences, no explanation):\n" +
          '{"books":[{"title":"exact title","author":"Author or Unknown","price":299,"currency":"' + currency + '","reason":"1-2 sentences why worth reading","url":"url or empty string"}],"total":950,"summary":"2-3 sentences on why this is a great collection","source_name":"short store name"}'
      }],
    }),
  });

  if (!r.ok) { const e = await r.json(); throw new Error(e?.error?.message ?? "AI request failed"); }
  const d = await r.json();
  const txt = d.content.filter(b => b.type === "text").map(b => b.text).join("");
  const m = txt.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("AI returned an unexpected format. Please try again.");
  return JSON.parse(m[0]);
}

export default function App() {
  const [url, setUrl] = useState("https://bookvogue.com/collections/english");
  const [budget, setBudget] = useState(1000);
  const [currency, setCurrency] = useState("PKR");
  const [count, setCount] = useState(4);
  const [uiStep, setUiStep] = useState(1);
  const [pasted, setPasted] = useState("");
  const [copied, setCopied] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [loadStep, setLoadStep] = useState(0);
  const [result, setResult] = useState(null);
  const [foundBooks, setFoundBooks] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const tmr = useRef(null);

  const sym = CSYM[currency] ?? currency;
  const script = makeScript(url);
  const parsedCount = pasted.trim() ? parseCopiedData(pasted).length : 0;

  const LOAD_STEPS = ["Parsing book data…", "Checking budget…", "AI selecting best picks…"];

  function copyScript() {
    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // fallback: select the code box text
      const el = document.querySelector(".code-box");
      if (el) { const range = document.createRange(); range.selectNode(el); window.getSelection().removeAllRanges(); window.getSelection().addRange(range); }
    });
  }

  function tickLoad(i) {
    setLoadStep(i);
    if (i < LOAD_STEPS.length - 1) tmr.current = setTimeout(() => tickLoad(i + 1), 3500);
  }

  async function run() {
    const books = parseCopiedData(pasted);
    if (!books.length) { setErrMsg("No book data found in the pasted text. Make sure you ran the script and copied from the popup box."); setPhase("error"); return; }
    setFoundBooks(books);
    setPhase("loading");
    setResult(null);
    setErrMsg("");
    tickLoad(0);
    try {
      const affordable = books.filter(b => b.price <= budget);
      if (affordable.length < count) throw new Error(`Found ${books.length} books total, but only ${affordable.length} are priced under ${sym}${budget} each.\nTry raising your budget or reducing the count.`);
      clearTimeout(tmr.current);
      setLoadStep(2);
      const picked = await pickBooks(books, count, budget, currency);
      clearTimeout(tmr.current);
      if (!picked.books?.length) throw new Error("AI returned no picks. Please try again.");
      setResult(picked);
      setPhase("done");
    } catch (e) {
      clearTimeout(tmr.current);
      setErrMsg(e.message ?? "Something went wrong.");
      setPhase("error");
    }
  }

  function reset() { clearTimeout(tmr.current); setPhase("idle"); setResult(null); setFoundBooks([]); setUiStep(1); setPasted(""); }

  function StepNav() {
    const labels = ["Get script", "Paste data", "Find books"];
    return (
      <div className="steps-nav">
        {labels.map((s, i) => {
          const n = i + 1;
          const cls = n < uiStep ? "done" : n === uiStep ? "on" : "";
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: i < labels.length - 1 ? 1 : "none" }}>
              <div className={"sn " + cls} onClick={() => { if (n < uiStep || (n === 2 && parsedCount > 0) || n === 1) setUiStep(n); }}>
                <span className="sn-num">{n < uiStep ? "✓" : n}</span>
                <span style={{ fontSize: 12 }}>{s}</span>
              </div>
              {i < labels.length - 1 && <div className="sn-div" />}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <style>{S}</style>
      <div className="app">
        <div className="hdr">
          <div className="hdr-eye">AI-Powered</div>
          <h1>Book Budget <em>Finder</em></h1>
          <div className="hdr-sub">Fetches every book from the store — including those behind infinite scroll — then AI picks the best within your budget.</div>
        </div>

        {phase === "idle" && (
          <div className="pad">
            <div className="card">
              <StepNav />

              {/* ── Step 1: script ── */}
              {uiStep === 1 && (<>
                <div style={{ marginBottom: 14 }}>
                  <label className="lbl">Bookstore URL</label>
                  <input className="inp" type="url" value={url}
                    placeholder="https://bookvogue.com/collections/english"
                    onChange={e => setUrl(e.target.value)} />
                  <div style={{ fontSize: 12, color: "#9a8060", marginTop: 5 }}>Works on any Shopify store (BookVogue, Liberty Books, Readings, etc.)</div>
                </div>

                <label className="lbl">Console script — copy and run this on the bookstore page</label>
                <div className="code-wrap">
                  <div className="code-box">{script}</div>
                  <div className="code-copy">
                    <button className={"btn-copy " + (copied ? "ok" : "")} onClick={copyScript}>
                      {copied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="instr">
                  <div className="ins"><span className="ins-n">1</span>
                    <span className="ins-t">Open <strong>{url || "the bookstore"}</strong> in a new tab</span></div>
                  <div className="ins"><span className="ins-n">2</span>
                    <span className="ins-t">Press <span className="key">F12</span> → click the <strong>Console</strong> tab</span></div>
                  <div className="ins"><span className="ins-n">3</span>
                    <span className="ins-t">Click <strong>Copy</strong> above, paste into the console, hit <span className="key">Enter</span></span></div>
                  <div className="ins"><span className="ins-n">4</span>
                    <span className="ins-t">A popup appears on the store page — click inside the text box, press <span className="key">Ctrl+A</span> then <span className="key">Ctrl+C</span></span></div>
                  <div className="ins"><span className="ins-n">5</span>
                    <span className="ins-t">Come back here and click <strong>Next</strong> to paste the data</span></div>
                </div>

                <button className="btn" onClick={() => setUiStep(2)}>Next: Paste the data →</button>
              </>)}

              {/* ── Step 2: paste ── */}
              {uiStep === 2 && (<>
                <div style={{ marginBottom: 16 }}>
                  <label className="lbl">Paste the copied book data here</label>
                  <textarea className="inp inp-area" value={pasted}
                    placeholder={"Paste here — each line should look like:\nAtomic Habits|450|https://bookvogue.com/products/atomic-habits\nThe Alchemist|350|https://bookvogue.com/products/the-alchemist"}
                    onChange={e => setPasted(e.target.value)} />
                  {parsedCount > 0 && <div style={{ fontSize: 12, color: "#4a8060", marginTop: 5, fontWeight: 500 }}>✓ {parsedCount} books detected</div>}
                  {pasted.trim() && parsedCount === 0 && <div style={{ fontSize: 12, color: "#9a3020", marginTop: 5 }}>Couldn't parse this. Make sure the data came from the popup box — each line needs Title|Price|URL format.</div>}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn-ghost" onClick={() => setUiStep(1)}>← Back</button>
                  <button className="btn" style={{ flex: 1 }} onClick={() => setUiStep(3)} disabled={parsedCount === 0}>
                    {parsedCount > 0 ? `${parsedCount} books — Set budget →` : "Paste data first"}
                  </button>
                </div>
              </>)}

              {/* ── Step 3: budget & run ── */}
              {uiStep === 3 && (<>
                <div style={{ background: "#f0faf4", border: "1.5px solid #b8e0c8", borderRadius: 3, padding: "10px 14px", fontSize: 13, color: "#2a6040", marginBottom: 18 }}>
                  ✓ <strong>{parsedCount} books</strong> loaded from {url}
                </div>
                <div className="row2">
                  <div className="fg">
                    <label className="lbl">Currency</label>
                    <select className="inp" value={currency} onChange={e => setCurrency(e.target.value)} style={{ cursor: "pointer" }}>
                      <option value="PKR">PKR — Pakistani Rupee</option>
                      <option value="USD">USD — US Dollar</option>
                      <option value="GBP">GBP — British Pound</option>
                      <option value="EUR">EUR — Euro</option>
                      <option value="INR">INR — Indian Rupee</option>
                      <option value="AED">AED — UAE Dirham</option>
                      <option value="SAR">SAR — Saudi Riyal</option>
                    </select>
                  </div>
                  <div className="fg">
                    <label className="lbl">Total Budget</label>
                    <div className="sym-wrap">
                      <span className="sym">{sym}</span>
                      <input className="inp" type="number" min="1" value={budget} onChange={e => setBudget(Number(e.target.value))} />
                    </div>
                  </div>
                </div>
                <div className="fg" style={{ marginBottom: 18 }}>
                  <label className="lbl">Number of Books</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div className="cntbtns">
                      <button className="cb" onClick={() => setCount(c => Math.max(1, c - 1))}>−</button>
                      <span className="cn">{count}</span>
                      <button className="cb" onClick={() => setCount(c => Math.min(10, c + 1))}>+</button>
                    </div>
                    <span style={{ fontSize: 13, color: "#7a6845" }}>{count} book{count !== 1 ? "s" : ""} for under {sym}{budget.toLocaleString()}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn-ghost" onClick={() => setUiStep(2)}>← Back</button>
                  <button className="btn" style={{ flex: 1 }} onClick={run} disabled={budget <= 0}>Find My {count} Best Books →</button>
                </div>
              </>)}
            </div>
          </div>
        )}

        {phase === "loading" && (
          <div className="pad">
            <div className="load-card">
              <div className="spin" />
              <div className="load-title">AI is choosing your books…</div>
              <div className="load-sub">Analysing {foundBooks.length} books against your {sym}{budget} budget</div>
              <div className="lsteps">
                {LOAD_STEPS.map((s, i) => (
                  <div key={i} className={"lstep " + (i < loadStep ? "done" : i === loadStep ? "on" : "")}>
                    <span className="ldot" />{s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {phase === "error" && (
          <div className="pad">
            <div className="card">
              <div className="err-title">⚠ Couldn't complete</div>
              <div className="err-body">{errMsg}</div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-ghost" onClick={() => { setPhase("idle"); setErrMsg(""); }}>← Try Again</button>
                <button className="btn-ghost" onClick={reset}>Start Over</button>
              </div>
            </div>
          </div>
        )}

        {phase === "done" && result && (
          <div className="pad">
            <div className="res-hdr">
              <div className="res-title">Your {result.books.length} picks from {result.source_name ?? "the store"}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="badge">Total: {result.currency ?? currency} {result.total?.toLocaleString()}</span>
                <button className="btn-ghost" onClick={reset}>New Search</button>
              </div>
            </div>
            <div className="info">
              <strong>Scanned all {foundBooks.length} books</strong> (entire catalogue, no infinite scroll limit) — AI picked the best {result.books.length} within {sym}{budget.toLocaleString()}.
            </div>
            <div className="grid">
              {result.books.map((bk, i) => (
                <div className="bk" key={i}>
                  <div className="bk-num">#{i + 1}</div>
                  <div className="bk-title">{bk.title}</div>
                  {bk.author && bk.author !== "Unknown" && <div className="bk-author">by {bk.author}</div>}
                  <div className="bk-price">{bk.currency ?? currency} {bk.price?.toLocaleString()}<span>/ book</span></div>
                  {bk.reason && <div className="bk-reason">{bk.reason}</div>}
                  {bk.url && <a className="bk-link" href={bk.url} target="_blank" rel="noreferrer">View book →</a>}
                </div>
              ))}
            </div>
            {result.summary && (
              <div className="summ">
                <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>✦</span>
                <div className="summ-txt"><strong>Why this selection?</strong><br />{result.summary}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}