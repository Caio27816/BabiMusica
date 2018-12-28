const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://babilonia-musica.glitch.me/`);
}, 100000);
const Discord = require("discord.js");
const client = new Discord.Client();
client.prefix = "b.";
client.on("ready", async () => {
  console.log("R.I.P X");
  function changing_status() {
    let status = ['o comando b.ajuda', 'o povo brigar', 'o Jornal Nacional', 'a destuição do mundo', "o whoami arrasar"];
    var random = status[Math.floor(Math.random() * status.length)];
  
    client.user.setActivity(random, { type: "WATCHING"});
    
}
    setInterval(changing_status, 9000);
});

client.on('message', async msg => {
  const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyDjZQ3LE68J9jXFGq0tLTnWkZJ2Qg6XwQc");
  

        if (!msg.content.startsWith(client.prefix)) return undefined;
        const args = msg.content.split(' ');
        const searchString = args.slice(1).join(' ');
        var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
        const serverQueue = queue.get(msg.guild.id);
        let command = msg.content.toLowerCase().split(' ')[0];
        command = command.slice(client.prefix.length)
       if (command === 'tocar') {
            const voiceChannel = msg.member.voiceChannel;
            if (!voiceChannel) return msg.channel.send('Me desculpe, mas você precisa estar em um canal de voz para tocar música!');
            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                const playlist = await youtube.getPlaylist(url);
                const videos = await playlist.getVideos();
                for (const video of Object.values(videos)) {
                    const video2 = await youtube.getVideoByID(video.id);
                    await handleVideo(video2, msg, voiceChannel, true);
                }
                return msg.channel.send(`✅ Playlist: ** ${playlist.title} ** foi adicionado à fila!`);
            } else {
                try {
                    var video = await youtube.getVideo(url);
                } catch (error) {
                    try {
                        var videos = await youtube.searchVideos(searchString, 10);
                        let index = 0;
                        msg.channel.send(`
__**Seleção de músicas:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Por favor, forneça um valor para selecionar um dos 🔎 resultados que vão de 1 a 10.
                    `);
                        try {
                            var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                                maxMatches: 1,
                                time: 10000,
                                errors: ['time']
                            });
                        } catch (err) {
                            console.error(err);
                            return msg.channel.send('Nenhum ou valor inválido inserido, cancelando a seleção de vídeo.');
                        }
                        const videoIndex = parseInt(response.first().content);
                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send('🆘 Não consegui obter nenhum resultado de pesquisa.');
                    }
                }
                return handleVideo(video, msg, voiceChannel);
            }
        }else if (command === 'pular') {
            if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply("❌ Desculpe amigo,somente pessoas com cargo DJ pode fazer isso!");
            if (!msg.member.voiceChannel) return msg.channel.send('Você não está em um canal de voz!');
            if (!serverQueue) return msg.channel.send('Não há nada tocando que eu possa pular para você.');
            msg.channel.send('A musica foi pulada com sucesso.')
            serverQueue.connection.dispatcher.end('O comando Skip foi usado!');
            return undefined;
        } else if (command === 'parar') {
            if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply("❌ Desculpe amigo,somente pessoas com cargo DJ pode fazer isso!");
            if (!msg.member.voiceChannel) return msg.channel.send('Você não está em um canal de voz!');
            serverQueue.songs = [];
            msg.channel.send('A lista de reprodução foi parada.')
            serverQueue.connection.dispatcher.end('O comando de parada foi usado!');
            return undefined;
        } else if (command === 'volume' || command === 'vol') {
            if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply("❌ Desculpe amigo,somente pessoas com cargo DJ pode fazer isso!");
            if (!msg.member.voiceChannel) return msg.channel.send('Você não está em um canal de voz!');
            if (!args[1]) return msg.channel.send(`O volume atual é: **${serverQueue.volume}**`);
            serverQueue.volume = args[1];
            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
            var volval;
            if (serverQueue.volume == 1) {
                volval = `O volume atual agora é de: 1 :loud_sound:⠀`
            }
            if (serverQueue.volume == 2) {
                volval = `O volume atual agora é de: 2 :loud_sound:⠀`
            }
            if (serverQueue.volume == 3) {
                volval = `O volume atual agora é de: 3 :loud_sound:⠀`
            }
            if (serverQueue.volume == 4) {
                volval = `O volume atual agora é de: 4 :loud_sound:⠀`
            }
            if (serverQueue.volume == 5) {
                volval = `O volume atual agora é de: 5 :loud_sound:⠀`
            }
            if (serverQueue.volume == 6) {
                volval = `O volume atual agora é de: 6 :loud_sound:⠀`
            }
            if (serverQueue.volume == 7) {
                volval = `O volume atual agora é de: 7 :loud_sound:⠀`
            }
            if (serverQueue.volume == 8) {
                volval = `O volume atual agora é de: 8 :loud_sound:⠀`
            }
            if (serverQueue.volume == 9) {
                volval = `O volume atual agora é de: 9 :loud_sound:⠀`
            }
            if (serverQueue.volume == 10) {
                volval = `O volume atual agora é de: 10 :loud_sound:⠀`
            }
            msg.channel.send(volval)
 
        } else if (command === 'tocando') {
            if (!serverQueue) return msg.channel.send('Não há nada tocando.');
            return msg.channel.send(`🎶 Agora tocando: **${serverQueue.songs[0].title}**`);
        } else if (command === 'lista') {
            if (!serverQueue) return msg.channel.send('Não há nada tocando.');
            return msg.channel.send(`
__**Fila de músicas:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Agora tocando:** ${serverQueue.songs[0].title}
        `);
        } else if (command === 'pausar') {
            if (!msg.member.roles.some(r=>["DJ"].includes(r.name))) return msg.reply("❌ Desculpe amigo,somente pessoas com cargo DJ pode fazer isso!");
            if (serverQueue && serverQueue.playing) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                return msg.channel.send('⏸ Música Pausada');
            }
            return msg.channel.send('Não há nada tocando.');
        } else if (command === 'voltar') {
            if (!msg.member.roles.some(r=>["DJ"].includes(r.name))) return msg.reply("❌ Desculpe amigo,somente pessoas com cargo DJ pode fazer isso!");
            if (serverQueue && !serverQueue.playing) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                return msg.channel.send('▶ voltando a tocar músicas!');
            }
            return msg.channel.send('Não há nada tocando.');
        } else if (command === "ajuda") {
         let avatar = msg.author.avatarURL;
         if (!avatar) avatar = msg.guild.iconURL; 
         var ajuda = new Discord.RichEmbed()
         .setAuthor(msg.author.username)
         .setColor([155, 0, 0])
         .setDescription("***tocar***- toca a música argumentada.\n***pular***- pula a música para a próxima.\n***tocando***- mostra o que está tocando atualmente.\n***voltar***- volta à música anterior.\n***parar***- para a música atual.\n***volume***- ajusta o volume com relação ao número argumentado.\n\n**Prefixo:** b.")
         //.setThumbanail(avatar)
         .setTimestamp(Date.now());
         msg.channel.send(ajuda).then(msga => {
          msga.react("👍");
          msga.react("👎");
         }); 
          
        } else if (command === "comandos") {
         let avatar = msg.author.avatarURL;
         if (!avatar) avatar = msg.guild.iconURL; 
         var ajuda = new Discord.RichEmbed()
         .setAuthor(msg.author.username)
         .setColor([155, 0, 0])
         .setDescription("***tocar***- toca a música argumentada.\n***pular***- pula a música para a próxima.\n***tocando***- mostra o que está tocando atualmente.\n***voltar***- volta à música anterior.\n***parar***- para a música atual.\n***volume***- ajusta o volume com relação ao número argumentado.\n\n**Prefixo:** b.")
         //.setThumbanail(avatar)
         .setTimestamp(Date.now());  
         msg.channel.send(ajuda).then(msga => {
          msga.react("👍");
          msga.react("👎");
         }); 
          
        }
 
        return undefined
   
 
async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(("Comencando a tocar musica...."));
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);
        queueConstruct.songs.push(song);
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`Eu não pude entrar no canal de voz: ${error}`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`Eu não pude entrar no canal de voz: ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return msg.channel.send(`✅ ** ${song.title} ** foi adicionado à fila!`);
    }
    return undefined;
}
 
function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url)).on('end', reason => {
        if (reason === 'O fluxo não está gerando com rapidez suficiente.') console.log(reason);
        else console.log(reason);
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
    }).on('error', error => console.error(error));
    var volval;
    if (serverQueue.volume == 1) {
        volval = `○──── :loud_sound:⠀`
    }
    if (serverQueue.volume == 2) {
        volval = `─○─── :loud_sound:⠀`
    }
    if (serverQueue.volume == 3) {
        volval = `──○── :loud_sound:⠀`
    }
    if (serverQueue.volume == 4) {
        volval = `───○─ :loud_sound:⠀`
    }
    if (serverQueue.volume == 5) {
        volval = `────○ :loud_sound:⠀`
    }
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
   var NowEmbed = new Discord.RichEmbed().setColor("RANDOM")
   .addField(`🎵 Começando a Tocar`,`**${song.title}**`)
    serverQueue.textChannel.send(NowEmbed);
 
 
}
});

client.login(process.env.TOKEN);