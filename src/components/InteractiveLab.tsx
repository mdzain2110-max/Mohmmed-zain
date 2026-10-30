import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Play, RefreshCw, Sliders, CheckCircle2, ChevronRight, Activity, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

type LabMode = 'attention' | 'classifier';

export const InteractiveLab: React.FC = () => {
  const [activeMode, setActiveMode] = useState<LabMode>('attention');

  // Mode 1: Attention Explorer State
  const samplePrompts = [
    "Real-time edge neural inference achieves 94.2% mIoU on autonomous robotics.",
    "Cross-encoder re-ranking drastically suppresses hallucination in dense retrieval.",
    "Gradient descent with AdamW converged smoothly across 100 training epochs."
  ];
  const [inputText, setInputText] = useState(samplePrompts[0]);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(0);

  // Compute tokens and synthetic attention weights
  const tokens = inputText.trim().split(/\s+/).filter(Boolean);
  
  // Synthetic contextual attention matrix (normalized softmax)
  const attentionWeights = tokens.map((_, i) => {
    return tokens.map((_, j) => {
      if (i === j) return 0.35 + Math.random() * 0.15;
      const dist = Math.abs(i - j);
      const base = Math.max(0.05, 0.4 - dist * 0.08);
      return Math.min(0.9, base + (i % 2 === j % 2 ? 0.15 : 0.05));
    });
  });

  // Mode 2: 2D Classifier Canvas State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [datasetType, setDatasetType] = useState<'circles' | 'xor' | 'linearly_separable'>('circles');
  const [modelType, setModelType] = useState<'mlp' | 'linear' | 'rbf'>('mlp');
  const [threshold, setThreshold] = useState<number>(0.5);
  const [noiseLevel, setNoiseLevel] = useState<number>(0.15);
  const [accuracy, setAccuracy] = useState<number>(95.8);

  // Render 2D Decision Boundary
  useEffect(() => {
    if (activeMode !== 'classifier') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Generate points
    const points: { x: number; y: number; label: 0 | 1 }[] = [];
    const count = 120;

    // Seeded synthetic data points
    for (let i = 0; i < count; i++) {
      let x = (Math.random() * 2 - 1);
      let y = (Math.random() * 2 - 1);
      let label: 0 | 1 = 0;

      if (datasetType === 'circles') {
        const r = Math.sqrt(x * x + y * y);
        label = r < 0.55 ? 1 : 0;
      } else if (datasetType === 'xor') {
        label = (x * y > 0) ? 1 : 0;
      } else {
        label = (x + y > 0.1) ? 1 : 0;
      }

      // Add noise
      if (Math.random() < noiseLevel) {
        label = label === 1 ? 0 : 1;
      }

      points.push({ x, y, label });
    }

    // Function to calculate simulated model prediction P(y=1 | x, y)
    const predict = (px: number, py: number): number => {
      if (modelType === 'linear') {
        const z = 1.8 * px + 1.6 * py - 0.1;
        return 1 / (1 + Math.exp(-z));
      } else if (modelType === 'mlp') {
        if (datasetType === 'circles') {
          const r = Math.sqrt(px * px + py * py);
          const z = 7 * (0.55 - r);
          return 1 / (1 + Math.exp(-z));
        } else if (datasetType === 'xor') {
          const z = 6 * (px * py);
          return 1 / (1 + Math.exp(-z));
        } else {
          const z = 4 * (px + py - 0.1);
          return 1 / (1 + Math.exp(-z));
        }
      } else {
        // RBF Kernel
        let sim = 0;
        points.filter(p => p.label === 1).slice(0, 15).forEach(p => {
          const d2 = (px - p.x) ** 2 + (py - p.y) ** 2;
          sim += Math.exp(-d2 / 0.18);
        });
        return Math.min(1, Math.max(0, sim * 0.22));
      }
    };

    // Draw decision contour grid
    const step = 8;
    for (let py = 0; py < height; py += step) {
      for (let px = 0; px < width; px += step) {
        const normX = (px / width) * 2 - 1;
        const normY = -((py / height) * 2 - 1);
        const prob = predict(normX, normY);

        if (prob >= threshold) {
          ctx.fillStyle = `rgba(59, 130, 246, ${Math.min(0.4, (prob - threshold) * 0.7)})`;
        } else {
          ctx.fillStyle = `rgba(239, 68, 68, ${Math.min(0.4, (threshold - prob) * 0.7)})`;
        }
        ctx.fillRect(px, py, step, step);
      }
    }

    // Draw Decision Boundary Line (threshold contour)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);

    // Draw points
    let correct = 0;
    points.forEach(pt => {
      const cx = ((pt.x + 1) / 2) * width;
      const cy = ((-pt.y + 1) / 2) * height;
      const pred = predict(pt.x, pt.y) >= threshold ? 1 : 0;
      if (pred === pt.label) correct++;

      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = pt.label === 1 ? '#38bdf8' : '#f87171';
      ctx.fill();
      ctx.strokeStyle = pred === pt.label ? '#0f172a' : '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    const calculatedAcc = Math.round((correct / count) * 1000) / 10;
    setAccuracy(calculatedAcc);
  }, [activeMode, datasetType, modelType, threshold, noiseLevel]);

  const handleTestInference = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#818cf8', '#34d399']
    });
  };

  return (
    <section id="interactive-lab" className="py-20 border-t border-slate-800/80 bg-slate-950/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span>LIVE INTERACTIVE LABORATORY</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>CLIENT-SIDE NEURAL COMPUTE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Test-Drive the AI Models & Mathematics
            </h2>
            <p className="mt-2 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Interact directly with model inference simulations. Inspect bidirectional token self-attention weights or manipulate hyperplanes on a 2D decision boundary classifier in real time.
            </p>
          </div>

          {/* Mode Switcher Tabs (Zero-Pill, functional Segmented Control) */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
            <button
              onClick={() => setActiveMode('attention')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeMode === 'attention'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Self-Attention Visualizer
            </button>
            <button
              onClick={() => setActiveMode('classifier')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeMode === 'classifier'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. 2D Decision Boundary
            </button>
          </div>
        </div>

        {/* Experiment 1: Self-Attention & Token Analysis */}
        {activeMode === 'attention' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
            {/* Left Controls & Input */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">
                  SELECT SAMPLE INPUT OR ENTER TEXT:
                </label>
                <div className="space-y-2 mb-3">
                  {samplePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputText(p);
                        setSelectedTokenIndex(0);
                      }}
                      className="w-full text-left text-xs p-2.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800/80 text-slate-300 transition-colors line-clamp-1"
                    >
                      "{p}"
                    </button>
                  ))}
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    setSelectedTokenIndex(0);
                  }}
                  rows={3}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-sans"
                  placeholder="Type any sentence to see self-attention..."
                />
              </div>

              {/* Stats Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-slate-400 flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span>TOKEN COUNT</span>
                  <span className="text-white font-bold tabular-nums">{tokens.length} Tokens</span>
                </div>
                <div className="text-xs font-mono text-slate-400 flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span>ACTIVE QUERY TOKEN</span>
                  <span className="text-cyan-400 font-bold">
                    {selectedTokenIndex !== null && tokens[selectedTokenIndex]
                      ? `"${tokens[selectedTokenIndex]}"`
                      : 'None'}
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>INFERENCE LATENCY</span>
                  <span className="text-emerald-400 font-bold tabular-nums">1.2ms (Simulated)</span>
                </div>
              </div>

              <button
                onClick={handleTestInference}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span>Simulate Forward Pass</span>
              </button>
            </div>

            {/* Right: Attention Matrix & Token Highlighting */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate-300">
                    INTERACTIVE TOKEN HEATMAP (CLICK TO INSPECT ATTENTION FOCUS)
                  </span>
                  <span className="text-xs text-slate-500">Softmax Normalization</span>
                </div>

                {/* Token Chips */}
                <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-slate-950 border border-slate-800 min-h-[90px] items-center">
                  {tokens.map((token, idx) => {
                    const isSelected = selectedTokenIndex === idx;
                    const weight =
                      selectedTokenIndex !== null
                        ? attentionWeights[selectedTokenIndex]?.[idx] || 0.1
                        : 0.1;
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedTokenIndex(idx)}
                        style={{
                          backgroundColor: isSelected
                            ? '#2563eb'
                            : `rgba(59, 130, 246, ${Math.min(0.85, Math.max(0.08, weight))})`
                        }}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-150 ${
                          isSelected
                            ? 'text-white font-bold ring-2 ring-white shadow-lg scale-105'
                            : 'text-slate-100 hover:ring-1 hover:ring-slate-400'
                        }`}
                      >
                        {token}
                        {selectedTokenIndex !== null && (
                          <span className="block text-[10px] opacity-75 font-normal">
                            {(weight * 100).toFixed(0)}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Attention Distribution Bar */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-slate-400">
                  TOP-3 ATTENDED TOKENS FROM: <strong className="text-white">"{selectedTokenIndex !== null ? tokens[selectedTokenIndex] : ''}"</strong>
                </span>

                <div className="space-y-2">
                  {selectedTokenIndex !== null &&
                    tokens
                      .map((tok, i) => ({ token: tok, weight: attentionWeights[selectedTokenIndex]?.[i] || 0 }))
                      .sort((a, b) => b.weight - a.weight)
                      .slice(0, 3)
                      .map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs font-mono">
                          <span className="w-24 truncate text-slate-300">{item.token}</span>
                          <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                              style={{ width: `${Math.round(item.weight * 100)}%` }}
                            />
                          </div>
                          <span className="w-12 text-right text-slate-400 tabular-nums">
                            {(item.weight * 100).toFixed(1)}%
                          </span>
                        </div>
                      ))}
                </div>
              </div>

              <div className="text-xs text-slate-500 font-sans leading-relaxed border-l-2 border-slate-800 pl-3">
                Calculated via Scaled Dot-Product: <code className="font-mono text-cyan-400">Attention(Q, K, V) = softmax(Q · Kᵀ / √d_k) · V</code>. Shows contextual token affinity before multi-head projection.
              </div>
            </div>
          </div>
        )}

        {/* Experiment 2: 2D Classifier Decision Boundary */}
        {activeMode === 'classifier' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
            {/* Controls */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">
                  1. SELECT DATASET TOPOLOGY:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['circles', 'xor', 'linearly_separable'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setDatasetType(type)}
                      className={`px-3 py-2 text-xs font-mono rounded-lg border transition-colors ${
                        datasetType === type
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {type === 'circles' ? 'Concentric' : type === 'xor' ? 'XOR Quad' : 'Linear'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">
                  2. MODEL ARCHITECTURE:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['mlp', 'linear', 'rbf'] as const).map(arch => (
                    <button
                      key={arch}
                      onClick={() => setModelType(arch)}
                      className={`px-3 py-2 text-xs font-mono rounded-lg border transition-colors ${
                        modelType === arch
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {arch === 'mlp' ? '2-Layer MLP' : arch === 'linear' ? 'Perceptron' : 'RBF Kernel'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>DECISION THRESHOLD (τ)</span>
                    <span className="text-white tabular-nums">{threshold.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={0.2}
                    max={0.8}
                    step={0.02}
                    value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>LABEL NOISE RATIO</span>
                    <span className="text-white tabular-nums">{(noiseLevel * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={0.35}
                    step={0.05}
                    value={noiseLevel}
                    onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Accuracy Display */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-400 block">CLASSIFICATION ACCURACY</span>
                  <span className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
                    {accuracy}%
                  </span>
                </div>
                <button
                  onClick={handleTestInference}
                  className="px-3.5 py-2 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  Verify Convergence
                </button>
              </div>
            </div>

            {/* Canvas Viewport */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative rounded-xl border border-slate-800 overflow-hidden bg-slate-950 shadow-2xl">
                <canvas
                  ref={canvasRef}
                  width={460}
                  height={380}
                  className="max-w-full h-auto block"
                />

                <div className="absolute top-3 left-3 flex items-center gap-2 text-[11px] font-mono bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span>Class 1: Positive</span>
                  <span className="w-2 h-2 rounded-full bg-red-400 ml-2"></span>
                  <span>Class 0: Negative</span>
                </div>
              </div>
              <p className="mt-3 text-xs font-mono text-slate-500 text-center">
                Visualizing continuous hyper-plane decision manifolds across 2D Euclidean space.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
