import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Content from "./pages/Content";
import Landing from "./pages/Landing";
import CreateContent from "./pages/CreateContent";
import HomeButton from "./components/Button/HomeButton";
import CreateButton from "./components/Button/CreateButton";
import UpdateContent from "./pages/UpdateContent";
import Search from "./pages/Search";
import Login from "./pages/Login";

function App() {
  // const navigate = useNavigate();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/content/create_content" element={<CreateContent />} />
        <Route path="/content/update_content/:id" element={<UpdateContent />} />
        <Route path="/content/:id" element={<Content />} />
        <Route path="/search/:keyword" element={<Search />} />
      </Routes>

      <div style={{ margin: "30px 0 0 0", display: "inline-block" }}>
        <HomeButton />
        <CreateButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
