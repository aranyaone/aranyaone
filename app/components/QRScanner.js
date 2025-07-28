'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Scan, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Smartphone,
  Tablet,
  Monitor,
  Settings,
  Flashlight,
  RotateCcw
} from 'lucide-react';

const QRScanner = ({ onScan, onClose, isOpen }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState('');
  const [deviceType, setDeviceType] = useState('mobile');
  const [flashOn, setFlashOn] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    detectDeviceType();
    if (isOpen) {
      requestCameraPermission();
    }
  }, [isOpen]);

  const detectDeviceType = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
      setDeviceType('mobile');
    } else if (/tablet|ipad/i.test(userAgent)) {
      setDeviceType('tablet');
    } else {
      setDeviceType('desktop');
    }
  };

  const requestCameraPermission = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = stream;
      setHasPermission(true);
      setIsScanning(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera permission error:', err);
      setError('Camera access denied. Please allow camera permissions to scan QR codes.');
      setHasPermission(false);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
    setHasPermission(false);
  };

  const toggleFlash = () => {
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0];
      if (track && track.getCapabilities().torch) {
        setFlashOn(!flashOn);
        track.applyConstraints({
          advanced: [{ torch: !flashOn }]
        });
      }
    }
  };

  const switchCamera = async () => {
    setFacingMode(facingMode === 'environment' ? 'user' : 'environment');
    stopScanning();
    await new Promise(resolve => setTimeout(resolve, 500));
    requestCameraPermission();
  };

  const handleScan = (result) => {
    if (result && onScan) {
      onScan(result);
      stopScanning();
    }
  };

  // Simulate QR code detection
  const simulateScan = () => {
    const sampleResults = [
      '{"type":"UPI","vpa":"bujji-chat@upi","amount":100,"currency":"INR"}',
      '{"type":"EMV","merchantId":"BUJJI_US_001","amount":50,"currency":"USD"}',
      '{"type":"PayNow","uen":"T01SS1234A","amount":25,"currency":"SGD"}',
      '{"type":"Pix","pixKey":"bujji-chat@pix.com.br","amount":75,"currency":"BRL"}'
    ];
    const randomResult = sampleResults[Math.floor(Math.random() * sampleResults.length)];
    handleScan(randomResult);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 rounded-3xl border border-slate-700 max-w-md w-full overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center">
            <Camera className="w-6 h-6 mr-3 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">QR Scanner</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Scanner View */}
        <div className="relative">
          {!hasPermission ? (
            <div className="p-8 text-center">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <h4 className="text-lg font-semibold text-white mb-2">Camera Permission Required</h4>
              <p className="text-gray-400 mb-6">{error || 'Please allow camera access to scan QR codes.'}</p>
              <button
                onClick={requestCameraPermission}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-colors"
              >
                Allow Camera Access
              </button>
            </div>
          ) : (
            <div className="relative">
              {/* Video Stream */}
              <div className="relative bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                />
                
                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Scanning Frame */}
                    <div className="border-2 border-blue-400 rounded-2xl w-64 h-64 relative">
                      {/* Corner Indicators */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-lg"></div>
                      
                      {/* Scanning Line */}
                      <motion.div
                        className="absolute left-0 w-full h-0.5 bg-blue-400"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                    
                    {/* Scanning Text */}
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                      <p className="text-white font-semibold">Position QR code in frame</p>
                      <p className="text-gray-400 text-sm">Hold steady for automatic scan</p>
                    </div>
                  </div>
                </div>

                {/* Device Type Indicator */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                    {deviceType === 'mobile' && <Smartphone className="w-4 h-4 mr-2 text-blue-400" />}
                    {deviceType === 'tablet' && <Tablet className="w-4 h-4 mr-2 text-blue-400" />}
                    {deviceType === 'desktop' && <Monitor className="w-4 h-4 mr-2 text-blue-400" />}
                    <span className="text-white text-sm font-medium capitalize">{deviceType}</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="p-6 space-y-4">
                {/* Control Buttons */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={toggleFlash}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      flashOn 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                    }`}
                    title="Toggle Flash"
                  >
                    <Flashlight className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={switchCamera}
                    className="p-3 bg-slate-800 text-gray-300 hover:bg-slate-700 rounded-xl transition-colors"
                    title="Switch Camera"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={simulateScan}
                    className="p-3 bg-blue-500 text-white hover:bg-blue-600 rounded-xl transition-colors"
                    title="Test Scan"
                  >
                    <Scan className="w-5 h-5" />
                  </button>
                </div>

                {/* Status */}
                <div className="text-center">
                  {isScanning && (
                    <div className="flex items-center justify-center text-green-400">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span className="text-sm">Scanning...</span>
                    </div>
                  )}
                </div>

                {/* Instructions */}
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Scanning Tips:</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Ensure QR code is well-lit and clearly visible</li>
                    <li>• Hold device steady and position code in frame</li>
                    <li>• QR code should be at least 2cm in size</li>
                    <li>• Avoid reflections and shadows on the code</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hidden Canvas for QR Processing */}
        <canvas ref={canvasRef} className="hidden" />
      </motion.div>
    </motion.div>
  );
};

export default QRScanner; 