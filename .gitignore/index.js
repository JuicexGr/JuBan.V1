const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "*";

Client.on("ready", () => {
    console.log("JuBot prêt");
});

Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné."); 
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni avec succès.")
                }
                else {
                    message.reply("Impossible de bannir ce membre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kick avec succès.");
                
                }
                else {
                    message.reply("Impossible de kick ce membre.");
                
                }
            }
        }
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné");
            }
            else {
                mention.roles.add("764566036954742794");
                message.reply(mention.displayName + " a été mute avec succès");
            }
        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.channel.send("Membre non ou mal mentionné");
            }
            else {
                mention.roles.remove("759096430350303254");
                message.reply(mention.displayName + " a été unmute avec succès");
            }
        }
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné");
            }
            else {
                let args = message.content.split(" ");

                mention.roles.add("759096430350303254");
                setTimeout(function(){
                    mention.roles.remove("759096430350303254");
                    message.channel.send("<@" + mention.id + "> vous pouvez désormais reparler à nouveau.");
                }, args[2] * 1000);
            }
        }
    }    
});











Client.login(process.env.TOKEN);
