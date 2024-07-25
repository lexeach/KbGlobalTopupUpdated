import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import NavBar from "./components/navbar";
import Header from "./components/header";
import Footer from "./components/footer";
import UserInfo from "./components/user-info";
import WriteAbleFun from "./components/writes-functions";
import UserAccount from "./components/userAccount";
import "./assets/style/style.scss";
import Slider from "./components/read-functions";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <div className="wrap ">
            <div className="dashboard min-vh-100">
              <NavBar />
              <UserAccount />
              {/* <ConnectWallet /> */}
              <Header />
              <Slider />
              <UserInfo />
              <WriteAbleFun />
              <Footer />
            </div>
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
