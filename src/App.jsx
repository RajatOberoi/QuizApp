import './App.css'
import MainLayout from './components/MainLayout/MainLayout'
import Logo from "./assets/Frame.svg"
import Circle from './components/Circle/Circle'
import StyledButton from './components/StyledButton/StyledButton'

function App() {

  return (
    <div className='app'>
        <MainLayout style={{
          "background": "linear-gradient(180deg, rgba(175, 156, 243, 0) 7.92%, #AF9CF3 86.48%)",
          "backgroundBlendMode":"multiply"
        }}>
          <img src={Logo} height={'10%'} width={'20%'} alt="Logo" />
          <Circle style={{"color":"#FF3B3C"}}>
            Quiz
          </Circle>
          <StyledButton style={{width:"70%",maxWidth:"300px"}}>Start</StyledButton>
        </MainLayout>
    </div>
  )
}

export default App
