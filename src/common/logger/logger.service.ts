import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { LogLevel } from '../enums/log-level.enum';
import { blue, bold, cyan, green, red, reset, yellow } from '../utils/logger-colors.util';

@Injectable()
export class LoggerService {
	constructor(private readonly configService: ConfigService) {}

	private logger(level: LogLevel, message: string): string {
		const now = new Date();

		const year = `${now.getUTCFullYear()}`;
		const month = `${now.getUTCMonth() >= 10 ? now.getUTCMonth() : `0${now.getUTCMonth()}`}`;
		const day = `${now.getUTCDate() >= 10 ? now.getUTCDate() : `0${now.getUTCDate()}`}`;

		const date = `${year}/${month}/${day}`;

		const hours = `${now.getUTCHours() >= 10 ? now.getUTCHours() : `0${now.getUTCHours()}`}`;
		const minutes = `${now.getUTCMinutes() >= 10 ? now.getUTCMinutes() : `0${now.getUTCMinutes()}`}`;
		const seconds = `${now.getUTCSeconds() >= 10 ? now.getUTCSeconds() : `0${now.getUTCSeconds()}`}`;

		const time = `${hours}:${minutes}:${seconds}`;

		const timestamp = `${date} ${time}`;

		const name = this.configService.name;
		const stage = this.configService.stage;

		switch (level) {
			case LogLevel.REQUEST:
				return `${bold}[${blue}${bold}${name}${reset}${bold}]${reset} (${stage}) ${timestamp} ${LogLevel.REQUEST}: ${message}`;
			case LogLevel.RESPONSE:
				return `${bold}[${blue}${bold}${name}${reset}${bold}]${reset} (${stage}) ${timestamp} ${LogLevel.RESPONSE}: ${message}`;
			case LogLevel.DEBUG:
				return `${bold}[${blue}${bold}${name}${reset}${bold}]${reset} (${stage}) ${timestamp} ${cyan}${LogLevel.DEBUG}${reset}: ${message}`;
			case LogLevel.INFO:
				return `${bold}[${blue}${bold}${name}${reset}${bold}]${reset} (${stage}) ${timestamp} ${green}${LogLevel.INFO}${reset}: ${message}`;
			case LogLevel.WARN:
				return `${bold}[${blue}${bold}${name}${reset}${bold}]${reset} (${stage}) ${timestamp} ${yellow}${LogLevel.WARN}${reset}: ${message}`;
			case LogLevel.ERROR:
				return `${bold}[${blue}${bold}${name}${reset}${bold}]${reset} (${stage}) ${timestamp} ${red}${LogLevel.ERROR}${reset}: ${message}`;
		}
	}

	request(message: string): void {
		this.configService.logRequests && console.log(this.logger(LogLevel.REQUEST, message));
	}

	response(message: string): void {
		this.configService.logResponses && console.log(this.logger(LogLevel.RESPONSE, message));
	}

	debug(message: string): void {
		const levels: LogLevel[] = [LogLevel.DEBUG];
		levels.includes(this.configService.logLevel) && console.debug(this.logger(LogLevel.DEBUG, message));
	}

	log(message: string): void {
		this.info(message);
	}

	info(message: string): void {
		const levels: LogLevel[] = [LogLevel.DEBUG, LogLevel.INFO];
		levels.includes(this.configService.logLevel) && console.info(this.logger(LogLevel.INFO, message));
	}

	warn(message: string, stacktrace?: string): void {
		const levels: LogLevel[] = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN];
		if (stacktrace) {
			levels.includes(this.configService.logLevel) && console.warn(this.logger(LogLevel.WARN, message), stacktrace);
		} else {
			levels.includes(this.configService.logLevel) && console.warn(this.logger(LogLevel.WARN, message));
		}
	}

	error(message: string, stacktrace?: string): void {
		const levels: LogLevel[] = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
		if (stacktrace) {
			levels.includes(this.configService.logLevel) && console.error(this.logger(LogLevel.ERROR, message), stacktrace);
		} else {
			levels.includes(this.configService.logLevel) && console.error(this.logger(LogLevel.ERROR, message));
		}
	}
}
