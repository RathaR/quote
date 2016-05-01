/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  update
 * DELETE  /api/things/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Quote from './quote.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

//function saveUpdates(updates) {
//  return function (entity) {
//    var updated = _.merge(entity, updates);
//    return updated.save()
//      .then(updated => {
//        return updated;
//      });
//  };
//}

//function removeEntity(res) {
//  return function (entity) {
//    if (entity) {
//      return entity.remove()
//        .then(() => {
//          res.status(204).end();
//        });
//    }
//  };
//}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Quotes
export function index(req, res) {
  var skip = +req.query.skip || 0;
  var take = +req.query.take || 2;
  var expand = req.query.expand;
  var cursor = expand === 'true' ? Quote.find() : Quote.find({}, {id: true});
  return cursor.skip(skip).limit(take).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Quote from the DB
export function show(req, res) {
  return Quote.find({id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function total(req, res) {
  return Quote.find().count().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
//// Creates a new Quote in the DB
//export function create(req, res) {
//  return Quote.create(req.body)
//    .then(respondWithResult(res, 201))
//    .catch(handleError(res));
//}

//// Updates an existing Quote in the DB
//export function update(req, res) {
//  if (req.body._id) {
//    delete req.body._id;
//  }
//  return Quote.findById(req.params.id).exec()
//    .then(handleEntityNotFound(res))
//    .then(saveUpdates(req.body))
//    .then(respondWithResult(res))
//    .catch(handleError(res));
//}

//// Deletes a Quote from the DB
//export function destroy(req, res) {
//  return Quote.findById(req.params.id).exec()
//    .then(handleEntityNotFound(res))
//    .then(removeEntity(res))
//    .catch(handleError(res));
//}
