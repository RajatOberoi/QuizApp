import {useEffect, useState} from 'react'
import Paper from '../../components/Paper/Paper'
import MainLayout from '../../components/MainLayout/MainLayout'
import SelectBox from '../../components/SelectBox/SelectBox'
import Tick from "../../assets/tick.svg"
import Empty from "../../assets/empty.svg"
import Next from "../../assets/next.svg"
import Stars from "../../assets/Stars.svg"
import StyledButton from '../../components/StyledButton/StyledButton'
import axios from 'axios'
import CircularProgress from '../../components/CircularProgress/CircularProgress'
import { useNavigate } from 'react-router-dom'

export default function QuestionContainer() {


    const [page,setPage] = useState(1)
    const [totalPage,setTotalPage] = useState(null)
    const [answer,setAnswer] = useState(null)
    const [question,setQuestion] = useState(null)
    // const [timer,setTimer] = useState(0) /* to be used for time */
    const navigate = useNavigate()
    
    const selectAnswer = (key,content)=>{
        if(question.type==='select'){
            if(answer.key!==key){
                setAnswer({key:key,content:content})
            }
        }
        if(question.type==='multi-select'){
            if(answer.length>0){
                const filteredData = answer.filter((item)=>item.key===key)
                if(filteredData.length===0){
                    setAnswer([...answer,{key:key,content:content}])
                }
                else{
                    const filteredData = answer.filter((item)=>item.key!==key)
                    setAnswer(filteredData)
                }
            }
            else{
                setAnswer([{key:key,content:content}])
            }
        }
    }

    const getPage = async(page)=>{
        try{
            const question = await axios.get(`${import.meta.env.VITE_MOCK_API}/quiz?page=${page}`)
            setQuestion(question.data.question)
            setTotalPage(question.data.totalPages)
            // setTimer(0)   /* to be used for timer to be sent in payload /*
            if(question.data.question.type==='select'){
                setAnswer({key:"",content:""})
            }
            if(question.data.question.type==='multi-select'){
                setAnswer([])
            }
        }
        catch(err){
            alert("Something Went Wrong",err)
        }

    }

    /* can be used to make post request */
    // const submitAnswer = async(data)=>{
    //     try{
    //         const response = await axios.post(`${import.meta.env.VITE_MOCK_API}/submitAnswer`,data)
    //         if(response.status===204){
    //             alert("Answer Submitted")
    //         }
    //     }
    //     catch(err){
    //         alert("Something Went Wrong",err)
    //     }
    // }

    const disableNext = ()=>{
        if(question?.type==='select'){
            if(answer?.key===""){
                return true
            }
            return false
        }
        if(question?.type==='multi-select'){
            if(answer?.length>0){
                return false
            }
            return true
        }
    }

    const nextPage = ()=>{
        /* payload */
        // let modifiedAnswer
        // if(typeof answer === Array){
        //     modifiedAnswer = [...answer]
        // }
        // else{
        //     modifiedAnswer = [answer]
        // }
        if(page===totalPage){
            /* payload */
            // const answerRequest = {
            //     answer: modifiedAnswer,
            //     QuestionId: question.id,
            //     TimeTaken: Math.floor(timer/60)
            // }
            // submitAnswer(answerRequest) // 
            navigate('/getReport')
        }
        else{
            /* payload */
            // const answerRequest = {
            //     answer: modifiedAnswer,
            //     QuestionId: question.id,
            //     TimeTaken: Math.floor(timer/60)
            // }
            // submitAnswer(answerRequest)
            setPage((prevPage)=>prevPage+1)
        }
    }


    useEffect(()=>{
        getPage(page)
    },[page])

    /* to be used when making post request*/
    // useEffect(()=>{
    //     if(question){
    //         let timeTaken = setInterval(()=>{
    //             setTimer((prevTime)=>prevTime+1)
    //         },1000)
    //         return ()=>{
    //             clearInterval(timeTaken)
    //         }
    //     }
    // },[question])


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
                    question?<Paper key={question.id} style={{"height":"70%",width:"90%",display:"flex",flexDirection:"column",justifyContent:"space-evenly",alignItems:"center",padding:"0.5rem",position:"relative"}}>
                        <div style={{position:'absolute',top:'-13%'}}>
                            <CircularProgress progress={page} max={totalPage}/>
                        </div>
                        <h3 style={{width:'90%',marginBottom:'1%'}}>{question.question}</h3>
                        {question.image?<img src={question.image} height={'20%'} width={'20%'} alt='QImg'/>:""}
                        {question.options?.map((option)=>{
                            return <SelectBox key={option.id} answer={answer} type={question.type} id={option.id} content={option.content} selectedImage={Tick} initialImage={Empty} getKey={(key,content)=>selectAnswer(key,content)}/>
                        })}
                    </Paper>:"Loading......"
            }
            <StyledButton disabled={disableNext()} onClick={()=>nextPage()} style={{width:"70%",maxWidth:"300px",justifyContent:"space-evenly"}}>Next <img src={Next} alt='Next'/></StyledButton>
        </MainLayout>
  )
}
