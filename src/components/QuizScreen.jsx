import { useState, useEffect, useRef } from 'react'
import styles from './Quiz.module.css'

const LETTERS = ['A','B','C','D']

function optClass(styles, i, answered, revealed, multiSel, type) {
  const rev = revealed.find(r => r.i === i)
  if (answered && rev?.state === 'correct') return styles.optCorrect
  if (answered && rev?.state === 'wrong')   return styles.optWrong
  if (!answered && type === 'multi' && multiSel.includes(i)) return styles.optSelected
  return ''
}

export default function QuizScreen({ quiz }) {
  const { q, idx, total, score, answered, multiSel, feedback,
          timeLeft, timerPct, progress, revealed,
          selectSingle, toggleMulti, submitMulti, submitFill,
          nextQuestion, quit } = quiz

  const [fillVal,   setFillVal]   = useState('')
  const [fillState, setFillState] = useState('')
  const fillRef = useRef(null)
  const isLast  = idx === total - 1
  const urgent  = timeLeft <= 5

  useEffect(() => {
    setFillVal(''); setFillState('')
    if (q.type === 'fill') setTimeout(() => fillRef.current?.focus(), 80)
  }, [idx, q.type])

  useEffect(() => {
    if (answered && q.type === 'fill' && feedback)
      setFillState(feedback.type === 'correct' ? 'correct' : 'wrong')
  }, [answered, q.type, feedback])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter') {
        if (q.type === 'fill' && !answered) { submitFill(fillVal) }
        else if (answered) nextQuestion()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [q.type, answered, fillVal])

  return (
    <div className={`${styles.quizWrap} page-enter`}>

      {/* Top bar */}
      <div className={styles.topBar}>
        <span className={styles.qCounter}><strong>{idx+1}</strong> / {total}</span>
        <span className={styles.scoreChip}>⭐ {score} pts</span>
        <button className={styles.quitBtn} onClick={quit}>✕</button>
      </div>

      {/* Progress */}
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width:`${progress}%` }}/>
      </div>

      {/* Timer */}
      <div className={styles.timerRow}>
        <span className={`${styles.timerIcon} ${urgent ? styles.urgent : ''}`}>⏳</span>
        <div className={styles.timerTrack}>
          <div className={`${styles.timerFill} ${urgent ? styles.timerUrgent : ''}`} style={{ width:`${timerPct}%` }}/>
        </div>
        <span className={`${styles.timerNum} ${urgent ? styles.urgent : ''}`}>{timeLeft}s</span>
      </div>

      {/* Card */}
      <div className={styles.card}>
        {/* Badges */}
        <div className={styles.badges}>
          <span className={`${styles.typeBadge} ${styles['type'+q.type.charAt(0).toUpperCase()+q.type.slice(1)]}`}>
            {q.type === 'single' ? 'Single Choice' : q.type === 'multi' ? 'Multi Select' : 'Fill in Blank'}
          </span>
          <span className={`${styles.diffBadge} ${styles['diff'+q.difficulty.charAt(0).toUpperCase()+q.difficulty.slice(1)]}`}>
            {q.difficulty.charAt(0).toUpperCase()+q.difficulty.slice(1)}
          </span>
        </div>

        <p className={styles.questionText}>{q.q}</p>

        {/* Options */}
        {(q.type === 'single' || q.type === 'multi') && (
          <div className={styles.optionsGrid}>
            {q.opts.map((opt,i) => (
              <button
                key={i}
                disabled={answered}
                onClick={() => q.type === 'single' ? selectSingle(i) : toggleMulti(i)}
                className={`${styles.optBtn} ${optClass(styles,i,answered,revealed,multiSel,q.type)}`}
              >
                <span className={styles.optLetter}>{LETTERS[i]}</span>
                <span>{opt}</span>
              </button>
            ))}
          </div>
        )}

        {q.type === 'multi' && !answered && (
          <p className={styles.multiHint}>ℹ️ Select all correct answers, then click Submit</p>
        )}

        {/* Fill */}
        {q.type === 'fill' && (
          <div className={styles.fillWrap}>
            <input
              ref={fillRef}
              type="text"
              value={fillVal}
              onChange={e => setFillVal(e.target.value)}
              disabled={answered}
              placeholder="Type your answer and press Enter…"
              className={`${styles.fillInput} ${fillState ? styles['fill'+fillState.charAt(0).toUpperCase()+fillState.slice(1)] : ''}`}
              autoComplete="off" spellCheck="false"
            />
            {!answered && (
              <button className={styles.fillSubmit} onClick={() => submitFill(fillVal)}>➤</button>
            )}
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className={`${styles.feedback} ${styles['fb'+feedback.type.charAt(0).toUpperCase()+feedback.type.slice(1)]}`}>
            <span>{feedback.type === 'correct' ? '✅' : feedback.type === 'wrong' ? '❌' : '⏱️'}</span>
            <span dangerouslySetInnerHTML={{ __html: feedback.message }}/>
          </div>
        )}
      </div>

      {/* Action */}
      {!answered && q.type === 'multi' && multiSel.length > 0 && (
        <button className={styles.btnAction} onClick={submitMulti}>✈️ Submit Answer</button>
      )}
      {answered && (
        <button className={styles.btnAction} onClick={nextQuestion}>
          {isLast ? '🏁 See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  )
}
