import passport from "passport";
import { 
    
    REGISTER_STRATEGY, 
    LOGIN_STRATEGY,
    JWT_STRATEGY

} from "../utils/auth/passport_strategy.js";

passport.use("register", REGISTER_STRATEGY);
passport.use("login", LOGIN_STRATEGY);
passport.use("jwt", JWT_STRATEGY);

export const PASSPORT = passport.initialize();