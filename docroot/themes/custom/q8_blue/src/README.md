##Frontend
###Installation

1. Install [node.js](https://nodejs.org/)
2. Run `npm install`

###Development
- Use `webpack` and `gulp` commands (see files: `package.json` and `gulpfile.js`)

###Browsersync
1. Install [Browsersync module](https://www.drupal.org/project/browsersync) (Extend > Install new module)
2. Go to Appearance > Settings > Q8 theme
3. Tick "Enable Browsersync"
4. Optionally, add the server information (example: **Host:** localhost / **Port**: 9000)
5. Save
6. Go to `\docroot\themes\custom\q8\gulp\config.js`
7. Uncomment `serverProxy: localConfig ? localConfig.serverProxy : 'mysite.com',`
8. Create `config.local.js` 
9. Add `module.exports = {serverProxy: '{YOUR DOMAIN}'};`