import MainLayout from "../../components/MainLayout/MainLayout"
import StyledButton from "../../components/StyledButton/StyledButton"
import Circle from "../../components/Circle/Circle"
import Logo from "../../assets/Frame.svg"
import { useNavigate } from "react-router-dom"


export default function QuizPage() {
  const navigate = useNavigate()
    return (
    <MainLayout style={{
        "background": "linear-gradient(180deg, rgba(175, 156, 243, 0) 7.92%, #AF9CF3 86.48%)",
        "backgroundBlendMode":"multiply"
      }}>
        <img src={Logo} height={'20%'} width={'30%'} alt="Logo" />
        <Circle style={{"color":"#FF3B3C"}}>
          Quiz Interval New Logic
        </Circle>
        <StyledButton onClick={()=>navigate('/quiz')} style={{width:"70%",maxWidth:"300px",justifyContent:"center"}}>Start</StyledButton>
      </MainLayout>
  )
}
