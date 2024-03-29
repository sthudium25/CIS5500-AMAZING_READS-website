const { expect } = require('@jest/globals');
const supertest = require('supertest');
const app = require('../server');
const results = require("./results.json")

// AMAZING READS tests
// Route 1: Get Genre page without pagination
test('GET /genre/biography', async () => {
  await supertest(app).get('/genre/biography')
    .expect(200)
    .then((res) => {
      expect(res.body.length).toEqual(49844)
      expect(res.body[500]).toStrictEqual(results.genre_biography_501);
    });
}, 100000);

// Route 1: Get Genre page 5 ('biography'); default size = 80
test('GET /genre/biography page 5', async () => {
  await supertest(app).get('/genre/biography?page=5')
    .expect(200)
    .then((res) => {
      expect(res.body.slice(0,5)).toStrictEqual(results.genre_biography_page5)
    });
}, 100000);

// Route 1: Get Genre page 10 ('biography'); page size = 5
test('GET /genre/biography pg 10 pgsize 5', async () => {
  await supertest(app).get('/genre/biography?page=10&page_size=5')
    .expect(200)
    .then((res) => {
      expect(res.body).toStrictEqual(results.genre_biography_page10_pagesize5)
    });
}, 100000);

// Route 2: Get book information for a given book_id
test('GET /book/19123314', async () => {
  await supertest(app).get('/book/19123314')
    .expect(200)
    .then((res) => {
      expect(res.body).toStrictEqual(results.book);
    });
}, 100000);

// Route 3: Get reviews for a book ordered by number of votes
test('GET /reviews/13411546', async () => {
  await supertest(app).get('/reviews/13411546')
    .expect(200)
    .then((res) => {
      expect(res.body.slice(0,3)).toStrictEqual(results.book_sorted_reviews)
    });
}, 100000);

// Route 3: Get page 2 of reviews, default pg size = 25
test('GET /reviews/13411546 page 2', async () => {
  await supertest(app).get('/reviews/13411546?page=2')
    .expect(200)
    .then((res) => {
      expect(res.body[1]).toStrictEqual(results.book_sorted_reviews_page2)
    });
}, 100000);

// Route 3: Get page 16 of reviews, pg size = 5
test('GET /reviews/13411546 page 16 pg size 5', async () => {
  await supertest(app).get('/reviews/13411546?page=16&page_size=5')
    .expect(200)
    .then((res) => {
      expect(res.body).toStrictEqual(results.book_sorted_reviews_page16_pagesize5)
    });
}, 100000);

// Route 4: Get the rating history of a book
test('GET /rating_history/13133', async () => {
  await supertest(app).get('/rating_history/13133')
  .expect(200)
  .then((res) => {
    expect(res.body).toStrictEqual(results.rating_history)
  });
}, 100000);

// Route 5: GET book series of a book
test('GET /book_series/915', async() => {
    await supertest(app).get('/book_series/915')
    .expect(200)
    .then((res) => {
        expect(res.body).toStrictEqual(results.book_series)
    });
}, 100000);

// Route 6: GET author name and book series title for book
test('GET /book_author_series/69259', async() => {
    await supertest(app).get('/book_author_series/69259')
    .expect(200)
    .then((res) => {
        expect(res.body).toStrictEqual(results.book_info)
    });
}, 100000);

//Route 7: Get genres for the books
test('GET /book_genres/82842', async() => {
    await supertest(app).get('/book_genres/82842')
    .expect(200)
    .then((res) => {
        expect(res.body).toStrictEqual(results.book_info_2)
    });
}, 100000);

//Route 8: Get similar books
test('GET /similar_books/85266', async() => {
    await supertest(app).get('/similar_books/85266')
    .expect(200)
    .then((res) => {
        expect(res.body).toStrictEqual(results.similar_books)
    });
}, 100000);

//Route 9: Get top ten books of the month
test('GET /top_ten_books_month', async() => {
  await supertest(app).get('/top_ten_books_month')
  .expect(200)
  .then((res) => {
      expect(res.body.length).toEqual(10)
  });
}, 100000);

//Route 10: Get book recommendations from random genre
test('GET /book_recs_rand_genre/1', async() => {
  await supertest(app).get('/book_recs_rand_genre/1')
  .expect(200)
  .then((res) => {
    expect(res.body.length).toEqual(2)
  });
}, 100000);

//Route 11: Surprise me!
test('GET /surprise_me/1', async() => {
  await supertest(app).get('/surprise_me/1')
  .expect(200)
  .then((res) => {
    expect(res.body.length).toEqual(1)
    expect(res.body[0]).toHaveProperty('book_id')
    expect(res.body[0]).toHaveProperty('title')
    expect(res.body[0]).toHaveProperty('description')
    expect(res.body[0]).toHaveProperty('average_rating')
    expect(res.body[0]).toHaveProperty('publisher')
    expect(res.body[0]).toHaveProperty('image_url')
    expect(res.body[0]).toHaveProperty('num_pages')
  });
}, 100000);

//Route 12: Get author details
test('GET /author_details/192', async() => {
  await supertest(app).get('/author_details/192')
  .expect(200)
  .then((res) => {
      expect(res.body).toStrictEqual(results.author_details)
  });
}, 100000);

//Route 13: Get user liked books
test('GET /user_liked/1', async() => {
  await supertest(app).get('/user_liked/1')
  .expect(200)
  .then((res) => {
      expect(res.body).toStrictEqual(results.user_liked)
  });
}, 100000);

//Route 14: Get authors in desired order
test('GET /authors_ordered/average_rating', async() => {
  await supertest(app).get('/authors_ordered/average_rating')
  .expect(200)
  .then((res) => {
    expect(res.body.length).toEqual(829529)
  });
}, 100000);

// End tests