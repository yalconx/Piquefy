import { useState } from "react";
import { useRouter } from "next/router";
import { ref, set } from "firebase/database";
import { db } from "../../lib/firebase";
import { generateCode, generateAdminToken } from "../../lib/porra";
import Head from "next/head";
import styles from "./index.module.css";

const NO_WINNER_OPTIONS = [
  { value: "proportional", label: "Se reparte el bote proporcionalmente entre todos" },
  { value: "void", label: "Porra nula — cada uno recupera lo suyo" },
  { value: "manual", label: "El organizador decide manualmente" },
];

// Generate a 6-digit admin PIN
function generateAdminPin() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export default function CrearPorra() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [closesAt, setClosesAt] = useState("");
  const [allowChanges, setAllowChanges] = useState(true);
  const [minBet, setMinBet] = useState("");
  const [maxBet, setMaxBet] = useState("");
  const [potType, setPotType] = useState("distributed");
  const [noWinner, setNoWinner] = useState("proportional");
  const [organizerName, setOrganizerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [createdPorra, setCreatedPorra] = useState(null); // step 4: show PIN

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
    const adminPin = generateAdminPin();
    const validOpts = options.filter(o => o.trim());

    const porra = {
      code, adminToken, adminPin,
      title: title.trim(),
      description: description.trim(),
      organizerName: organizerName.trim(),
      options: validOpts,
      closesAt: new Date(closesAt).toISOString(),
      allowChanges,
      minBet: minBet ? Number(minBet) : null,
      maxBet: maxBet ? Number(maxBet) : null,
      potType, noWinner,
      status: "open",
      winningOption: null,
      bets: {},
      createdAt: Date.now(),
    };

    await set(ref(db, `porras/${code}`), porra);

    if (typeof window !== "undefined") {
      sessionStorage.setItem(`porra_admin_${code}`, adminToken);
    }

    setCreatedPorra({ code, adminPin, adminToken });
    setLoading(false);
  };

  const goToPorra = () => {
    router.push(`/porra/${createdPorra.code}?admin=${createdPorra.adminToken}`);
  };

  const sharePin = () => {
    const text = `🔥 Tu código de organizador de Piquefy:\n\nPorra: *${createdPorra.code}*\nCódigo organizador: *${createdPorra.adminPin}*\n\nGuárdalo para poder gestionar la porra desde cualquier dispositivo.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const copyPin = () => {
    navigator.clipboard.writeText(createdPorra.adminPin);
  };

  const minDateTime = new Date(Date.now() + 60000).toISOString().slice(0, 16);

  // Step 4: PIN reveal screen
  if (createdPorra) {
    return (
      <>
        <Head><title>Porra creada — Piquefy</title></Head>
        <div className={styles.page}>
          <div className={styles.bgGlow} />
          <div className={styles.container}>
            <div className={styles.pinScreen}>
              <div className={styles.pinEmoji}>🎉</div>
              <h1 className={styles.pinTitle}>¡Porra creada!</h1>
              <p className={styles.pinDesc}>
                Guarda tu <strong>código de organizador</strong>. Lo necesitarás para gestionar la porra si cierras el navegador o cambias de dispositivo.
              </p>

              <div className={styles.pinBox}>
                <div className={styles.pinLabel}>Código de organizador</div>
                <div className={styles.pinCode}>{createdPorra.adminPin}</div>
                <div className={styles.pinWarning}>
                  ⚠️ Guárdalo bien. Sin este código, no podrás gestionar la porra desde otro dispositivo.
                </div>
              </div>

              <div className={styles.pinActions}>
                <button className={styles.pinCopyBtn} onClick={copyPin}>
                  📋 Copiar al portapapeles
                </button>
                <button className={styles.pinWhatsappBtn} onClick={sharePin}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Enviármelo por WhatsApp
                </button>
              </div>

              <button className={styles.goBtn} onClick={goToPorra}>
                Ir a la porra →
              </button>

              <p className={styles.pinFooter}>
                Código de sala para jugadores: <strong>{createdPorra.code}</strong>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

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
            <div className={styles.form} style={{animation:"slideUp 0.3s ease both"}}>
              <h1 className={styles.formTitle}>La porra 🔥</h1>
              <p className={styles.formSubtitle}>¿De qué va el pique y cuándo se acaba el tiempo?</p>

              <div className={styles.field}>
                <label>Tu nombre (organizador)</label>
                <input placeholder="¿Cómo te llaman?" value={organizerName} onChange={e => { setOrganizerName(e.target.value); setErrors({}); }} />
                {errors.organizerName && <span className={styles.err}>{errors.organizerName}</span>}
              </div>

              <div className={styles.field}>
                <label>Título de la porra</label>
                <input placeholder="Ej: ¿Quién gana Eurovisión 2026?" value={title} onChange={e => { setTitle(e.target.value); setErrors({}); }} maxLength={80} />
                {errors.title && <span className={styles.err}>{errors.title}</span>}
              </div>

              <div className={styles.field}>
                <label>Descripción <span className={styles.optional}>(opcional)</span></label>
                <textarea placeholder="Contexto extra, reglas adicionales..." value={description} onChange={e => setDescription(e.target.value)} rows={3} maxLength={300} />
              </div>

              <div className={styles.field}>
                <label>¿Cuándo cierra?</label>
                <input type="datetime-local" min={minDateTime} value={closesAt} onChange={e => { setClosesAt(e.target.value); setErrors({}); }} />
                {errors.closesAt && <span className={styles.err}>{errors.closesAt}</span>}
              </div>

              <button className={styles.nextBtn} onClick={() => validateStep1() && setStep(2)}>Siguiente →</button>
            </div>
          )}

          {step === 2 && (
            <div className={styles.form} style={{animation:"slideUp 0.3s ease both"}}>
              <h1 className={styles.formTitle}>Las opciones 🎯</h1>
              <p className={styles.formSubtitle}>¿A qué se puede apostar?</p>

              <div className={styles.optionsList}>
                {options.map((opt, i) => (
                  <div key={i} className={styles.optionRow}>
                    <span className={styles.optionNum}>{i + 1}</span>
                    <input placeholder={`Opción ${i + 1}`} value={opt} onChange={e => updateOption(i, e.target.value)} maxLength={60} />
                    {options.length > 2 && (
                      <button className={styles.removeBtn} onClick={() => removeOption(i)}>✕</button>
                    )}
                  </div>
                ))}
              </div>
              {errors.options && <span className={styles.err}>{errors.options}</span>}

              <button className={styles.addOptionBtn} onClick={addOption}>+ Añadir opción</button>
              <button className={styles.nextBtn} onClick={() => validateStep2() && setStep(3)}>Siguiente →</button>
            </div>
          )}

          {step === 3 && (
            <div className={styles.form} style={{animation:"slideUp 0.3s ease both"}}>
              <h1 className={styles.formTitle}>Las reglas 📋</h1>
              <p className={styles.formSubtitle}>Casi listo. Afina los detalles.</p>

              <div className={styles.field}>
                <label>Importe de apuesta</label>
                <div className={styles.betRow}>
                  <div className={styles.betField}>
                    <input type="number" min="0" step="0.5" placeholder="Mín (€)" value={minBet} onChange={e => { setMinBet(e.target.value); setErrors({}); }} />
                  </div>
                  <span className={styles.betSep}>—</span>
                  <div className={styles.betField}>
                    <input type="number" min="0" step="0.5" placeholder="Máx (€)" value={maxBet} onChange={e => { setMaxBet(e.target.value); setErrors({}); }} />
                  </div>
                </div>
                <p className={styles.hint}>Déjalo vacío para apuesta libre</p>
                {errors.bet && <span className={styles.err}>{errors.bet}</span>}
              </div>

              <div className={styles.field}>
                <label>¿Se pueden cambiar las apuestas?</label>
                <div className={styles.toggleRow}>
                  <button className={`${styles.toggleBtn} ${allowChanges ? styles.toggleActive : ""}`} onClick={() => setAllowChanges(true)}>Sí, hasta el cierre</button>
                  <button className={`${styles.toggleBtn} ${!allowChanges ? styles.toggleActive : ""}`} onClick={() => setAllowChanges(false)}>No, apuesta fija</button>
                </div>
              </div>

              <div className={styles.field}>
                <label>Tipo de bote</label>
                <div className={styles.toggleRow}>
                  <button className={`${styles.toggleBtn} ${potType === "distributed" ? styles.toggleActive : ""}`} onClick={() => setPotType("distributed")}>Distribuido</button>
                  <button className={`${styles.toggleBtn} ${potType === "common" ? styles.toggleActive : ""}`} onClick={() => setPotType("common")}>Bote común</button>
                </div>
                <p className={styles.hint}>
                  {potType === "distributed"
                    ? "Nadie guarda nada. Piquefy calcula al final quién le pasa pasta a quién."
                    : "Alguien guarda el bote. Piquefy calcula a quién y cuánto hay que darle."}
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
