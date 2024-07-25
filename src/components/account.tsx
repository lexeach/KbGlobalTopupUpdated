import { useDisconnect} from "wagmi";

export function Account() {
  const { disconnect } = useDisconnect();

  return (
    <div>
      <div className="d-flex justify-content-center input-section">
        <button className="mybtn1" onClick={() => disconnect()}>Disconnect</button>
      </div>
    </div>
  );
}
