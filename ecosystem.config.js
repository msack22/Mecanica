module.exports = {
  apps: [
    {
      name: 'mecanica-backend',
      script: 'server.js',
      cwd: `${__dirname}/backend`,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      restart_delay: 3000,
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
      out_file: `${__dirname}/logs/backend-out.log`,
      error_file: `${__dirname}/logs/backend-err.log`,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,
    },
  ],
};
