import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const SignatureCanvas = forwardRef(function SignatureCanvas(props, ref) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const context = canvas.getContext('2d');
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = '#000';
      context.lineWidth = 2;
      context.lineCap = 'round';
      context.lineJoin = 'round';
    }
  }, []);

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
    clear: () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    },
  }));

  const startDrawing = (e) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const context = canvas.getContext('2d');

    const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;

    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const context = canvas.getContext('2d');

    const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  return (
    <div className="flex flex-col gap-2">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="border-2 border-gray-400 rounded-lg cursor-crosshair bg-white h-48 w-full"
      />
      <button
        onClick={() => {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          context.fillStyle = 'white';
          context.fillRect(0, 0, canvas.width, canvas.height);
        }}
        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        Clear Signature
      </button>
    </div>
  );
});

export default SignatureCanvas;