import parse from './parser';
import load from './loader';
import Promise from 'bluebird';

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).send(entity);
    }
  };
}

export function run(req, res) {
  var content = new Promise((resolve, reject) => {
    var html = load('bash.html');
    html.then((content)=> {
      resolve(parse(content));
    });
  });
  return content.then(respondWithResult(res)).catch(handleError(res));
}
