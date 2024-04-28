import { useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga4';

import { GeneratorPresenter } from './GeneratorPresenter';
import { useAtom } from 'jotai';
import { LanguageType } from '../../types/LanguageType';
import { Images } from '../../../public/assets/images/images';
import { langTypeAtom } from '../../atoms/languageAtom';
import { TextPositionType } from '../../types/Text';

export const GeneratorContainer = () => {
  const [currentLangType] = useAtom<LanguageType>(langTypeAtom);
  const [canvasText, setCanvasText] = useState<string>('');
  const [textPosition, setTextPosition] = useState<TextPositionType>({
    x: Images[0].positionX,
    y: Images[0].positionY,
    maxWidth: Images[0].maxWidth,
    maxHeight: Images[0].maxHeight,
  });
  const [selectedImage, setSelectedImage] = useState(Images[0].src);

  const canvasRef: React.RefObject<HTMLCanvasElement> = useRef(null);
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
    console.log({ lines });
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
    <GeneratorPresenter
      canvasText={canvasText}
      currentLangType={currentLangType}
      canvasRef={canvasRef}
      handleInput={handleInput}
      handleSelect={handleSelect}
      handleDownloadButton={handleDownloadButton}
    />
  );
};
