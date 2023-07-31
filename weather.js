#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен');

        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен');
    } catch(e) {
        printError(e.message);
    }
};

const saveCity = async (cityName) => {
    if (!cityName) {
        printError('Город не передан');

        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, cityName);
        printSuccess(`Город ${cityName} сохранен`);
    } catch(e) {
        printError(e.message);
    }
}

const getForecast = async () => {
    try {
        const weather = await getWeather();
        
        printWeather(weather, )
    } catch(e) {
        // ошибка из axios
        if (e?.response?.status == 404) {
            printError('Неверно указан город');
        } else if (e?.response?.status == 401) {
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
    }
};


const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }

    return getForecast('moscow');
}

initCLI();
