'use strict';

import mongoose from 'mongoose';

var QuoteSchema = new mongoose.Schema({
  id: String,
  text: String,
  rating: Number,
  voted: Boolean
});

export default mongoose.model('Quote', QuoteSchema);
