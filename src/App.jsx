import './App.css'
import { Route,Routes } from 'react-router-dom'
import QuestionContainer from './pages/QuestionContainer/QuestionContainer'
import QuizPage from './pages/QuizPage/QuizPage'
import NoMatch from './pages/NoMatch/NoMatch'
import ReportPage from './pages/ReportPage/ReportPage'
import UpdatePrompt from './pages/UpdatePrompt'

function App() {

  return (
    <div className='app'>
        <Routes>
        <Route path="/" element={<QuizPage/>}/>
        <Route path="/quiz" element={<QuestionContainer />} />
        <Route path="/getReport" element={<ReportPage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <UpdatePrompt/>
    </div>
  )
}

export default App
