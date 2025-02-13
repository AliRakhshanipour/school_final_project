import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { initUser } from "./user.model.js";
import { initStudent } from "./student.model.js";
import { initFamilyInfo } from "./familyInfo.model.js";
import { associateModels } from "./associations.js";
import { initAddress } from "./address.model.js";
import { initSchool } from "./school.model.js";
import { initRule } from "./rule.model.js";
import { initField } from "./field.model.js";
import { initImage } from "./image.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const config = require(path.join(__dirname, "../config/config.json"));
const { development } = config;

export const sequelize = new Sequelize(development);

export const models = {
  User: initUser(sequelize),
  FamilyInfo: initFamilyInfo(sequelize),
  Student: initStudent(sequelize),
  Address: initAddress(sequelize),
  School: initSchool(sequelize),
  Rule: initRule(sequelize),
  Field: initField(sequelize),
  Image: initImage(sequelize)
};

associateModels(models)

export const sequelizeConfig = async (sqlize = sequelize) => {
  try {
    await sqlize.authenticate();
    console.log("Sequelize authentication done");
    await sqlize.sync({ alter: true });
    console.log("Sequelize syncing done");
  } catch (error) {
    console.error("Sequelize error: ", error); // Use console.error to log the error
  }
};

