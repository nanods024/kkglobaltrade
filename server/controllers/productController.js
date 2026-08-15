const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');
const { cloudinary, useCloudinary } = require('../config/cloudinary');

// @route GET /api/products
// Supports: search, category filter, origin filter, availability filter,
// sort, and pagination. Public callers only ever see published products;
// admins (identified by ?admin=true + auth handled at route level for the
// admin-specific list endpoint) can see everything.
const getProducts = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    origin,
    availability,
    sort = '-createdAt',
    page = 1,
    limit = 12,
    all,
  } = req.query;

  const query = {};

  if (!all) {
    query.published = true;
  }
  if (category) query.category = category;
  if (origin) query.countryOfOrigin = origin;
  if (availability) query.availability = availability;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { botanicalName: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 100);

  const [products, total] = await Promise.all([
    Product.find(query)
      .sort(sort)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Product.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: products,
    pagination: {
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum) || 1,
      limit: limitNum,
    },
  });
});

// @route GET /api/products/featured
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ published: true, featured: true }).limit(8);
  res.json({ success: true, data: products });
});

// @route GET /api/products/:slug
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product || (!product.published && !req.user)) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, data: product });
});

// @route POST /api/products (admin)
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

// @route PUT /api/products/:id (admin)
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  Object.assign(product, req.body);
  await product.save();
  res.json({ success: true, data: product });
});

// @route DELETE /api/products/:id (admin)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  await product.deleteOne();
  res.json({ success: true, message: 'Product deleted' });
});

// @route PATCH /api/products/:id/publish (admin)
const togglePublish = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  product.published = !product.published;
  await product.save();
  res.json({ success: true, data: product });
});

// @route POST /api/products/upload (admin)
// Accepts up to 8 images via multipart/form-data field "images".
// Uses Cloudinary when USE_CLOUDINARY=true and credentials are set;
// otherwise falls back to the local /uploads folder (see uploadMiddleware).
const uploadImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('No image files were uploaded');
  }

  if (useCloudinary) {
    // Every file always lands on local disk first (multer diskStorage runs
    // before this handler) — it is only ever a temp copy when Cloudinary is
    // active, and gets deleted below once each file's Cloudinary upload
    // settles (success OR failure), so failed uploads don't leave orphans.
    const results = await Promise.allSettled(
      req.files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: 'kk-global-trade/products' })
      )
    );

    req.files.forEach((file) => fs.unlink(file.path, () => {}));

    const failed = results.filter((r) => r.status === 'rejected');
    if (failed.length > 0) {
      // Log the real Cloudinary error server-side (invalid signature, wrong
      // cloud_name, network block, etc.) — this is the detail you need to
      // diagnose why uploads aren't reaching Cloudinary.
      failed.forEach((r) => console.error('[Cloudinary upload failed]', r.reason?.message || r.reason));

      if (failed.length === results.length) {
        res.status(502);
        throw new Error(
          `Cloudinary upload failed: ${failed[0].reason?.message || 'unknown error'}. ` +
            'Check CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in server/.env ' +
            'and confirm the server was restarted after editing it.'
        );
      }
    }

    const urls = results.filter((r) => r.status === 'fulfilled').map((r) => r.value.secure_url);
    return res.json({
      success: true,
      urls,
      ...(failed.length > 0 && {
        warning: `${failed.length} of ${results.length} file(s) failed to upload to Cloudinary.`,
      }),
    });
  }

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const urls = req.files.map((file) => `${baseUrl}/uploads/${path.basename(file.path)}`);
  res.json({ success: true, urls });
});

module.exports = {
  getProducts,
  getFeaturedProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  togglePublish,
  uploadImages,
};
