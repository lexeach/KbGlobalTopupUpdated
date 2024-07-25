import {
  useAccount,
  // useWriteContract,
  //   useReadContract,
} from "wagmi";
import { parseEther } from "viem";

import { simulateContract, writeContract } from "@wagmi/core";

import { contract_abi, contract_address } from "./contract";
import { config } from "./config";

const Home = () => {
  const { address } = useAccount();

  //   const { writeContract } = useWriteContract();

  const writeFun = async () => {
    // const combinedArgument = "1000000000000000";
    const { request } = await simulateContract(config, {
      abi: contract_abi,
      address: contract_address,
      functionName: "Registration",
      args: [2],
      value: parseEther("0.001"),
    });
    const hash = await writeContract(config, request);

    console.log("hash", hash);
  };

  //   const result = useReadContract({
  //     abi: contract_abi,
  //     address: contract_address,
  //     functionName: "KbcPrice",
  //     config,
  //   });

  //   const kbcPrice = result?.data;
  //   console.log("kbc price", kbcPrice);

  //   // function 1
  //   const InsurancePoolActive = useReadContract({
  //     abi: contract_abi,
  //     address: contract_address,
  //     functionName: "InsurancePoolActive",
  //     // args: [`${address}`],
  //     config,
  //   });

  //   console.log(
  //     // "the result KBC price >>>>> ",
  //     // result.data,
  //     "InsurancePoolActive",
  //     InsurancePoolActive.data
  //   );

  //   const { isLoading: isConfirming, isSuccess: isConfirmed } =
  //     useWaitForTransactionReceipt({
  //       hash,
  //     });

  //     console.log(' isLoading: isConfirming, isSuccess: isConfirmed', isConfirming, isConfirmed);

  return (
    <>
      <h1> Hi from Home {address}</h1>
      <button onClick={writeFun}>wr fun </button>
    </>
  );
};

export default Home;
