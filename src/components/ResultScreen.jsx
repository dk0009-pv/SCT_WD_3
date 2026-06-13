// src/components/ResultScreen.jsx
import styles from './Quiz.module.css'

const RESULTS = [
  { min:0.9, emoji:'🏆', title:'Outstanding!',     sub:'You absolutely aced it!' },
  { min:0.7, emoji:'🎉', title:'Great Job!',       sub:'You really know your stuff.' },
  { min:0.5, emoji:'👍', title:'Not Bad!',         sub:'A bit more practice and you\'ll nail it.' },
  { min:0.3, emoji:'📚', title:'Keep Going!',      sub:'Everyone starts somewhere. Keep studying!' },
  { min:0,   emoji:'💪', title:'Keep Practising!', sub:'Don\'t give up — try again!' },
]

export default function ResultScreen({ quiz }) {
  const { correct, wrong, skipped, score, total, retry, goHome } = quiz
  const pct    = correct / total
  const result = RESULTS.find(r => pct >= r.min)
  const CIRC   = 314
  const offset = CIRC * (1 - pct)

  return (
    <div className={`${styles.card} page-enter`} style={{ textAlign:'center' }}>
      <div className={styles.resultEmoji}>{result.emoji}</div>
      <h2 className={styles.resultTitle}>{result.title}</h2>
      <p  className={styles.resultSub}>{result.sub}</p>

      {/* Score ring */}
      <div className={styles.ringWrap}>
        <svg className={styles.ring} viewBox="0 0 120 120">
          <defs>
            <linearGradient id="rg2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#7c6fff"/>
              <stop offset="100%" stopColor="#00d4ff"/>
            </linearGradient>
          </defs>
          <circle className={styles.ringBg}  cx="60" cy="60" r="50"/>
          <circle className={styles.ringArc} cx="60" cy="60" r="50"
            style={{ strokeDasharray:CIRC, strokeDashoffset:offset, stroke:'url(#rg2)' }}
          />
        </svg>
        <div className={styles.ringText}>
          <span className={styles.ringScore}>{correct}</span>
          <span className={styles.ringDenom}>/{total}</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className={styles.breakdown}>
        {[
          { label:'Correct', value:correct, cls:styles.bdCorrect },
          { label:'Wrong',   value:wrong,   cls:styles.bdWrong },
          { label:'Skipped', value:skipped, cls:styles.bdSkipped },
          { label:'Points',  value:score,   cls:styles.bdPoints },
        ].map(({ label, value, cls }) => (
          <div key={label} className={`${styles.bdItem} ${cls}`}>
            <span className={styles.bdNum}>{value}</span>
            <span className={styles.bdLabel}>{label}</span>
          </div>
        ))}
      </div>

      <div className={styles.resultActions}>
        <button className={styles.btnPrimary} onClick={retry}  style={{ flex:1.5 }}>🔄 Try Again</button>
        <button className={styles.btnGhost}   onClick={goHome} style={{ flex:1 }}>🏠 Home</button>
      </div>

      <p style={{ fontSize:'0.72rem', color:'#44445a', marginTop:'1rem' }}>SCT_WD_3 · SkillCraft</p>
    </div>
  )
}
