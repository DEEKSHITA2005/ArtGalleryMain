import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios for API calls

// Styled components for the form
const BackgroundBox = styled.div`
  background-color: #1f2029;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
  background-image: url('https://www.transparenttextures.com/patterns/japanese-pattern-2.png');
`;

const ToggleContainer = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Card3DWrap = styled.div`
  position: relative;
  width: 440px;
  max-width: 100%;
  height: 550px;
  transform-style: preserve-3d;
  perspective: 800px;
`;

const Card3DWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: all 0.6s ease;
  transform: ${({ $clicked }) => ($clicked ? "rotateY(180deg)" : "rotateY(0)")};
`;

const CardSide = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #2b2e38;
  background-image: url('https://www.transparenttextures.com/patterns/black-scales.png');
  border-radius: 6px;
  backface-visibility: hidden;
`;

const CardFront = styled(CardSide)``;

const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: 40px;
  color: #c4c3ca;
`;

const Title = styled.h4`
  color: #ffeba7;
  font-size: 36px;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4), -2px -2px 5px rgba(255, 255, 255, 0.2);
`;

const Input = styled.input`
  background-color: #1f2029;
  border: none;
  border-bottom: 2px solid #ffeba7;
  padding: 15px;
  width: 100%;
  max-width: 400px;
  font-size: 16px;
  color: #c4c3ca;
  margin-bottom: 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6), -2px -2px 10px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-bottom: 2px solid #ffeba7;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.8), -4px -4px 15px rgba(255, 255, 255, 0.2);
  }
`;

const Button = styled.button`
  background-color: #ffeba7;
  border: none;
  color: #000;
  padding: 12px 30px;
  cursor: pointer;
  margin-top: 30px;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 18px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6), -2px -2px 10px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #000;
    color: #ffeba7;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.8), -4px -4px 15px rgba(255, 255, 255, 0.2);
  }
`;

const ForgotPassword = styled.p`
  font-size: 14px;
  margin-top: 20px;

  button {
    background: none;
    border: none;
    color: #ffeba7;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Select = styled.select`
  background-color: #1f2029;
  color: #c4c3ca;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  max-width: 400px;
  border: 2px solid #ffeba7;
  margin-bottom: 20px;

  &:focus {
    outline: none;
    border-color: #ffeba7;
  }
`;

const ToggleText = styled.h6`
  text-align: center;
  color: #ffeba7;
  font-weight: bold;
  font-size: 24px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  width: 200px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4), -2px -2px 5px rgba(255, 255, 255, 0.2);
`;

const Checkbox = styled.input`
  display: none;
`;

const Label = styled.label`
  position: relative;
  display: block;
  width: 60px;
  height: 16px;
  margin: 10px auto;
  background-color: #ffeba7;
  cursor: pointer;
  border-radius: 8px;

  &::before {
    content: '➔';
    position: absolute;
    width: 36px;
    height: 36px;
    background-color: #020305;
    color: #ffeba7;
    border-radius: 50%;
    top: -10px;
    left: -10px;
    line-height: 36px;
    font-size: 24px;
    text-align: center;
    transform: rotate(0deg);
    transition: all 0.5s ease;
  }

  ${Checkbox}:checked + &::before {
    transform: translateX(44px) rotate(180deg);
  }
`;

function FormComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState("ROLE_USER");

  useEffect(() => {
    if (location.pathname === '/signup') {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [location.pathname]);

  const handleFlip = () => {
    setClick(!click);
    navigate(click ? '/login' : '/signup');
  };

  const handleLogin = () => {
    const loginData = { email: loginEmail, password: loginPassword };

    axios.post('http://localhost:8080/api/users/login', loginData)
      .then(response => {
        const data = response.data;
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);
        localStorage.setItem('email', loginEmail);
        navigate('/');
        window.location.reload();
      })
      .catch(error => alert(`Login failed: ${error.message}`));
  };

  const handleSignup = () => {
    const signupData = {
      name: signupName,
      email: signupEmail,
      password: signupPassword,
      role: signupRole,
    };

    axios.post('http://localhost:8080/api/users/signup', signupData)
      .then(() => {
        localStorage.setItem('email', signupEmail);
        localStorage.setItem('name', signupName);
        navigate('/');
        window.location.reload();
      })
      .catch(error => alert(`Signup failed: ${error.message}`));
  };

  return (
    <BackgroundBox>
      <ToggleContainer>
        <ToggleWrapper>
          <ToggleText>
            <span>Log In</span>
            <span>Sign Up</span>
          </ToggleText>
          <Checkbox type="checkbox" id="reg-log" checked={click} onChange={handleFlip} />
          <Label htmlFor="reg-log"></Label>
        </ToggleWrapper>
      </ToggleContainer>

      <Card3DWrap>
        <Card3DWrapper $clicked={click}>
          <CardFront>
            <Form>
              <Title>Log In</Title>
              <Input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
              <Input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              <Button type="button" onClick={handleLogin}>Login</Button>
              <ForgotPassword>
                <button onClick={() => alert("Forgot password clicked!")}>Forgot your password?</button>
              </ForgotPassword>
            </Form>
          </CardFront>

          <CardBack>
            <Form>
              <Title>Sign Up</Title>
              <Input type="text" placeholder="Full Name" value={signupName} onChange={(e) => setSignupName(e.target.value)} />
              <Input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
              <Input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
              <Select value={signupRole} onChange={(e) => setSignupRole(e.target.value)}>
                <option value="ROLE_USER">User</option>
                <option value="ROLE_ARTIST">Artist</option>
                <option value="ROLE_ADMIN">Admin</option>
              </Select>
              <Button type="button" onClick={handleSignup}>Register</Button>
            </Form>
          </CardBack>
        </Card3DWrapper>
      </Card3DWrap>
    </BackgroundBox>
  );
}

export default FormComponent;
