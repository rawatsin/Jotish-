import { useState, useRef, useEffect } from 'react';
import SignatureCanvas from './SignatureCanvas';

export default function ImageCaptureDialog({ isOpen, onClose, onImageCapture }) {
  const [step, setStep] = useState('camera');
  const [capturedImage, setCapturedImage] = useState(null);
  const [mergedImage, setMergedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const signatureCanvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  
  useEffect(() => {
    if (isOpen && step === 'camera' && !stream) {
      startCamera();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, step]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      alert('Unable to access camera: ' + error.message);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      const video = videoRef.current;
      
      
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
      
    
      context.drawImage(video, 0, 0);
      
      
      const imageData = canvasRef.current.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      
     
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      
      setStep('signature');
    }
  };

  const mergePhotoAndSignature = () => {
    if (signatureCanvasRef.current && capturedImage) {
      const signatureCanvas = signatureCanvasRef.current.getCanvas();
      
      const mergeCanvas = document.createElement('canvas');
      const mergeContext = mergeCanvas.getContext('2d');
      
      const img = new Image();
      img.onload = () => {
        mergeCanvas.width = img.width;
        mergeCanvas.height = img.height;
        

        mergeContext.drawImage(img, 0, 0);
        

        mergeContext.drawImage(signatureCanvas, 0, 0);
        
  
        const mergedData = mergeCanvas.toDataURL('image/png');
        setMergedImage(mergedData);
        setStep('preview');
      };
      img.src = capturedImage;
    }
  };

  const handleConfirm = () => {
    if (mergedImage) {
      onImageCapture(mergedImage);
      resetDialog();
      onClose();
    }
  };

  const resetDialog = () => {
    setStep('camera');
    setCapturedImage(null);
    setMergedImage(null);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCancel = () => {
    resetDialog();
    onClose();
  };

  const goBack = () => {
    if (step === 'preview') {
      setStep('signature');
    } else if (step === 'signature') {
      setCapturedImage(null);
      setStep('camera');
      startCamera();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 border-b">
          <h2 className="text-2xl font-bold">
            {step === 'camera' && 'Capture Photo'}
            {step === 'signature' && 'Add Signature'}
            {step === 'preview' && 'Preview Audit Image'}
          </h2>
        </div>

    
        <div className="p-8">
          {step === 'camera' && (
            <div className="flex flex-col gap-4">
              <div className="relative bg-black rounded-lg overflow-hidden w-full">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-96 object-cover"
                />
              </div>
              <canvas ref={canvasRef} className="hidden" />
              <button
                onClick={capturePhoto}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                📸 Capture Photo
              </button>
            </div>
          )}

  
          {step === 'signature' && (
            <div className="flex flex-col gap-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-4">
                  ✏️ Sign your name on the canvas below using your mouse or touch
                </p>
                <SignatureCanvas ref={signatureCanvasRef} />
              </div>
              <button
                onClick={mergePhotoAndSignature}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                ✓ Continue to Preview
              </button>
            </div>
          )}


          {step === 'preview' && mergedImage && (
            <div className="flex flex-col gap-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                  📋 Final Audit Image (Photo + Signature)
                </p>
                <img src={mergedImage} alt="Merged" className="w-full rounded-lg" />
              </div>
            </div>
          )}
        </div>


        <div className="sticky bottom-0 bg-gray-50 p-6 border-t flex gap-4 justify-end">
          {step !== 'preview' && (
            <>
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Cancel
              </button>
              {step !== 'camera' && (
                <button
                  onClick={goBack}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
                >
                  Back
                </button>
              )}
            </>
          )}
          {step === 'preview' && (
            <>
              <button
                onClick={goBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
              >
                ✓ Confirm & Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}