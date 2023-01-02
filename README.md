# BOT-Discord-CoinGecko
 
- [Version](https://github.com/risqikhoirul/BOT-Discord-CoinGecko/main/README.md#version)
- [Installation](https://github.com/risqikhoirul/BOT-Discord-CoinGecko/main/README.md#installation)
- [Configuration](https://github.com/risqikhoirul/BOT-Discord-CoinGecko/main/README.md#configuration)
- [Run Tutorial](https://github.com/risqikhoirul/BOT-Discord-CoinGecko/main/README.md#run-tutorial)
- [Donation](https://github.com/risqikhoirul/BOT-Discord-CoinGecko/main/README.md#donation)

 ## Version
| Name | Version |
|------|------------|
| BOT Discord CoinGecko | V 1.0 |
| discord.js | V 14.7.1 |
| node-netch.js | V 2.6.7 |
| Node.js | V 16.13.1 |

## Installation
1. Download or clone this repository to your computer `git clone https://github.com/risqikhoirul/BOT-Discord-CoinGecko`
2. Open the terminal and enter the repository folder.
3. Run the `cd BOT-Discord-CoinGecko` command.
4. Run the `npm install` command to install the required dependencies.
5. Edit the `app.js` file, please configure accordingly.

## Configuration
| Variable | Detailt |
|------|------------|
| TOKEN | Fill it with api key bot token |
| idcoin | Fill it with id coin from coinGecko |
| idserver | Fill with id server or guide |
| idBot | Fill with id bot client |
| cmd | Fill with command |
| description | Description reply command |

List idcoin from [coinGecko](https://api.coingecko.com/api/v3/coins/list)

## Run Tutorial
Run the `node app.js` command to run the bot.
If you want to run 24 hours on server (VPS)
Follow these steps:
1. Run the `npm install pm2` command to install the pm2
2. Run the command `pm2 start app.js` to start the bot server (VPS).
3. Next run the `pm2 startup` command to set the Node.js application to automatically start on system boot. This is useful if you want your Node.js application to always run in the background, without having to run the pm2 command every time the system boots.
5. If you want to stop typing the command `pm2 stop app` or `pm2 stop all`.

### Donation
EVM Metamask Addres: 0x714Cb1145218871fAebD55de36dBE7053cc9C74d

Created by M. Khoirul Risqi
