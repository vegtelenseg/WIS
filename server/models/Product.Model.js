let mongoose	= require('mongoose'),
    Schema 		= mongoose.Schema,
    productSchema = new Schema({
      category : { type: String, trim: true },
      productId: { type: Number, trim: true },
      productName : { type: String, trim: true, default: 'yogurt' },
      productBrand: { type: String, trim: true },
      productBestBefore: { type: Date, default: Date.now },
      productQty: { type: Number, min: 0 },
      productCheckoutRate: { type: Number, min: 0 }
});
var Product = mongoose.model('Product', productSchema);
module.exports = Product;