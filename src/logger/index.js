const chalk = require('chalk');

const color = {
  log: chalk.white,
  debug: chalk.yellow,
  error: chalk.red,
  info: chalk.green,
};

const moment = require('moment');

class Logger {
  log(msg) {
    this.write(msg);
  }

  debug(msg) {
    this.write(msg, 'debug');
  }

  info(msg) {
    this.write(msg, 'info');
  }

  error(msg) {
    this.write(msg, 'error');
  }

  write(msg, type = 'log') {
    const now = moment().format('hh:mm:ss');
    process.stdout.write(color[type](`[${now}] | ${this.clean(msg)}\n`));
  }

  clean(msg) {
    if (typeof msg === 'string') return msg;
    const cleaned = require('util').inspect(msg, { depth: Infinity });
    return cleaned;
  }
}

module.exports = Logger;
