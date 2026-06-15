export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  rating: number;
}

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Sofa Minimalis Modern 3-Seater",
    price: 3499000,
    description: "Sofa ruang tamu dengan desain minimalis, busa empuk premium, dan kain pelapis berkualitas tinggi yang tahan lama serta mudah dibersihkan.",
    category: "Sofa",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    stock: 12,
    rating: 4.8
  },
  {
    id: "prod-2",
    name: "Meja Makan Kayu Jati Solid",
    price: 5200000,
    description: "Meja makan elegan terbuat dari kayu jati pilihan, muat hingga 6 orang. Desain kokoh dengan sentuhan akhir natural melamin.",
    category: "Meja",
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800",
    stock: 5,
    rating: 4.9
  },
  {
    id: "prod-3",
    name: "Lemari Pakaian Minimalis 3 Pintu",
    price: 2850000,
    description: "Lemari pakaian dengan pintu geser (sliding) hemat ruang. Dilengkapi cermin full-body di bagian depan dan laci penyimpanan rahasia.",
    category: "Lemari",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
    stock: 8,
    rating: 4.6
  },
  {
    id: "prod-4",
    name: "Ranjang Tidur Jati King Size",
    price: 4750000,
    description: "Tempat tidur kayu jati ukuran King (180x200cm). Konstruksi sangat kuat, anti rayap, dengan sandaran kepala yang nyaman.",
    category: "Tempat Tidur",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
    stock: 4,
    rating: 4.7
  },
  {
    id: "prod-5",
    name: "Kursi Kerja Ergonomis Premium",
    price: 1850000,
    description: "Kursi kantor dengan sandaran mesh berongga udara, penyangga pinggang (lumbar support) yang dapat diatur, dan armrest 3D.",
    category: "Kursi",
    image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&q=80&w=800",
    stock: 20,
    rating: 4.5
  },
  {
    id: "prod-6",
    name: "Rak Buku Estetik Pembatas Ruangan",
    price: 1350000,
    description: "Rak buku serbaguna bermaterial industrial metal & kayu. Sangat cocok sebagai dekorasi ruang tamu sekaligus tempat penyimpanan barang seni.",
    category: "Rak",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800",
    stock: 15,
    rating: 4.6
  }
];
