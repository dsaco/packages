import styled from '@emotion/styled';

import logo from '@/assets/logo.svg';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  padding-inline: 16px;
  background-color: rgb(255 255 255 / 60%);
  backdrop-filter: blur(8px);
  box-shadow: 0 3px 5px #eee;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1040px;
    height: 56px;
    margin: 0 auto;
  }

  & ~ div {
    padding-block-start: 56px;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <div>
        <Link to="/">
          <img src={logo} />
        </Link>
        <div>
          <Link to="/about">ABOUT</Link>
        </div>
      </div>
    </StyledHeader>
  );
}
