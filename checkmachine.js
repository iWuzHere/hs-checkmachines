const https = require('https');
const url = 'https://ci.nodejs.org/computer/api/json';
var data = '';
var interests = {'iojs-ibm-ppcle-ubuntu1404-64-1':1,
                 'iojs-ibm-ppcle-ubuntu1404-64-2':1,
                 'test-ibm-aix61-ppc64-1':1,
                 'test-linuxonecc-rhel72-s390x-1':1,
                 'test-linuxonecc-rhel72-s390x-2':1,
                 'test-osuosl-ubuntu14-ppc64_be-1':1,
                 'test-osuosl-ubuntu14-ppc64_be-2':1,
                 'test-osuosl-ubuntu14-ppc64_le-1':1
        };

function checkMachines(data) {
  var machines = JSON.parse(data);
  for (var i = 0; i < machines.computer.length; i++) {
    if(interests[machines.computer[i].displayName] && machines.computer[i].offline ) {
      console.log(machines.computer[i].displayName);
    }
  }
}


var req = https.get(url, (res) => {
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    checkMachines(data);
  });
});

req.end();

req.on('error', (e) => {
  console.error(e);
});