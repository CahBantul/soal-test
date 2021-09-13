const URL = 'https://jsonmock.hackerrank.com/api/articles?author=';

async function fetchData(query) {
  return new Promise(function (resolve, reject) {
    https.get(`${URL}${query}`, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp
        .on('end', () => {
          resolve(JSON.parse(data));
        })
        .on('error', (err) => {
          reject('Err: ');
        });
    });
  });
}

async function getArticleTitles(author) {
  let arrayOfTitles = [],
    totalPages = 1,
    currentPage = 1,
    promises = [];
  let response = await fetchData(author);
  console.log(response);
  totalPages = response.total_pages;
  currentPage = response.page;

  arrayOfTitles = getTitles(response.data);

  for (let i = currentPage + 1; i <= totalPages; i++) {
    promises.push(fetchData(`${author}&page=${i}`));
  }
  let resp = await Promise.all(promises);
  arrayOfTitles.push(...getArticlesFromPromise(resp));
  return arrayOfTitles;
}

function getArticlesFromPromise(promisesResp) {
  let arrayOfTitles = [];
  promisesResp.map((article) => {
    arrayOfTitles.push(...getTitles(article.data));
  });
  return arrayOfTitles;
}

function getTitles(articles) {
  let arrayOfTitles = [];
  articles.map((article) => {
    if (article.title) {
      arrayOfTitles.push(article.title);
    } else if (article.story_title) {
      arrayOfTitles.push(article.story_title);
    }
  });
  return arrayOfTitles;
}

const halo = {
  page: 1,
  per_page: 10,
  total: 3,
  total_pages: 1,
  data: [
    {
      title: 'A Message to Our Customers',
      url: 'http://www.apple.com/customer-letter/',
      author: 'epaga',
      num_comments: 967,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at: 1455698317,
    },
    {
      title:
        '“Was isolated from 1999 to 2006 with a 486. Built my own late 80s OS”',
      url: 'http://imgur.com/gallery/hRf2trV',
      author: 'epaga',
      num_comments: 265,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at: 1418517626,
    },
    {
      title: 'Apple’s declining software quality',
      url: 'http://sudophilosophical.com/2016/02/04/apples-declining-software-quality/',
      author: 'epaga',
      num_comments: 705,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at: 1454596037,
    },
  ],
};

getArticleTitles(halo);
