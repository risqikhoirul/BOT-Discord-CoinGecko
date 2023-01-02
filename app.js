/** ======================================**
 * BOT Discord CoinGecko                   *
 * Version: V 1.0                          *
 * Author: M. Khoirul Risqi                *
 * Github: https://github.com/risqikhoirul *
 * ========================================*
 */

const fetch = require("node-fetch");
const Discord = require("discord.js");
const { EmbedBuilder, REST, Routes } = Discord;

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMessageTyping,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.DirectMessageTyping,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = "xnxxnxxx"; // API Key BOT
const idcoin = "openleverage"; // ID coin from coinGecko... 'https://api.coingecko.com/api/v3/coins/list'
const idserver = "10xxxxnnxx"; // ID server/guide
const idBot = "1058xnnnxx"; // ID BOT /Client id
const cmd = "track"; //command
const description = "displays price details"; //description command

// add command
const commands = [
  {
    name: cmd,
    description,
  },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(idBot), { body: commands });

    console.log(`Successfully reloaded application /${cmd}`);
  } catch (error) {
    console.error(error);
  }

  // run bot discord
  await client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const fetchData = async () => {
      try {
        // Fetch OpenLeverage prices from CoinGecko API
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idcoin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
        const data = await response.json();
        const price = data[0].current_price;
        const lastPrice = (await Math.round(price * 100000)) / 100000;
        const symbol = data[0].symbol;

        // Ubah nickname bot menjadi harga OpenLeverage
        const guild = client.guilds.cache.get(idserver);
        const member = guild.members.cache.get(client.user.id);
        member.setNickname(`${symbol}: $${lastPrice}`);
        client.user.setPresence({
          activity: {
            name: "Discord.js",
            type: "WATCHING",
          },
          status: "online",
        });
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    // Fetch data from CoinGecko OpenLeverage API every 30s
    setInterval(fetchData, 30000);
  });

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
      // Checks whether the interaction is a message command
      if (interaction.commandName === cmd) {
        // Checks if the command is "track"

        try {
          const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idcoin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
          // Send a request to the CoinGecko OpenLeverage API
          const data = await response.json();
          const price = data[0].current_price;
          const lastPrice = (await Math.round(price * 100000)) / 100000;

          const market_cap = data[0].market_cap;
          const volume = data[0].total_volume;
          const high_24h = data[0].high_24h;
          const low_24h = data[0].low_24h;
          const priceChange = data[0].price_change_percentage_24h;
          const pr = priceChange >= 0 ? "+" : "";
          const last_updated = data[0].last_updated;
          const [date, time] = last_updated.split("T");
          const lastime = time.slice(0, -1);
          const image = data[0].image;
          const name = data[0].name;
          const symbol = data[0].symbol;

          // console.log(lastPrice); //debuging

          const exampleEmbed = new EmbedBuilder(image)
            .setColor(0x0099ff)
            .setTitle(`${name} Bot Tracking`)
            .setURL(`https://www.coingecko.com/en/coins/${idcoin}`)
            .setDescription("This is a tracking bot taken from coinGecko")
            .setThumbnail(image)
            .addFields(
              { name: `${symbol} price`, value: `$${lastPrice}` },
              //{ name: 'Market Cap', value: `$${market_cap}` },
              { name: "Volume (24)", value: `$${volume}`, inline: true },
              { name: "Price change (24H)", value: `${pr}${priceChange}%`, inline: true },
              { name: "------------------------------------", value: "-------------------------------------" },
              { name: "High price (24h)", value: `$${high_24h}`, inline: true },
              { name: "Low price (24)", value: `$${low_24h}`, inline: true },
              { name: "\u200B", value: "\u200B" }
            )
            .addFields({ name: "Last update", value: `Date: ${date}\nTime: ${lastime}` })
            .setTimestamp()
            .setFooter({ text: `© 2023 - Created By ${name}`, iconURL: image });

          interaction.reply({ embeds: [exampleEmbed] });
        } catch (error) {
          interaction.reply(`Error: ${error}`);
        }
      }
    }
  });
})();

client.login(TOKEN);
