module.exports = {
  apps: [
    {
      name: 'mecanica-backend',
      script: 'server.js',
      cwd: '/Users/matiassack/Documents/Matias/Mecanica/backend',
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
      out_file: '/Users/matiassack/Documents/Matias/Mecanica/logs/backend-out.log',
      error_file: '/Users/matiassack/Documents/Matias/Mecanica/logs/backend-err.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,
    },
  ],
};
