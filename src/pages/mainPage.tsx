import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Images } from '../assets/images/images';

const MainPage = () => {
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
    if (!canvasRef.current || canvasRef.current === null) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    let a = document.createElement('a');
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
      <Header>
        <Title>동물 말풍선 짤 생성기</Title>
      </Header>

      <Body>
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
          {Images.map((item: any) => (
            <Option value={item.src}>{item.name}</Option>
          ))}
        </Select>
        <canvas id="canvas" ref={canvasRef} width={400} height={400} />
        <Input
          value={canvasText}
          placeholder={'동물이 할 말을 적어주세요'}
          onChange={handleInput}
        />
        <DownloadButton onClick={downloadImage}>다운로드</DownloadButton>
      </Body>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
`;

const Header = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-family: DungGeunMo;
  font-size: 3rem;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Select = styled.select`
  height: 3rem;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
`;

const Option = styled.option`
  height: 3rem;
`;

const Input = styled.input`
  height: 2rem;
  border-radius: 6px;
  padding: 6px;
  border: 1px solid lightgray;
`;

const DownloadButton = styled.button`
  font-family: DungGeunMo;
  font-size: 1.2rem;
  background: white;
  border: 1px solid lightgray;
`;
