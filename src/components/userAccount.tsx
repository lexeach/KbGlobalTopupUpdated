// import { useAccount, useBalance } from "wagmi";
import { useAccount, useDisconnect } from "wagmi";
import { WalletOptions } from "../wallet-options";

export default function UserAccount() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  // const { data } = useBalance({
  //   address,
  // });

  // const formatted = data && Number(data?.formatted).toFixed(8);

  if (isConnecting)
    return (
      <div className="address">
        <div className="head-card mx-5 mt-4 width-100">Connecting… </div>
      </div>
    );
  if (isDisconnected)
    return (
      <div className="address">
        <div className="head-card mx-5 mt-4 width-100"><WalletOptions /></div>
      </div>
    );
  return (
    <div className="address">
      <div className="head-card mx-5 mt-4 width-100">
        {/* <p className="cards-numbers clr-w">
          {formatted} {data?.symbol}
        </p> */}
        <p className="cards-title clr-w">{address}</p>
        <button className="mybtn1" onClick={() => disconnect()}>Disconnect</button>
      </div>
    </div>
  );
}
