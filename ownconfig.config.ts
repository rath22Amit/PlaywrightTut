import { defineConfig, devices } from '@playwright/test';


const config =({
  testDir: './projectTests',
  timeout: 40 *1000,
  expect: {
    timeout: 10000
  },

  reporter: 'html',
  use:{
    browserName: 'chromium',
    headless: false,
  }
});

export default config;


  
  

