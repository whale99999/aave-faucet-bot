require("dotenv").config();
const { ethers } = require("ethers");

const FAUCET = "0xC959483DBa39aa9E78757139af0e9a2EDEb3f42D";

const TOKENS = [
  { symbol: "USDC", address: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8", decimals: 6 },
  { symbol: "USDT", address: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0", decimals: 6 },
];

const FAUCET_ABI = ["function mint(address token, address to, uint256 amount) external returns (uint256)"];
const ERC20_ABI  = ["function balanceOf(address) view returns (uint256)"];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet   = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const faucet   = new ethers.Contract(FAUCET, FAUCET_ABI, wallet);

  console.log(`Wallet : ${wallet.address}`);
  const eth = await provider.getBalance(wallet.address);
  console.log(`ETH    : ${ethers.formatEther(eth)} ETH\n`);

  let round = 0;
  while (true) {
    round++;
    console.log(`\n===== Round #${round} =====`);

    for (const t of TOKENS) {
      const amount = ethers.parseUnits("10000", t.decimals);
      const erc20  = new ethers.Contract(t.address, ERC20_ABI, provider);

      try {
        const tx = await faucet.mint(t.address, wallet.address, amount, { gasLimit: 200000n });
        process.stdout.write(`[${t.symbol}] TX: ${tx.hash.slice(0,16)}... `);
        const rc = await tx.wait(1);
        if (rc.status === 1) {
          const bal = await erc20.balanceOf(wallet.address);
          console.log(`✅ Total: ${ethers.formatUnits(bal, t.decimals)} ${t.symbol}`);
        } else {
          console.log(`❌ Gagal`);
        }
      } catch(e) {
        console.log(`[${t.symbol}] ⚠️  ${e.shortMessage || e.message}`);
      }

      await sleep(1000); // jeda antar token
    }

    const delay = parseInt(process.env.DELAY_MS || "3000");
    console.log(`\nTunggu ${delay/1000}s...`);
    await sleep(delay);
  }
}

main().catch(console.error);
