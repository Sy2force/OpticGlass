import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  RotateCcw, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  X,
  Sparkles,
  ScanFace
} from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '@/shared/data/products';

const TryOnPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGlasses, setSelectedGlasses] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [glassesPosition, setGlassesPosition] = useState({ x: 50, y: 40 });
  const [glassesScale, setGlassesScale] = useState(1);
  const [glassesRotation, setGlassesRotation] = useState(0);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Filter products for try-on (those with images)
  const glassesCollection = products.filter(p => p.images && p.images.length > 0).slice(0, 20);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setShowCamera(false);
        // Reset position on new image
        setGlassesPosition({ x: 50, y: 40 });
        setGlassesScale(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 1280, height: 720 } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
      setSelectedImage(null);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      
      // Flip horizontally for mirror effect if needed
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0);
      
      setSelectedImage(canvas.toDataURL('image/jpeg'));
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const resetTryOn = () => {
    setSelectedImage(null);
    setSelectedGlasses(null);
    setGlassesPosition({ x: 50, y: 40 });
    setGlassesScale(1);
    setGlassesRotation(0);
    stopCamera();
  };

  const handleGlassesSelect = (glasses) => {
    setIsProcessing(true);
    setTimeout(() => {
      setSelectedGlasses(glasses);
      setIsProcessing(false);
    }, 600);
  };

  const adjustPosition = (direction) => {
    setGlassesPosition(prev => {
      const step = 2;
      switch (direction) {
        case 'up': return { ...prev, y: Math.max(0, prev.y - step) };
        case 'down': return { ...prev, y: Math.min(100, prev.y + step) };
        case 'left': return { ...prev, x: Math.max(0, prev.x - step) };
        case 'right': return { ...prev, x: Math.min(100, prev.x + step) };
        default: return prev;
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-white/60 hover:text-white transition">
                <ChevronLeft size={24} />
              </Link>
              <h1 className="text-2xl font-display font-bold flex items-center gap-3">
                <ScanFace className="text-[#c9a227]" />
                Virtual Try-On
              </h1>
            </div>
            <Link
              to="/glasses"
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition text-sm font-medium"
            >
              Catalog
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-140px)]">
          {/* Main Area */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex-1 bg-[#1a1a1a] rounded-3xl border border-white/10 overflow-hidden relative flex items-center justify-center">
              {showCamera ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {/* Camera Overlay UI */}
                  <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20 rounded-3xl" />
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 pointer-events-auto">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={capturePhoto}
                      className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white/20"
                    >
                      <div className="w-16 h-16 bg-red-500 rounded-full border-2 border-white" />
                    </motion.button>
                    <button
                      onClick={stopCamera}
                      className="w-12 h-12 bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-black/70 transition absolute right-[-80px] top-1/2 -translate-y-1/2"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </>
              ) : selectedImage ? (
                <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Try-on"
                    className="max-w-full max-h-full object-contain"
                  />
                  
                  {selectedGlasses && !isProcessing && (
                    <motion.div
                      drag
                      dragMomentum={false}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute cursor-move touch-none"
                      style={{
                        left: `${glassesPosition.x}%`,
                        top: `${glassesPosition.y}%`,
                        x: '-50%',
                        y: '-50%',
                        width: '40%',
                        rotate: glassesRotation
                      }}
                    >
                      <div style={{ transform: `scale(${glassesScale})` }}>
                        <img
                          src={selectedGlasses.images[0]} // Use first image as main overlay
                          alt="Glasses"
                          className="w-full drop-shadow-2xl filter contrast-110"
                        />
                      </div>
                    </motion.div>
                  )}

                  {isProcessing && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-12 h-12 text-[#c9a227]" />
                      </motion.div>
                      <p className="mt-4 text-white/80 font-medium">Fitting in progress...</p>
                    </div>
                  )}

                  {/* Actions Overlay */}
                  <div className="absolute top-4 right-4 flex gap-3">
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.download = 'optic-glass-tryon.jpg';
                        link.href = selectedImage;
                        link.click();
                      }}
                      className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition"
                      title="Download"
                    >
                      <Download size={20} />
                    </button>
                    <button
                      onClick={resetTryOn}
                      className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition"
                      title="Reset"
                    >
                      <RotateCcw size={20} />
                    </button>
                  </div>

                  {/* Controls Overlay */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs text-white/50 uppercase tracking-wider">Position</span>
                      <div className="grid grid-cols-3 gap-1">
                        <div />
                        <button onClick={() => adjustPosition('up')} className="p-1 hover:bg-white/10 rounded"><ChevronLeft className="rotate-90" size={16} /></button>
                        <div />
                        <button onClick={() => adjustPosition('left')} className="p-1 hover:bg-white/10 rounded"><ChevronLeft size={16} /></button>
                        <div className="w-6 h-6 bg-white/10 rounded-full" />
                        <button onClick={() => adjustPosition('right')} className="p-1 hover:bg-white/10 rounded"><ChevronRight size={16} /></button>
                        <div />
                        <button onClick={() => adjustPosition('down')} className="p-1 hover:bg-white/10 rounded"><ChevronRight className="rotate-90" size={16} /></button>
                        <div />
                      </div>
                    </div>

                    <div className="w-px h-12 bg-white/10" />

                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs text-white/50 uppercase tracking-wider">Taille</span>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.05"
                        value={glassesScale}
                        onChange={(e) => setGlassesScale(parseFloat(e.target.value))}
                        className="w-24 accent-[#c9a227]"
                      />
                    </div>

                    <div className="w-px h-12 bg-white/10" />

                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs text-white/50 uppercase tracking-wider">Rotation</span>
                      <input
                        type="range"
                        min="-45"
                        max="45"
                        step="1"
                        value={glassesRotation}
                        onChange={(e) => setGlassesRotation(parseFloat(e.target.value))}
                        className="w-24 accent-[#c9a227]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-12">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md mx-auto"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-[#c9a227] to-amber-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-amber-900/40">
                      <ScanFace size={48} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Try before you buy</h2>
                    <p className="text-white/60 mb-10 text-lg leading-relaxed">
                      Use our virtual try-on technology to see how our frames fit your face in real-time.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={startCamera}
                        className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-3"
                      >
                        <Camera size={20} />
                        Use Camera
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition flex items-center justify-center gap-3"
                      >
                        <Upload size={20} />
                        Upload Photo
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Product Selection */}
          <div className="bg-[#1a1a1a] rounded-3xl border border-white/10 flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold">Select a frame</h2>
              <p className="text-sm text-white/50 mt-1">Click to try on</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {glassesCollection.map((glasses) => (
                <motion.button
                  key={glasses._id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGlassesSelect(glasses)}
                  className={`w-full p-3 rounded-2xl border transition-all flex items-center gap-4 text-left group ${
                    selectedGlasses?._id === glasses._id
                      ? 'bg-[#c9a227]/10 border-[#c9a227]'
                      : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="w-20 h-20 bg-white rounded-xl overflow-hidden p-2 flex-shrink-0">
                    <img
                      src={glasses.images[0]}
                      alt={glasses.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/50 uppercase tracking-wide mb-1">{glasses.brand}</p>
                    <h3 className="font-bold truncate group-hover:text-[#c9a227] transition-colors">{glasses.name}</h3>
                    <p className="text-[#c9a227] font-medium mt-1">{glasses.price} ₪</p>
                  </div>
                  {selectedGlasses?._id === glasses._id && (
                    <div className="w-8 h-8 bg-[#c9a227] rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles size={16} className="text-black" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {selectedGlasses && (
              <div className="p-6 border-t border-white/10 bg-[#1a1a1a] z-10">
                <Link
                  to={`/glasses/${selectedGlasses._id}`}
                  className="block w-full py-4 bg-[#c9a227] text-black font-bold text-center rounded-xl hover:bg-[#d4af37] transition shadow-lg"
                >
                  View Product Details
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOnPage;
