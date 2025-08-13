import SupaChatbot from "./SupaChatbot";
import { GlobalStyle } from "./components/styled";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <GlobalStyle />

      <SupaChatbot
        chatbotId={"6873569eb9121dd6ab7236c9"}
        botAvatar={
          "https://raw.githubusercontent.com/troika-tech/Asset/refs/heads/main/Supa%20Agent%20new.png"
        }
        botName={"Supa Agent"}
        //  apiBase={"http://localhost:5000/api"}
      />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
