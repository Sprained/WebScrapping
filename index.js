const puppeteer = require('puppeteer');
const fs = require('fs');
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.anbima.com.br/feriados/fer_nacionais/2020.asp');

  const dateList = await page.evaluate(() => {
      const nodeList = document.querySelectorAll('.tabela');

      const dateArray = [...nodeList];

      const list = dateArray.map(({innerText}) => ({
          dia: innerText
      }));

      let arr = [];
      list.forEach(teste)
      function teste(item, index){
          if(item.dia.indexOf('20') != -1){
              arr.push(item)
          }
      }

      return arr;
  });

  fs.writeFile('date.json', JSON.stringify(dateList, null, 2), err => {
      if(err) throw new Error('algo deu errado')
  })
 
  await browser.close();
})();