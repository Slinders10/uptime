const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { TOKEN } = require("../config.json");
const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const mustifixdb = require("croxydb")
const PARTIALS = Object.values(Partials);

const {  Monitor } = require("uprobot.js");
const { uptime } = require('os');

// Değişkeler - Mustifix
var version = "2.3"

const monitor = new Monitor(mustifixdb);

const client = new Client({
  intents: INTENTS,
  allowedMentions: {
    parse: ["users"]
  },
  partials: PARTIALS,
  retryLimit: 3
});

module.exports = async (client) => {
  client.user.setStatus("idle")

	
	
  let kanal = "1197228625402019880"; // Start mesajını atacağı kanal.
  let startingAt = Math.ceil( Date.now()/1000);
 
  let message = new EmbedBuilder()
  .setColor("00ffd9").setTitle("Uptime Sistemi Başlatıldı!")
  .setDescription(`>  Bot Aktif Oldu! \n\n >  Son Başlama Zamanı <t:${startingAt}:R>`).setFooter({"text":`-----| VERSİON ${version} |-----`})
  
  
   client.channels.cache.get(kanal).send({embeds:[message]})

  const rest = new REST({ version: "10" }).setToken(process.env.token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    });
  } catch (error) {
    console.error(error);
  }
// Mustifix - Paylaşılması yasaktır!!
  console.log(`${client.user.tag} Aktif!`);
  
	let links = await mustifixdb.get("uptimeLinks");
	let text = ""
	if(links.length){
	text = ` 500/${links.length} link uptime ediliyor!`}
	let gamingList = ["Desinger By. Windes","Kalitenin Adresi!", "Tamamen Ücretsiz!",text,"Uptime işi bizde!"]
	

setInterval(()=>{
	client.user.setActivity(gamingList[Math.ceil(Math.random()*gamingList.length)-1])
  },30000);
  
 monitor.start()
 

};
