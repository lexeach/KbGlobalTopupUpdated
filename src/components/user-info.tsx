import { useAccount, useReadContract } from "wagmi";
import { Button, Form, Input } from "antd";
import { formatEther } from "ethers/utils";
import dayjs from "dayjs";
import { BigNumberish } from "ethers";

// import { contract_address, contract_abi } from "../contract";
import { config } from "../config";
import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import { parseEther } from "ethers/utils";
import { simulateContract, writeContract } from "@wagmi/core";
import {
  contract_address,
  contract_abi,
  contract_current_admin,
  contract_address_stable_coin_usdt,
  contract_abi_stabel_coin_usdt,
  contract_address_bnb_kbc,
  contract_abi_bnb_kbc,
  contract_price_pool,
} from "../contract";
import { check_usd_price, check_KBC_Price } from "../utils/convert-to-eth";

const UserInfo = () => {
  const { address } = useAccount();
  // const address = "0x22d795BaAaeC0924E59F24d9B8D5bE345c2e7076";
  const [currentR, setCurrentR] = useState(0);
  const [currentR1, setCurrentR1] = useState(0);
  const [rewardInfoRank, setRewardInfoRank] = useState(0);
  const [userDetail, setUserDetail] = useState([]);
  const [totalDepositRes, setTotalDepositRes] = useState(0);
  const [refferedUser, setRefferedUser] = useState(0);
  const [levelIncomeReceived, setLevelIncomeReceived] = useState(0);
  const [userTurnOverRes, setUserTurnOverRes] = useState(0);
  const [balanceIncome, setBalanceIncome] = useState(0);
  const [userTeamSize, setUserTeamSize] = useState(0);
  const [starOne, setStarOne] = useState(0);
  const [starTwo, setStarTwo] = useState(0);
  const [starThree, setStarThree] = useState(0);
  const [starFour, setStarFour] = useState(0);
  const [starFive, setStarFive] = useState(0);
  const [starSix, setStarSix] = useState(0);
  const [directRoiIncome, setDirectRoiIncome] = useState(0);
  const [turnOverData, setTurnOverData] = useState();
  const [kbcVal, setKbcVal] = useState<number>(1);
  const [usdVal, setUsdVal] = useState<string>("");
  const [nodeQ_val, setNodeQ_val] = useState<number>(1);
  const [userReferrer, setUserReferrer] = useState("");

  const userData = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "users",
    args: [address],
    config,
  });

  const userTeamSizeRead = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "userTeamSize",
    args: [address],
    config,
  });
  let userTeamSizeRes: bigint[] = [];
  userTeamSizeRes = userTeamSizeRead?.data as bigint[];
  useEffect(() => {
    if (userData?.data) {
      const userDetailData = userData.data as bigint[];
      setUserDetail(userDetailData);
      setRefferedUser(userDetailData ? userDetailData[5] : 0);
      setLevelIncomeReceived(userDetailData ? userDetailData[9] : 0);
      setUserTeamSize(userTeamSizeRead?.data ? userTeamSizeRead?.data : 0);
    }
  }, [userData?.data || userTeamSizeRead?.data]);

  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const getUserIdFromUrl = () => {
    const url = window.location.href;

    const paramStartIndex = url.indexOf("?");

    if (paramStartIndex !== -1) {
      return url.substring(paramStartIndex + 1);
    }
    return null;
  };

  useEffect(() => {
    const id = getUserIdFromUrl();
    if (id) {
      setUserReferrer(id);
    }
  }, []);
  // function 22
  const TopUpTime = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "topUpTime",
    args: [address],
    config,
  });
  const CurrRoundStartTime = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "currRoundStartTime",
    config,
  });
  const TotalTaken = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "totalTaken",
    args: [address],
    config,
  });

  const TotalDeposit = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "totalDeposit",
    args: [address],
    config,
  });

  const currentRoundTime = new Date(Number(CurrRoundStartTime.data) * 1000);

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const formattedRound = currentRoundTime.toLocaleTimeString("en-US", options);

  // function 16
  const RegTime = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "regTime",
    args: [address],
    config,
  });

  const totalDeposit = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "totalDeposit",
    args: [address],
    config,
  });
  const incomeOf = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "income",
    args: [address],
  });
  useEffect(() => {
    setBalanceIncome(
      incomeOf.data ? parseFloat(formatEther(incomeOf.data[5])).toFixed(4) : 0
    );
  }, [incomeOf.data ? incomeOf.data : 0]);

  // let totalDepositRes: bigint[] = [];
  // totalDepositRes = totalDeposit?.data as bigint[];
  useEffect(() => {
    setTotalDepositRes(totalDeposit?.data);
  }, [totalDeposit.data ? totalDeposit.data : 0]);

  // function 11
  const lastTopUp = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "lastTopup",
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

  const stakedUSDTVal = stakedUSDT.data
    ? parseFloat(formatEther(stakedUSDT.data as BigNumberish)).toFixed(4)
    : 0;
  const userDetail_arr = [
    {
      id: "1",
      name: "User ID",
      value: userDetail && userDetail.length > 0 ? Number(userDetail[1]) : 0,
    },
    {
      id: "2",
      name: "Referrer ID",
      value: userDetail && userDetail.length > 0 ? Number(userDetail[2]) : 0,
    },
    // {
    //   id: "3",
    //   name: "Staked KBC",
    //   value:
    //     userDetail && userDetail.length > 0
    //       ? parseFloat(formatEther(userDetail[3])).toFixed(4)
    //       : 0,
    // },
    // {
    //   id: "4",
    //   name: "At Price",
    //   value:
    //     userDetail && userDetail.length > 0
    //       ? parseFloat(formatEther(userDetail[4])).toFixed(4)
    //       : 0,
    // },
    {
      id: "5",
      name: "Referred Users",
      value: userDetail && userDetail.length > 0 ? Number(userDetail[5]) : 0,
    },
    // {
    //   id: "6",
    //   name: "Total income",
    //   value:
    //     userDetail && userDetail.length > 0
    //       ? parseFloat(formatEther(userDetail[6])).toFixed(4)
    //       : 0,
    // },
    // {
    //   id: "7",
    //   name: "Root Balance",
    //   value:
    //     userDetail && userDetail.length > 0
    //       ? parseFloat(formatEther(userDetail[7])).toFixed(4)
    //       : 0,
    // },
    // {
    //   id: "8",
    //   name: "Assured Reward",
    //   value:
    //     userDetail && userDetail.length > 0
    //       ? parseFloat(formatEther(userDetail[8])).toFixed(4)
    //       : 0,
    // },
    // {
    //   id: "9",
    //   name: "Level Income Recived",
    //   value:
    //     userDetail && userDetail.length > 0
    //       ? parseFloat(formatEther(userDetail[9])).toFixed(4)
    //       : 0,
    // },
    {
      id: "10",
      name: "Taken ROI",
      value:
        userDetail && userDetail.length > 0
          ? parseFloat(formatEther(userDetail[10])).toFixed(4)
          : 0,
    },
    {
      id: "11",
      name: "Stake Times",
      value:
        userDetail && userDetail.length > 0
          ? dayjs(Number(userDetail[11]) * 1000).format("DD-MMM-YYYY")
          : "00-Month-0000",
    },
    {
      id: "12",
      name: "Income Missed",
      value:
        userDetail && userDetail.length > 0
          ? parseFloat(formatEther(userDetail[12])).toFixed(4)
          : 0,
    },

    {
      id: "14",
      name: "Reg Time",
      value:
        dayjs(Number(RegTime.data) * 1000).format("DD-MMM-YYYY") ||
        "00-Month-0000",
    },
    {
      id: 15,
      name: "Total Taken",
      value: TotalTaken.data
        ? parseFloat(formatEther(TotalTaken.data)).toFixed(4)
        : 0,
    },
    {
      id: 16,
      name: "Total Deposit",
      value: TotalDeposit.data
        ? parseFloat(formatEther(TotalDeposit.data)).toFixed(4)
        : 0,
    },
    {
      id: 17,
      name: "Last TopUp",
      value: lastToUpVal,
    },
    {
      id: 18,
      name: "Staked USDT",
      value: stakedUSDTVal,
    },
    {
      id: 19,
      name: "Total Income Limit",
      value: TotalDeposit.data
        ? (parseFloat(formatEther(TotalDeposit.data)) * 3).toFixed(4)
        : 0,
    },
    {
      id: 20,
      name: "Remaining Income Limit",
      value:
        TotalTaken.data && TotalDeposit.data
          ? (
              (parseFloat(formatEther(TotalDeposit.data)) * 3).toFixed(4) -
              parseFloat(formatEther(TotalTaken.data)).toFixed(4)
            ).toFixed(4)
          : 0,
    },
    {
      id: 21,
      name: "Remaining Withdrawal Amount",
      value: balanceIncome,
    },
  ];
  let currentRo = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "currRound",
    config,
  });
  useEffect(() => {
    let currentRtest = currentRo ? currentRo.data : 0;
    setCurrentR(Number(currentRtest));
  }, [currentRo.data]);
  const updateDateTopUp = (event: searchVAl) => {
    setCurrentR1(Number(event.currRound));
  };
  let definedRound = (currentR1 ? currentR1 : 0) > 0 ? currentR1 : currentR;

  const reportUsdtRes = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "reportsUSDT",
    args: [definedRound],
    config,
  });

  let usdtDetail: bigint[] = [];

  usdtDetail = reportUsdtRes?.data as bigint[];

  const networkInto = [
    {
      id: "1",
      name: "Forwarded",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[8])).toFixed(4) : 0,
    },
    {
      id: "2",
      name: "Fresh TO",
      value: usdtDetail
        ? ((parseFloat(formatEther(usdtDetail[11])) * 3) / 100).toFixed(4)
        : 0,
    },
    {
      id: "3",
      name: "Top 4 Pool",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[9])).toFixed(4) : 0,
    },
    {
      id: "4",
      name: "To Distribute",
      value: usdtDetail
        ? parseFloat(formatEther(usdtDetail[10])).toFixed(4)
        : 0,
    },
  ];

  const winerInfo = [
    {
      id: "1",
      name: "First",
      address: usdtDetail
        ? usdtDetail[4]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[0])).toFixed(4) : 0,
    },
    {
      id: "2",
      name: "Second",
      address: usdtDetail
        ? usdtDetail[5]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[1])).toFixed(4) : 0,
    },
    {
      id: "3",
      name: "Third",
      address: usdtDetail
        ? usdtDetail[6]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[2])).toFixed(4) : 0,
    },
    {
      id: "4",
      name: "Fourth",
      address: usdtDetail
        ? usdtDetail[7]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[3])).toFixed(4) : 0,
    },
  ];

  type searchVAl = {
    currRound: number;
  };

  const levelsIncomeRes = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "levelsIncome",
    args: [address],
    config,
  });

  let levelsIncomeDetails: bigint[] = [];
  levelsIncomeDetails = levelsIncomeRes?.data as bigint[];

  const levelsRes = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "levels",
    args: [address],
    config,
  });

  let levelsDetails: bigint[] = [];
  levelsDetails = levelsRes?.data as bigint[];

  const level1Value = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "income",
    args: [address],
    config,
  });
  const directROIIncome = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "directROIIncome",
    args: [address],
    config,
  });
  useEffect(() => {
    // console.log("Direct Income ROI ", directROIIncome?.data);
    setDirectRoiIncome(directROIIncome?.data);
  }, [directROIIncome?.data]);

  let level1Income: bigint[] = [];
  level1Income = level1Value?.data as bigint[];
  const levelDetailsData = [
    {
      id: 1,
      level: "Level Number",
      team: "Team",
      income: "Income",
    },
    {
      id: 16,
      level: "Level 1",
      team: refferedUser ? Number(refferedUser) : 0,
      income:
        directRoiIncome && directRoiIncome > 0
          ? parseFloat(formatEther(directROIIncome.data.toString())).toFixed(
              4
            ) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 2,
      level: "Level 2",
      team:
        levelsDetails && levelsDetails[0].toString()
          ? levelsDetails[0].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[0] > 0
          ? parseFloat(formatEther(levelsIncomeDetails[0].toString())).toFixed(
              4
            ) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 3,
      level: "Level 3",
      team:
        levelsDetails && levelsDetails[1].toString()
          ? levelsDetails[1].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[1] > 0
          ? parseFloat(formatEther(levelsIncomeDetails[1].toString())).toFixed(
              4
            ) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 4,
      level: "Level 4",
      team:
        levelsDetails && levelsDetails[2].toString()
          ? levelsDetails[2].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[2].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[2].toString())).toFixed(
              4
            ) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 5,
      level: "Level 5",
      team:
        levelsDetails && levelsDetails[3].toString()
          ? levelsDetails[3].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[3].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[3].toString())).toFixed(
              4
            ) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 6,
      level: "Level 6",
      team:
        levelsDetails && levelsDetails[4].toString()
          ? levelsDetails[4].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[4].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[4].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 7,
      level: "Level 7",
      team:
        levelsDetails && levelsDetails[5].toString()
          ? levelsDetails[5].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[5].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[5].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 8,
      level: "Level 8",
      team:
        levelsDetails && levelsDetails[6].toString()
          ? levelsDetails[6].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[6].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[6].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 9,
      level: "Level 9",
      team:
        levelsDetails && levelsDetails[7].toString()
          ? levelsDetails[7].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[7].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[7].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 10,
      level: "Level 10",
      team:
        levelsDetails && levelsDetails[8].toString()
          ? levelsDetails[8].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[8].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[8].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 11,
      level: "Level 11",
      team:
        levelsDetails && levelsDetails[9].toString()
          ? levelsDetails[9].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[9].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[9].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 12,
      level: "Level 12",

      income:
        levelsIncomeDetails && levelsIncomeDetails[10].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[10].toString())) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 13,
      level: "Level 13",
      team:
        levelsDetails && levelsDetails[11].toString()
          ? levelsDetails[11].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[11].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[11].toString())) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 14,
      level: "Level 14",
      team:
        levelsDetails && levelsDetails[12].toString()
          ? levelsDetails[12].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[12].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[12].toString())) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 15,
      level: "Level 15",
      team:
        levelsDetails && levelsDetails[13].toString()
          ? levelsDetails[13].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[13].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[13].toString())) +
            " USDT"
          : 0 + " USDT",
    },
  ];

  const turnOver2 = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "turnOver",
    args: [address], // address
    config,
  });

  useEffect(() => {
    // console.log("Direct Income ROI ", turnOver2?.data);
    setTurnOverData(turnOver2?.data);
  }, [turnOver2?.data]);

  const rewardDetailData = [
    {
      id: 1,
      level: "Level Number",
      income: "TO",
    },

    {
      id: 2,
      level: "Level 1",
      income:
        level1Income && level1Income[0] > 0
          ? parseFloat(
              formatEther((Number(level1Income[0]) * 20).toString())
            ).toFixed(4) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 3,
      level: "Level 2",

      income:
        turnOverData && turnOverData[0] > 0
          ? parseFloat(formatEther(turnOverData[0].toString())).toFixed(4) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 4,
      level: "Level 3",

      income:
        turnOverData && turnOverData[1] > 0
          ? parseFloat(formatEther(turnOverData[1].toString())).toFixed(4) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 5,
      level: "Level 4",

      income:
        turnOverData && turnOverData[2] > 0
          ? parseFloat(formatEther(turnOverData[2].toString())).toFixed(4) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 6,
      level: "Level 5",
      income:
        turnOverData && turnOverData[3] > 0
          ? parseFloat(formatEther(turnOverData[3].toString())).toFixed(4) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 7,
      level: "Level 6",

      income:
        turnOverData && turnOverData[4] > 0
          ? parseFloat(formatEther(turnOverData[4].toString())).toFixed(4) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 8,
      level: "Level 7",

      income:
        turnOverData && turnOverData[5] > 0
          ? parseFloat(formatEther(turnOverData[5].toString())).toFixed(4) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 9,
      level: "Level 8",

      income:
        turnOverData && turnOverData[6] > 0
          ? parseFloat(formatEther(turnOverData[6].toString())).toFixed(4) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 10,
      level: "Level 9",

      income:
        turnOverData && turnOverData[7] > 0
          ? parseFloat(formatEther(turnOverData[7].toString())).toFixed(4) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 11,
      level: "Level 10",

      income:
        turnOverData && turnOverData[8] > 0
          ? parseFloat(formatEther(turnOverData[8].toString())).toFixed(4) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 12,
      level: "Level 11",

      income:
        turnOverData && turnOverData[9] > 0
          ? parseFloat(formatEther(turnOverData[9].toString())).toFixed(4) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 13,
      level: "Level 12",

      income:
        turnOverData && turnOverData[10] > 0
          ? parseFloat(formatEther(turnOverData[10].toString())).toFixed(4) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 14,
      level: "Level 13",

      income:
        turnOverData && turnOverData[11] > 0
          ? parseFloat(formatEther(turnOverData[11].toString())).toFixed(4) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 15,
      level: "Level 14",

      income:
        turnOverData && turnOverData[12] > 0
          ? parseFloat(formatEther(turnOverData[12].toString())).toFixed(4) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 16,
      level: "Level 15",

      income:
        turnOverData && turnOverData[13] > 0
          ? parseFloat(formatEther(turnOverData[13].toString())).toFixed(4) +
            " USDT"
          : 0 + " USDT",
    },
  ];

  const userTurnOver = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "userTurnOver",
    args: [address],
    config,
  });
  useEffect(() => {
    setUserTurnOverRes(userTurnOver?.data ? userTurnOver?.data : 0);
  }, [userTurnOver.data ? userTurnOver.data : 0]);

  const RanksFun = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "ranks",
    args: [address], //[address],
    config,
  });

  let RanksFunRes: bigint[] = [];
  RanksFunRes = RanksFun?.data as bigint[];
  useEffect(() => {
    setStarOne(RanksFunRes ? RanksFunRes[0] : 0);
    setStarTwo(RanksFunRes ? RanksFunRes[1] : 0);
    setStarThree(RanksFunRes ? RanksFunRes[2] : 0);
    setStarFour(RanksFunRes ? RanksFunRes[3] : 0);
    setStarFive(RanksFunRes ? RanksFunRes[4] : 0);
    setStarSix(RanksFunRes ? RanksFunRes[5] : 0);
  }, [RanksFunRes]);

  useEffect(() => {
    if (
      totalDepositRes >= 100 &&
      refferedUser >= 5 &&
      userTeamSize >= 15 &&
      userTurnOverRes >= 3100
    ) {
      setRewardInfoRank(1);
    }
    if (
      totalDepositRes >= 300 &&
      refferedUser >= 7 &&
      userTeamSize >= 30 &&
      userTurnOverRes >= 10300 &&
      starOne >= 2
    ) {
      setRewardInfoRank(2);
    }
    if (
      totalDepositRes >= 500 &&
      refferedUser >= 8 &&
      userTeamSize >= 50 &&
      userTurnOverRes >= 30500 &&
      starTwo >= 2
    ) {
      setRewardInfoRank(3);
    }
    if (
      totalDepositRes >= 1000 &&
      refferedUser >= 10 &&
      userTeamSize >= 100 &&
      userTurnOverRes >= 101000 &&
      starThree >= 2
    ) {
      setRewardInfoRank(4);
    }
    if (
      totalDepositRes >= 5000 &&
      refferedUser >= 12 &&
      userTeamSize >= 200 &&
      userTurnOverRes >= 1000000 &&
      starFour >= 2
    ) {
      setRewardInfoRank(5);
    }
    if (
      totalDepositRes >= 10000 &&
      refferedUser >= 14 &&
      userTeamSize >= 500 &&
      userTurnOverRes >= 5000000 &&
      starFive >= 2
    ) {
      setRewardInfoRank(6);
    }
    if (
      totalDepositRes >= 25000 &&
      refferedUser >= 15 &&
      userTeamSize >= 1000 &&
      userTurnOverRes >= 20000000 &&
      starSix >= 2
    ) {
      setRewardInfoRank(7);
    }
  }, [
    totalDepositRes ||
      refferedUser ||
      userTeamSize ||
      userTurnOverRes ||
      starOne,
  ]);
  const kbcrewardInfo = [
    {
      id: "1",
      name: "Team Size",
      value: userTeamSizeRes ? userTeamSizeRes : 0,
    },
    {
      id: "2",
      name: "Trun Over",
      value: userTurnOverRes
        ? parseFloat(formatEther(userTurnOverRes.toString())).toFixed(4)
        : 0,
    },
    {
      id: "3",
      name: "Rank",
      value: rewardInfoRank ? rewardInfoRank : 0,
    },
    {
      id: "4",
      name: "Reffered User",
      value: refferedUser ? refferedUser : 0,
    },
  ];

  const Ranks_val = [
    {
      id: 1,
      level: "Stars Number",
      team: "Dr Achiever",
      income: "Paid",
    },
    {
      id: 2,
      level: "Star One",
      team:
        RanksFunRes && RanksFunRes[0].toString()
          ? RanksFunRes[0].toString()
          : 0,
      income: RanksFunRes && RanksFunRes[7] ? "Yes" : "No",
    },
    {
      id: 3,
      level: "Star Two",
      team:
        RanksFunRes && RanksFunRes[1].toString()
          ? RanksFunRes[1].toString()
          : 0,
      income: RanksFunRes && RanksFunRes[8] ? "Yes" : "No",
    },
    {
      id: 4,
      level: "Star Three",
      team:
        RanksFunRes && RanksFunRes[2].toString()
          ? RanksFunRes[2].toString()
          : 0,
      income: RanksFunRes && RanksFunRes[9] ? "Yes" : "No",
    },
    {
      id: 5,
      level: "Star Four",
      team:
        RanksFunRes && RanksFunRes[3].toString()
          ? RanksFunRes[3].toString()
          : 0,
      income: RanksFunRes && RanksFunRes[10] ? "Yes" : "No",
    },
    {
      id: 6,
      level: "Star Five",
      team:
        RanksFunRes && RanksFunRes[4].toString()
          ? RanksFunRes[4].toString()
          : 0,
      income: RanksFunRes && RanksFunRes[11] ? "Yes" : "No",
    },
    {
      id: 7,
      level: "Star Six",
      team:
        RanksFunRes && RanksFunRes[5].toString()
          ? RanksFunRes[5].toString()
          : 0,
      income: RanksFunRes && RanksFunRes[12] ? "Yes" : "No",
    },
    {
      id: 8,
      level: "Star Seven",
      team:
        RanksFunRes && RanksFunRes[6].toString()
          ? RanksFunRes[6].toString()
          : 0,
      income: RanksFunRes && RanksFunRes[13] ? "Yes" : "No",
    },
  ];
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = parseInt(event.target.value, 10);
    setKbcVal(isNaN(inputVal) ? 0 : inputVal);
    const nodeVal = inputVal * Number(usdVal);
    setNodeQ_val(nodeVal);
  };

  // register function start
  type RegistrationValues = {
    nodeQuantity: string;
    referralId: string;
  };

  const onFinishReg = async (values: RegistrationValues) => {
    try {
      let reminderOf = Number(kbcVal % 100);

      if (reminderOf != 0) {
        alert("Amount Should be multiple of 100");
        return;
      }
      let sendingData = parseEther((Number(nodeQ_val) + 0.02).toString());
      console.log("Sending Data is: ", sendingData);
      const { request } = await simulateContract(config, {
        abi: contract_abi,
        address: contract_address,
        functionName: "Registration",
        args: [values.referralId],
        value: sendingData,
      });

      const hash = await writeContract(config, request);
      console.log("hash", hash);
    } catch (error) {
      console.log("Error To Perform: ", error);
      const startIndex = error.message.indexOf(":") + 2; // Skip ": "
      const endIndex = error.message.indexOf("\nContract Call");
      const reason = error.message.substring(startIndex, endIndex).trim();
      console.log("startIndex", startIndex, endIndex, reason.length);
      console.log("Extracted reason:", reason);
      if (reason.length > 100) {
        alert("Insufficiant amount in account to perform this transaction ");
      } else alert("Error Got Expected : " + reason);
    }
  };

  return (
    <>
      <div className="row px-5">
        {/* User Info  */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              KBC User info
            </div>
          </div>
          <div className="user-box">
            {userDetail_arr.map((e) => (
              <div key={e.id} className="user-item">
                <div className="col-6 user-title">{e.name}:</div>
                <div className="col-6 user-value">{e.value}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Network Info  */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              Top 4 Pool Info
            </div>
          </div>
          <div className="network-box">
            <div className="row">
              {networkInto.map((element) => (
                <div
                  key={element.id}
                  className="col-lg-3 col-md-6 col-sm-6 col-6 network-item"
                >
                  <p className="network-number m-0 p-0">
                    {element.value}
                    <span className="sub-title">USDT</span>
                  </p>
                  <p className="network-title m-0 p-0"> {element.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reward-box">
            <div className="d-flex justify-content-center">
              <span className="text-pink fs-3">Today winner </span>
              <span id="countDownTodayWinner" className="text-pink fs-3">
                <CountdownTimer targetTime={formattedRound} />
              </span>
            </div>
            {winerInfo.map((ele) => (
              <div key={ele.id} className="text-center mt-2">
                <p className="m-0 text-pink fs-3">{ele.name}</p>
                <p className="m-0">{ele.address.toString()}</p>
                <p className="m-0">
                  Trunover :<span className="fw-bold">{ele.value}</span> USDT
                </p>
                <div className="d-flex justify-content-center">
                  <div className="bar"></div>
                </div>
              </div>
            ))}

            <div className="swap mt-20">
              <div className="swap-box">
                <Form
                  name="updateTopup"
                  onFinish={updateDateTopUp}
                  autoComplete="off"
                >
                  <div className="d-flex justify-content-center align-item-center">
                    <Form.Item
                      name="currRound"
                      rules={[
                        {
                          required: true,
                          message: "Please enter current round !",
                        },
                      ]}
                      className="node-title mt-4"
                    >
                      <Input
                        className="input_filed"
                        placeholder="Round Number ..."
                      />
                    </Form.Item>
                    <Button className="submit-btn ml-15 h-60" htmlType="submit">
                      Search
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        {/* KBC User Level info */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              Level ROI Info
            </div>
          </div>
          <div className="user-box1">
            {levelDetailsData.map(({ id, level, team, income }) => (
              <div key={id} className="user-item">
                <div className="col-6 user-title">{level}:</div>
                <div className="col-3 user-value">{team}</div>
                <div className="col-3 user-value">{income}</div>
              </div>
            ))}
          </div>
        </div>

        {/* KBC User Level info */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              Turnover Info
            </div>
          </div>
          <div className="user-box1">
            {/* rewardDetailData */}
            {rewardDetailData.map(({ id, level, income }) => (
              <div key={id} className="user-item">
                <div className="col-6 user-title">{level}:</div>
                <div className="col-6 user-value">{income}</div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="row px-5"> */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              SAR Rank Info
            </div>
          </div>
          <div className="network-box">
            <div className="row">
              {kbcrewardInfo.map((element) => (
                <div
                  key={element.id}
                  className="col-lg-3 col-md-6 col-sm-6 col-6 network-item"
                >
                  <p className="network-number m-0 p-0">
                    {element.value.toString()}
                  </p>
                  <p className="network-title m-0 p-0"> {element.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rank-box mt-3">
            <div className="d-flex justify-content-center mb-3">
              <span className="text-pink fs-3">Rank </span>
            </div>
            {Ranks_val.map(({ id, level, team, income }) => (
              <div key={id} className="user-item">
                <div className="col-6 user-title">{level}:</div>
                <div className="col-3 user-value">{team}</div>
                <div className="col-3 user-value">{income}</div>
              </div>
            ))}
            {/* </div> */}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <a
              href="https://scan.kbcfoundation.com/address/0x46D44aFCc97462d9AE0320C9DA6d891c10D71e39?tab=read_contract"
              target="_blank"
              rel="noopener noreferrer"
              className="contract-link"
            >
              Contract Address: 0x82e5Cc7f5736A548775005bfF18cE966FC934049
            </a>
          </div>
        </div>
        {/* Register function  */}
        <div className="col-lg-6 mt-4">
          <div className="swap-wrap p-5 mt-40 position-relative">
            <div className="reg-calac position-absolutex top-15 d-flexx text-center mb-2">
              <div className="">
                <input
                  className="clac-field"
                  value={kbcVal}
                  type="number"
                  pattern="[0-9]*"
                  name="clac-field"
                />
                <span className="kbc-val">
                  {kbcVal === 1 ? usdVal : Number(usdVal) * kbcVal}
                </span>
              </div>
              <div className="ml-4x mt-2">
                <span className="clr-base">1 USDT</span>{" "}
                <span className="clr-base ml-2">=</span>
                <span className="kbc-val">
                  {kbcVal === 1 ? usdVal : Number(usdVal)} KBC
                </span>
              </div>
            </div>
            <div className="swap-head text-center">Register</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="register"
                  onFinish={onFinishReg}
                  autoComplete="off"
                >
                  <Form.Item
                    label=""
                    name="nodeQuantity"
                    rules={[
                      {
                        required: true,
                        message: "Please input your nodeQuantity!",
                      },
                    ]}
                    className="node-title"
                  >
                    {/* <input type="hidden"  /> */}
                    <Input
                      className="input_filed"
                      placeholder="0"
                      value={nodeQ_val}
                      onChange={handleChange}
                    />
                  </Form.Item>

                  <Form.Item
                    label=""
                    name="referralId"
                    rules={[
                      {
                        required: true,
                        message: "Please input your referralId!",
                      },
                    ]}
                  >
                    <Input
                      className="input_filed"
                      placeholder={userReferrer ? userReferrer : "Enter ID"}
                      value={userReferrer}
                      onChange={(e) => setUserReferrer(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item className="text-center">
                    <Button className="submit-btn" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserInfo;
