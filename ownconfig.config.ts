import { defineConfig, devices } from '@playwright/test';


const config =({
  testDir: './tests',
  timeout: 40 *1000,
  expect: {
    timeout: 5000
  },

  reporter: 'html',
  use:{
    browserName: 'chromium',
    headless: true,
  }

});

export default config;


  
  

