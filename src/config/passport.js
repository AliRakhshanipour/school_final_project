import passport from "passport"
import LocalStrategy from "passport-local"
import { models } from "../models/index.js";
import { compare } from "bcrypt";

export const passprtConfig = (() => {
    // Passport local strategy for username/password authentication
    passport.use(
        new LocalStrategy.Strategy(async (username, password, done) => {
            await models.User.findOne({ where: { username: username } })
                .then((user) => {
                    if (!user) {
                        return done(null, false, { message: "Incorrect username." });
                    }
                    compare(password, user.password, (err, result) => {
                        if (err) {
                            return done(err);
                        }
                        if (!result) {
                            return done(null, false, { message: "Incorrect password." });
                        }
                        return done(null, user);
                    });
                })
                .catch((err) => {
                    return done(err);
                });
        })
    );

    // Serialize user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user
    passport.deserializeUser(async (id, done) => {
        await models.User.findByPk(id)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err);
            });
    });


})