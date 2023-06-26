import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import LoginSignupTab from "./scenes/login-signup/login-signup-tab";
import ResumeForm from "./scenes/my-resume/resume-form";
import Page404 from "./scenes/global/404";
import useAxiosPrivate from "./hook/useAxios";
import ResumeList from "./scenes/my-resume/resume-list";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/resume" >
                <Route index element={<ResumeList />} />
                <Route path={"/resume/update/:id"} element={<ResumeForm />} />
                <Route path={"/resume/detail/:id"} element={<ResumeForm />} />
                <Route path={"/resume/create"} element={<ResumeForm />} />
              </Route>
              <Route path={"/static-resume/detail/:id"} element={<ResumeForm isStatic={true} />} />
              <Route path="/login" element={<LoginSignupTab />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
