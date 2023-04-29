import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { CONFIG } from "../../../config/config.js";
import { USER_SERVICE } from "../../service/user/index.js";
import { createBearer } from "../create_bearer.js";

const 

LOCAL_OPTIONS = {
    passReqToCallback: true,
    usernameField: "email",
    passwordField: "pass"
},
JWT_OPTIONS   = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIG.jwtSecret
};

export const 

    REGISTER_STRATEGY = new LocalStrategy(
        
        LOCAL_OPTIONS, 
        async (req, email, pass, done) => {

            try {
            
                const 
                
                USER  = await USER_SERVICE.register(req.body),
                TOKEN = createBearer(USER);

                done(null, TOKEN);

            } catch (e) {

                done(e, false);

            };

        }

    ),

    LOGIN_STRATEGY = new LocalStrategy(

        LOCAL_OPTIONS,
        async (req, email, pass, done) => {

            try {

                const 
                
                USER  = await USER_SERVICE.login(req.body),
                TOKEN = createBearer(USER);

                done(null, TOKEN);
                
            } catch (e) {
              
                done(e, false);
                
            };

        }

    ),

    JWT_STRATEGY = new JWTStrategy(

        JWT_OPTIONS, 
        (user, done) => done(false, user)
        
    );