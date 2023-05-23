import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Content from "./pages/Content";
import Landing from "./pages/Landing";
import HomeButton from "./components/Button/HomeButton";
import UpdateContent from "./pages/UpdateContent";
import Login from "./pages/Login";
import TopRightBar from "./components/Bar/TopRightBar";
import MyContent from "./pages/MyPage/MyContent";
import MyTrash from "./pages/MyPage/MyTrash";
import MyInfo from "./pages/MyPage/MyInfo";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import CreateUpdateContentForm from "./components/Form/CreateUpdateContentForm";
import CreateContent from "./pages/CreateContent";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="top-bar">
          <HomeButton />
          <TopRightBar />
        </div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage/content" element={<MyContent />} />
          <Route path="/mypage/myinfo" element={<MyInfo />} />
          <Route path="/mypage/trash" element={<MyTrash />} />
          <Route path="/content/create_content" element={<CreateContent />} />
          <Route
            path="/content/update_content/:id"
            element={<UpdateContent />}
          />
          <Route path="/content/:id" element={<Content />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
