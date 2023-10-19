import styled from 'styled-components';
import ReactGA from 'react-ga4';

import { useEffect, useRef, useState } from 'react';
import { Images } from '../../public/assets/images/images';
import IcTabSymbol from '../../public/assets/icons/IcTabSymbol.svg';
import { useAtom } from 'jotai/index';
import { LanguageType } from '../types/LanguageType';
import { langTypeAtom } from '../atoms/languageAtom';
import { useI18n } from '../hooks/useI18n';
import { ImageType } from '../types/Image';

const MemeGenerator = () => {
  const [currentLangType, setCurrentLangType] =
    useAtom<LanguageType>(langTypeAtom);
  const { getTransString } = useI18n(currentLangType);

  const canvasRef: React.RefObject<HTMLCanvasElement> = useRef(null);
  const [canvasText, setCanvasText] = useState<string>('');
  const [textPosition, setTextPosition] = useState({
    x: Images[0].positionX,
    y: Images[0].positionY,
    maxWidth: Images[0].maxWidth,
    maxHeight: Images[0].maxHeight,
  });
  const [selectedImage, setSelectedImage] = useState(Images[0].src);
  const fontSize = 20;
  const lineHeight = fontSize * 1.2;

  const getDownloadEvent = () => {
    if (import.meta.env.MODE === 'production') {
      ReactGA.event({
        category: 'Button',
        action: 'click_download_button',
      });
    }
  };
  const drawText = (
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
  ) => {
    let line = '';
    let lineCnt = 0;
    for (let n = 0; n < text.length; n++) {
      const testLine = line + text[n];
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > textPosition.maxWidth || y > textPosition.maxHeight) {
        if (y + lineCnt * lineHeight > textPosition.maxHeight) {
          context.fillText(line.trim() + '...', x, y); // add ellipsis to the last valid line
          return;
        }

        context.fillText(line.trim(), x, y);
        line = text[n] + '';
        lineCnt++;
        y += lineHeight;
      } else {
        line += text[n];
      }
    }
    context.font = `${fontSize}px Dotum`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(line.trim(), x, y);
  };

  const updateCanvas = () => {
    if (canvasRef.current) {
      const context: CanvasRenderingContext2D | null =
        canvasRef.current.getContext('2d');

      if (context === null) {
        return;
      }

      const image = new Image();
      image.src = selectedImage;
      image.onload = () => {
        context.drawImage(image, 0, 0, 400, 400);
        context.font = `${fontSize}px Dotum`;
        drawText(context, canvasText, textPosition.x, textPosition.y);
      };
    }
  };

  const downloadImage = () => {
    getDownloadEvent();
    if (!canvasRef.current || canvasRef.current === null) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'image.png';
    document.body.appendChild(a);
    a.click();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCanvasText(e.target.value);
  };

  useEffect(() => {
    updateCanvas();
  }, [canvasText, selectedImage, textPosition]);

  return (
    <Container>
      <Body>
        <img src={IcTabSymbol} width={54} alt="IcTabSymbol" />
        <SelectWrapper>
          <Select
            onChange={(e) => {
              setTextPosition({
                x: Images[e.target.selectedIndex].positionX,
                y: Images[e.target.selectedIndex].positionY,
                maxWidth: Images[e.target.selectedIndex].maxWidth,
                maxHeight: Images[e.target.selectedIndex].maxHeight,
              });
              setSelectedImage(e.target.value);
              setCanvasText('');
            }}
          >
            {Images.map((item: ImageType) => (
              <Option value={item.src}>{getTransString(item.id as any)}</Option>
            ))}
          </Select>
          {getTransString('SAYS')}
        </SelectWrapper>
        <canvas id="canvas" ref={canvasRef} width={400} height={400} />
        <Input
          value={canvasText}
          placeholder={getTransString('INPUT_SOMETHING')}
          onChange={handleInput}
        />
        <DownloadButton onClick={downloadImage}>
          {getTransString('DOWNLOAD')}
        </DownloadButton>
      </Body>
    </Container>
  );
};

export default MemeGenerator;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
  font-family: DungGeunMo;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: #22212c;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  padding: 1.2rem 1rem 1.5rem 1rem;
  border-radius: 8px;
`;

const SelectWrapper = styled.div`
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  color: #8aff80;
`;

const Select = styled.select`
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

const Option = styled.option`
  height: 3rem;
`;

const Input = styled.input`
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

const DownloadButton = styled.button`
  font-size: 1.2rem;
  font-weight: normal;
  background: #323441;
  color: #dcdcaa;

  &:hover {
    border: 1px solid #9580ff;
  }
`;
