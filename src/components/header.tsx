import { useAccount, useReadContract } from "wagmi";
import { formatEther } from "ethers/utils";
import { BigNumberish } from "ethers";

import {
  contract_abi,
  contract_address,
  contract_address_stable_coin_usdt,
  contract_abi_stabel_coin_usdt,
  contract_address_bnb_kbc,
  contract_abi_bnb_kbc,
  contract_price_pool,
} from "../contract";
import { config } from "../config";
import CountdownTimer from "./CountdownTimer";
import { useState, useEffect } from "react";
import { check_usd_price } from "../utils/convert-to-eth";

const Header = () => {
  const { address } = useAccount();

  const { data } = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "income",
    args: [address],
  });
  // const [kbcVal, setKbcVal] = useState<number>(1);
  const [usdVal, setUsdVal] = useState<string>("");
  const [rewardInfoRank, setRewardInfoRank] = useState(0);

  interface BalanceDetail {
    value: number | undefined | string;
    name: string;
  }

  const Balance_detail: BalanceDetail[] = [
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? parseFloat(formatEther(data[0])).toFixed(4)
          : 0,
      name: "Direct Income",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? parseFloat(formatEther(data[1])).toFixed(4)
          : 0,
      name: "Team Level ROI",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? parseFloat(formatEther(data[2])).toFixed(4)
          : 0,
      name: "Top 4 Income",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? parseFloat(formatEther(data[3])).toFixed(4)
          : 0,
      name: "Total Income",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? parseFloat(formatEther(data[4])).toFixed(4)
          : 0,
      name: "Taken Income",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? parseFloat(formatEther(data[5])).toFixed(4)
          : 0,
      name: "Balance Income",
    },
  ];

  // function 11
  const lastTopUp = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "lastTopup",
    args: [address],
    config,
  });

  const lastToUpVal = lastTopUp.data
    ? parseFloat(formatEther(lastTopUp.data as BigNumberish)).toFixed(4)
    : 0;

  // function 20
  const stakedUSDT = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "stakedUSDT",
    args: [address],
    config,
  });
  const BalanceOfKBC = useReadContract({
    abi: contract_abi_bnb_kbc,
    address: contract_address_bnb_kbc,
    functionName: "balanceOf",
    args: [contract_price_pool],
    config,
  });
  const BalanceOfStableCoin = useReadContract({
    abi: contract_abi_stabel_coin_usdt,
    address: contract_address_stable_coin_usdt,
    functionName: "balanceOf",
    args: [contract_price_pool],
    config,
  });

  const USD_price = check_usd_price(
    BalanceOfKBC.data as bigint,
    BalanceOfStableCoin.data as bigint
  );
  useEffect(() => {
    setUsdVal(USD_price.toString());
  }, [BalanceOfKBC.data, BalanceOfStableCoin.data]);

  const stakedUSDTVal = stakedUSDT.data
    ? parseFloat(formatEther(stakedUSDT.data as BigNumberish)).toFixed(4)
    : 0;

  // function 9
  const globalPool = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "globalPool",
    config,
  });

  const userData = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "users",
    args: [address],
    config,
  });

  let userDetail: bigint[] = [];
  userDetail = userData?.data as bigint[];
  // console.log("Status now: ",;
  let stakesTime = userDetail ? Number(userDetail[11]) : 0;
  const date = new Date(stakesTime * 1000);

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }; //currentRoundTime.toLocaleTimeString("en-US", options);
  const formattedTime = date.toLocaleTimeString("en-US", options);

  const globalethValue = globalPool.data
    ? parseFloat(formatEther(globalPool.data as BigNumberish)).toFixed(4)
    : 0;

  interface Header_Two {
    value: number | undefined | string;
    name: string;
  }

  // function 23
  const withdrawableROI = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "withdrawableROI",
    args: [address],
    config,
  });

  const withdrawableROIEth = withdrawableROI.data
    ? parseFloat(formatEther(withdrawableROI.data as BigNumberish)).toFixed(4)
    : 0;

  // insurancePool
  // function 9
  const insurancePool = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "insurancePool",
    config,
  });

  const insuranceethValue1 = insurancePool.data
    ? parseFloat(formatEther(insurancePool.data as BigNumberish)).toFixed(4)
    : 0;

  const insuranceethValue = (
    parseFloat(insuranceethValue1.toString()) / parseFloat(usdVal)
  ).toFixed(4);

  // function 9
  // const globalPool = useReadContract({
  //   abi: contract_abi,
  //   address: contract_address,
  //   functionName: "globalPool",
  //   config,
  // });

  // const globalethValue1 = globalPool.data
  //   ? parseFloat(formatEther(globalPool.data as BigNumberish)).toFixed(4)
  //   : 0;
  // console.log("globalethValue1: ", globalethValue1, globalethValue1);
  const globalethValue1 = (
    parseFloat(globalethValue.toString()) / parseFloat(usdVal)
  ).toFixed(4);
  const usersCT = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "users",
    args: [address],
    config,
  });

  let usersCTRes: bigint[] = [];
  usersCTRes = usersCT?.data as bigint[];

  const userTeamSize = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "userTeamSize",
    args: [address],
    config,
  });
  let userTeamSizeRes: bigint[] = [];
  userTeamSizeRes = userTeamSize?.data as bigint[];

  const userTurnOver = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "userTurnOver",
    args: [address],
    config,
  });

  let userTurnOverRes: bigint[] = [];
  userTurnOverRes = userTurnOver?.data as bigint[];
  const totalDeposit = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "totalDeposit",
    args: [address],
    config,
  });

  let totalDepositRes: bigint[] = [];
  totalDepositRes = totalDeposit?.data as bigint[];

  useEffect(() => {
    if (
      usersCTRes &&
      usersCTRes[2] >= 5 &&
      userTeamSizeRes[0] >= 15 &&
      userTurnOverRes[0] >= 3100e18 &&
      totalDepositRes[0] >= 100e18
    ) {
      setRewardInfoRank(1);
    } else if (
      usersCTRes &&
      usersCTRes[2] >= 7 &&
      userTeamSizeRes[0] >= 30 &&
      userTurnOverRes[0] >= 10300e18 &&
      totalDepositRes[0] >= 300e18
    ) {
      setRewardInfoRank(2);
    } else if (
      usersCTRes &&
      usersCTRes[2] >= 8 &&
      userTeamSizeRes[0] >= 50 &&
      userTurnOverRes[0] >= 30500e18 &&
      totalDepositRes[0] >= 500e18
    ) {
      setRewardInfoRank(3);
    } else if (
      usersCTRes &&
      usersCTRes[2] >= 10 &&
      userTeamSizeRes[0] >= 100 &&
      userTurnOverRes[0] >= 101000e18 &&
      totalDepositRes[0] >= 1000e18
    ) {
      setRewardInfoRank(4);
    } else if (
      usersCTRes &&
      usersCTRes[2] >= 12 &&
      userTeamSizeRes[0] >= 200 &&
      userTurnOverRes[0] >= 1000000e18 &&
      totalDepositRes[0] >= 5000e18
    ) {
      setRewardInfoRank(5);
    } else if (
      usersCTRes &&
      usersCTRes[2] >= 14 &&
      userTeamSizeRes[0] >= 500 &&
      userTurnOverRes[0] >= 5000000e18 &&
      totalDepositRes[0] >= 10000e18
    ) {
      setRewardInfoRank(6);
    } else if (
      usersCTRes &&
      usersCTRes[2] >= 15 &&
      userTeamSizeRes[0] >= 1000 &&
      userTurnOverRes[0] >= 20000000e18 &&
      totalDepositRes[0] >= 25000e18
    ) {
      setRewardInfoRank(7);
    }
  }, []);
  const InsurancePoolActive = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "InsurancePoolActive",
    config,
  });

  const Header_Two: Header_Two[] = [
    // {
    //   value: lastToUpVal,
    //   name: "Last TopUp",
    // },
    {
      value: globalethValue,
      name: "GlobalPool KBC",
    },
    {
      value: globalethValue1,
      name: "Global Pool USDT",
    },
    {
      value: withdrawableROIEth,
      name: "With Drawable ROI",
    },
    {
      value: insuranceethValue1,
      name: "InsurancePool KBC",
    },
    {
      value: insuranceethValue,
      name: "InsurancePool USDT",
    },
    {
      value: InsurancePoolActive.data ? "Active" : "Inactive",
      name: "Inactive Pool Active",
    },
    // {
    //   value: rewardInfoRank
    //     ? parseFloat(formatEther(rewardInfoRank).toString()).toFixed(4)
    //     : 0,
    //   name: "Rank",
    // },
  ];

  return (
    <>
      <div className="head-card skew mx-5 mt-4">
        <div className="row">
          {Balance_detail.map((element: BalanceDetail, i) => (
            <div className="col-lg-2 col-sm-6" key={i}>
              <div className="box">
                <p className="cards-numbers">
                  {element.value}
                  <span className="sub-number"> USDT</span>
                </p>
                <p className="cards-title">{element.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="head-card skew mx-5 mt-5 ">
        <div className="row">
          {Header_Two.map((element: BalanceDetail, i) => (
            <div className="col-lg-2 col-sm-6" key={i}>
              <div className="box">
                <p className="cards-numbers">
                  {element.value}
                  {/* <span className="sub-number"> USDT</span> */}
                </p>
                <p className="cards-title">{element.name}</p>
                {element.name === "With Drawable ROI" && (
                  <p id="countDownTinerROI" className="text-pink fs-3">
                    {" "}
                    <CountdownTimer targetTime={formattedTime} />
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Header;
