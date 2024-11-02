import "./StyledButton.css"

export default function StyledButton(props) {

  return (
    <button className="styled-button" {...props}>
        {props.children}
    </button>
  )
}
