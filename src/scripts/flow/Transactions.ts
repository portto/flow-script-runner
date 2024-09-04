import ScriptTypes from "../../types/ScriptTypes";
import getAddress from "../../utils/getAddress";

export const getBLTBalance = {
  type: ScriptTypes.SCRIPT,
  script: `
  import FungibleToken from ${getAddress("FungibleToken")}
  import BloctoToken from ${getAddress("BloctoToken")}
  
  access(all) fun main (address: Address): UFix64 {
      let vaultRef = getAccount(address).capabilities.borrow<&{FungibleToken.Balance}>(/public/bloctoTokenBalance)
          ?? panic("Could not borrow reference to the owner's Vault!")
      return vaultRef.balance
  }
    `,
  args: [{ type: "Address", comment: "address" }],
};

export const getTUSDTBalance = {
  type: ScriptTypes.SCRIPT,
  script: `
import FungibleToken from ${getAddress("FungibleToken")}
import TeleportedTetherToken from ${getAddress("TeleportedTetherToken")}

access(all) fun main (address: Address): UFix64 {
    let vaultRef = getAccount(address).capabilities.borrow<&{FungibleToken.Balance}>(TeleportedTetherToken.TokenPublicBalancePath)
        ?? panic("Could not borrow reference to the owner's Vault!")
    return vaultRef.balance
}
    `,
  args: [{ type: "Address", comment: "address" }],
};

export const getFlowBalance = {
  type: ScriptTypes.SCRIPT,
  script: `
import FungibleToken from ${getAddress("FungibleToken")}
import FlowToken from ${getAddress("FlowToken")}

access(all) fun main (address: Address): UFix64 {
    let vaultRef = getAccount(address).capabilities.borrow<&{FungibleToken.Balance}>(/public/flowTokenBalance)
        ?? panic("Could not borrow reference to the owner's Vault!")
    return vaultRef.balance
}
    `,
  args: [{ type: "Address", comment: "address" }],
};

export const sendBLT = {
  type: ScriptTypes.TX,
  script: `\
import FungibleToken from ${getAddress("FungibleToken")}
import BloctoToken from ${getAddress("BloctoToken")}

transaction(amount: UFix64, to: Address) {
    let sentVault: @{FungibleToken.Vault}
    prepare(signer: auth(BorrowValue) &Account) {
        let vaultRef = signer.storage.borrow<auth(FungibleToken.Withdraw) &BloctoToken.Vault>(from: /storage/bloctoTokenVault)
            ?? panic("Could not borrow reference to the owner's Vault!")
        self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {
        let recipient = getAccount(to)
        let receiverRef = recipient.capabilities.borrow<&{FungibleToken.Receiver}>(/public/bloctoTokenReceiver)
            ?? panic("Could not borrow receiver reference to the recipient's Vault")
        receiverRef.deposit(from: <-self.sentVault)
    }
}`,
  args: [
    { type: "UFix64", comment: "amount" },
    { type: "Address", comment: "recipient" },
  ],
  shouldSign: true,
};

export const sendTUSDT = {
  type: ScriptTypes.TX,
  script: `\
import FungibleToken from ${getAddress("FungibleToken")}
import TeleportedTetherToken from ${getAddress("TeleportedTetherToken")}

transaction(amount: UFix64, to: Address) {

    // The Vault resource that holds the tokens that are being transferred
    let sentVault: @{FungibleToken.Vault}

    prepare(signer: auth(BorrowValue) &Account) {

        // Get a reference to the signer's stored vault
        let vaultRef = signer.storage.borrow<auth(FungibleToken.Withdraw) &TeleportedTetherToken.Vault>(from: TeleportedTetherToken.TokenStoragePath)
            ?? panic("Could not borrow reference to the owner's Vault!")

        // Withdraw tokens from the signer's stored vault
        self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {

        // Get the recipient's public account object
        let recipient = getAccount(to)

        // Get a reference to the recipient's Receiver
        let receiverRef = recipient.capabilities
            .borrow<&{FungibleToken.Receiver}>(TeleportedTetherToken.TokenPublicReceiverPath)
            ?? panic("Could not borrow receiver reference to the recipient's Vault")

        // Deposit the withdrawn tokens in the recipient's receiver
        receiverRef.deposit(from: <-self.sentVault)
    }
}`,
  args: [
    { type: "UFix64", comment: "amount" },
    { type: "Address", comment: "recipient" },
  ],
  shouldSign: true,
};

export const sendFlow = {
  type: ScriptTypes.TX,
  script: `\
import FungibleToken from ${getAddress("FungibleToken")}
import FlowToken from ${getAddress("FlowToken")}

transaction(amount: UFix64, to: Address) {

    // The Vault resource that holds the tokens that are being transferred
    let sentVault: @{FungibleToken.Vault}

    prepare(signer: auth(BorrowValue) &Account) {

        // Get a reference to the signer's stored vault
        let vaultRef = signer.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Could not borrow reference to the owner's Vault!")

        // Withdraw tokens from the signer's stored vault
        self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {

        // Get the recipient's public account object
        let recipient = getAccount(to)

        // Get a reference to the recipient's Receiver
        let receiverRef = recipient.capabilities
            .borrow<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            ?? panic("Could not borrow receiver reference to the recipient's Vault")

        // Deposit the withdrawn tokens in the recipient's receiver
        receiverRef.deposit(from: <-self.sentVault)
    }
}`,
  args: [
    { type: "UFix64", comment: "amount" },
    { type: "Address", comment: "recipient" },
  ],
  shouldSign: true,
};

export const triggerMalicious = {
  type: ScriptTypes.TX,
  script: "",
  args: [],
  shouldSign: true,
};
