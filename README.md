**Dassha**

The decentralized web enables the common person to own and sell their own data. Dassha showcases this possibility with the use of health data.

The idea behind this project is as follows:
1. A user is collecting health data about him/herself, say for example, on a Fitbit
2. Fitbit, a technologically aware entity that wants to embrace the oncoming change of blockchain, securely stores a public/private, RSA keypair for each customer
3. At the end of each month, Fitbit encrypts each customer's health data (in their name)
4. The data itself is stored on a permissioned side chain, where nodes are trusted health data buyers
5. Pointers to where the data lives, who owns it, and who has permission to view it are stored on Ethereum's main chain
6. Nodes in the permissioned network can buy the health records, using the encrypted records public facing metadata to find important data points that could help cure rare diseases
7. When a buyer wants to buy, they send Eth to the data's owner (the data's owner and identity are recorded on a main chain)
8. A permission gets added in the name of the buyer
9. The data gets re-encrypted with the buyer's public key, and is now accessible via the side chain
10. Everyone goes home happy - Fitbit, for giving data back to the customers; the buyers - for getting more, in vivo health data; and of course, the customer - for passively earning income from their data.

**HOW**

- Linnia smart contracts that are deployed on Ropsten testnet (serving as a placeholder for the Ethereum main chain) store pointers to where encrypted data lives (on another, permissioned side chain), who the data is owned by, and who has permission to view it.
- Our side chain is an instance of a Kaleido permissioned blockchain, where nodes are an alliance of trusted buyers of medical data. Their incentive is to further medical science
- We leverage The Graph protocol to query event data throughout the relevant ropsten contracts (to get records and permissions).
- The app is mobile responsive, and can be used with Coinbase Wallet.
