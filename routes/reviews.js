const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/reviews.js");
const { validateReview, isLoggedin, isAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

// add review route
router.post("/", isLoggedin,validateReview, wrapAsync(reviewController.createReview));

// delete or destroy review
router.delete("/:reviewId",isLoggedin,isAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;