var Service = require('node-windows').Service


var svc = new Service({
  name:'PULSE line9 SERVICE',
  description: 'Control of the PULSE code',
  script: __dirname + '\\arg_tor_am_line9_wise.js',
  env: {
    name: "HOME",
    value: process.env["USERPROFILE"]
  }
})

svc.on('uninstall',function(){
  console.log('Uninstall complete.')
  console.log('The service exists: ',svc.exists)
})

svc.uninstall()
