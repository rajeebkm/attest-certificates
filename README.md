# Attest Certificates using EAS

This project demonstrates how to create and manage attestations for certificates using the Ethereum Attestation Service (EAS). The repository provides a smart contract implementation and utilities for issuing, verifying, and revoking attestations.

## Features

- **Certificate Issuance**: Attest certificates with associated metadata.
- **Certificate Verification**: Verify the authenticity of certificates.
- **Revocation**: Revoke attestations when needed.
- **Interoperability**: Use the EAS protocol for decentralized attestations.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Hardhat](https://hardhat.org/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/attest-certificates.git
   cd attest-certificates
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   PRIVATE_KEY=<your-private-key>
   RPC_URL=<your-ethereum-node-url>
   EAS_CONTRACT_ADDRESS=<eas-contract-address>
   ```

### Usage

#### Compile the Smart Contracts

Compile the smart contracts using Hardhat:
```bash
npx hardhat compile
```

#### Deploy the Smart Contracts

Deploy the contracts to your preferred Ethereum network:
```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

#### Issue a Certificate

Use the `issueCertificate` function to create a new attestation:
```bash
npx hardhat run scripts/issueCertificate.js --network <network-name>
```

#### Verify a Certificate

Verify the authenticity of a certificate using its attestation ID:
```bash
npx hardhat run scripts/verifyCertificate.js --network <network-name>
```

#### Revoke a Certificate

Revoke an attestation using its ID:
```bash
npx hardhat run scripts/revokeCertificate.js --network <network-name>
```

## Project Structure

- `contracts/`: Contains the smart contract code.
- `scripts/`: Deployment and interaction scripts.
- `test/`: Unit tests for the smart contracts.

## Example

Below is an example of how to issue a certificate:

```javascript
const { ethers } = require("hardhat");

async function main() {
    const contract = await ethers.getContractAt("YourContractName", "<deployed-contract-address>");
    const tx = await contract.issueCertificate("recipient-address", "metadata-uri");
    await tx.wait();
    console.log("Certificate issued successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgements

- [Ethereum Attestation Service (EAS)](https://eas.eth/) for providing the protocol and inspiration for decentralized attestations.
