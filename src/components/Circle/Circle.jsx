import "./Circle.css"

export default function Circle(props) {
  return (
    <div className='circle' {...props}>
        <div>
        {props.children}
        </div>
    </div>
  )
}
