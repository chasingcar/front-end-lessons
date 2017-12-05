const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 1308;

const now = () => new Date().toISOString().replace('T', ' ').slice(0, 19);
const retriveProperty = (data, key) => {
  if(key.indexOf('.') > -1){
    const keys=key.split('.')
    let value=data[keys[0]];
    for(let i=1;i<keys.length;i++){
        if(!value){
         break
        }
        value=value[keys[i]]
    }
    return value
  }
  return data[key] || ''
}
function render(template, data) {

  const param = template.match(/({{[^}]*}})/g).map(v => v.replace(/[{}]/g,''))
  console.log(param)
  let html = template;
  param.forEach(v => {
    html=html.replace(`{{${v}}}`,retriveProperty(data,v))
  })
  return html;
}

const server = http.createServer((req, res) => {
  console.log(`${now()} request ${req.url}`);
  const data = {
    title: 'Lesson 01',
    content: {
      head: 'A Simple Template',
      paragraph: 'Good artists copy; great artists steal — Pablo Picasso',
    },
  }
  const template = fs.readFileSync('./views/index.template').toString();
  const html = render(template, data);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
