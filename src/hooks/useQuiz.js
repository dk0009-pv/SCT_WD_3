// src/hooks/useQuiz.js
import { useState, useEffect, useRef, useCallback } from 'react'
import { QUESTIONS } from '../data/questions'

const TIMER_DURATION = 15

export default function useQuiz() {
  const [screen,    setScreen]    = useState('start')
  const [idx,       setIdx]       = useState(0)
  const [score,     setScore]     = useState(0)
  const [correct,   setCorrect]   = useState(0)
  const [wrong,     setWrong]     = useState(0)
  const [skipped,   setSkipped]   = useState(0)
  const [answered,  setAnswered]  = useState(false)
  const [multiSel,  setMultiSel]  = useState([])
  const [feedback,  setFeedback]  = useState(null)
  const [timeLeft,  setTimeLeft]  = useState(TIMER_DURATION)
  const [revealed,  setRevealed]  = useState([])
  const timerRef = useRef(null)

  const q = QUESTIONS[idx]

  const stopTimer = useCallback(() => clearInterval(timerRef.current), [])

  const startTimer = useCallback(() => {
    stopTimer()
    setTimeLeft(TIMER_DURATION)
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current); return 0 } return t - 1 })
    }, 1000)
  }, [stopTimer])

  // Time up
  useEffect(() => {
    if (timeLeft === 0 && !answered && screen === 'quiz') {
      setAnswered(true)
      setSkipped(s => s + 1)
      stopTimer()
      const ansText = q.type === 'multi' ? q.ans.map(i => q.opts[i]).join(', ') : q.type === 'fill' ? q.ans : q.opts[q.ans]
      setFeedback({ type: 'timeout', message: `Time's up! Answer: ${ansText}. ${q.explain}` })
      if (q.type === 'single') setRevealed([{ i: q.ans, state: 'correct' }])
      else if (q.type === 'multi') setRevealed(q.ans.map(i => ({ i, state: 'correct' })))
    }
  }, [timeLeft, answered, screen])

  const startQuiz = useCallback(() => {
    setScreen('quiz'); setIdx(0); setScore(0); setCorrect(0); setWrong(0); setSkipped(0)
    setAnswered(false); setMultiSel([]); setFeedback(null); setRevealed([])
    startTimer()
  }, [startTimer])

  const loadNext = useCallback((nextIdx) => {
    setIdx(nextIdx); setAnswered(false); setMultiSel([]); setFeedback(null); setRevealed([])
    startTimer()
  }, [startTimer])

  const nextQuestion = useCallback(() => {
    if (idx + 1 >= QUESTIONS.length) { setScreen('result'); stopTimer() }
    else loadNext(idx + 1)
  }, [idx, loadNext, stopTimer])

  const selectSingle = useCallback((i) => {
    if (answered) return
    setAnswered(true); stopTimer()
    const ok = i === q.ans
    setRevealed([{ i: q.ans, state: 'correct' }, ...(!ok ? [{ i, state: 'wrong' }] : [])])
    if (ok) { setCorrect(c => c+1); setScore(s => s+q.points); setFeedback({ type:'correct', message:`Correct! ${q.explain}` }) }
    else    { setWrong(w => w+1);   setFeedback({ type:'wrong', message:`Wrong. Correct: ${q.opts[q.ans]}. ${q.explain}` }) }
  }, [answered, q, stopTimer])

  const toggleMulti = useCallback((i) => {
    if (answered) return
    setMultiSel(sel => sel.includes(i) ? sel.filter(x => x !== i) : [...sel, i])
  }, [answered])

  const submitMulti = useCallback(() => {
    if (answered) return
    setAnswered(true); stopTimer()
    const ok = JSON.stringify([...multiSel].sort()) === JSON.stringify([...q.ans].sort())
    setRevealed(q.opts.map((_,i) => ({ i, state: q.ans.includes(i) ? 'correct' : multiSel.includes(i) ? 'wrong' : null })).filter(r => r.state))
    if (ok) { setCorrect(c => c+1); setScore(s => s+q.points); setFeedback({ type:'correct', message:`Correct! ${q.explain}` }) }
    else    { setWrong(w => w+1);   setFeedback({ type:'wrong', message:`Wrong. Correct: ${q.ans.map(i=>q.opts[i]).join(', ')}. ${q.explain}` }) }
  }, [answered, multiSel, q, stopTimer])

  const submitFill = useCallback((value) => {
    if (answered) return
    const val = value.trim().toLowerCase(); if (!val) return
    setAnswered(true); stopTimer()
    const ok = val === q.ans.toLowerCase()
    if (ok) { setCorrect(c => c+1); setScore(s => s+q.points); setFeedback({ type:'correct', message:`Correct! ${q.explain}` }) }
    else    { setWrong(w => w+1);   setFeedback({ type:'wrong', message:`Wrong. Answer: ${q.ans}. ${q.explain}` }) }
  }, [answered, q, stopTimer])

  const quit  = useCallback(() => { stopTimer(); setScreen('start') }, [stopTimer])
  const retry = useCallback(() => startQuiz(), [startQuiz])
  const goHome = useCallback(() => { stopTimer(); setScreen('start') }, [stopTimer])

  useEffect(() => () => stopTimer(), [stopTimer])

  return {
    screen, q, idx, score, correct, wrong, skipped, answered, multiSel, feedback,
    timeLeft, revealed, total: QUESTIONS.length,
    timerPct: (timeLeft / TIMER_DURATION) * 100,
    progress: ((idx) / QUESTIONS.length) * 100 + (100 / QUESTIONS.length),
    startQuiz, nextQuestion, selectSingle, toggleMulti, submitMulti, submitFill,
    quit, retry, goHome,
  }
}
