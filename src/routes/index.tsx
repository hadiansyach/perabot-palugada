import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { DUMMY_PRODUCTS, type Product } from '../data/products'
import { 
  Search, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  PhoneCall, 
  Info, 
  X, 
  MapPin, 
  Clock, 
  Check,
  ChevronRight,
  Heart,
  ShoppingBag,
  Menu
} from 'lucide-react'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Format IDR Price
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  // Get categories from products
  const categories = useMemo(() => {
    const list = new Set(DUMMY_PRODUCTS.map((p) => p.category))
    return ['Semua', ...Array.from(list)]
  }, [])

  // Filtered products
  const filteredProducts = useMemo(() => {
    return DUMMY_PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Favorite toggle
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  // WhatsApp Order Link Generator
  const getWhatsAppLink = (product: Product) => {
    const phoneNumber = '628123456789' // Ganti dengan nomor WhatsApp Toko
    const message = `Halo Perabot Palugada, saya tertarik untuk memesan produk berikut:\n\n*Nama Produk*: ${product.name}\n*Kategori*: ${product.category}\n*Harga*: ${formatIDR(product.price)}\n\nApakah stoknya masih tersedia untuk pengiriman segera? Terima kasih.`
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-800 font-sans selection:bg-primary-100 selection:text-primary-800">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-neutral-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Sisi Kiri: Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <img src="/ic_bucket.png" alt="Perabot Palugada" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
            <div className="text-left">
              <h1 className="text-xl font-black tracking-tight text-neutral-800 leading-none">Perabot</h1>
              <span className="text-[10px] font-bold tracking-widest uppercase text-primary-600">Palugada</span>
            </div>
          </a>
          
          {/* Sisi Tengah: Menu navigasi utama bergaya pill-shaped */}
          <nav className="hidden md:flex items-center bg-neutral-100/80 px-6 py-2 rounded-full border border-neutral-200/50 backdrop-blur-sm gap-6 text-sm font-semibold text-neutral-600">
            <a href="#home" className="hover:text-primary-600 transition-colors">Beranda</a>
            <a href="#features" className="hover:text-primary-600 transition-colors">Keunggulan</a>
            <a href="#products" className="hover:text-primary-600 transition-colors">Katalog Mebel</a>
            <a href="#contact" className="hover:text-primary-600 transition-colors">Hubungi Kami</a>
          </nav>

          {/* Sisi Kanan: Action Icons */}
          <div className="flex items-center gap-4">
            {/* Favorites Button */}
            <a href="#products" className="relative p-2 text-neutral-600 hover:text-red-500 transition-colors" title="Favorit">
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {favorites.length}
                </span>
              )}
            </a>

            {/* Shopping Bag Button (Notification Badge 2) */}
            <div className="relative p-2 text-neutral-600 cursor-pointer hover:text-primary-600 transition-colors" title="Keranjang Belanja">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 bg-primary-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </div>

            {/* User Avatar */}
            <div className="hidden sm:flex items-center gap-2 border-l border-neutral-200 pl-4">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                alt="User Profile" 
                className="w-8 h-8 rounded-full object-cover border border-neutral-200"
              />
              <div className="text-left">
                <p className="text-[9px] text-neutral-400 font-semibold leading-none">Hi Alex!</p>
                <p className="text-xs font-bold text-neutral-800 mt-0.5">Alex Moristar</p>
              </div>
            </div>

            {/* Hamburger Button for Mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 md:hidden transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200/60 bg-white px-4 py-4 space-y-2 shadow-lg absolute w-full left-0 animate-in slide-in-from-top-4 duration-200">
            <a 
              href="#home" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Beranda
            </a>
            <a 
              href="#features" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Keunggulan
            </a>
            <a 
              href="#products" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Katalog Mebel
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Hubungi Kami
            </a>
            
            {/* User Profile for Mobile */}
            <div className="pt-4 border-t border-neutral-100 flex items-center gap-3 px-4">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                alt="User Profile" 
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs text-neutral-400 font-semibold">Hi Alex!</p>
                <p className="text-sm font-bold text-neutral-800">Alex Moristar</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Hero Left Card: Info & Catalog */}
            <div className="lg:col-span-5 bg-neutral-100/50 p-8 sm:p-12 rounded-[2rem] border border-neutral-200/30 flex flex-col justify-between gap-8 text-left">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Furnitur Premium Jati Asli</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-800 tracking-tight leading-[1.1]">
                  Elevate Your Space with Elegant Simplicity Furniture Design
                </h2>
                <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
                  Dari sofa ruang tamu minimalis yang empuk hingga meja makan kayu jati berkualitas ekspor. Kami menyediakan segala kebutuhan mebel rumah dan kantor Anda. *Apa yang lo mau, gue ada!*
                </p>
                
                {/* Horizontal Filter Tabs / Category badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Popular', 'Exclusive', 'Hot Picks', 'Limited Edition'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSearchQuery('');
                        if (tag === 'Popular') setSelectedCategory('Sofa');
                        else if (tag === 'Exclusive') setSelectedCategory('Meja');
                        else if (tag === 'Hot Picks') setSelectedCategory('Kursi');
                        else setSelectedCategory('Semua');
                        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-full border border-neutral-300 text-neutral-600 hover:text-neutral-800 hover:border-neutral-800 text-xs font-bold transition-all cursor-pointer bg-transparent"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nested Mini Showcase Product Card */}
              {DUMMY_PRODUCTS.length > 0 && (
                <div 
                  onClick={() => setSelectedProduct(DUMMY_PRODUCTS[0])}
                  className="bg-white p-4 rounded-2xl flex items-center justify-between border border-neutral-200/40 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all cursor-pointer group/mini"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={DUMMY_PRODUCTS[0].image} 
                      alt={DUMMY_PRODUCTS[0].name} 
                      className="w-16 h-16 rounded-xl object-cover" 
                    />
                    <div className="text-left">
                      <p className="text-[10px] text-primary-600 uppercase tracking-widest font-extrabold">{DUMMY_PRODUCTS[0].category}</p>
                      <h4 className="text-sm font-bold text-neutral-800 mt-0.5 line-clamp-1">{DUMMY_PRODUCTS[0].name}</h4>
                      <p className="text-xs font-bold text-neutral-400 mt-0.5">{formatIDR(DUMMY_PRODUCTS[0].price)}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover/mini:bg-primary-600 group-hover/mini:text-white transition-all">
                    <ChevronRight className="w-5 h-5 animate-pulse" />
                  </div>
                </div>
              )}
            </div>

            {/* Hero Right Image: Large visual showcase */}
            <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto rounded-[2rem] overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern Loft Sofa Set" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              
              {/* Glassmorphic Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                <div>
                  <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>4.8</span>
                    <span className="text-neutral-500 font-normal">| Rating Toko</span>
                  </div>
                  <h3 className="text-lg font-black text-neutral-800 mt-1">Modern Loft Sofa Set</h3>
                  <p className="text-xs text-neutral-500 mt-0.5 max-w-sm">Built with premium teak wood framing, designed for maximum longevity and cozy comfort.</p>
                </div>
                
                <button 
                  onClick={() => setSelectedProduct(DUMMY_PRODUCTS[0])}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-5 py-3 rounded-full flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
                >
                  <span>View Product</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section / Trust Indicators */}
      <section className="py-12 bg-white border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8">
            <div className="max-w-md text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-neutral-800 leading-tight">
                Add Comfort To Your Living
              </h3>
            </div>
            <div className="max-w-2xl text-left">
              <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
                Everyone has an innate desire to shape and arrange their surroundings to reflect their personal style. We provide standard furniture curation and custom furniture consulting to craft spaces you call home.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-neutral-100 text-left">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-neutral-800">900+</p>
              <p className="text-[10px] text-neutral-400 font-bold mt-1 uppercase tracking-wider">Products Crafted</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-neutral-800">21K+</p>
              <p className="text-[10px] text-neutral-400 font-bold mt-1 uppercase tracking-wider">Happy & Loyal Customers</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-neutral-800">95%</p>
              <p className="text-[10px] text-neutral-400 font-bold mt-1 uppercase tracking-wider">Repeat Purchase Rate</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-neutral-800">400+</p>
              <p className="text-[10px] text-neutral-400 font-bold mt-1 uppercase tracking-wider">Unique Designs We Crafted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#FAF9F6] border-b border-neutral-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-bold text-primary-600 uppercase tracking-widest">Kenapa Harus Kami</p>
            <h3 className="text-3xl font-black text-neutral-800">Layanan & Kualitas Terbaik</h3>
            <p className="text-neutral-500 text-sm sm:text-base">Kami berdedikasi menghadirkan keindahan dan kepuasan di setiap sudut hunian Anda dengan standar pengerjaan tinggi.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
            {/* Feature 1 */}
            <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-neutral-200/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center mb-6">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-neutral-800">Gratis Ongkir JABODETABEK</h4>
              <p className="text-neutral-500 text-sm mt-3 leading-relaxed">
                Nikmati pengantaran gratis langsung ke depan pintu rumah Anda untuk wilayah Jakarta, Bogor, Depok, Tangerang, dan Bekasi.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-neutral-200/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-neutral-800">Garansi Produk 2 Tahun</h4>
              <p className="text-neutral-500 text-sm mt-3 leading-relaxed">
                Setiap furnitur kami dibuat agar tahan lama. Kami memberikan garansi kerusakan material dan konstruksi hingga 2 tahun.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-neutral-200/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-neutral-800">Kayu Jati Pilihan Asli</h4>
              <p className="text-neutral-500 text-sm mt-3 leading-relaxed">
                Kami menggunakan bahan kayu jati solid yang dikeringkan dengan oven khusus (kiln-dried) untuk mencegah perubahan bentuk dan retak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div className="space-y-3">
              <p className="text-xs font-bold text-primary-600 uppercase tracking-widest">Koleksi Kami</p>
              <h3 className="text-3xl font-black text-neutral-800">Katalog Produk Terkini</h3>
              <p className="text-neutral-500 text-sm max-w-md">Filter berdasarkan kategori atau gunakan kolom pencarian untuk menemukan furnitur impian Anda dengan mudah.</p>
            </div>

            {/* Search inputs */}
            <div className="w-full md:w-80 relative">
              <input 
                type="text" 
                placeholder="Cari mebel (contoh: Sofa, Meja)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 focus:border-primary-600 focus:bg-white focus:outline-none rounded-full py-3 pl-12 pr-4 text-sm transition-all"
              />
              <Search className="w-5 h-5 text-neutral-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary-100 scrollbar-track-transparent">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-neutral-850 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-none'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-neutral-200/60 hover:border-neutral-300/80 transition-all duration-300 flex flex-col cursor-pointer text-left"
                >
                  {/* Image Container */}
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-100 relative rounded-t-3xl">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    
                    {/* Favorite Button */}
                    <button 
                      onClick={(e) => toggleFavorite(product.id, e)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-neutral-500 hover:text-red-500 hover:bg-white shadow transition-all cursor-pointer"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-all ${
                          favorites.includes(product.id) ? 'fill-red-500 text-red-500 scale-110' : ''
                        }`} 
                      />
                    </button>

                    {/* Category tag */}
                    <span className="absolute bottom-4 left-4 bg-primary-800/80 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md">
                      {product.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 text-amber-500 text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{product.rating}</span>
                        <span className="text-neutral-400 font-normal">({product.stock} stok tersisa)</span>
                      </div>

                      <h4 className="text-lg font-bold text-neutral-800 mt-2 line-clamp-1 group-hover:text-primary-700 transition-colors">
                        {product.name}
                      </h4>
                      
                      <p className="text-neutral-500 text-sm mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Harga</p>
                        <p className="text-lg font-black text-primary-700 mt-0.5">{formatIDR(product.price)}</p>
                      </div>
                      
                      <span className="text-xs font-bold text-primary-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Detail <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-neutral-200 p-16 text-center mt-10">
              <Info className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-neutral-800">Tidak ada produk ditemukan</h4>
              <p className="text-neutral-500 text-sm mt-1">Coba ketik kata kunci pencarian lain atau pilih kategori yang berbeda.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info & CTA Section */}
      <section className="bg-primary-800 text-[#FAF9F6] py-20 relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">Kustomisasi Furnitur Impian Sesuai Kebutuhan Anda</h3>
              <p className="text-primary-100/90 text-sm sm:text-base leading-relaxed">
                Punya gambar model sendiri, ukuran ruangan yang spesifik, atau ingin memilih warna kayu finishing khusus? Tim desainer dan pengrajin kami siap mendampingi Anda merealisasikannya secara profesional.
              </p>
              
              <ul className="space-y-3.5 text-sm text-primary-100 font-medium">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center text-white flex-shrink-0"><Check className="w-3 h-3" /></span>
                  <span>Konsultasi desain 3D gratis sebelum produksi</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center text-white flex-shrink-0"><Check className="w-3 h-3" /></span>
                  <span>Bebas pilih material kayu (Jati, Mahoni, Mindi)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center text-white flex-shrink-0"><Check className="w-3 h-3" /></span>
                  <span>Update foto proses pembuatan mebel secara berkala</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 sm:p-10 rounded-[2rem] border border-white/10 shadow-xl space-y-6">
              <h4 className="text-lg font-bold text-white">Hubungi Kami via Chat WhatsApp</h4>
              <p className="text-neutral-300 text-sm leading-relaxed">Tim representatif kami siap melayani informasi stok, diskon, kustomisasi ukuran, dan estimasi ongkos kirim.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/628123456789?text=Halo%20Perabot%20Palugada,%20saya%20ingin%20tanya%20mengenai%20kustomisasi%20produk%20mebel."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20"
                >
                  <PhoneCall className="w-4.5 h-4.5" />
                  <span>Chat CS 1 (Custom Mebel)</span>
                </a>
                <a 
                  href="https://wa.me/628123456789?text=Halo%20Perabot%20Palugada,%20saya%20ingin%20tanya%20mengenai%20katalog%20produk%20dan%20stok%20ready."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-primary-600 hover:bg-primary-500 text-white py-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 border border-primary-500"
                >
                  <PhoneCall className="w-4.5 h-4.5" />
                  <span>Chat CS 2 (Info Katalog)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Address & Store Info */}
      <section id="contact" className="py-20 bg-white text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs font-bold text-primary-600 uppercase tracking-widest">Informasi Toko</p>
              <h3 className="text-3xl font-black text-neutral-800">Kunjungi Showroom & Workshop Kami</h3>
              <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
                Kami sangat senang menyambut Anda secara langsung untuk melihat contoh produk, memilih serat kayu jati yang disukai, atau merencanakan proyek interior bersama kami.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-primary-700 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-neutral-800 text-sm">Lokasi Showroom</h5>
                    <p className="text-neutral-500 text-sm mt-0.5">Jl. Raya Mebel Utama No. 88, Klender, Jakarta Timur</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-primary-700 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-neutral-800 text-sm">Jam Operasional</h5>
                    <p className="text-neutral-500 text-sm mt-0.5">Senin - Sabtu: 09.00 - 18.00 WIB (Minggu Libur)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* Dummy Map Placeholder */}
              <div className="w-full h-80 rounded-[2rem] bg-neutral-50 border border-neutral-200 overflow-hidden relative shadow-inner">
                <div className="absolute inset-0 bg-[#E5E3DF] flex flex-col items-center justify-center p-6 text-center">
                  <MapPin className="w-10 h-10 text-primary-600 animate-bounce mb-2" />
                  <p className="font-bold text-neutral-800">Google Map Showroom</p>
                  <p className="text-xs text-neutral-500 mt-1 max-w-sm">Perabot Palugada, Klender, Jakarta Timur</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="mt-4 inline-flex items-center gap-1.5 bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow"
                  >
                    <span>Buka di Google Maps</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-neutral-800 pb-12">
            <div className="flex items-center gap-3">
              <img src="/ic_bucket.png" alt="Logo" className="w-10 h-10 object-contain brightness-0 invert" />
              <div className="text-left">
                <h4 className="text-lg font-black text-white leading-none">Perabot Palugada</h4>
                <p className="text-[10px] text-neutral-500 tracking-wider uppercase font-semibold mt-0.5">Premium Furniture</p>
              </div>
            </div>

            <p className="text-xs text-neutral-500 text-center md:text-right">
              &copy; {new Date().getFullYear()} Perabot Palugada. Hak Cipta Dilindungi Undang-Undang.
            </p>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl relative w-full max-w-3xl max-h-[90vh] flex flex-col md:flex-row z-10 border border-neutral-100 animate-in fade-in zoom-in-95 duration-250 text-left">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Product Image */}
            <div className="md:w-1/2 bg-neutral-100 relative h-64 md:h-auto">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-primary-800/90 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md">
                {selectedProduct.category}
              </span>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-none">
              <div>
                {/* Header info */}
                <div className="flex items-center gap-1.5 text-amber-500 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-neutral-400 font-normal">| {selectedProduct.stock} Stok Tersedia</span>
                </div>

                <h3 className="text-2xl font-black text-neutral-800 mt-2 leading-tight">{selectedProduct.name}</h3>
                
                <p className="text-2xl font-black text-primary-700 mt-2">{formatIDR(selectedProduct.price)}</p>
                
                <div className="mt-6">
                  <h4 className="text-sm font-bold text-neutral-700">Deskripsi Produk</h4>
                  <p className="text-neutral-500 text-sm mt-2 leading-relaxed">{selectedProduct.description}</p>
                </div>

                <div className="mt-6 space-y-2.5 bg-neutral-50 p-4 rounded-2xl border border-neutral-150/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Pengerjaan</span>
                    <span className="font-semibold text-neutral-700">Finishing Melamin Halus</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Pengiriman</span>
                    <span className="font-semibold text-emerald-600">Gratis JABODETABEK</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Garansi</span>
                    <span className="font-semibold text-neutral-700">2 Tahun Konstruksi</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a 
                  href={getWhatsAppLink(selectedProduct)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <PhoneCall className="w-4.5 h-4.5" />
                  <span>Pesan Sekarang via WhatsApp</span>
                </a>
                <p className="text-[10px] text-neutral-400 text-center mt-2">
                  Tautan WhatsApp akan otomatis terisi format pemesanan produk ini.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
