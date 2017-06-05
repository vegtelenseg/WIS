let mongoose	= require('mongoose'),
    Schema 		= mongoose.Schema,
    productSchema = new Schema({
      category : { type: String, trim: true},
      productId: { type: Number, trim: true},
      productName : { type: String, trim: true },
      productBrand: { type: String, trim: true },
      productBestBefore: { type: Date },
      productQty: { type: Number, min : 0 },
      productCheckoutRate: { type: Number, min: 0 },
      price: { type: String, trim:true },
      picture: { type: String, trim:true }
});

productSchema.index({
  productName: "text",
  category: "text",
  productBrand: "text"
});
productSchema.pre('save', (next) => {
  if (this.productBestBefore == "01-01-1800") {
    this.productBestBefore = (new Date().addHours(2)).toUTCString();
  }
  next();
});
Date.prototype.addHours = (h) => {
    this.setHours(this.getHours() + h);
    return this;
}

var Product = mongoose.model('Product', productSchema);
module.exports = Product;
