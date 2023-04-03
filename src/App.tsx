import "./App.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, HashRouter, Route, Router, Routes } from "react-router-dom";
import ChatbotSelector from "./pages/ChatbotSelector";
import ChatUI from "./pages/ChatUI";
import About from "./pages/About";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS
    theme={{
      colors: {
        'ocean-blue': ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9', '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
      },
      primaryColor: 'ocean-blue',
    }}
    > 
      {/* <Notifications> */}
        <HashRouter
        // Type '{ children: Element; }' is missing the following properties from type 'RouterProps': location, navigatorts(2739)
        >
          <Routes>
            <Route path="/chats" element={<ChatbotSelector></ChatbotSelector>} />
            <Route path="/chatui" element={<ChatUI></ChatUI>} />
            <Route path="/" element={<About></About>} />
          </Routes>
        </HashRouter>
      {/* </Notifications> */}
      {/* </NavbarNested> */}
    </MantineProvider>
  );
}

export default App;
