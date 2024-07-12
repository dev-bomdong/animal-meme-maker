import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
  font-family: DungGeunMo;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: #22212c;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  padding: 1.2rem 1rem 1.5rem 1rem;
  border-radius: 8px;
`;

export const SelectWrapper = styled.div`
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  color: #8aff80;
`;

export const Select = styled.select`
  max-width: 14rem;
  cursor: pointer;
  color: #ff80bf;
  background: none;
  border: none;
  font-size: 1.3rem;
  font-family: DungGeunMo;

  &:focus {
    outline: none;
  }
`;

export const Option = styled.option`
  height: 3rem;
`;

export const Input = styled.input`
  height: 2rem;
  font-size: 1.2rem;
  padding: 6px 12px;
  border: none;
  border: 0.5px solid gray;
  color: #ffffff;
  background: none;
  border-radius: 6px;

  &:hover {
    border: 0.5px solid #ffffff;
  }

  &:focus {
    outline: none;
    border: 0.5px solid #ffffff;
  }
`;

export const DownloadButton = styled.button`
  font-size: 1.2rem;
  font-weight: normal;
  background: #323441;
  color: #dcdcaa;

  &:hover {
    border: 1px solid #9580ff;
  }
`;
