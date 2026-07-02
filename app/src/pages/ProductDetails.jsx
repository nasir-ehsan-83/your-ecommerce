import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { api } from "../api/axios.js";
import {
  ArrowLeft,
  ShoppingCart,
  Package,
  Tag,
  DollarSign,
  Layers,
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  Clock,
  Loader2,
  AlertCircle,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  CheckCircle,
  X
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isWishlist, setIsWishlist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/products/");
      const p = res.data.find((item) => item.id === id);
      
      if (!p) {
        setError("Product not found");
      } else {
        setProduct(p);
        if (p.images && p.images.length > 0) {
          setSelectedImage(p.images[0]);
        } else {
          setSelectedImage(p.imageURL);
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to load product"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeImageModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const getStatus = (stock) => {
    if (stock === 0) {
      return { label: "Out of Stock", color: "text-red-600 bg-red-50 border-red-200" };
    }
    if (stock < 10) {
      return { label: "Low Stock", color: "text-amber-600 bg-amber-50 border-amber-200" };
    }
    return { label: "In Stock", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
  };

  const handleQuantityChange = (action) => {
    if (action === 'increment' && quantity < (product?.stock || 10)) {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const res = await api.post("/cart/add", {userId, productId});

    const total = res.data.items.reduce(
      (sum, item) =>  sum + item.productId.price * item.quantity, 0
    );

    localStorage.setItem("CartCount", total);

    window.dispatchEvent(new Event("cartUpdated"));

  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  if (loading) {
    return (
      <div className="flex justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 px-4 antialiased">
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          <p className="text-sm font-medium text-slate-500">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 px-4 antialiased py-8">
        <div className="w-full max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-100 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const status = getStatus(product.stock);
  const images = product.images && product.images.length > 0 ? product.images : [product.imageURL];

  return (
    <>
      <div className="flex justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 px-4 antialiased py-8">
        <div className="w-full max-w-7xl">
          {/* Header with back button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Products</span>
            </Link>
          </div>

          {/* Main product card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-100 border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left - Image Gallery */}
              <div className="bg-slate-50/50 p-6 lg:p-8">
                <div className="relative">
                  {/* Main Image */}
                  <div 
                    className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-inner border border-slate-200/50 group cursor-zoom-in"
                    onClick={() => openImageModal(images[currentImageIndex])}
                  >
                    <img
                      src={images[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Crect width='600' height='600' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2394a3b8' font-size='24'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <ZoomIn className="w-8 h-8 text-slate-600/60" />
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-slate-200 hover:bg-white transition-all duration-200 hover:scale-110"
                      >
                        <ChevronLeft className="w-5 h-5 text-slate-700" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-slate-200 hover:bg-white transition-all duration-200 hover:scale-110"
                      >
                        <ChevronRight className="w-5 h-5 text-slate-700" />
                      </button>
                    </>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${status.color} backdrop-blur-sm bg-white/90`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {status.label}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => setIsWishlist(!isWishlist)}
                    className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 hover:bg-white transition-all duration-200 hover:scale-110"
                  >
                    <Heart className={`w-5 h-5 transition-colors ${isWishlist ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                  </button>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                          currentImageIndex === idx 
                            ? 'border-blue-600 shadow-lg shadow-blue-100' 
                            : 'border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2394a3b8' font-size='12'%3E📷%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right - Product Details */}
              <div className="p-6 lg:p-8 flex flex-col">
                {/* Product Name & Category */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      <Tag className="w-3 h-3" />
                      {product.category || "Uncategorized"}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-400">SKU: #{product.id?.slice(-6) || "N/A"}</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight">
                    {product.name}
                  </h1>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-slate-500">(124 reviews)</span>
                  <span className="text-sm text-slate-300">|</span>
                  <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-slate-800">
                      ${Number(product.price).toLocaleString()}
                    </span>
                    {product.oldPrice && (
                      <span className="text-lg text-slate-400 line-through">
                        ${Number(product.oldPrice).toLocaleString()}
                      </span>
                    )}
                    {product.oldPrice && (
                      <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                        Save ${Number(product.oldPrice - product.price).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-400">Price includes tax</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-600 mb-2">Description</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {product.description || "No description available for this product."}
                  </p>
                </div>

                {/* Stock Info */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                      <Package className="w-3.5 h-3.5" />
                      <span>Stock</span>
                    </div>
                    <span className="text-lg font-bold text-slate-800">{product.stock} units</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Delivery</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">2-3 Business Days</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <Truck className="w-3.5 h-3.5 text-slate-400" />
                    Free Shipping
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                    Warranty Included
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <Package className="w-3.5 h-3.5 text-slate-400" />
                    Premium Quality
                  </span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm font-medium text-slate-600">Quantity:</span>
                  <div className="flex items-center gap-2 bg-slate-50 rounded-xl border border-slate-200">
                    <button
                      onClick={() => handleQuantityChange('decrement')}
                      disabled={quantity <= 1}
                      className="p-2.5 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-xl"
                    >
                      <Minus className="w-4 h-4 text-slate-600" />
                    </button>
                    <span className="w-12 text-center font-semibold text-slate-800 text-lg">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange('increment')}
                      disabled={quantity >= product.stock}
                      className="p-2.5 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-r-xl"
                    >
                      <Plus className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-400">{product.stock} available</span>
                </div>

                {/* Add to Cart Button */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t border-slate-100">
                  <button
                    onClick = {() => handleAddToCart(product._id)}
                    disabled = {product.stock === 0}
                    className = {`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold transition-all duration-200 active:scale-[0.98] ${
                      product.stock === 0
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-blue-600 text-white shadow-lg shadow-blue-100 hover:bg-blue-700 hover:shadow-blue-200"
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button className="p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-800">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    Secure checkout
                  </div>
                  <div className="w-px h-4 bg-slate-200"></div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Truck className="w-3.5 h-3.5 text-emerald-500" />
                    Free returns
                  </div>
                  <div className="w-px h-4 bg-slate-200"></div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                    24/7 support
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-blue-600" />
              You might also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/50 p-4 hover:shadow-xl transition-shadow">
                  <div className="aspect-square rounded-xl bg-slate-50 border border-slate-100 mb-3 flex items-center justify-center">
                    <Package className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm truncate">Related Product {i}</h3>
                  <p className="text-blue-600 font-bold text-sm mt-1">$99.99</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={closeImageModal}
        >
          <div 
            className="relative w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute top-6 right-6 text-white/60 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2.5 transition-all duration-200 z-20 backdrop-blur-sm border border-white/10"
            >
              <X className="w-7 h-7" />  {/* الان X تعریف شده است */}
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-6 md:p-10">
              <img
                src={selectedImage}
                alt={product?.name}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
                style={{ 
                  imageRendering: "auto",
                  objectFit: "contain"
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Crect width='600' height='600' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='28'%3ENo Image%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/15 text-xs animate-pulse tracking-wider font-light">
              Click anywhere to close ✕
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.4; }
        }
        .animate-pulse {
          animation: pulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ProductDetails;