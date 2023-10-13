import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      ⓒ<a href={'https://github.com/dev-bomdong'}>dev-bomdong</a> All Rights
      Reserved
    </FooterContainer>
  );
};

export default Footer;

export const FooterContainer = styled.div`
  width: 100%;
  // display: flex;
  // justify-content: center;
`;
