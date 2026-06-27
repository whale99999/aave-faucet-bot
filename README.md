# 🤖 Aave v3 Testnet Faucet Bot

Bot otomatis untuk klaim token testnet (USDC & USDT) dari **Aave v3 Faucet** di jaringan **Sepolia Testnet**, langsung dari Termux atau PC.

---

## 📋 Info Kontrak

| Item | Alamat |
|------|--------|
| 🏦 Faucet | `0xC959483DBa39aa9E78757139af0e9a2EDEb3f42D` |
| 💵 USDC | `0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8` |
| 💵 USDT | `0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0` |
| 🌐 Jaringan | Ethereum Sepolia Testnet (chainId: 11155111) |
| 💰 Per klaim | **10.000 USDC + 10.000 USDT** per round |
| ⏱️ Cooldown | **Tidak ada** (bisa loop terus) |

---

## 🚀 Cara Install

### Di Termux (Android)
```bash
pkg update && pkg upgrade -y
pkg install nodejs git -y
git clone https://github.com/USERNAME/aave-faucet-bot.git
cd aave-faucet-bot
npm install
```

### Di PC / Linux
```bash
git clone https://github.com/USERNAME/aave-faucet-bot.git
cd aave-faucet-bot
npm install
```

---

## ⚙️ Konfigurasi

Buat file `.env`:
```bash
cp .env.example .env
nano .env
```

Isi dengan data kamu:
```env
RPC_URL=https://sepolia.drpc.org
PRIVATE_KEY=private_key_wallet_kamu
DELAY_MS=3000
```

> ⚠️ **Gunakan wallet khusus testnet!** Jangan pakai private key wallet utama.

### RPC URL gratis (pilih salah satu)
- `https://sepolia.drpc.org`
- `https://rpc.sepolia.org`
- `https://eth-sepolia.g.alchemy.com/v2/API_KEY` *(daftar di alchemy.com)*

---

## ▶️ Menjalankan Bot

```bash
node faucet-bot.js
```

### Output yang diharapkan
```
Wallet : 0xYourAddress...
ETH    : 0.05 ETH

===== Round #1 =====
[USDC] TX: 0x1a2b3c4d... ✅ Total: 10000.00 USDC
[USDT] TX: 0x5e6f7g8h... ✅ Total: 10000.00 USDT

Tunggu 3s...
```

---

## 📱 Tips Termux

Agar bot tetap berjalan saat layar HP mati:

```bash
pkg install tmux -y
tmux new -s faucet
node faucet-bot.js
# Lepas: Ctrl+B lalu D
# Kembali: tmux attach -t faucet
termux-wake-lock
```

---

## 🔗 Dapatkan Sepolia ETH (untuk gas)

- https://sepoliafaucet.com
- https://cloud.google.com/application/web3/faucet/ethereum/sepolia
- https://faucets.chain.link/sepolia

---

## 📁 Struktur File

```
aave-faucet-bot/
├── faucet-bot.js     # Script utama
├── package.json      # Dependencies
├── .env.example      # Template konfigurasi
├── .gitignore        # Keamanan (.env tidak ter-upload)
└── README.md         # Dokumentasi
```

---

## ⚠️ Disclaimer

- Hanya untuk **Sepolia Testnet** — token tidak bernilai nyata
- Jangan push file `.env` ke GitHub (sudah ada di .gitignore)

---

## 📄 Lisensi

MIT

