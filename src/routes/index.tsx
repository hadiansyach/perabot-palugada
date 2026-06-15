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
  Heart
} from 'lucide-react'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

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
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#ebd8c1]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-primary-600/20">PP</span>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-primary-800 leading-none">Perabot</h1>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary-600">Palugada</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
            <a href="#home" className="hover:text-primary-700 transition-colors">Beranda</a>
            <a href="#features" className="hover:text-primary-700 transition-colors">Keunggulan</a>
            <a href="#products" className="hover:text-primary-700 transition-colors">Katalog Mebel</a>
            <a href="#contact" className="hover:text-primary-700 transition-colors">Hubungi Kami</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/628123456789" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Hubungi Sales</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Furnitur Premium Jati Asli & Desain Modern</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-800 tracking-tight leading-[1.1]">
                Penuhi Semua Kebutuhan <span className="text-primary-600">Perabot Rumah</span> Anda
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto lg:mx-0">
                Dari sofa ruang tamu minimalis yang empuk hingga meja makan kayu jati berkualitas ekspor. Kami menyediakan segala kebutuhan mebel rumah dan kantor Anda. *Apa yang lo mau, gue ada!*
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a 
                  href="#products" 
                  className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg shadow-primary-600/20 text-center"
                >
                  Jelajahi Katalog
                </a>
                <a 
                  href="https://wa.me/628123456789?text=Halo%20Perabot%20Palugada,%20saya%20tertarik%20tanya-tanya%20mengenai%20custom%20furnitur."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto bg-white border-2 border-primary-200 hover:border-primary-600 text-primary-700 hover:text-primary-800 px-8 py-4 rounded-xl font-bold text-base transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Konsultasi Mebel Custom</span>
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>

              {/* Counter/Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 max-w-md mx-auto lg:mx-0 border-t border-[#ebd8c1]/40">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-primary-800">100%</p>
                  <p className="text-xs text-neutral-500 font-medium mt-1">Kayu Jati Pilihan</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-primary-800">1,500+</p>
                  <p className="text-xs text-neutral-500 font-medium mt-1">Proyek Selesai</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-primary-800">4.9/5</p>
                  <p className="text-xs text-neutral-500 font-medium mt-1">Kepuasan Pelanggan</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative group">
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800" 
                  alt="Elegant Living Room Furniture" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Floating promo badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest">Penawaran Spesial</p>
                    <p className="text-base font-extrabold text-neutral-800 mt-0.5">Diskon Akhir Tahun S/D 25%</p>
                  </div>
                  <a href="#products" className="bg-primary-600 text-white p-2.5 rounded-xl hover:bg-primary-700 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-[#FAF9F6] border-y border-[#ebd8c1]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-bold text-primary-600 uppercase tracking-widest">Kenapa Harus Kami</p>
            <h3 className="text-3xl font-extrabold text-primary-800">Layanan & Kualitas Terbaik</h3>
            <p className="text-neutral-500 text-sm sm:text-base">Kami berdedikasi menghadirkan keindahan dan kepuasan di setiap sudut hunian Anda dengan standar pengerjaan tinggi.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-6">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-primary-800">Gratis Ongkir JABODETABEK</h4>
              <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
                Nikmati pengantaran gratis langsung ke depan pintu rumah Anda untuk wilayah Jakarta, Bogor, Depok, Tangerang, dan Bekasi.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-primary-800">Garansi Produk 2 Tahun</h4>
              <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
                Setiap furnitur kami dibuat agar tahan lama. Kami memberikan garansi kerusakan material dan konstruksi hingga 2 tahun.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-primary-800">Kayu Jati Pilihan Asli</h4>
              <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
                Kami menggunakan bahan kayu jati solid yang dikeringkan dengan oven khusus (kiln-dried) untuk mencegah perubahan bentuk dan retak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <p className="text-xs font-bold text-primary-600 uppercase tracking-widest">Koleksi Kami</p>
              <h3 className="text-3xl font-extrabold text-primary-800">Katalog Produk Terkini</h3>
              <p className="text-neutral-500 text-sm max-w-md">Filter berdasarkan kategori atau gunakan kolom pencarian untuk menemukan furnitur impian Anda dengan mudah.</p>
            </div>

            {/* Search inputs */}
            <div className="w-full md:w-80 relative">
              <input 
                type="text" 
                placeholder="Cari mebel (contoh: Sofa, Meja)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#ebd8c1]/60 focus:border-primary-600 focus:outline-none rounded-xl py-3 pl-11 pr-4 text-sm transition-all"
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
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-600/10'
                    : 'bg-white text-neutral-600 hover:bg-primary-100/50 hover:text-primary-700 border border-neutral-100'
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
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-neutral-100 hover:border-primary-100 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-100 relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{product.rating}</span>
                        <span className="text-neutral-400 font-normal">({product.stock} stok tersisa)</span>
                      </div>

                      <h4 className="text-lg font-bold text-neutral-800 mt-2 line-clamp-1 group-hover:text-primary-700 transition-colors">
                        {product.name}
                      </h4>
                      
                      <p className="text-neutral-500 text-sm mt-1.5 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-neutral-400 font-medium">Harga Terbaik</p>
                        <p className="text-lg font-extrabold text-primary-700 mt-0.5">{formatIDR(product.price)}</p>
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
            <div className="bg-white rounded-2xl border border-dashed border-neutral-200 p-12 text-center mt-10">
              <Info className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-neutral-800">Tidak ada produk ditemukan</h4>
              <p className="text-neutral-500 text-sm mt-1">Coba ketik kata kunci pencarian lain atau pilih kategori yang berbeda.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info & CTA Section */}
      <section className="bg-primary-800 text-[#FAF9F6] py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Kustomisasi Furnitur Impian Sesuai Kebutuhan Anda</h3>
              <p className="text-primary-100/90 text-base leading-relaxed">
                Punya gambar model sendiri, ukuran ruangan yang spesifik, atau ingin memilih warna kayu finishing khusus? Tim desainer dan pengrajin kami siap mendampingi Anda merealisasikannya secara profesional.
              </p>
              
              <ul className="space-y-3 text-sm text-primary-100 font-medium">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center text-white"><Check className="w-3 h-3" /></span>
                  <span>Konsultasi desain 3D gratis sebelum produksi</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center text-white"><Check className="w-3 h-3" /></span>
                  <span>Bebas pilih material kayu (Jati, Mahoni, Mindi)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center text-white"><Check className="w-3 h-3" /></span>
                  <span>Update foto proses pembuatan mebel secara berkala</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
              <h4 className="text-lg font-bold text-white">Hubungi Kami via Chat WhatsApp</h4>
              <p className="text-neutral-300 text-sm">Tim representatif kami siap melayani informasi stok, diskon, kustomisasi ukuran, dan estimasi ongkos kirim.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/628123456789?text=Halo%20Perabot%20Palugada,%20saya%20ingin%20tanya%20mengenai%20kustomisasi%20produk%20mebel."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20"
                >
                  <PhoneCall className="w-4.5 h-4.5" />
                  <span>Chat CS 1 (Custom Mebel)</span>
                </a>
                <a 
                  href="https://wa.me/628123456789?text=Halo%20Perabot%20Palugada,%20saya%20ingin%20tanya%20mengenai%20katalog%20produk%20dan%20stok%20ready."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-primary-600 hover:bg-primary-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 border border-primary-500"
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
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs font-bold text-primary-600 uppercase tracking-widest">Informasi Toko</p>
              <h3 className="text-3xl font-extrabold text-neutral-800">Kunjungi Showroom & Workshop Kami</h3>
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
              <div className="w-full h-80 rounded-3xl bg-neutral-50 border border-neutral-200 overflow-hidden relative shadow-inner">
                <div className="absolute inset-0 bg-[#E5E3DF] flex flex-col items-center justify-center p-6 text-center">
                  <MapPin className="w-10 h-10 text-primary-600 animate-bounce mb-2" />
                  <p className="font-bold text-neutral-800">Google Map Showroom</p>
                  <p className="text-xs text-neutral-500 mt-1 max-w-sm">Perabot Palugada, Klender, Jakarta Timur</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="mt-4 inline-flex items-center gap-1.5 bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow"
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
      <footer className="bg-neutral-900 text-neutral-400 py-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-neutral-800 pb-8">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-lg">PP</span>
              <div>
                <h4 className="text-lg font-bold text-white leading-none">Perabot Palugada</h4>
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
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative w-full max-w-3xl max-h-[90vh] flex flex-col md:flex-row z-10 border border-neutral-100 animate-in fade-in zoom-in duration-200">
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
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-neutral-400 font-normal">| {selectedProduct.stock} Stok Tersedia</span>
                </div>

                <h3 className="text-2xl font-extrabold text-neutral-800 mt-2">{selectedProduct.name}</h3>
                
                <p className="text-2xl font-extrabold text-primary-700 mt-2">{formatIDR(selectedProduct.price)}</p>
                
                <div className="mt-6">
                  <h4 className="text-sm font-bold text-neutral-700">Deskripsi Produk</h4>
                  <p className="text-neutral-500 text-sm mt-2 leading-relaxed">{selectedProduct.description}</p>
                </div>

                <div className="mt-6 space-y-2.5 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
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
