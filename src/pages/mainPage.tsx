import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import { Images } from '../assets/images/images'

const MainPage = () => {
  const canvasRef: React.RefObject<HTMLCanvasElement> = useRef(null)
  const [canvasText, setCanvasText] = useState<string>('')
  const [textPosition, setTextPosition] = useState({
    x: Images[0].positionX,
    y: Images[0].positionY,
  })
  const [selectedImage, setSelectedImage] = useState(Images[0].src)

  const updateCanvas = () => {
    if (canvasRef.current) {
      const context: CanvasRenderingContext2D =
        canvasRef.current.getContext('2d')

      const image = new Image()
      image.src = selectedImage
      image.onload = () => {
        context.drawImage(image, 0, 0, 400, 400)
        context.font = '20px Dotum'
        context.fillText(canvasText, textPosition.x, textPosition.y)
      }
    }
  }

  useEffect(() => {
    updateCanvas()
  }, [canvasText, selectedImage, textPosition])

  return (
    <Container>
      <Header>
        <Title>동물 말풍선 짤 생성기</Title>
      </Header>

      <Body>
        <select
          onChange={(e) => {
            setTextPosition({
              x: Images[e.target.selectedIndex].positionX,
              y: Images[e.target.selectedIndex].positionY,
            })
            setSelectedImage(e.target.value)
            setCanvasText('')
          }}
        >
          {Images.map((item: any) => (
            <option value={item.src}>{item.name}</option>
          ))}
        </select>
        <canvas id="canvas" ref={canvasRef} width={400} height={400} />
        <Input
          value={canvasText}
          placeholder={'동물이 할 말을 적어주세요'}
          onChange={(e) => {
            setCanvasText(e.target.value)
          }}
        />
        <DownloadButton>다운로드</DownloadButton>
      </Body>
    </Container>
  )
}

export default MainPage

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
`

const Header = styled.div`
  width: 100%;
`

const Title = styled.div`
  font-family: DungGeunMo;
  font-size: 3rem;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  height: 2rem;
  border-radius: 6px;
  border: 1px solid lightgray;
  padding: 6px;
`

const DownloadButton = styled.button``
