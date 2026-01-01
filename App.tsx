
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import AdResultCard from './components/AdResultCard';
import { AdConcept, AdVariation, ProductInput } from './types';
import { geminiService } from './services/geminiService';
import { CONCEPT_PROMPTS, CONCEPT_META } from './constants';

const App: React.FC = () => {
  const [product, setProduct] = useState<ProductInput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [variations, setVariations] = useState<AdVariation[]>([]);

  const handleGenerate = useCallback(async () => {
    if (!product) return;

    setIsGenerating(true);
    
    // Initialize empty loading variations
    const initialVariations: AdVariation[] = Object.values(AdConcept).map((concept) => ({
      id: concept,
      concept,
      style: CONCEPT_META[concept].style,
      description: CONCEPT_META[concept].desc,
      loading: true
    }));
    
    setVariations(initialVariations);

    // Run generations in parallel (limited by API/Browser concurrency)
    const promises = initialVariations.map(async (v) => {
      try {
        const imageUrl = await geminiService.generateAdImage(product, CONCEPT_PROMPTS[v.concept]);
        setVariations(prev => prev.map(item => 
          item.id === v.id ? { ...item, imageUrl, loading: false } : item
        ));
      } catch (err: any) {
        setVariations(prev => prev.map(item => 
          item.id === v.id ? { ...item, error: err.message || 'Generation failed', loading: false } : item
        ));
      }
    });

    await Promise.allSettled(promises);
    setIsGenerating(false);
  }, [product]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
            Transform Products into <span className="gradient-text">Masterpiece Ads</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upload a photo of your product and our AI will create 4 high-converting 
            visual concepts instantly for your next marketing campaign.
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 w-full">
              <ImageUploader onImageSelect={setProduct} />
            </div>
            <div className="w-full md:w-64 flex flex-col gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Instructions</h4>
                <ul className="text-xs text-slate-500 space-y-2">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    High res photos work best
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    Central subject focus
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    Simple backgrounds preferred
                  </li>
                </ul>
              </div>
              
              <button
                disabled={!product || isGenerating}
                onClick={handleGenerate}
                className={`w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center space-x-2 shadow-lg ${
                  !product || isGenerating 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                }`}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Generate Ads</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {(variations.length > 0) && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-800">AI Creative Directions</h2>
              <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Generated 4 Variations
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {variations.map((ad) => (
                <AdResultCard key={ad.id} ad={ad} />
              ))}
            </div>
          </section>
        )}

        {/* Informative Footer Content */}
        {!variations.length && !isGenerating && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 opacity-60">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h5 className="font-bold text-sm text-slate-800 uppercase tracking-wider">Concept Ideation</h5>
              <p className="text-xs text-slate-500 mt-2">Gemini analyzes your product and dreams up perfect scenes.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h5 className="font-bold text-sm text-slate-800 uppercase tracking-wider">Visual Consistency</h5>
              <p className="text-xs text-slate-500 mt-2">Your product remains unchanged while the world around it transforms.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h5 className="font-bold text-sm text-slate-800 uppercase tracking-wider">CTR Optimization</h5>
              <p className="text-xs text-slate-500 mt-2">Built-in marketing psychology prompts to drive higher click-through rates.</p>
            </div>
          </div>
        )}
      </main>

      <footer className="py-8 border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            Powered by Gemini 2.5 Flash Image & React 18. Built for professional marketing.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
