import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      ⓒ 2023
      <a href={'https://github.com/dev-bomdong'} target="_blank">
        &nbsp;dev-bomdong&nbsp;
      </a>
      All rights reserved.&nbsp;
    </FooterContainer>
  );
};

export default Footer;

export const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-family: 'Pretendard';
  color: gray;
  position: fixed;
  bottom: 0.5rem;
  right: 1rem;
`;
