import "./MainLayout.css"

export default function MainLayout(props) {
  return (
    <div className="main-layout" {...props}>
        {props.children}
    </div>
  )
}
