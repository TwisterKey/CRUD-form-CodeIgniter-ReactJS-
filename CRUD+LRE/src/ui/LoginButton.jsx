import styled from "styled-components";

const Button = styled.button`
  width: 180px;
  height: 60px;
  cursor: pointer;
  background: transparent;
  border: 1px solid #ff416c;
  outline: none;
  position: relative; /* Setăm poziția relativă pentru a permite plasarea SVG-ului */
  overflow: hidden; /* Ascundeți SVG-ul care iese în afara butonului */
`;

const Svg = styled.svg`
  position: absolute;
  left: 50%; /* Plasați SVG-ul în centrul butonului */
  top: 50%; /* Plasați SVG-ul în centrul butonului */
  transform: translate(-50%, -50%); /* Centrare verticală și orizontală */
  fill: none;
  stroke: #cf0e0e;
  stroke-dasharray: 150 480;
  stroke-dashoffset: 150;
  transition: 1s ease-in-out;

  ${Button}:hover & {
    stroke-dashoffset: -480;
  }
`;

const Text = styled.span`
  color: #e41717;
  font-size: 18px;
  font-weight: 100;
`;

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implementați logica de trimitere a formularului aici
    console.log("Form submitted");
  };

  return (
    <Button type="submit" onSubmit={handleSubmit}>
      <Svg width="180px" height="60px" viewBox="0 0 180 60">
        <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
        <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
      </Svg>
      <Text>Login</Text>
    </Button>
  );
};

export default LoginForm;
