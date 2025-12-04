import { X } from 'lucide-react';

function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-8 max-w-2xl w-[90%] shadow-2xl relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <h1 className="text-4xl font-bold mb-6 text-gray-900">About Crescendo</h1>
        
        <div className="space-y-4 text-gray-700">
          <p className="text-lg">
            Crescendo is an AI-powered minimalist music player that helps students concentrate and reach their flow state while working.
          </p>
          
          <p>
            With other apps like Spotify and Apple Music being very distracting with their varying choices of music, Crescendo doesn't let you play around with songs.<br/> Our AI helps choose the right songs for you, creating a focused environment with zero distractions.
          </p>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">Features</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>Clean, distraction-free interface</li>
              <li>Time-adaptive color themes (morning, afternoon, night)</li>
              <li>Curated music for studying and entering flow state</li>
              <li>Shuffle and loop functionality</li>
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">Made for Students</h2>
            <p>
              Built with ❤️ to create the perfect study environment.
            </p>
            <p className="mt-1">
                Next time you feel lost, save Crescendo and try listening to some of our music!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutModal;