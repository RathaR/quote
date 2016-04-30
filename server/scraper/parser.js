var cheerio = require('cheerio');

export default (html) => {
  var $ = cheerio.load(html);

  var quotes = $('div.quote').map((index, el) => {
    var text = $(el).find('.text').text();
    var id = $(el).find('.id').text();
    var date = $(el).find('.date').text();
    var rating = $(el).find('span.rating').text();
    return {
      id: id,
      text: text,
      date: date,
      rating: rating
    }
  }).get();
  var number = $('.pager span.current > input').val();

  return {
    quotes: quotes,
    number: number
  };
}
