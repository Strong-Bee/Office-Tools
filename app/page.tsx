// app/page.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowRight,
  faCheck,
  faShield,
  faStar,
  faRocket,
  faClock,
  faChartLine,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  Wrench,
  File,
  Sparkles,
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolsStatsChart from '@/components/charts/ToolsStatsChart';
import UsageTrendChart from '@/components/charts/UsageTrendChart';
import PopularityChart from '@/components/charts/PopularityChart';
import DonutChart from '@/components/charts/DonutChart';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tools = {
    pdf: [
      'Merge PDF', 'Split PDF', 'Compress PDF', 'PDF to Word',
      'PDF to Excel', 'PDF to PowerPoint', 'Word to PDF', 'Excel to PDF',
      'PowerPoint to PDF', 'JPG to PDF', 'PDF to JPG', 'Rotate PDF',
      'Delete PDF Pages', 'Extract PDF Pages', 'Reorder PDF Pages',
      'Protect PDF', 'Unlock PDF', 'Add Watermark', 'Add Page Numbers'
    ],
    documents: [
      'Word document converter', 'Text extraction', 'Document compressor',
      'Document merger', 'Document splitter', 'TXT converter',
      'DOC/DOCX utilities', 'RTF utilities'
    ],
    images: [
      'Image Compressor', 'Image Resizer', 'Image Converter',
      'JPG to PNG', 'PNG to JPG', 'WebP Converter', 'Image Cropper',
      'Image Rotator', 'Image Metadata Viewer', 'Image to PDF',
      'Background utilities'
    ],
    office: [
      'Excel utilities', 'CSV utilities', 'Spreadsheet converter',
      'PowerPoint utilities', 'Presentation converter', 'Document format converter'
    ],
    productivity: [
      'QR Code Generator', 'Barcode Generator', 'Password Generator',
      'Text Formatter', 'Word Counter', 'Character Counter',
      'Case Converter', 'URL Encoder/Decoder', 'Base64 Encoder/Decoder',
      'JSON Formatter', 'JSON Validator', 'Timestamp Converter',
      'Unit Converter', 'Color Converter'
    ]
  };

  const categories = [
    { icon: FileText, name: 'PDF Tools', count: '19 Tools', color: 'from-red-500 to-red-600', bg: 'bg-red-50', text: 'text-red-600', desc: 'Manage, convert, and edit PDF files', slug: '/tools/pdf' },
    { icon: File, name: 'Document Tools', count: '8 Tools', color: 'from-green-500 to-green-600', bg: 'bg-green-50', text: 'text-green-600', desc: 'Convert and manage documents', slug: '/tools/documents' },
    { icon: ImageIcon, name: 'Image Tools', count: '11 Tools', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', text: 'text-purple-600', desc: 'Compress, resize, and convert images', slug: '/tools/images' },
    { icon: FileSpreadsheet, name: 'Office Tools', count: '6 Tools', color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', text: 'text-orange-600', desc: 'Excel, CSV, and PowerPoint utilities', slug: '/tools/office' },
    { icon: Wrench, name: 'Developer Tools', count: '14 Tools', color: 'from-teal-500 to-teal-600', bg: 'bg-teal-50', text: 'text-teal-600', desc: 'JSON, Base64, URL, and more', slug: '/tools/developer' },
  ];

  const users = [
    { emoji: '👔', name: 'Karyawan', desc: 'Kelola dokumen kantor dengan mudah' },
    { emoji: '🎓', name: 'Mahasiswa', desc: 'Gabung & konversi tugas kuliah' },
    { emoji: '📚', name: 'Siswa', desc: 'Olah tugas dan file pembelajaran' },
    { emoji: '👨‍🏫', name: 'Guru', desc: 'Kelola materi dan dokumen' },
    { emoji: '💻', name: 'Programmer', desc: 'Developer utilities lengkap' },
    { emoji: '🎨', name: 'Designer', desc: 'Resize, compress, convert gambar' },
    { emoji: '💼', name: 'Freelancer', desc: 'Kelola dokumen client' },
    { emoji: '🏢', name: 'Perusahaan', desc: 'Workflow dokumen terintegrasi' },
  ];

  const roadmap = [
    { phase: 'Phase 1 — Core Tools', items: ['PDF: Merge, Split, Compress, Convert', 'Image: Compress, Resize, Convert'], status: 'completed' },
    { phase: 'Phase 2 — Office', items: ['Word', 'Excel', 'PowerPoint', 'CSV', 'TXT'], status: 'in-progress' },
    { phase: 'Phase 3 — Productivity', items: ['QR Generator', 'Password Generator', 'Text Tools', 'Developer Tools', 'Unit Converter'], status: 'planned' },
    { phase: 'Phase 4 — Platform', items: ['User Account', 'History', 'Batch Processing', 'Cloud Storage', 'API', 'Admin Dashboard'], status: 'planned' },
    { phase: 'Phase 5 — Advanced', items: ['AI Document Processing', 'OCR', 'Document Summarization', 'AI PDF Assistant', 'Smart File Conversion', 'Workflow Automation'], status: 'planned' },
  ];

  const stats = [
    { number: '50+', label: 'Tools Available', icon: faRocket },
    { number: '100K+', label: 'Files Processed', icon: faChartLine },
    { number: '99.9%', label: 'Uptime', icon: faClock },
    { number: '4.9⭐', label: 'User Rating', icon: faStar },
  ];

  const benefits = [
    {
      icon: '🚀',
      title: 'All-in-One Platform',
      desc: 'Lebih dari 50 tools dalam satu tempat. Tidak perlu berganti-ganti aplikasi.'
    },
    {
      icon: '⚡',
      title: 'Fast Processing',
      desc: 'Proses file cepat dan efisien. Hasil dalam hitungan detik.'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      desc: 'File Anda aman. Tidak disimpan, tidak dijual, diproses dengan aman.'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      desc: 'Nyaman digunakan di desktop, tablet, maupun smartphone.'
    },
  ];

  const testimonials = [
    {
      name: 'Andi Pratama',
      role: 'Software Engineer',
      company: 'Tech Corp',
      quote: 'Office Tools telah mengubah cara saya bekerja. Semua tools yang saya butuhkan ada dalam satu platform yang mudah digunakan.',
      rating: 5
    },
    {
      name: 'Siti Rahayu',
      role: 'Content Creator',
      company: 'Creative Studio',
      quote: 'Sebagai content creator, saya sering menggunakan Image Tools dan PDF Tools. Sangat membantu dan cepat!',
      rating: 5
    },
    {
      name: 'Budi Santoso',
      role: 'University Student',
      company: 'UI/UX Design',
      quote: 'Mengerjakan tugas kuliah jadi lebih mudah dengan Office Tools. PDF merger dan converter sangat berguna!',
      rating: 4
    },
  ];

  const faqs = [
    {
      question: 'Apakah Office Tools gratis?',
      answer: 'Ya, semua tools di Office Tools dapat digunakan secara gratis tanpa perlu registrasi.'
    },
    {
      question: 'Apakah file saya aman?',
      answer: 'Ya, kami tidak menyimpan file Anda. Semua file diproses secara lokal dan dihapus setelah selesai.'
    },
    {
      question: 'Berapa maksimal ukuran file?',
      answer: 'Saat ini mendukung file hingga 100MB untuk sebagian besar tools.'
    },
    {
      question: 'Apakah ada batasan penggunaan?',
      answer: 'Tidak ada batasan penggunaan. Anda dapat menggunakan semua tools sebanyak yang Anda butuhkan.'
    },
  ];

  // Chart Data
  const chartData = {
    toolsStats: [
      { category: 'PDF', count: 19, color: '#ef4444' },
      { category: 'Documents', count: 8, color: '#3b82f6' },
      { category: 'Images', count: 11, color: '#8b5cf6' },
      { category: 'Office', count: 6, color: '#f59e0b' },
      { category: 'Developer', count: 14, color: '#14b8a6' },
    ],
    usageTrend: [
      { date: '2024-01-01', users: 100, files: 250 },
      { date: '2024-02-01', users: 350, files: 800 },
      { date: '2024-03-01', users: 500, files: 1200 },
      { date: '2024-04-01', users: 800, files: 2000 },
      { date: '2024-05-01', users: 1200, files: 3500 },
      { date: '2024-06-01', users: 1800, files: 5000 },
    ],
    popularity: [
      { name: 'PDF Tools', popularity: 95, color: '#ef4444' },
      { name: 'Image Tools', popularity: 88, color: '#8b5cf6' },
      { name: 'Document Tools', popularity: 85, color: '#3b82f6' },
      { name: 'Developer Tools', popularity: 82, color: '#14b8a6' },
      { name: 'Office Tools', popularity: 75, color: '#f59e0b' },
    ],
    donutData: [
      { label: 'PDF', value: 19, color: '#ef4444' },
      { label: 'Documents', value: 8, color: '#3b82f6' },
      { label: 'Images', value: 11, color: '#8b5cf6' },
      { label: 'Office', value: 6, color: '#f59e0b' },
      { label: 'Developer', value: 14, color: '#14b8a6' },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />

        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              <Sparkles className="w-4 h-4" />
              All-in-One Productivity Platform
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Office Tools
              </span>
            </h1>

            <p className={`text-xl text-gray-600 mb-4 font-semibold transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              Simple • Fast • Useful
            </p>

            <p className={`text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              Platform <strong>all-in-one productivity tools</strong> yang dirancang untuk membantu
              pekerjaan perkantoran, mahasiswa, siswa, guru, freelancer, dan pengguna umum.
            </p>

            <div className={`flex flex-wrap justify-center gap-4 mt-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              <Link
                href="/tools"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
              >
                Explore Tools
                <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-medium hover:border-gray-400 hover:shadow-lg transition-all flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                View on GitHub
              </Link>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="text-3xl font-bold text-gray-800">{stat.number}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">💡 Why Choose Office Tools?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Solusi lengkap untuk semua kebutuhan dokumen dan file Anda
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{benefit.icon}</div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📊 Platform Statistics</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visualisasi data penggunaan dan tools yang tersedia di Office Tools
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Tools Stats Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold mb-4">Tools Distribution</h3>
              <ToolsStatsChart data={chartData.toolsStats} />
              <p className="text-sm text-gray-500 text-center mt-4">
                Total 58+ tools across 5 categories
              </p>
            </div>

            {/* Donut Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold mb-4">Tools Breakdown</h3>
              <DonutChart data={chartData.donutData} />
            </div>

            {/* Usage Trend Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
              <h3 className="text-lg font-bold mb-4">Usage Trend</h3>
              <UsageTrendChart data={chartData.usageTrend} />
              <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Files Processed</span>
                </div>
              </div>
            </div>

            {/* Popularity Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
              <h3 className="text-lg font-bold mb-4">Tool Popularity</h3>
              <PopularityChart data={chartData.popularity} />
              <p className="text-sm text-gray-500 text-center mt-4">
                Popularity based on user usage and feedback
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Categories */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">✨ Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage, convert, and optimize your files in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.slug}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 block"
              >
                <div className={`w-14 h-14 rounded-2xl ${category.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className={`w-7 h-7 ${category.text}`} />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{category.count}</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{category.desc}</p>
                <ul className="space-y-1">
                  {Object.values(tools)[index]?.slice(0, 4).map((tool, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                      <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-green-500 flex-shrink-0" />
                      {tool}
                    </li>
                  ))}
                  {Object.values(tools)[index]?.length > 4 && (
                    <li className="text-sm text-blue-600 font-medium mt-2">
                      +{Object.values(tools)[index].length - 4} more tools →
                    </li>
                  )}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools Section */}
      <section id="tools" className="py-20 px-4 bg-gray-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🛠️ Complete Tool List</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Over 50+ tools to handle all your document, image, and productivity needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.entries(tools).map(([category, items]) => (
              <div key={category} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-3 capitalize">
                  {category === 'pdf' ? '📄 PDF' :
                    category === 'documents' ? '📝 Documents' :
                      category === 'images' ? '🖼️ Images' :
                        category === 'office' ? '📊 Office' : '🛠️ Productivity'}
                </h3>
                <ul className="space-y-1">
                  {items.map((tool, idx) => (
                    <li key={idx} className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-default flex items-start gap-1">
                      <span className="text-gray-300">•</span> {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🎯 Who Is It For?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built for everyone who works with documents, images, and files
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {users.map((user, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-2 border border-gray-100">
                <div className="text-4xl mb-3">{user.emoji}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">💬 What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of users worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role} • {testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Office Tools */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🚀 Why Office Tools?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              One platform for all your file management needs
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <p className="text-center text-gray-700 mb-6 font-medium">
                Instead of using multiple applications for different tasks:
              </p>
              <div className="space-y-3 text-sm font-mono text-gray-600 bg-gray-50 p-4 rounded-xl mb-6 border border-gray-200">
                <div className="flex justify-between items-center">
                  <span>Merge PDF</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-red-500">Aplikasi A</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Compress PDF</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-red-500">Aplikasi B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Resize Image</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-red-500">Aplikasi C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Convert DOCX</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-red-500">Aplikasi D</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>JSON Formatter</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-red-500">Aplikasi E</span>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow">
                  🎯 One Platform. All Tools.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="py-20 px-4 bg-gray-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🎨 Design Philosophy</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dibangun dengan prinsip untuk memberikan pengalaman terbaik
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '✨', text: 'Simple — mudah digunakan oleh siapa saja' },
              { icon: '⚡', text: 'Fast — proses file secepat mungkin' },
              { icon: '💡', text: 'Useful — setiap tool memiliki fungsi praktis' },
              { icon: '📱', text: 'Responsive — nyaman di semua perangkat' },
              { icon: '🎨', text: 'Modern — UI bersih dan modern' },
              { icon: '🔒', text: 'Privacy-focused — file Anda aman' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-2 border border-gray-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-sm text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon icon={faShield} className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">🔐 Privacy First</h2>
            </div>
            <ul className="space-y-3">
              {[
                'File pengguna tidak disimpan lebih lama dari yang diperlukan',
                'File sementara dihapus secara otomatis',
                'Tidak menjual data pengguna',
                'Proses upload dan download menggunakan koneksi aman',
                'Pemrosesan langsung di browser jika memungkinkan'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl text-center">
              <p className="text-xl font-semibold text-blue-600">
                Your files are yours. Always. 🔒
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">❓ Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about Office Tools
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🗺️ Roadmap</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our journey to build the ultimate productivity platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {roadmap.map((phase, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all border-l-4 border-blue-500 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-800">{phase.phase}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${phase.status === 'completed' ? 'bg-green-100 text-green-700' :
                    phase.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                    {phase.status === 'completed' ? '✅ Completed' :
                      phase.status === 'in-progress' ? '🔄 In Progress' :
                        '📋 Planned'}
                  </span>
                </div>
                <ul className="space-y-1">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              View Full Roadmap
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="container mx-auto text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FontAwesomeIcon icon={faRocket} className="w-4 h-4" />
              Our Vision
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">🌟 Our Vision</h2>
            <p className="text-xl text-blue-100 mb-4">
              Office Tools tidak hanya ingin menjadi PDF converter.
            </p>
            <p className="text-2xl md:text-3xl font-semibold max-w-3xl mx-auto mb-6">
              A complete digital toolbox for work, study, and everyday productivity.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Work</span>
              <span className="text-white/40">→</span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Study</span>
              <span className="text-white/40">→</span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Create</span>
              <span className="text-white/40">→</span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Convert</span>
              <span className="text-white/40">→</span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Organize</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faHeart} className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">🚀 Ready to Get Started?</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Join thousands of users who trust Office Tools for their daily productivity needs
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/tools"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-xl transition-all hover:scale-105"
                >
                  Try Office Tools Now
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-medium hover:border-gray-400 hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                  Star on GitHub
                </Link>
              </div>
              <p className="text-sm text-gray-400 mt-6">
                Free • No registration required • Privacy guaranteed
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}