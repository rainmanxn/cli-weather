import chalk from 'chalk';
import dedent from 'dedent-js';

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR: ' + error));
};

const printSuccess = (msg) => {
    console.log(chalk.bgGreen(' SUCCESS: ' + msg));
};

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
    `);
};

const printWeather = (res) => {
    console.log(
        dedent`${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name} 
        ${getIcon(res.weather[0].icon)} ${res.weather[0].description}
        Температура ${res.main.temp} (ощущается как ${res.main.feels_like})
        Влажность: ${res.main.humidity}
        Скорость ветра: ${res.wind.speed}
    `);
}

export { printError, printSuccess, printHelp, printWeather };
