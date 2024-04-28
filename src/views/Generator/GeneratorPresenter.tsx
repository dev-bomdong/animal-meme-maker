import { Images } from '../../../public/assets/images/images';
import { ImageType } from '../../types/Image';
import { useI18n } from '../../hooks/useI18n';
import { LanguageType } from '../../types/LanguageType';
import * as Styled from './styles/GeneratorPresenter.styled';
import IcTabSymbol from '../../../public/assets/icons/IcTabSymbol.svg';

export type Props = {
  canvasText: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  currentLangType: LanguageType;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDownloadButton: () => void;
};
export const GeneratorPresenter = ({
  canvasText,
  canvasRef,
  currentLangType,
  handleInput,
  handleSelect,
  handleDownloadButton,
}: Props) => {
  const { getTransString } = useI18n(currentLangType);

  return (
    <Styled.Container>
      <Styled.Body>
        <img src={IcTabSymbol} width={54} alt="IcTabSymbol" />
        <Styled.SelectWrapper>
          <Styled.Select onChange={handleSelect}>
            {Images.map((item: ImageType) => (
              <Styled.Option value={item.src}>
                {getTransString(item.id as any)}
              </Styled.Option>
            ))}
          </Styled.Select>
          {getTransString('SAYS')}
        </Styled.SelectWrapper>
        <canvas id="canvas" ref={canvasRef} width={400} height={400} />
        <Styled.Input
          value={canvasText}
          placeholder={getTransString('INPUT_SOMETHING')}
          onChange={handleInput}
        />
        <Styled.DownloadButton onClick={handleDownloadButton}>
          {getTransString('DOWNLOAD')}
        </Styled.DownloadButton>
      </Styled.Body>
    </Styled.Container>
  );
};
