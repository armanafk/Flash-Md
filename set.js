const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0puNTRycU9aRGYxM2NOMDNJbGVlZHBmekhnelM5VjZDN2U0UHU5bnVXcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM3Myd2s5cU9sSmRyRUFLemFvMHdkaXJvcThGVHltYVNHM0dlWUlxUHFucz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtQ1lrQ05xcVdYU01LUEQvSExDSlZkdkVVMVdtNzFPSE9EKzRscWhicjMwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmK2cvM2MrNTJINWpIcXRtZTNaTGx5NjllbHRuSENTemZzclVEN1NjWmhNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBLT2thZTY2QWU3WHhsN0JQNkhOM0FibG9rMm9GYXQ0Q29SaUh3Nks4RzA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlPYnVIQkdPT1hoUlNTSkVvdTgyRUZsUHdybnBjdTZPNit0L1cwUnlWUk09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUtFUEdJV3VnSzZzMDQ2a3lsZ1hVait6N1R0cWZsU1p1Uk85Zndtdi8zaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNmVhZHFQOVM3dStTelJTbktQWncwRXp6Y3VNdWpKSDYrQ1Ywd0NaRHJ3OD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNiakxKdnJqQkdqWWFJQXlFNmdIM0tTR1pOOURHZWxqZjdtSWNPdWN4MmYxQ29aajhqS3o1aEI0NU52RGtXcGlvanJvbVJPZjE3d2FnbWFGaVd1a0NnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTEsImFkdlNlY3JldEtleSI6IlB5aHlPT3ZtUWdlV3MxQnBpU0pCT0JuUFR2RisrY2JGWWg1MDZ0VW9Hd289IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMDM0NjM1MTU3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkQ1REUyQUVGM0FFNjUzMjA1RDkzNTQ1ODYyREYxODBGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjM0NDY4NDN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzAzNDYzNTE1N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFRDRBNkI2NjhFRUFCOTdCNzEwODA4OTUxMTUyMUM3MCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIzNDQ2ODQzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJFMy1JTjFydFNGeVd6Mk9CZGdOMTV3IiwicGhvbmVJZCI6IjIxZGQ1MjBhLTVmZDktNGRmMC1iNjZiLWQ4NjQwODRhNzM3ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzclA5aEM3d3Q5a2RzSjNqMituNkx0NHVRNm89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoialI2bGVOWVhSQWxLbzhvZWZMT1VkNG1zNFk4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlFaRU5KSjkyIiwibWUiOnsiaWQiOiI5MjMwMzQ2MzUxNTc6MzBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQXJtYW4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0x1QWs2a0VFS3ZzNXJVR0dCa2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InlFcFlSckI1T2R4aUJOdnU3bVp5cmpqaHRRM1ZxZGtvbEM1QUN3S2l2RVU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjBCZk44VVlyb3pHSzV0SmxTaHo5MHVyOHVaQmkwTXVQbWp6dkRSQi9vbGhQZjFYSC9NNDNkZzhFd0d4dnhQTCs4OUdzWTlyeU1kUldyb2Q5cXJOdUJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJkZG5PY29LNUMwb21NRWJTTWM2elZqYSsyOHlNRk1EamE0dkw0T3psZnNITmdQTDZSNmVUa2tIVE4yQ3h4TFMwUllybmxvb1RhT3FybmthT1d1T2FEdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzAzNDYzNTE1NzozMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjaEtXRWF3ZVRuY1lnVGI3dTVtY3E0NDRiVU4xYW5aS0pRdVFBc0NvcnhGIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzNDQ2ODQwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9lZiJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "254105915061", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
