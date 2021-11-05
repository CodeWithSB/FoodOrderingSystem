import { sign, verify } from "jsonwebtoken";
import "reflect-metadata";
import {createConnection} from "typeorm";
import { User } from "./entity/User";
const express = require('express');
var cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const PORT = 4006;
const { typeDefs } = require('./GraphQLSchema/TypeDefs');
const { resolvers } = require('./GraphQLSchema/Resolvers');
const cookieParser = require('cookie-parser');


(async () => {
    const app = express();
    app.use(cors({
        origin: 'http://localhost:3000',
        //origin: '*',
        credentials: true
    }));
    (await createConnection().then(error => console.log('***ERROR***',error)));

    app.use(cookieParser());
    app.post("/refresh_token", async (req, res) => {
        if(!req.cookies){
            return res.send({ ok: false, accessToken: ''})
        }
        const token = req.cookies.a_token;
        if(!token){
            return res.send({ ok: false, accessToken: ''})
        }

        let payload: any = null;
        try{
            payload = verify(token, 'TOP_REFRESH_SECRET');
        } catch(err){
            console.error(err);
            return res.send({ok: false, accessToken: ''})
        }

        const user = await User.findOne({id:payload.userId});
        if(!user){
            return res.send({ok:false, accessToken:''})
        }
        else{
            //console.log('**** Access Token Refreshing');
            return res.send({ok:true, accessToken: sign({ userId: user.id }, 'TOP_ACCESS_SECRET', { expiresIn: '15s' })})
        }
    })
    
    const server = new ApolloServer(
        { 
            typeDefs, 
            resolvers,
            context: async ({ req, res }) => {
                //console.log('**** Authentication:', req.headers.authorization)
                const authorization = req.headers.authorization || '';
                if(authorization === ''){
                   //console.log('**** Return Empty USER');
                    return { user: null, res: res };
                }

                const token = authorization.split(' ')[1];
                let payload;
                payload = verify(token, "TOP_ACCESS_SECRET");
                const user = await User.findOne({ id: payload.userId });
                //console.log('**** Authenticating Access Token Payload', payload);
                return { user: user, res: res };
              }
        }
    );
    await server.start();
    server.applyMiddleware({ app, cors: false });

    app.listen(PORT, () => {
        console.log(`Server started and listening at port: ${PORT}`);
    });
})();