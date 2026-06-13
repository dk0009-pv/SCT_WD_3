// src/components/StartScreen.jsx
import styles from './Quiz.module.css'

export default function StartScreen({ quiz }) {
  return (
    <div className={`${styles.card} page-enter`}>
      <div className={styles.startIcon}>🧠</div>
      <h1 className={styles.startTitle}>
        General Knowledge<br/>
        <span className="gradient-text">Quiz Challenge</span>
      </h1>
      <p className={styles.startDesc}>
        10 mixed-format questions — single choice, multi-select &amp; fill-in-the-blank.
        Timed rounds with instant feedback and scoring.
      </p>

      <div className={styles.metaRow}>
        {['10 Questions','3 Types','15s Timer','3 Levels'].map(m => (
          <span key={m} className={styles.metaPill}>{m}</span>
        ))}
      </div>

      <div className={styles.typeLegend}>
        {[
          { cls: styles.typeSingle, label:'Single', desc:'Pick one correct answer' },
          { cls: styles.typeMulti,  label:'Multi',  desc:'Select all that apply' },
          { cls: styles.typeFill,   label:'Fill',   desc:'Type the answer' },
        ].map(({ cls, label, desc }) => (
          <div key={label} className={styles.legendItem}>
            <span className={`${styles.typeBadge} ${cls}`}>{label}</span>
            <span className={styles.legendDesc}>{desc}</span>
          </div>
        ))}
      </div>

      <button className={styles.btnPrimary} onClick={quiz.startQuiz}>
        🚀 Start Quiz
      </button>
      <p className={styles.hint}>
        Press <kbd className={styles.kbd}>Enter</kbd> to start
      </p>
    </div>
  )
}
