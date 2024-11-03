import "./Paper.css"

export default function Paper(props) {
  return (
    <div className="paper" {...props}>
        {
            props.children
        }
    </div>
  )
}
