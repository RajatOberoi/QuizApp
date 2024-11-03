import { useEffect,useState } from 'react'
import Paper from '../../components/Paper/Paper'
import MainLayout from '../../components/MainLayout/MainLayout'
import SelectBox from '../../components/SelectBox/SelectBox'
import Correct from "../../assets/correct.svg"
import Incorrect from "../../assets/incorrect.svg"
import Stars from "../../assets/Stars.svg"
import StyledButton from '../../components/StyledButton/StyledButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '../../components/CircularProgress/CircularProgress'

export default function ReportPage() {
  
  const [reportData,setReportData] = useState(null)
  const navigate = useNavigate()

  const getReportData = async(page)=>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_MOCK_API}/getReport?reportId=${1}`)
        setReportData(response.data)
    }
    catch(err){
        alert("Something Went Wrong",err)
    }
  }

  useEffect(()=>{
    getReportData()
  },[])
  
  return (
    <MainLayout style={{
      "background": "#AF9CF3",
      "paddingTop":0
    }}>
        <div style={{
          width:'100%',height:'10%',
          backgroundRepeat:'repeat-x'
          }}>
            <img height={'100%'} width={'100%'} src={Stars} alt='Stars'/>
        </div>
      {
              reportData?<Paper style={{"height":"70%",width:"90%",display:"flex",flexDirection:"column",justifyContent:"space-evenly",alignItems:"center",padding:"0.5rem"}}>
                      <h3 style={{width:'90%'}}>Your Result</h3>
                      <CircularProgress progress={3} max={5}/>
                      <SelectBox key={reportData.correctAns} isSelected={true} selectionLogic={'isSelected'} id={reportData.correctAns} content={reportData.correctAns+" "+"Correct"} selectedImage={Correct} initialImage={Incorrect} applySelectedClass={false} isClickable={false} sx={{background:"#A0D6B4",cursor:'default'}}/>
                      <SelectBox key={reportData.incorrectAns} isSelected={false} selectionLogic={'isSelected'} id={reportData.incorrectAns} content={reportData.incorrectAns+" "+"Incorrect"} selectedImage={Correct} initialImage={Incorrect} applySelectedClass={false} isClickable={false} sx={{background:"#FF8C8E",cursor:'default'}}/>
              </Paper>:"Loading......"
      }
      <StyledButton onClick={()=>navigate('/')} style={{width:"70%",maxWidth:"300px",justifyContent:"space-evenly"}}>Start Again </StyledButton>
  </MainLayout>
  )
}
