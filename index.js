// const https = require('https');

// https.get('https://bkui-vue.woa.com/button', (res) => {
//   let data = '';

//   // 当收到一部分数据时，‌将其添加到data变量中
//   res.on('data', (chunk) => {
//     data += chunk;
//   });

//   // 当请求完成时，‌打印出获取的数据
//   res.on('end', () => {
//     console.log(data); // 这里将是Element UI在线文档的内容
//   });
// }).on('error', (err) => {
//   console.error(`请求出错: ${err.message}`);
// });

const axios = require('axios');
const cheerio = require('cheerio');
async function fetchWebsiteContent(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const content = $('body').text();
    console.log(response);
  } catch (error) {
    console.error('Error fetching website content:', error);
  }
}
const url = 'https://bkui-vue.woa.com/button'; // 替换为你想要抓取的网站URL
fetchWebsiteContent(url);