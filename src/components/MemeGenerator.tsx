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

export type TextPositionType = {
  x: number;
  y: number;
  maxWidth: number;
  maxHeight: number;
};

const MemeGenerator = () => {
  const [currentLangType] = useAtom<LanguageType>(langTypeAtom);
  const { getTransString } = useI18n(currentLangType);

  const canvasRef: React.RefObject<HTMLCanvasElement> = useRef(null);
  const [canvasText, setCanvasText] = useState<string>('');
  const [textPosition, setTextPosition] = useState<TextPositionType>({
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

  /**
   * 줄바꿈 처리
   */
  const splitText = ({
    context,
    text,
    textPosition,
  }: {
    context: CanvasRenderingContext2D;
    text: string;
    textPosition: TextPositionType;
  }) => {
    const textByLines = [];
    let currentLineText = '';
    let lineCnt = 0;

    for (let n = 0; n < text.length; n++) {
      const combinedText = currentLineText + text[n];
      const metrics = context.measureText(combinedText);
      const testWidth = metrics.width;

      if (
        testWidth > textPosition.maxWidth ||
        textPosition.y + lineCnt * lineHeight > textPosition.maxHeight
      ) {
        textByLines.push(currentLineText.trim()); //꽉 채워진 한 줄을 배열로 push
        currentLineText = text[n]; //남은 글자 저장
        lineCnt++;
      } else {
        // 현재 줄에 글자 추가
        currentLineText = combinedText;
      }
    }
    // 줄바꿈 처리 후 남은 글자 처리
    if (currentLineText) {
      textByLines.push(currentLineText.trim());
    }
    return textByLines;
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

  const drawText = (
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
  ) => {
    // 텍스트를 줄바꿈 단위로 분리
    const lines = splitText({ context, text, textPosition });
    context.font = `${fontSize}px Dotum`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    for (let i = 0; i < lines.length; i++) {
      // y좌표가 maxHeight 초과시 말줄임 처리 후 종료
      if (y + i * lineHeight > textPosition.maxHeight) {
        return context.fillText(lines[i] + '..', x, y + i * lineHeight);
      }
      // n번째 줄 글자 그림
      context.fillText(lines[i].trim(), x, y + i * lineHeight);
    }
  };

  const downloadImage = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'image.png';
    document.body.appendChild(a);
    a.click();
  };

  const handleDownloadButton = () => {
    getDownloadEvent();
    if (!canvasRef.current || canvasRef.current === null) return;
    const url = canvasRef.current.toDataURL('image/png');
    downloadImage(url);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCanvasText(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextPosition({
      x: Images[e.target.selectedIndex].positionX,
      y: Images[e.target.selectedIndex].positionY,
      maxWidth: Images[e.target.selectedIndex].maxWidth,
      maxHeight: Images[e.target.selectedIndex].maxHeight,
    });
    setSelectedImage(e.target.value);
    setCanvasText('');
  };

  useEffect(() => {
    updateCanvas();
  }, [canvasText, selectedImage, textPosition]);

  return (
    <Container>
      <Body>
        <img src={IcTabSymbol} width={54} alt="IcTabSymbol" />
        <SelectWrapper>
          <Select onChange={handleSelect}>
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
        <DownloadButton onClick={handleDownloadButton}>
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
