const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
    req.user.createProduct({
      
        title:title,
        price:price,
        imageUrl:imageUrl,
        description:description
      
    })
    .then(result=>{
      console.log(" product created ");
      res.redirect('/admin/products')

    }).catch(err=>{
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  req.user.getProducts({where:{id:prodId}})
  //Product.findAll({where:{id:prodId}})
  .then(products => {
    const product=products[0];
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch(err=>console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findAll({where:{id:prodId}})
  .then(product=>{
    product[0].title=updatedTitle;
    product[0].price=updatedPrice;
    product[0].imageUrl=updatedImageUrl;
    product[0].description=updatedDesc;
   return  product[0].save();

  })
  .then(result=>{
    console.log('post updated'); 
     res.redirect('/admin/products');

  })
  .catch(err=>{
    console.log(err);
  })
};

exports.getProducts = (req, res, next) => {
  
  req.user.getProducts()
  .then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>{
    console.log(err);
  });
  
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findAll({where:{id:prodId}})
  .then(product=>{
    return product[0].destroy();
  })
  .then(result=>{
    console.log('product destroyed');
    res.redirect('/admin/products');

  })
  .catch(err=>{
    console.log(err);
  })
};
