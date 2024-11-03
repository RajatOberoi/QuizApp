import "./SelectBox.css"

export default function SelectBox({
  answer
  ,type
  ,isSelected
  ,getKey
  ,id,
  selectedImage,
  initialImage,
  content,
  sx,
  isClickable=true,
  selectionLogic='checkAnswer',
  applySelectedClass=true
}) {
  
    const checkAnswer = ()=>{
      if(answer){
        if(type==='select'){
            if(answer.key===id){
                return true
            }
            else{
                return false
            }
        }
        if(type==='multi-select'){
            const filterData = answer.filter((item)=>item.key===id)
            if(filterData.length>0){
                return true
            }
            else{
                return false
            }
        }
      }
      else{
        return false
      } 
    }
    
    const isSelectedValue = selectionLogic === 'isSelected' ? isSelected : checkAnswer();

    return (
    <div key={id} className={`select-box ${applySelectedClass && isSelectedValue ? "selected" : ""}`} onClick={()=>isClickable && getKey(id,content)} style={sx}>
        <img src={isSelectedValue?selectedImage:initialImage} alt="BoxImage" height={"60%"} width={"10%"}/>
        {content}
    </div>
  )
}
