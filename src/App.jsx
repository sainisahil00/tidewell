import { useState } from "react";

const STAGES = ["Picked up", "At our terminal", "On the road", "Delivered"];
const DEMO = {
  "TW-48213": { stage: 2, where: "Eastbound on I-80, near Des Moines", eta: "Arrives tomorrow, 2:30 pm" },
  "TW-10077": { stage: 1, where: "Chicago terminal, loading dock 6", eta: "Departs tonight, 9:00 pm" },
  "TW-99120": { stage: 3, where: "Delivered to Ames Hardware, Omaha", eta: "Signed for by M. Torres, 8:42 am" },
};

function Nav() {
  return (
    <header className="wrap nav">
      <a className="logo" href="#top"><b>TW</b>Tidewell Freight</a>
      <nav aria-label="Main">
        <a href="#services">Services</a>
        <a href="#lanes">Lanes</a>
        <a className="btn" href="#quote" style={{ marginLeft: 24 }}>Get a quote</a>
      </nav>
    </header>
  );
}

function Tracker() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const submit = (e) => {
    e.preventDefault();
    const key = code.trim().toUpperCase();
    setResult(DEMO[key] ? { ...DEMO[key], key } : { key, missing: true });
  };
  return (
    <div className="tracker">
      <form onSubmit={submit}>
        <div style={{ flex: "1 1 100%" }}><label htmlFor="trk">Track a load</label></div>
        <input id="trk" value={code} onChange={(e) => setCode(e.target.value)} placeholder="TW-48213" autoComplete="off" />
        <button className="btn" type="submit">Find my load</button>
      </form>
      <p className="hint">Try TW-48213, TW-10077 or TW-99120.</p>
      {result && (
        <div aria-live="polite">
          {result.missing ? (
            <p className="status">We can’t find {result.key}. Check the code on your bill of lading and try again.</p>
          ) : (
            <>
              <ol className="steps">
                {STAGES.map((s, i) => (
                  <li key={s} className={i < result.stage ? "on" : i === result.stage ? (result.stage === 3 ? "on" : "now") : ""}>{s}</li>
                ))}
              </ol>
              <p className="status">{result.where}<small>{result.eta}</small></p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <h1>Your freight, with an address at every mile.</h1>
        <p className="lead">Tidewell moves full and partial loads across eleven Midwest states, and every load has a live location you can look up in ten seconds.</p>
        <Tracker />
      </div>
    </section>
  );
}

function Services() {
  const items = [
    ["Full truckload", "A dedicated 53-foot trailer for one shipper. Pickup within 24 hours of booking in most lanes."],
    ["Partial loads", "Pay for the pallet spots you use. Your freight rides with others on the same lane, on a fixed schedule."],
    ["Warehouse and cross-dock", "Three terminals in Chicago, Des Moines and Omaha hold, sort and re-load freight without a second carrier."],
  ];
  return (
    <section id="services">
      <div className="wrap">
        <h2>What we haul</h2>
        <div className="grid3">
          {items.map(([t, d]) => (<article key={t}><h3>{t}</h3><p>{d}</p></article>))}
        </div>
      </div>
    </section>
  );
}

function Lanes() {
  const rows = [
    ["Chicago to Des Moines", "Daily", "1 day"],
    ["Des Moines to Omaha", "Daily", "1 day"],
    ["Chicago to Kansas City", "Mon, Wed, Fri", "2 days"],
    ["Omaha to Minneapolis", "Tue, Thu", "2 days"],
  ];
  return (
    <section className="band" id="lanes">
      <div className="wrap">
        <h2>Scheduled lanes</h2>
        <p>Partial loads leave on these days whether the trailer is full or not. Need a lane that isn’t listed? Ask for a quote.</p>
        <div className="tablewrap">
          <table className="lanes">
            <thead><tr><th>Lane</th><th>Departs</th><th>Transit</th></tr></thead>
            <tbody>{rows.map((r) => (<tr key={r[0]}>{r.map((c) => <td key={c}>{c}</td>)}</tr>))}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  const [sent, setSent] = useState(null);
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    setSent(f.get("name"));
  };
  return (
    <section id="quote">
      <div className="wrap quote">
        <div>
          <blockquote>We stopped calling for check calls. We just look.</blockquote>
          <cite>Dana Reyes, logistics manager, Ames Hardware</cite>
        </div>
        {sent ? (
          <div className="ok" role="status">Thanks, {sent}. A dispatcher will reply within one business hour.</div>
        ) : (
          <form className="q" onSubmit={submit}>
            <h2 style={{ fontSize: "1.6rem", marginBottom: 0 }}>Get a quote</h2>
            <label>Your name<input name="name" required /></label>
            <label>Work email<input name="email" type="email" required /></label>
            <label>Load type
              <select name="type"><option>Full truckload</option><option>Partial load</option><option>Warehouse</option></select>
            </label>
            <label>Pickup and delivery cities<textarea name="route" rows="3" required /></label>
            <button className="btn" type="submit">Request quote</button>
          </form>
        )}
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Lanes />
        <Quote />
      </main>
      <footer>
        <div className="wrap">Tidewell Freight, 1200 Harbor Road, Chicago, IL. Dispatch: 555-0142.</div>
      </footer>
    </>
  );
}

export default App;
