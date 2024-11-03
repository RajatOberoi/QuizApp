import "./StyledButton.css"

export default function StyledButton({ onClick, disabled, children, className = "", ...rest }) {
  const buttonClasses = `styled-button ${disabled ? "disabled" : ""} ${className}`;

  return (
    <button 
      className={buttonClasses} 
      onClick={onClick} 
      disabled={disabled} 
      {...rest}
    >
      {children}
    </button>
  );
}