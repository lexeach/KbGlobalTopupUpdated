import { formatUnits } from "ethers/utils";

export const convert_eth_from_biginit = (props: bigint) => {
  let WithDrawlValData_: bigint;
  if (typeof props === "bigint") {
    WithDrawlValData_ = props;
  } else if (typeof props === "string") {
    WithDrawlValData_ = BigInt(props);
  } else {
    WithDrawlValData_ = 0n; // Default value if BalanceOfKBC.data is not available or not in expected format
  }
  return formatUnits(WithDrawlValData_, "ether");
};

// const usdtPrice = KBC_bal * 1e18 / Stable_Balance
export const check_usd_price = (KBC_bal: bigint, Stable_Balance: bigint) => {
  if (KBC_bal && Stable_Balance) {
    const factor = BigInt(1e18);
    const result = (KBC_bal * factor) / Stable_Balance;
    const ethVal = formatUnits(result, "ether");
    return ethVal;
  } else {
    return 0;
  }
};


// const usdtPrice = KBC_bal * 1e18 / Stable_Balance
export const check_KBC_Price = (KBC_bal: bigint, Stable_Balance: bigint) => {
  if (KBC_bal && Stable_Balance) {
    const factor = BigInt(1e18);
    const result = (Stable_Balance * factor) / KBC_bal;
    const ethVal = formatUnits(result, "ether");
    return ethVal;
  } else {
    return 0;
  }
};
export const convert_usdt_to_kbc = (
  KBC_bal: bigint,
  Stable_Balance: bigint
) => {
  if (KBC_bal && Stable_Balance) {
    const factor = BigInt(1e18);
    const result = (Stable_Balance * factor) / KBC_bal;
    const ethVal = formatUnits(result, "ether");
    return ethVal;
  } else {
    return 0;
  }
};
