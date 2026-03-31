import { useState } from "react";
import { useRouter } from "next/router";
import { ref, set } from "firebase/database";
import { db } from "../../lib/firebase";
import { generateCode, generateAdminToken } from "../../lib/porra";
import Head from "next/head";
import styles from "./crear.module.css";

const NO_WINNER_OPTIONS = [
  { value: "proportional", label: "Se reparte el bote proporcionalmente entre todos" },
  { value: "void", label: "Porra nula — cada uno recupera lo suyo" },
  { value: "manual", label: "El organizador decide manualmente" },
];

export default function CrearPorra() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: info, 2: options, 3: rules
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [closesAt, setClosesAt] = useState("");
  const [allowChanges, setAllowChanges] = useState(true);
  const [minBet, setMinBet] = useState("");
  const [maxBet, setMaxBet] = useState("");
  const [potType, setPotType] = useState("distributed"); // distributed | common
  const [noWinner, setNoWinner] = useState("proportional");
  const [organizerName, setOrganizerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (i) => setOptions(options.filter((_, idx) => idx !== i));
  const updateOption = (i, v) => setOptions(options.map((o, idx) => idx === i ? v : o));

  const validateStep1 = () => {
    const e = {};
    if (!title.trim()) e.title = "El título es obligatorio";
    if (!organizerName.trim()) e.organizerName = "Pon tu nombre";
    if (!closesAt) e.closesAt = "Elige cuándo cierra";
    if (new Date(closesAt) <= new Date()) e.closesAt = "La fecha debe ser futura";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    const validOpts = options.filter(o => o.trim());
    if (validOpts.length < 2) e.options = "Necesitas al menos 2 opciones";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreate = async () => {
    const e = {};
    if (minBet && maxBet && Number(minBet) > Number(maxBet)) {
      e.bet = "El mínimo no puede ser mayor que el máximo";
    }
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setLoading(true);
    const code = generateCode();
    const adminToken = generateAdminToken();
    const validOpts = options.filter(o => o.trim());

    const porra = {
      code,
      adminToken,
      title: title.trim(),
      description: description.trim(),
      organizerName: organizerName.trim(),
      options: validOpts,
      closesAt: new Date(closesAt).toISOString(),
      allowChanges,
      minBet: minBet ? Number(minBet) : null,
      maxBet: maxBet ? Number(maxBet) : null,
      potType,
      noWinner,
      status: "open", // open | closed | resolved
      winningOption: null,
      bets: {},
      createdAt: Date.now(),
    };

    await set(ref(db, `porras/${code}`), porra);

    // Save admin token in sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`porra_admin_${code}`, adminToken);
    }

    router.push(`/porra/${code}?admin=${adminToken}`);
  };

  // Min datetime for input
  const minDateTime = new Date(Date.now() + 60000).toISOString().slice(0, 16);

  return (
    <>
      <Head><title>Crear porra — Piquefy</title></Head>
      <div className={styles.page}>
        <div className={styles.bgGlow} />

        <header className={styles.header}>
          <button className={styles.backBtn} onClick={() => step > 1 ? setStep(step - 1) : router.push("/")}>
            ← {step > 1 ? "Atrás" : "Inicio"}
          </button>
          <div className={styles.steps}>
            {[1,2,3].map(s => (
              <div key={s} className={`${styles.step} ${step >= s ? styles.stepActive : ""}`}>{s}</div>
            ))}
          </div>
        </header>

        <div className={styles.container}>
          {step === 1 && (
            <div className={styles.form} style={{animation: "slideUp 0.3s ease both"}}>
              <h1 className={styles.formTitle}>La porra 🔥</h1>
              <p className={styles.formSubtitle}>Define de qué va y cuándo cierra</p>

              <div className={styles.field}>
                <label>Tu nombre (organizador)</label>
                <input
                  placeholder="¿Cómo te llaman?"
                  value={organizerName}
                  onChange={e => { setOrganizerName(e.target.value); setErrors({}); }}
                />
                {errors.organizerName && <span className={styles.err}>{errors.organizerName}</span>}
              </div>

              <div className={styles.field}>
                <label>Título de la porra</label>
                <input
                  placeholder="Ej: ¿Quién gana Eurovisión 2025?"
                  value={title}
                  onChange={e => { setTitle(e.target.value); setErrors({}); }}
                  maxLength={80}
                />
                {errors.title && <span className={styles.err}>{errors.title}</span>}
              </div>

              <div className={styles.field}>
                <label>Descripción <span className={styles.optional}>(opcional)</span></label>
                <textarea
                  placeholder="Contexto extra, reglas adicionales..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  maxLength={300}
                />
              </div>

              <div className={styles.field}>
                <label>¿Cuándo cierra? (fecha y hora)</label>
                <input
                  type="datetime-local"
                  min={minDateTime}
                  value={closesAt}
                  onChange={e => { setClosesAt(e.target.value); setErrors({}); }}
                />
                {errors.closesAt && <span className={styles.err}>{errors.closesAt}</span>}
              </div>

              <button className={styles.nextBtn} onClick={() => validateStep1() && setStep(2)}>
                Siguiente →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className={styles.form} style={{animation: "slideUp 0.3s ease both"}}>
              <h1 className={styles.formTitle}>Las opciones 🎯</h1>
              <p className={styles.formSubtitle}>¿A qué se puede apostar?</p>

              <div className={styles.optionsList}>
                {options.map((opt, i) => (
                  <div key={i} className={styles.optionRow}>
                    <span className={styles.optionNum}>{i + 1}</span>
                    <input
                      placeholder={`Opción ${i + 1}`}
                      value={opt}
                      onChange={e => updateOption(i, e.target.value)}
                      maxLength={60}
                    />
                    {options.length > 2 && (
                      <button className={styles.removeBtn} onClick={() => removeOption(i)}>✕</button>
                    )}
                  </div>
                ))}
              </div>
              {errors.options && <span className={styles.err}>{errors.options}</span>}

              <button className={styles.addOptionBtn} onClick={addOption}>
                + Añadir opción
              </button>

              <button className={styles.nextBtn} onClick={() => validateStep2() && setStep(3)}>
                Siguiente →
              </button>
            </div>
          )}

          {step === 3 && (
            <div className={styles.form} style={{animation: "slideUp 0.3s ease both"}}>
              <h1 className={styles.formTitle}>Las reglas 📋</h1>
              <p className={styles.formSubtitle}>Últimos ajustes antes de lanzar</p>

              <div className={styles.field}>
                <label>Importe de apuesta</label>
                <div className={styles.betRow}>
                  <div className={styles.betField}>
                    <input
                      type="number" min="0" step="0.5"
                      placeholder="Mín (€)"
                      value={minBet}
                      onChange={e => { setMinBet(e.target.value); setErrors({}); }}
                    />
                  </div>
                  <span className={styles.betSep}>—</span>
                  <div className={styles.betField}>
                    <input
                      type="number" min="0" step="0.5"
                      placeholder="Máx (€)"
                      value={maxBet}
                      onChange={e => { setMaxBet(e.target.value); setErrors({}); }}
                    />
                  </div>
                </div>
                <p className={styles.hint}>Déjalo vacío para apuesta libre</p>
                {errors.bet && <span className={styles.err}>{errors.bet}</span>}
              </div>

              <div className={styles.field}>
                <label>¿Se pueden cambiar las apuestas?</label>
                <div className={styles.toggleRow}>
                  <button
                    className={`${styles.toggleBtn} ${allowChanges ? styles.toggleActive : ""}`}
                    onClick={() => setAllowChanges(true)}
                  >Sí, hasta el cierre</button>
                  <button
                    className={`${styles.toggleBtn} ${!allowChanges ? styles.toggleActive : ""}`}
                    onClick={() => setAllowChanges(false)}
                  >No, apuesta fija</button>
                </div>
              </div>

              <div className={styles.field}>
                <label>Tipo de bote</label>
                <div className={styles.toggleRow}>
                  <button
                    className={`${styles.toggleBtn} ${potType === "distributed" ? styles.toggleActive : ""}`}
                    onClick={() => setPotType("distributed")}
                  >Distribuido</button>
                  <button
                    className={`${styles.toggleBtn} ${potType === "common" ? styles.toggleActive : ""}`}
                    onClick={() => setPotType("common")}
                  >Bote común</button>
                </div>
                <p className={styles.hint}>
                  {potType === "distributed"
                    ? "Nadie tiene el dinero. La app calcula quién le debe qué a quién."
                    : "Alguien guarda el bote. La app calcula cuánto gana cada ganador."}
                </p>
              </div>

              <div className={styles.field}>
                <label>Si nadie acierta...</label>
                <select value={noWinner} onChange={e => setNoWinner(e.target.value)}>
                  {NO_WINNER_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              <button className={styles.createBtn} onClick={handleCreate} disabled={loading}>
                {loading ? "Creando..." : "🔥 Lanzar porra"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
