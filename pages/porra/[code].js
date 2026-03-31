import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ref, onValue, update, get } from "firebase/database";
import { db } from "../../lib/firebase";
import { calculateResults, calculateTransfers, fmt, timeRemaining } from "../../lib/porra";
import Head from "next/head";
import styles from "./porra.module.css";

const EMOJIS = ["🔥","💥","⚡","🎯","💸","🏆","😤","🤑","🎲","🎰"];
function rEmoji() { return EMOJIS[Math.floor(Math.random() * EMOJIS.length)]; }

// ── Name screen ──────────────────────────────────────────────────────
function NameScreen({ porra, onJoin }) {
  const [name, setName] = useState("");
  const [option, setOption] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!name.trim()) { setError("Pon tu nombre"); return false; }
    if (!option) { setError("Elige una opción"); return false; }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) { setError("Introduce un importe válido"); return false; }
    if (porra.minBet && Number(amount) < porra.minBet) { setError(`El mínimo es ${fmt(porra.minBet)}`); return false; }
    if (porra.maxBet && Number(amount) > porra.maxBet) { setError(`El máximo es ${fmt(porra.maxBet)}`); return false; }
    return true;
  };

  const handleJoin = () => {
    if (!validate()) return;
    onJoin({ name: name.trim(), option, amount: Number(amount) });
  };

  const isClosed = porra.status !== "open" || new Date(porra.closesAt) <= new Date();

  return (
    <div className={styles.nameScreen}>
      <div className={styles.nameCard}>
        <div className={styles.namePorraTitle}>{porra.title}</div>
        {porra.description && <p className={styles.namePorraDesc}>{porra.description}</p>}

        {isClosed ? (
          <div className={styles.closedMsg}>🔒 Esta porra ya está cerrada</div>
        ) : (
          <>
            <div className={styles.nameField}>
              <label>Tu nombre</label>
              <input placeholder="¿Cómo te llaman?" value={name} onChange={e => { setName(e.target.value); setError(""); }} maxLength={20} autoFocus />
            </div>

            <div className={styles.nameField}>
              <label>Tu apuesta</label>
              <div className={styles.optionGrid}>
                {porra.options.map(opt => (
                  <button
                    key={opt}
                    className={`${styles.optionBtn} ${option === opt ? styles.optionBtnActive : ""}`}
                    onClick={() => { setOption(opt); setError(""); }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.nameField}>
              <label>
                Importe
                {porra.minBet && porra.maxBet && <span className={styles.betRange}> ({fmt(porra.minBet)} – {fmt(porra.maxBet)})</span>}
                {porra.minBet && !porra.maxBet && <span className={styles.betRange}> (mín. {fmt(porra.minBet)})</span>}
                {!porra.minBet && porra.maxBet && <span className={styles.betRange}> (máx. {fmt(porra.maxBet)})</span>}
              </label>
              <div className={styles.amountRow}>
                <input
                  type="number" min="0" step="0.5"
                  placeholder="0,00"
                  value={amount}
                  onChange={e => { setAmount(e.target.value); setError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleJoin()}
                />
                <span className={styles.amountEuro}>€</span>
              </div>
            </div>

            {error && <p className={styles.nameError}>{error}</p>}

            <button className={styles.joinBtn} onClick={handleJoin}>
              🔥 Apostar
            </button>
          </>
        )}

        <button className={styles.watchBtn} onClick={() => onJoin(null)}>
          👁 Solo quiero ver la porra
        </button>
      </div>
    </div>
  );
}

// ── Main porra view ──────────────────────────────────────────────────
function PorraView({ porra, code, myBetId, isAdmin, onAdminAction }) {
  const router = useRouter();
  const [gameState, setGameState] = useState(porra);
  const [feed, setFeed] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectingWinner, setSelectingWinner] = useState(false);
  const [copied, setCopied] = useState(false);
  const prevBetsRef = useRef({});

  useEffect(() => {
    const unsub = onValue(ref(db, `porras/${code}`), snap => {
      if (!snap.exists()) return;
      const state = snap.val();
      setGameState(state);

      // Detect new bets for feed
      const prev = prevBetsRef.current;
      const curr = state.bets || {};
      Object.entries(curr).forEach(([id, bet]) => {
        if (!prev[id]) {
          setFeed(f => [{ id, ...bet, emoji: rEmoji(), ts: Date.now() }, ...f].slice(0, 30));
        }
      });
      prevBetsRef.current = curr;

      if (state.status === "resolved") setShowResults(true);
    });
    return () => unsub();
  }, [code]);

  // Countdown
  useEffect(() => {
    const tick = () => setTimeLeft(timeRemaining(gameState.closesAt));
    tick();
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  }, [gameState.closesAt]);

  // Auto-close when time expires
  useEffect(() => {
    if (gameState.status === "open" && new Date(gameState.closesAt) <= new Date()) {
      if (isAdmin) update(ref(db, `porras/${code}`), { status: "closed" });
    }
  }, [timeLeft]);

  const betsArr = Object.values(gameState.bets || {});
  const totalPot = betsArr.reduce((sum, b) => sum + b.amount, 0);
  const myBet = myBetId ? (gameState.bets || {})[myBetId] : null;

  // Group bets by option
  const byOption = {};
  gameState.options.forEach(o => { byOption[o] = []; });
  betsArr.forEach(b => { if (byOption[b.option]) byOption[b.option].push(b); });

  const optionTotals = gameState.options.map(o => ({
    option: o,
    total: byOption[o].reduce((s, b) => s + b.amount, 0),
    count: byOption[o].length,
    bets: byOption[o],
  })).sort((a, b) => b.total - a.total);

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/porra/${code}` : "";

  const shareWhatsApp = () => {
    const text = `🔥 ¡Apúntate a la porra!\n*${gameState.title}*\nEntra con el código *${code}* o pulsa:\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const declareWinner = async (option) => {
    const updates = { status: "resolved", winningOption: option };
    await update(ref(db, `porras/${code}`), updates);
    setSelectingWinner(false);
    setShowResults(true);
  };

  const isOpen = gameState.status === "open" && new Date(gameState.closesAt) > new Date();
  const isClosed = gameState.status === "closed" || (!isOpen && gameState.status !== "resolved");
  const isResolved = gameState.status === "resolved";

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.push("/")}>← Inicio</button>
        <div className={styles.codeBadge}>
          <span className={styles.codeLabel}>Código</span>
          <span className={styles.code}>{code}</span>
        </div>
        <div className={`${styles.statusBadge} ${isOpen ? styles.statusOpen : isClosed ? styles.statusClosed : styles.statusResolved}`}>
          {isOpen ? `⏱ ${timeLeft}` : isClosed ? "🔒 Cerrada" : "✅ Resuelta"}
        </div>
      </header>

      {/* Share bar */}
      <div className={styles.shareBar}>
        <button className={styles.waShareBtn} onClick={shareWhatsApp}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Invitar
        </button>
        <button className={styles.copyShareBtn} onClick={copyLink}>
          {copied ? "✓ Copiado" : "🔗 Enlace"}
        </button>
      </div>

      <div className={styles.container}>
        {/* Title & pot */}
        <div className={styles.titleSection}>
          <h1 className={styles.porraTitle}>{gameState.title}</h1>
          {gameState.description && <p className={styles.porraDesc}>{gameState.description}</p>}
          <div className={styles.potDisplay}>
            <span className={styles.potLabel}>Bote total</span>
            <span className={styles.potAmount}>{fmt(totalPot)}</span>
            <span className={styles.potCount}>{betsArr.length} apuesta{betsArr.length !== 1 ? "s" : ""}</span>
          </div>
          {myBet && (
            <div className={styles.myBetBadge}>
              Tú: <strong>{myBet.option}</strong> · {fmt(myBet.amount)}
            </div>
          )}
        </div>

        {/* Options breakdown */}
        <div className={styles.optionsSection}>
          <h2 className={styles.sectionTitle}>Distribución</h2>
          {optionTotals.map(({ option, total, count, bets: optBets }) => {
            const pct = totalPot > 0 ? Math.round((total / totalPot) * 100) : 0;
            const isWinner = isResolved && gameState.winningOption === option;
            return (
              <div key={option} className={`${styles.optionCard} ${isWinner ? styles.optionWinner : ""}`}>
                <div className={styles.optionHeader}>
                  <span className={styles.optionName}>{option} {isWinner ? "🏆" : ""}</span>
                  <span className={styles.optionTotal}>{fmt(total)} · {count} apuesta{count !== 1 ? "s" : ""}</span>
                </div>
                <div className={styles.optionBar}>
                  <div className={styles.optionBarFill} style={{ width: `${pct}%`, background: isWinner ? "var(--gold)" : "var(--flame)" }} />
                </div>
                <div className={styles.optionBetters}>
                  {optBets.map((b, i) => (
                    <span key={i} className={`${styles.betterChip} ${b.id === myBetId ? styles.betterChipMe : ""}`}>
                      {b.name} · {fmt(b.amount)}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Admin controls */}
        {isAdmin && (
          <div className={styles.adminSection}>
            <h2 className={styles.sectionTitle}>Panel del organizador</h2>
            {isOpen && (
              <button className={styles.adminBtn} onClick={() => update(ref(db, `porras/${code}`), { status: "closed" })}>
                🔒 Cerrar apuestas ahora
              </button>
            )}
            {(isClosed || isOpen) && !isResolved && (
              <div className={styles.declareSection}>
                <p className={styles.declareHint}>¿Cuál es el resultado ganador?</p>
                <div className={styles.declareOptions}>
                  {gameState.options.map(opt => (
                    <button key={opt} className={styles.declareBtn} onClick={() => declareWinner(opt)}>
                      🏆 {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {isResolved && <ResultsPanel porra={gameState} code={code} myBetId={myBetId} />}

        {/* Feed */}
        <div className={styles.feedSection}>
          <h2 className={styles.sectionTitle}>Actividad</h2>
          {feed.length === 0 && betsArr.length === 0 ? (
            <p className={styles.feedEmpty}>Aún no hay apuestas. ¡Sé el primero!</p>
          ) : (
            <div className={styles.feed}>
              {feed.length > 0 ? feed.map((item) => (
                <div key={item.id + item.ts} className={styles.feedItem}>
                  <span className={styles.feedEmoji}>{item.emoji}</span>
                  <span className={styles.feedText}>
                    <strong>{item.name}</strong> apostó <strong>{fmt(item.amount)}</strong> a <strong>{item.option}</strong>
                  </span>
                </div>
              )) : betsArr.slice().reverse().map((b, i) => (
                <div key={i} className={styles.feedItem}>
                  <span className={styles.feedEmoji}>{rEmoji()}</span>
                  <span className={styles.feedText}>
                    <strong>{b.name}</strong> apostó <strong>{fmt(b.amount)}</strong> a <strong>{b.option}</strong>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Results panel ──────────────────────────────────────────────────
function ResultsPanel({ porra, code, myBetId }) {
  const { winners, losers, totalPot } = calculateResults(porra.bets, porra.winningOption);
  const transfers = porra.potType === "distributed" ? calculateTransfers(porra.bets, porra.winningOption) : [];
  const myResult = myBetId ? [...winners, ...losers].find(b => b.id === myBetId) : null;
  const isWinner = winners.some(w => w.id === myBetId);

  return (
    <div className={styles.resultsSection}>
      <div className={styles.resultsHeader}>
        <div className={styles.resultsBanner}>
          🏆 Resultado: <strong>{porra.winningOption}</strong>
        </div>
      </div>

      {myResult && (
        <div className={`${styles.myResult} ${isWinner ? styles.myResultWin : styles.myResultLoss}`}>
          {isWinner
            ? `🤑 ¡Ganaste! Te llevas ${fmt(myResult.payout)} (beneficio: ${fmt(myResult.profit)})`
            : `😤 Esta vez no. Apostaste ${fmt(myResult.amount)} a ${myResult.option}`
          }
        </div>
      )}

      <div className={styles.winnersList}>
        <h3>Ganadores</h3>
        {winners.length === 0 ? (
          <p className={styles.noWinners}>Nadie acertó — se aplica la regla: {porra.noWinner}</p>
        ) : winners.map((w, i) => (
          <div key={i} className={styles.winnerRow}>
            <span className={styles.winnerName}>🏆 {w.name}</span>
            <span className={styles.winnerPayout}>{fmt(w.payout)}</span>
          </div>
        ))}
      </div>

      {porra.potType === "distributed" && transfers.length > 0 && (
        <div className={styles.transfersSection}>
          <h3>Transferencias a realizar</h3>
          <p className={styles.transfersHint}>Para cuadrar el resultado:</p>
          {transfers.map((t, i) => (
            <div key={i} className={styles.transferRow}>
              <span className={styles.transferFrom}>{t.from}</span>
              <span className={styles.transferArrow}>→ {fmt(t.amount)} →</span>
              <span className={styles.transferTo}>{t.to}</span>
            </div>
          ))}
        </div>
      )}

      {porra.potType === "common" && winners.length > 0 && (
        <div className={styles.commonPotInfo}>
          <h3>Bote común</h3>
          <p>El bote total es <strong>{fmt(totalPot)}</strong>. Reparto a los ganadores:</p>
          {winners.map((w, i) => (
            <div key={i} className={styles.transferRow}>
              <span className={styles.transferTo}>{w.name}</span>
              <span className={styles.transferArrow}>→</span>
              <span className={styles.transferFrom}>{fmt(w.payout)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Winner cards for sharing */}
      {winners.map((w, i) => (
        <WinnerCard key={i} winner={w} porra={porra} code={code} />
      ))}
    </div>
  );
}

// ── Winner card (shareable) ──────────────────────────────────────────
function WinnerCard({ winner, porra, code }) {
  const cardRef = useRef(null);
  const [sharing, setSharing] = useState(false);

  const downloadCard = async () => {
    setSharing(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(cardRef.current, { backgroundColor: "#0A0A0A", scale: 2 });
      const link = document.createElement("a");
      link.download = `porra-${code}-ganador.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch(e) { console.error(e); }
    setSharing(false);
  };

  return (
    <div className={styles.winnerCardWrap}>
      <div ref={cardRef} className={styles.winnerCard}>
        <div className={styles.wcNoise} />
        <div className={styles.wcTop}>🔥 PIQUE<span style={{color:"var(--flame)"}}>FY</span></div>
        <div className={styles.wcTrophy}>🏆</div>
        <div className={styles.wcName}>{winner.name}</div>
        <div className={styles.wcLabel}>ha ganado la porra</div>
        <div className={styles.wcPorraName}>"{porra.title}"</div>
        <div className={styles.wcAmount}>{fmt(winner.payout)}</div>
        <div className={styles.wcOption}>Apostó a: <strong>{winner.option}</strong></div>
        <div className={styles.wcCode}>piquefy.com · código {code}</div>
      </div>
      <button className={styles.downloadBtn} onClick={downloadCard} disabled={sharing}>
        {sharing ? "Generando..." : "📸 Descargar imagen para compartir"}
      </button>
    </div>
  );
}

// ── Root component ───────────────────────────────────────────────────
export default function PorraPage() {
  const router = useRouter();
  const { code } = router.query;
  const adminParam = router.query.admin;

  const [porra, setPorra] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [myBetId, setMyBetId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (!code) return;
    // Check admin
    const storedToken = typeof window !== "undefined" ? sessionStorage.getItem(`porra_admin_${code}`) : null;
    get(ref(db, `porras/${code}`)).then(snap => {
      if (!snap.exists()) { setNotFound(true); setLoading(false); return; }
      const data = snap.val();
      setPorra(data);
      setLoading(false);
      // Verify admin
      if (adminParam && adminParam === data.adminToken) {
        setIsAdmin(true);
        if (typeof window !== "undefined") sessionStorage.setItem(`porra_admin_${code}`, adminParam);
      } else if (storedToken && storedToken === data.adminToken) {
        setIsAdmin(true);
      }
      // Restore my bet
      const savedBetId = typeof window !== "undefined" ? sessionStorage.getItem(`porra_bet_${code}`) : null;
      if (savedBetId) { setMyBetId(savedBetId); setJoined(true); }
    });
  }, [code, adminParam]);

  const handleJoin = async (betData) => {
    if (!betData) { setJoined(true); return; } // watch only
    const betId = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const bet = { id: betId, name: betData.name, option: betData.option, amount: betData.amount, ts: Date.now() };
    await update(ref(db, `porras/${code}/bets`), { [betId]: bet });
    if (typeof window !== "undefined") sessionStorage.setItem(`porra_bet_${code}`, betId);
    setMyBetId(betId);
    setJoined(true);
  };

  if (loading) return <div className={styles.loading}>Cargando porra...</div>;
  if (notFound) return <div className={styles.loading}>Porra no encontrada 😕</div>;
  if (!joined && !isAdmin) return (
    <>
      <Head><title>{porra.title} — Piquefy</title></Head>
      <NameScreen porra={porra} onJoin={handleJoin} />
    </>
  );

  return (
    <>
      <Head><title>{porra.title} — Piquefy</title></Head>
      <PorraView porra={porra} code={code} myBetId={myBetId} isAdmin={isAdmin} />
    </>
  );
}
