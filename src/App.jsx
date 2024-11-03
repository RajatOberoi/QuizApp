import './App.css'
import { Route,Routes } from 'react-router-dom'
import QuestionContainer from './pages/QuestionContainer/QuestionContainer'
import QuizPage from './pages/QuizPage/QuizPage'
import NoMatch from './pages/NoMatch/NoMatch'
import ReportPage from './pages/ReportPage/ReportPage'

function App() {

  return (
    <div className='app'>
        <Routes>
        <Route path="/" element={<QuizPage/>}/>
        <Route path="/quiz" element={<QuestionContainer />} />
        <Route path="/getReport" element={<ReportPage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>

    </div>
  )
}

export default App
