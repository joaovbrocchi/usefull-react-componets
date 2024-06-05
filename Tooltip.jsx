import { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const Info = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
`;

const Tooltip = styled.span`
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  margin-right: 10px;
  animation: ${({ isShaking }) => (isShaking ? shake : 'none')} 1s ease infinite;
`;

const Link = styled.a`
  color: #fff;
  font-size: 1.2rem;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: #00bcd4;
    cursor: pointer;
  }

  &:hover + ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`;

const Title = styled.h4`
  color: #fff;
  
`;

export default function PhoneNumber() {
  const phoneNumberRef = useRef(null);
  const [tooltipText, setTooltipText] = useState('Click to copy');

  const copyPhoneNumber = () => {
    const phoneNumber = phoneNumberRef.current.innerText;
    navigator.clipboard.writeText(phoneNumber).then(() => {
      setTooltipText('Number copied');
      setTimeout(() => setTooltipText('Click to copy'), 2000);
    });
  };

  return (
    <div>
      <Title>Entre em contato</Title>
      <Info>
        <Icon icon={faPhone} isShaking={true} />
        <Link ref={phoneNumberRef} onClick={copyPhoneNumber}>
          +55 35992759001
        </Link>
        <Tooltip>{tooltipText}</Tooltip>
      </Info>
    </div>
  );
}
