import pino from "pino";
import { DEV_MODE, DEFAULT_MODE } from "../../config/config.js";

export let logger;

function prodLogger () {

    const buildProd = pino("debug.log");
    buildProd.level = "debug";
    return buildProd;

};

function devLogger () {

    const buildDev = pino();
    buildDev.level = "info";
    return buildDev;

};

if (!DEV_MODE && !DEFAULT_MODE) logger = prodLogger();
if (!DEV_MODE && DEFAULT_MODE) logger = devLogger();
if (DEV_MODE) logger = devLogger();