import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import { sequelizeConfig } from "./src/models/index.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { ErrorHandler } from "./src/error/error.handlers.js";
import methodOverride from "method-override"
import expressEjsLayouts from "express-ejs-layouts";
import { AdminRoutes } from "./src/routes/admin/admin.routes.js";
import { passprtConfig } from "./src/config/passport.js";
import passport from "passport";
import { isAuthenticated, redirectIfAuthenticated } from "./src/middlewares/checkAuth.js";
import flash from "connect-flash"
import { generateGravatarUrl } from "./src/utils/avatar.js";

config();

const app = express();
const main = async () => {
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(process.cwd(), 'public')));
    app.use(flash({
        duration: 5000,
        safe: true
    }))
    app.use(methodOverride('_method'))
    app.set("view engine", "ejs");
    app.set("views", path.join(process.cwd(), "views"));
    app.use(expressEjsLayouts);
    app.use("/admin", (req, res, next) => {
        app.set("layout", "layouts/admin");
        next();
    });

    app.use(cookieParser());
    app.use(session({
        secret: 'secret', // Change this to a secure random key
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());


    app.use("/admin", isAuthenticated, AdminRoutes);
    passprtConfig()

    // Routes

    app.get("/login", redirectIfAuthenticated, (req, res, next) => {
        try {
            res.render("auth/login.ejs", { layout: false })
        } catch (error) {
            next(error)
        }
    })

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/success',
        failureRedirect: '/failure',
        failureFlash: true
    }));

    app.get('/logout', (req, res) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.send("logged out successfully")
        });

    });

    app.get('/success', (req, res) => {
        req.flash('success', 'Logged in successfully.'); // Example flash message
        res.redirect("/admin")
    });

    app.get('/failure', (req, res) => {
        req.flash('error', 'Login failed.'); // Example flash message
        res.send('Login failed.');
    });

    app.get('/', (req, res) => {
        res.send('Home page.');
    });


    await sequelizeConfig();
    ErrorHandler().initialize();
    const port = process.env.SERVER_PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on http://127.0.0.1:${port}`);
    });
};

main();
export { app };
