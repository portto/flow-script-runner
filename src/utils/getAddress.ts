export default function getAddress(key: string): string {
  if (process.env.REACT_APP_NETWORK === "mainnet") {
    switch (key) {
      case "FlowToken":
        return "0x1654653399040a61";
      case "BloctoDAO":
        return "0xe0f601b5afd47581";
      case "FungibleToken":
        return "0xf233dcee88fe0abe";
      case "BloctoToken":
        return "0x0f9df91c9121c460";
      case "TeleportedTetherToken":
        return "0x78fea665a361cf0e";
      case "BloctoPrize":
        return "0xa9ea962dd3e75ee5";
      default:
        return "";
    }
  } else {
    switch (key) {
      case "FlowToken":
        return "0x7e60df042a9c0868";
      case "BloctoDAO":
        return "0x7deafdfc288e422d";
      case "FungibleToken":
        return "0x9a0766d93b6608b7";
      case "BloctoToken":
        return "0x653cfe36d146e7be";
      case "TeleportedTetherToken":
        return "0x2d270db9ac8c7fef";
      case "BloctoPrize":
        return "0xc52330593c1d935f";
      default:
        return "";
    }
  }
}
