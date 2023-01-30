
wlsdnjs156.log

로그인
wlsdnjs156.log

로그인
React - 게시판 만들기
wlsdnjs156·2022년 9월 20일
0
01.개요
02.컴포넌트 만들기
03.Board.js
04.Header
05.Home
06.BoardList & BoardContext & BoardTemplate
07.BoardCreate & ImageUploader & TextArea
08.Card & CardList & BoardHead
React
목록 보기
43/45


post-thumbnail
01.개요
TodoList를 응용해서 게시판 기능을 만들었다.
사용자가 게시글을 추가 및 삭제 할 수 있으며 게시글 정보에는 사진, 제목, 내용, 작성자 이름, 작성일이 보여지도록 만들었다.
참고한 블로그

https://duckgugong.tistory.com/category/React+REST%20API%20%EA%B2%8C%EC%8B%9C%ED%8C%90%20%EA%B5%AC%ED%98%84/FE%20-%20React?page=3
해당 블로그를 참고하여를 게시글 작성 기능을 구현 해보았다.
https://react.vlpt.us/mashup-todolist/01-create-components.html
해당 블로그를 참고하여 TodoList를 게시판 추가 및 삭제 기능에 적합하게 새로 수정하였다.
02.컴포넌트 만들기
만들어야 할 컴포넌트

Board.js

게시판 컴포넌트를 Headr와 Body 영역으로 구분한 컴포넌트 입니다.
Header.js

게시판 컴포넌트의 상단부분의 레이아웃을 설정하는 컴포넌트 입니다.
Home.js

게시판 화면 첫 메인 화면의 바디 부분의 레이아웃을 설정하는 컴포넌트 입니다.
BoardList.js

전체 게시글 목록을 모두 볼 수 있는 컴포넌트 입니다.
BoardContext.js

Context API를 활용하여 게시글 상태관리합니다.
BoardTemplate.js

전체 게시물을 보여주는 배경 부분의 레이아웃을 설정하는 컴포넌트 입니다.
페이지 중앙에 전체 게시글들을 포함할 수 있는 살색 배경의 레이아웃을 보여줍니다.
BoardCreate.js

새로운 게시글을 등록할 수 있게 해주는 컴포넌트입니다.
ImageUploader.js

게시글 중 사진을 업로드 할 수 있도록 해주는 컴포넌트 입니다.
TextArea.js

게시글 중 제목과 내용을 업로드 할 수 있도록 해주는 컴포넌트 입니다.
Card.js

작성된 게시글 내용을 Card 형태의 레이아웃으로 보여주는 컴포넌트 입니다.
사진, 제목, 내용, 작성자 이름, 작성일들을 Card 형태의 레이아웃으로 보여줍니다.
CardList.js

이 컴포넌트는 게시글에 대한 정보가 들어있는 todos 배열을 내장함수 map 을 사용하여 여러개의 Card 컴포넌트를 렌더링해줍니다.
BoardHead.js

전체 게시물 목록의 상단 부분을 나타내는 컴포넌트 입니다.
03.Board.js
게시판 컴포넌트를 Headr와 Body 영역으로 구분한 모달창 컴포넌트 입니다.
component/modal/Navigation/Board/Board.js
```javascript
import React from "react"
import styled from "styled-components"
import { Close } from "../../../../image/index.js"
import Header from "./Header.js"
import Home from "./Home.js"
import Menubar from "../Menubar.js"
import BoardModal from "react-modal"

const ModalContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 1350px;
  height: 890px;
  background-color: rgb(231, 235, 240);
`

const ModalHead = styled.div`
  width: 1350px;
  height: 100px;
`

const ModalBody = styled.div`
  width: 1350px;
  height: 790px;
  position: absolute;
  top: 100px;
`

const Closebtn = styled.img`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 3%;
  right: 3%;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`

const CustomStyle = styled(BoardModal)`
  width: 1610px;
  height: 850px;
  position: absolute;
  top: 4%;
  left: 2%;
  border-radius: 30px;
  background-color: red;
  @media screen and (min-width: 1920px) {
  }
`

const Container = styled.div`
  width: 1730px;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: -10;
  opacity: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
`

const Board = ({ isModal, setModal }) => {
  return (
    <BoardModal
      isOpen={isModal}
      onRequestClose={() => setModal(false)}
      ariaHideApp={false}
      style={{
        overlay: {
          position: "absolute",
          top: "0px",
          left: "0px",
          height: "100%",
          width: "90%",
        },

        content: {
          position: "fixed",
          top: "0px",
          bottom: "0px",
          left: "-200px",
          right: "0px",
          margin: "auto",
          width: "1610px",
          height: "850px",
          borderRadius: "30px",
        },
      }}

      <Menubar />

      <ModalContainer>
        <ModalHead>
          <Closebtn src={Close} onClick={() => setModal(false)} />
        </ModalHead>
        <ModalBody>
          <Header />
          <Home />
        </ModalBody>
      </ModalContainer>
    </BoardModal>
  )
}

export default Board
```

04.Header
게시판 컴포넌트의 상단부분의 레이아웃을 설정하는 컴포넌트 입니다.
component/modal/Navigation/Board/Header.js
```javascript
import zIndex from "@mui/material/styles/zIndex"
import React, { useState } from "react"
import styled from "styled-components"
import { AddBoardTrue, BoardListTrue } from "../../../navigation"
import Board from "./Board"
import BoardCreate from "./BoardCreate"

const HeaderWrapper = styled.div`
  padding: 1.2rem 4rem;
  color: #282c34;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: snow;
  border-radius: 10px;
  .header-title {
    span {
      font-size: 3rem;
      display: flex;
      align-items: center;
      font-family: "Pacifico", cursive;
    }
  }
  .header-menu {
    display: flex;
    flex-wrap: wrap;
  }
`

const Btn = styled.button`
  border-radius: 30px;
  margin-right: 30px;
  color: #333;
  background-color: #fff;
  p {
    list-style: none;
    margin: 0;
    padding: 0;
    text-decoration-line: none;
    font-weight: bold;
    font-size: 1.5rem;
    font-family: "Noto Sans KR", sans-serif;
    flex-shrink: 0;
    margin: 0 1rem;
  }
  :hover {
    color: #333;
    background-color: pink;
    cursor: pointer;
  }
`

const Header = () => {
  const [open, setOpen] = useState(false)
  const onToggle = () => setOpen(!open)

  return (
    <>
      <HeaderWrapper>
        <div className="header-title">
          <span>Health Together</span>
        </div>
        <div className="header-menu">
          <Btn onClick={() => BoardListTrue()}>
            <p>게시판</p>
          </Btn>
        </div>
      </HeaderWrapper>
    </>
  )
}

export default Header
```

05.Home
게시판 화면 첫 메인 화면의 바디 부분의 레이아웃을 설정하는 컴포넌트 입니다.
component/modal/Navigation/Board/Home.js
```javascript
import styled from "styled-components"

const HomeWrapper = styled.div`
  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }

  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Noto Sans KR", sans-serif;
  span {
    font-size: 2.7rem;
    font-family: "Pacifico", cursive;
  }
`

const HomeTitle = styled.div`
  opacity: 0;
  animation: smoothAppear 1s forwards;
  animation-delay: 0.5s;
  margin: 15px 0;
  font-size: 30px;
  font-weight: bold;
  color: midnightblue;
  span {
    font-size: 40px;
    font-family: "Pacifico", cursive;
  }
`

const HomeContents = styled.div`
  opacity: 0;
  animation: smoothAppear 1s forwards;
  animation-delay: 1s;
  margin: 30px 0;
  font-size: 30px;
  color: #282c34;
`

const AboutProject = styled.div`
  opacity: 0;
  animation: smoothAppear 1s forwards;
  animation-delay: 1.5s;
  margin: 30px 0;
  font-size: 25px;
  color: #282c34;
  text-align: center;
  span {
    font-size: 30px;
    font-weight: bold;
    color: blue;
  }
`

const MyWebsite = styled.div`
  opacity: 0;
  animation: smoothAppear 1s forwards;
  animation-delay: 2s;
  margin: 30px 0;
  text-align: center;
  .my-website-title {
    margin-bottom: 5px;
    font-size: 1.8rem;
    font-weight: bold;
    color: midnightblue;
  }
  a {
    font-size: 30px;
    margin: 0 10px;
  }
`

const Home = () => {
  return (
    <>
      <HomeWrapper>
        <HomeTitle>
          <span>Health Together</span>에 오신걸 환영합니다
        </HomeTitle>
        <HomeContents>
          자유롭게 게시판에 글을 작성하고📝
          <br />
          댓글로 여러 의견을 나눠보세요✏️
        </HomeContents>

        <AboutProject>
          이 게시판은 사용자들간의
          <br />
          <span> 소통을 위해</span> 만들었습니다😎
        </AboutProject>
        <MyWebsite>
          <div className="my-website-title">Welcome to Health Together.</div>
        </MyWebsite>
      </HomeWrapper>
    </>
  )
}

export default Home
```

06.BoardList & BoardContext & BoardTemplate
BoardList.js
전체 게시글을 모두 볼 수 있는 컴포넌트 입니다.
component/modal/Navigation/Board/BoardList.js
```javascript
// App.js
import React from "react"
import styled from "styled-components"
import { Close } from "../../../../image/index.js"
import Header from "./Header.js"
import Menubar from "../Menubar.js"
import BoardModal from "react-modal"
import { BoardProvider } from "./BaordContext.js"
import BoardTemplate from "./BoardTemplate.js"
import BoardHead from "./BoardHead.js"
import CardList from "./CardList.js"
import BoardCreate from "./BoardCreate.js"

const ModalContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 1350px;
  height: 890px;
  background-color: rgb(231, 235, 240);
`

const ModalHead = styled.div`
  width: 1350px;
  height: 100px;
`

const ModalBody = styled.div`
  width: 1350px;
  height: 690px;
  position: absolute;
  top: 100px;
`

const Closebtn = styled.img`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 3%;
  right: 3%;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`

const BoardListWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  opacity: 0;
  animation: smoothAppear 1.5s forwards;
  animation-delay: 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  .boardList-header {
    color: midnightblue;
    font-weight: bold;
    font-size: 2.5rem;
    margin-top: 50px;
  }
  .boardList-body {
    margin-top: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
`

const BoardList = ({ isModal, setModal }) => {
  return (
    <BoardModal
      isOpen={isModal}
      onRequestClose={() => setModal(false)}
      ariaHideApp={false}
      style={{
        overlay: {
          position: "absolute",
          top: "0px",
          left: "0px",
          height: "100%",
          width: "90%",
        },

        content: {
          position: "fixed",
          top: "0px",
          bottom: "0px",
          left: "-200px",
          right: "0px",
          margin: "auto",
          width: "1610px",
          height: "850px",
          borderRadius: "30px",
        },
      }}

      <Menubar />

      <ModalContainer>
        <ModalHead>
          <Closebtn src={Close} onClick={() => setModal(false)} />
        </ModalHead>
        <ModalBody>
          <Header />
          <BoardListWrapper>
            <div className="boardList-header">전체 게시물 📝</div>
            <div className="boardList-body" />
            <BoardProvider>
              <BoardTemplate>
                <BoardHead />
                <CardList />
                <BoardCreate />
              </BoardTemplate>
            </BoardProvider>
          </BoardListWrapper>
        </ModalBody>
      </ModalContainer>
    </BoardModal>
  )
}
```
export default BoardList
BoardContext.js

Context API를 활용하여 게시글 상태 관리합니다.
component/modal/Navigation/Board/BoardContext.js
```javascript
import React, { useReducer, createContext, useContext, useRef } from "react"

const initialTodos = []

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo)
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      )
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id)
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const TodoStateContext = createContext()
const TodoDispatchContext = createContext()
const TodoNextIdContext = createContext()

export function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos)
  const nextId = useRef(2)

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

export function useTodoState() {
  return useContext(TodoStateContext)
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext)
}

export function useTodoNextId() {
  return useContext(TodoNextIdContext)
}
```
BoardTemplate.js

전체 게시물을 보여주는 배경 부분의 레이아웃을 설정하는 컴포넌트 입니다.
페이지 중앙에 전체 게시글들을 포함할 수 있는 살색 배경의 레이아웃을 보여줍니다.

component/modal/Navigation/Board/BoardTemplate.js
```javascript
import React from "react"
import styled from "styled-components"

const TodoTemplateBlock = styled.div`
  width: 1200px;
  height: 600px;
  background-color: #fdd7a0;
  position: absolute; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  bottom: -10px;
  border-radius: 30px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  display: flex;
  flex-direction: column;
`

function BoardTemplate({ children }) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>
}

export default BoardTemplate
BoardProvider 컴포넌트안에 BoardTemplate 컴포넌트만 있는경우


BoardTemplate 컴포넌트안에 BoardCreate 컴포넌트가 있는경우

07.BoardCreate & ImageUploader & TextArea
BoardCreate.js
새로운 게시글을 등록할 수 있게 해주는 컴포넌트입니다.
component/modal/Navigation/Board/BoardList.js
import React, { useState, useCallback } from "react"
import styled from "styled-components"
import { useTodoDispatch, useTodoNextId } from "./BaordContext"
import { Button } from "@mui/material"
import { toast } from "react-toastify"
import ImageUploader from "./ImageUploader.js"
import TextArea from "./TextArea.js"
import axios from "axios"

const InsertFormPositioner = styled.div`
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
  background-color: #ffbec3;
  border-radius: 30px;
`

const AddBoardWrapper = styled.div`
  position: relative;
  top: 0px;
  z-index: 1;
  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  opacity: 0;
  animation: smoothAppear 1s forwards;
  animation-delay: 0.5s;
  font-family: "Noto Sans KR", sans-serif;
  .addBoard-header {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin: 50px 0;
  }
  .submitButton {
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
    }
    .disable-button {
      font-size: 1.1rem;
      cursor: not-allowed;
    }
    .success-button {
      font-size: 1.1rem;
    }
  }
  .addBoard-body {
    display: flex;
    margin: 20px 0;
    justify-content: center;
    flex-wrap: wrap;
  }
`

const Btn = styled.button`
  border-radius: 30px;
  position: absolute;
  top: -146px;
  right: 130px;
  color: #333;
  background-color: #fff;
  p {
    list-style: none;
    margin: 0;
    padding: 0;
    text-decoration-line: none;
    font-weight: bold;
    font-size: 1.5rem;
    font-family: "Noto Sans KR", sans-serif;
    flex-shrink: 0;
    margin: 0 1rem;
  }
  :hover {
    color: #333;
    background-color: pink;
    cursor: pointer;
  }
`

function BoardCreate() {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "",
  })
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const dispatch = useTodoDispatch()
  const nextId = useTodoNextId()

  const onToggle = () => setOpen(!open)
  const onSubmit = (e) => {
    dispatch({
      type: "CREATE",
      todo: {
        id: nextId.current,
        done: false,
        img_url: image.preview_URL,
        title: title,
        content: content,
        username: "홍길동",
        date: TodayTime(),
      },
    })
    setOpen(false)
    nextId.current += 1
  }

  // 현재 시간 값을 반환하는 함수
  const TodayTime = () => {
    let now = new Date() // 현재 날짜 및 시간
    let todayMonth = now.getMonth() + 1 // 월
    let todayDate = now.getDate() // 일
    const week = ["일", "월", "화", "수", "목", "금", "토"]
    let dayOfWeek = week[now.getDay()] // 요일
    let hours = now.getHours() // 시간
    let minutes = now.getMinutes() // 분

    return (
      todayMonth +
      "월" +
      todayDate +
      "일 " +
      dayOfWeek +
      "요일 " +
      hours +
      "시" +
      minutes +
      "분"
    )
  }

  const canSubmit = useCallback(() => {
    return image.image_file !== "" && content !== "" && title !== ""
  }, [image, title, content])

  const JsonData = {
    title: `${title}`,
    content: `${content}`,
    file: `${image.preview_URL}`,
  }

  const handleSubmit = useCallback(async () => {
    try {
      console.log(JSON.stringify(JsonData))
      axios({
        url: "/api/posts",
        method: "post",
        data: JsonData,
      })
        .then(function a(response) {
          console.log("서버에서 내려온값:", response)
        })
        .catch(function(error) {
          console.log("에러내용:", error)
        })

      window.alert("😎등록이 완료되었습니다😎")()
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error(
        "오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다" + "😭",
        {
          position: "top-center",
        }
      )
    }
  }, [canSubmit])

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <AddBoardWrapper>
            <div className="addBoard-header">게시물 등록하기 🖊️</div>

            <div className="submitButton">
              {canSubmit() ? (
                <Button
                  onClick={() => {
                    handleSubmit()
                    onSubmit()
                  }}
                  className="success-button"
                  variant="outlined"
               >
                  등록하기😃
                </Button>
              ) : (
                <Button
                  className="disable-button"
                  variant="outlined"
                  size="large"

                  사진과 내용을 모두 입력하세요😭
                </Button>
              )}
            </div>

            <div className="addBoard-body">
              <ImageUploader
                setImage={setImage}
                preview_URL={image.preview_URL}
              />
              <TextArea
                setTitle={setTitle}
                setContent={setContent}
                title={title}
                content={content}
              />
            </div>
          </AddBoardWrapper>
        </InsertFormPositioner>
      )}
      <Btn onClick={onToggle} open={open}>
        <p>글쓰기</p>
      </Btn>
    </>
  )
}

export default React.memo(BoardCreate)
```
ImageUploader.js
게시글 중 사진을 업로드 할 수 있도록 해주는 컴포넌트 입니다.
component/modal/Navigation/Board/ImageUploader.js
```javascript
import { Button } from "@mui/material"
import styled from "styled-components"

const UploaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 15px;
  .img-wrapper {
    img {
      width: 270px;
      height: 270px;
      object-fit: cover;
    }
  }
  .upload-button {
    button {
      margin: 10px 5px;
      font-size: 1.1rem;
    }
  }
`

export let img_url

const ImageUploader = ({ preview_URL, setImage }) => {
  let inputRef

  const saveImage = (e) => {
    e.preventDefault()
    const fileReader = new FileReader()
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0])
      // img_url = e.target.files[0]
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      })
    }
  }

  return (
    <UploaderWrapper>
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: "none" }}
      />
      <div className="img-wrapper">
        <img src={preview_URL} />
      </div>
      <div className="upload-button">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => inputRef.click()}

          😎사진 고르기😎
        </Button>
      </div>
    </UploaderWrapper>
  )
}

export default ImageUploader
```
TextArea.js
게시글 중 제목과 내용을 업로드 할 수 있도록 해주는 컴포넌트 입니다.
component/modal/Navigation/Board/ImageUploader.js
```javascript
import styled from "styled-components"

const TextAreaWrapper = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  .title {
    margin-bottom: 0.7rem;
  }
  .text {
    width: 270px;
    height: 270px;
  }

  input,
  textarea {
    &::-webkit-scrollbar {
      display: none;
    }

    resize: none;
    font-size: 18px;
    font-weight: 500;
    font-family: "Noto Sans KR", sans-serif;
    border: 1px solid whitesmoke;
    border-radius: 5px;
    transition: border 1s;
    padding: 5px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border: 3px solid skyblue;
    }
  }
`

export let Title = "",
  Content = ""

const TextArea = ({ setTitle, setContent, title, content }) => {

  return (
    <TextAreaWrapper>
      <input
        onChange={(e) => {
          setTitle(e.target.value)
        }}
        className="title"
        placeholder="제목을 입력하세요"
        value={title}
      />

      <textarea
        onChange={(e) => {
          setContent(e.target.value)
        }}
        className="text"
        placeholder="내용을 입력하세요"
        value={content}
      />
    </TextAreaWrapper>
  )
}
export default TextArea
```

08.Card & CardList & BoardHead
Crad.js
작성된 게시글 내용을 Card 형태의 레이아웃으로 보여주는 컴포넌트 입니다.
사진, 제목, 내용, 작성자 이름, 작성일들을 Card 형태의 레이아웃으로 보여줍니다.
component/modal/Navigation/Board/Card.js
```javascript
// TodoItem.js
import styled, { css } from "styled-components"
import { MdDelete } from "react-icons/md"
import { useTodoDispatch } from "./BaordContext.js"
import React from "react"

const Remove = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 40px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`

const CardWrapper = styled.div`
  flex-shrink: 0;
  margin: 15px;
  font-family: "Noto Sans KR", sans-serif;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 1s, height 1s, box-shadow 1s;
  cursor: pointer;

  &:hover {
    ${Remove} {
      display: initial;
    }
  }

  @media all and (min-width: 1024px) {
    width: 300px;
    height: 400px;

    &:hover {
      width: 310px;
      height: 410px;
      box-shadow: rgba(0, 0, 0, 0.9) 0px 22px 70px 4px;
    }
  }

  @media all and (max-width: 1024px) {
    width: 270px;
    height: 440px;

    &:hover {
      width: 280px;
      height: 450px;
      box-shadow: rgba(0, 0, 0, 0.9) 0px 22px 70px 4px;
    }
  }

  .card-header {
    width: 100%;
    height: 10%;
    border-radius: 10px 10px 0px 0px;
    position: relative;
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .card-body-img {
    width: 100%;
    height: 60%;

    img {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-body-text {
    flex-grow: 1;

    word-break: break-all;
    padding: 0.6rem;

    &::-webkit-scrollbar {
      display: none;
    }

    .card-body-text-title {
      font-size: 1.3rem;
      color: darkslategray;
      font-weight: bold;
    }
  }

  .card-footer {
    border-top: 0.5px solid black;
    padding: 0.6rem;
    font-weight: 200;
    display: flex;
    color: #282c34;
    font-size: 1.1rem;
    justify-content: space-between;
  }
`

const Card = ({ id, img_url, title, content, username, date }) => {
  const dispatch = useTodoDispatch()
  const onRemove = () => dispatch({ type: "REMOVE", id })

  return (
    <CardWrapper
      onClick={() => {
        console.log("Detail")
      }}
   >
      <div className="card-header">
        <Remove onClick={onRemove}>
          <MdDelete />
        </Remove>
      </div>
      <div className="card-body-img">
        <img alt="" src={img_url} />
      </div>
      <div className="card-body-text">
        <div className="card-body-text-title">{title}</div>
        <div className="card-body-text-content">{content}</div>
      </div>
      <div className="card-footer">
        <div className="username">{username}</div>
        <div className="date">{date}</div>
      </div>
    </CardWrapper>
  )
}

export default React.memo(Card)
```
CardList.js

이 컴포넌트는 게시글에 대한 정보가 들어있는 todos 배열을 내장함수 map 을 사용하여 여러개의 Card(게시글) 컴포넌트를 렌더링해줍니다.
component/modal/Navigation/Board/CardList.js
```javascript
// TodoList.js
import React from "react"
import styled from "styled-components"
import Card from "./Card"
import { useTodoState } from "./BaordContext"

const TodoListBlock = styled.div`
  flex: 1;
  border-radius: 30px;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-x: auto;
  display: flex;
`

function CardList() {
  const todos = useTodoState()

  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <Card
          key={todo.id}
          id={todo.id}
          done={todo.done}
          img_url={todo.img_url}
          title={todo.title}
          content={todo.content}
          username={todo.username}
          date={todo.date}
        />
      ))}
    </TodoListBlock>
  )
}

export default CardList
```
BoardHead.js
전체 게시물 목록의 상단 부분을 나타내는 컴포넌트 입니다.
component/modal/Navigation/Board/BoardHead.js
```javascript
import React from "react"
import styled from "styled-components"

const TodoHeadBlock = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 30px 30px 0px 0px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e9ecef;
`

function BoardHead() {
  return <TodoHeadBlock />
}

export default BoardHead
```

profile
일상 코딩
일취월장(日就月將) - 「날마다 달마다 성장하고 발전한다.」
이전 포스트
React - Context API
다음 포스트
React - Firebase 로그인
0개의 댓글
댓글을 작성하세요
댓글 작성
Powered by GraphCDN, the GraphQL CDN