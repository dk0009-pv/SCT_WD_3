import useQuiz from './hooks/useQuiz'
import StartScreen  from './components/StartScreen'
import QuizScreen   from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'

export default function App() {
  const quiz = useQuiz()

  return (
    <div className="min-h-screen flex items-start justify-center p-4 md:p-8">
      {/* Background blobs */}
      <div style={{
        position:'fixed', width:500, height:500, borderRadius:'50%',
        background:'#7c6fff', filter:'blur(100px)', opacity:0.1,
        top:-150, left:-150, pointerEvents:'none', zIndex:0
      }}/>
      <div style={{
        position:'fixed', width:400, height:400, borderRadius:'50%',
        background:'#00d4ff', filter:'blur(100px)', opacity:0.08,
        bottom:-100, right:-100, pointerEvents:'none', zIndex:0
      }}/>

      <div className="w-full max-w-2xl relative z-10 mt-4">
        {quiz.screen === 'start'  && <StartScreen  quiz={quiz} />}
        {quiz.screen === 'quiz'   && <QuizScreen   quiz={quiz} />}
        {quiz.screen === 'result' && <ResultScreen quiz={quiz} />}
      </div>
    </div>
  )
}
