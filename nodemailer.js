

const nodemailer = require("nodemailer");
const googleApis = require("googleapis");

const CLIENT_ID = `331354891018-4m7fbunip6jksfpofl7kbu2qobg0o76g.apps.googleusercontent.com`
const CLIENT_SECRET = `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`
const REFRESH_TOKEN = `1//04zi5SCPOcWWICgYIARAAGAQSNwF-L9Ir6ZR5Q2_oqPHnFQEanpXLdrhvKrYI-Rs865qyZ1lFFNYUnJyCJ6ZgFGdpbUlsqlJM-9Q`
const REDIRECT_URI = `https://developers.google.com/oauthplayground`;


const authClient = new googleApis.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET,
    REDIRECT_URI);

    authClient.setCredentials({refresh_token: REFRESH_TOKEN});

    async function mailer(receiver, id, key){
        try{
            const ACCESS_TOKEN = await authClient.getAccessToken();

            const transport = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user:"ayushacharya13@gmail.com",
                    clientId:CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken:REFRESH_TOKEN,
                    accessToken:ACCESS_TOKEN
                }
            })
            const details ={
                from:"Ayush Acharya<ayushacharya13@gmail.com>",
                to:receiver,
                subject:"For change your password",
                text:"Kya ho rha hai",
                html: `hey you can recover your account by clicking following link 
               <a href="http://localhost:3000/forgot/${id}/${key}">this link will reset password</a>`
            }

            const result = await transport.sendMail(details)
            return result;

        }
        catch(err){
            return err;
        }

    }
    


    module.exports = mailer;