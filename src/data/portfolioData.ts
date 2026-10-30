import { Project, SkillCategory, TimelineItem, Certification } from '../types';

export const PERSONAL_INFO = {
  name: "Md Zain",
  role: "B.Tech CSE (AI & Machine Learning)",
  institution: "Undergraduate Student · 2nd Year (2023 - 2027)",
  email: "mdzain2110@gmail.com",
  location: "Hyderabad, India",
  headline: "Engineering intelligent neural architectures, computer vision pipelines, and production machine learning systems.",
  bio: "Second-year Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning. Passionate about bridging theoretical linear algebra and deep learning with high-performance production code. Currently conducting research on edge computer vision for micro-robotics and developing low-latency retrieval systems.",
  portraitUrl: "/src/assets/images/zain_portrait_1793342241463.jpg",
  github: "https://github.com/mdzain",
  linkedin: "https://linkedin.com/in/mdzain",
  kaggle: "https://kaggle.com/mdzain",
  metrics: [
    { label: "Cumulative B.Tech GPA", value: "9.24 / 10.0" },
    { label: "Deep Learning Models Deployed", value: "5+ Systems" },
    { label: "Hackathon Podiums & Awards", value: "3 Wins" },
    { label: "Verified DSA Problems Solved", value: "350+ LeetCode" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "neurovision-edge",
    title: "NeuroVision Edge",
    subtitle: "Real-Time Semantic Segmentation on Edge Robotics",
    category: "cv",
    categoryLabel: "Computer Vision",
    image: "/src/assets/images/project_vision_edge_1793342242797.jpg",
    summary: "A lightweight, dual-branch deep convolutional network optimized for real-time obstacle segmentation and depth estimation on edge computing platforms with strict power constraints.",
    architecture: "BiSeNet-inspired architecture with bilateral spatial and context paths, followed by bilateral aggregation layers. Model quantized to INT8 precision via TensorRT and deployed on Jetson Orin Nano with CUDA acceleration.",
    keyMetrics: [
      { label: "Mean IoU", value: "94.2%" },
      { label: "Edge Inference", value: "48 FPS" },
      { label: "Latency", value: "19.4ms" },
      { label: "Model Footprint", value: "14.2 MB" }
    ],
    tags: ["Computer Vision", "PyTorch", "TensorRT", "CUDA", "ONNX", "Jetson"],
    dataset: "Cityscapes + Custom Aerial UAV Drone Dataset (4,200 labeled frames)",
    paperOrRef: "BiSeNet V2 & MobileNetV3 Bottlenecks",
    codeSnippet: `import torch
import torch.nn as nn

class SpatialPath(nn.Module):
    """3-layer spatial path preserving high-frequency boundary textures"""
    def __init__(self, in_channels=3, out_channels=128):
        super().__init__()
        self.conv_block = nn.Sequential(
            nn.Conv2d(in_channels, 64, kernel_size=3, stride=2, padding=1, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.Conv2d(64, 128, kernel_size=3, stride=2, padding=1, bias=False),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.Conv2d(128, out_channels, kernel_size=3, stride=2, padding=1, bias=False),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True)
        )

    def forward(self, x):
        return self.conv_block(x)

# INT8 TensorRT Engine compilation
# trtexec --onnx=model.onnx --saveEngine=model_int8.engine --int8 --fp16`,
    highlights: [
      "Engineered bilateral path extracting high-resolution spatial details while context path captures receptive field.",
      "Achieved sub-20ms latency on edge hardware using TensorRT post-training quantization.",
      "Trained with multi-loss objective combining Lovász-Softmax and Cross-Entropy for class-imbalanced urban obstacle categories."
    ],
    liveDemoUrl: "#interactive-lab",
    githubUrl: "https://github.com/mdzain/neurovision-edge"
  },
  {
    id: "lexirag-neural",
    title: "LexiRAG Neural Search",
    subtitle: "Multi-Hop Knowledge Retrieval & Reranking Engine",
    category: "nlp",
    categoryLabel: "NLP & Generative AI",
    image: "/src/assets/images/project_rag_neural_1793342243435.jpg",
    summary: "Hybrid retrieval-augmented generation engine integrating sparse BM25 indices with dense neural embeddings and cross-encoder re-ranking for complex technical literature.",
    architecture: "Two-stage pipeline: Fast hybrid candidate generation (BM25 + BGE-large-en-v1.5 embeddings in ChromaDB) followed by a cross-encoder (bge-reranker-large) scoring stage and Gemini LLM synthesis.",
    keyMetrics: [
      { label: "MRR @ 10", value: "89.4%" },
      { label: "Retrieval Time", value: "115ms" },
      { label: "Hallucination Drop", value: "-42%" },
      { label: "Indexed Papers", value: "12,000+" }
    ],
    tags: ["NLP", "RAG", "ChromaDB", "Gemini API", "FastAPI", "Python"],
    dataset: "ArXiv AI-ML Subcorpus (Computer Science 2022-2024)",
    paperOrRef: "Dense Passage Retrieval & Self-RAG frameworks",
    codeSnippet: `from sentence_transformers import CrossEncoder
import chromadb

class LexiRAGPipeline:
    def __init__(self, collection_name="arxiv_papers"):
        self.client = chromadb.PersistentClient(path="./chroma_db")
        self.collection = self.client.get_collection(collection_name)
        self.reranker = CrossEncoder('BAAI/bge-reranker-large')

    def retrieve_and_rerank(self, query: str, top_k: int = 5):
        # Stage 1: Vector similarity retrieval
        results = self.collection.query(query_texts=[query], n_results=top_k * 3)
        docs = results['documents'][0]
        
        # Stage 2: Cross-Encoder contextual score
        pairs = [[query, doc] for doc in docs]
        scores = self.reranker.predict(pairs)
        ranked = sorted(zip(docs, scores), key=lambda x: x[1], reverse=True)
        return [doc for doc, score in ranked[:top_k]]`,
    highlights: [
      "Built custom hybrid search algorithm combining token frequency BM25 with high-dimensional 1024-dim dense embeddings.",
      "Mitigated hallucination by 42% on domain question-answering benchmarks through citation anchoring.",
      "Packaged as a lightweight asynchronous REST API using FastAPI and Redis query caching."
    ],
    liveDemoUrl: "#interactive-lab",
    githubUrl: "https://github.com/mdzain/lexirag-neural"
  },
  {
    id: "medscan-cade",
    title: "MedScan CADe",
    subtitle: "Self-Supervised Chest Radiograph Pathology Screener",
    category: "cv",
    categoryLabel: "Computer Vision",
    image: "/src/assets/images/project_medscan_cade_1793342243630.jpg",
    summary: "Deep vision transformer model trained with self-supervised contrastive learning to identify 14 thoracic conditions on chest X-rays with transparent Grad-CAM explainability.",
    architecture: "Vision Transformer (ViT-Base/16) pre-trained with masked autoencoding (MAE), fine-tuned with binary cross-entropy on multi-label radiological observations. Integrated Grad-CAM generation for clinical verification.",
    keyMetrics: [
      { label: "Mean ROC-AUC", value: "0.938" },
      { label: "Sensitivity", value: "91.5%" },
      { label: "Inference Time", value: "32ms" },
      { label: "Conditions Detected", value: "14 Pathologies" }
    ],
    tags: ["Medical AI", "Vision Transformer", "PyTorch", "Grad-CAM", "Torchvision"],
    dataset: "CheXpert & NIH ChestX-ray14 (112,000+ radiographs)",
    paperOrRef: "Vision Transformers for Radiograph Classification",
    codeSnippet: `import torch
import torch.nn.functional as F

class GradCAMExplainer:
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
        self._hook_layers()

    def _hook_layers(self):
        def forward_hook(m, inp, out): self.activations = out
        def backward_hook(m, grad_in, grad_out): self.gradients = grad_out[0]
        self.target_layer.register_forward_hook(forward_hook)
        self.target_layer.register_full_backward_hook(backward_hook)

    def generate_heatmap(self, class_idx):
        weights = torch.mean(self.gradients, dim=(2, 3), keepdim=True)
        cam = torch.sum(weights * self.activations, dim=1, keepdim=True)
        cam = F.relu(cam)
        cam = F.interpolate(cam, size=(224, 224), mode='bilinear', align_corners=False)
        return (cam - cam.min()) / (cam.max() - cam.min() + 1e-8)`,
    highlights: [
      "Engineered clinically interpretable saliency heatmaps using Grad-CAM to localize pulmonary lesions.",
      "Outperformed standard ResNet-50 baseline by 4.2% mean AUC on complex consolidated infiltrate cases.",
      "Implemented strict train-validation patient ID isolation to prevent medical data leakage."
    ],
    liveDemoUrl: "#interactive-lab",
    githubUrl: "https://github.com/mdzain/medscan-cade"
  },
  {
    id: "audiopulse-emotion",
    title: "AudioPulse SER",
    subtitle: "Acoustic Speech Emotion Recognition Architecture",
    category: "nlp",
    categoryLabel: "Speech AI",
    image: "/src/assets/images/project_rag_neural_1793342243435.jpg",
    summary: "Hybrid CNN-BiLSTM architecture analyzing Mel-frequency cepstral coefficients (MFCCs) and spectral roll-off to classify human emotional states from raw speech audio.",
    architecture: "1D/2D CNN feature extractors processing 128-band Mel-Spectrograms, fed into a Bidirectional LSTM layer with self-attention pooling to capture temporal emotional contours.",
    keyMetrics: [
      { label: "Accuracy", value: "88.7%" },
      { label: "Classes", value: "7 Emotions" },
      { label: "F1 Score", value: "0.879" },
      { label: "Audio Sampling", value: "16 kHz" }
    ],
    tags: ["Speech AI", "PyTorch", "Librosa", "Audio DSP", "BiLSTM"],
    dataset: "RAVDESS & TESS Emotional Speech Corpus (4,800 audio samples)",
    paperOrRef: "Spectrogram Attention Networks for Speech Emotion",
    codeSnippet: `import librosa
import numpy as np

def extract_log_mel_spectrogram(audio_path, sr=16000, n_mels=128):
    y, sr = librosa.load(audio_path, sr=sr, duration=3.0)
    # Fix audio length to 3 seconds with zero-padding
    target_len = sr * 3
    if len(y) < target_len:
        y = np.pad(y, (0, target_len - len(y)))
    else:
        y = y[:target_len]
    
    mel_spec = librosa.feature.melspectrogram(y=y, sr=sr, n_fft=1024, hop_length=512, n_mels=n_mels)
    log_mel = librosa.power_to_db(mel_spec, ref=np.max)
    # Standardize
    norm_mel = (log_mel - np.mean(log_mel)) / (np.std(log_mel) + 1e-6)
    return norm_mel`,
    highlights: [
      "Custom audio feature engineering utilizing Chromagrams, Spectral Contrast, and Mel-Spectrograms.",
      "Attained 88.7% classification accuracy across Neutral, Happy, Sad, Angry, Fearful, Disgust, and Surprised.",
      "Integrated synthetic noise augmentation (Gaussian jitter, pitch shifting, room reverberation simulation)."
    ],
    liveDemoUrl: "#interactive-lab",
    githubUrl: "https://github.com/mdzain/audiopulse-ser"
  },
  {
    id: "synapse-drift",
    title: "SynapseML Monitor",
    subtitle: "Real-Time Data & Prediction Drift Telemetry Service",
    category: "systems",
    categoryLabel: "ML Systems & MLOps",
    image: "/src/assets/images/project_vision_edge_1793342242797.jpg",
    summary: "Production microservice calculating continuous statistical divergence (Kolmogorov-Smirnov & Population Stability Index) on streaming inference requests to trigger automated model retraining.",
    architecture: "High-throughput asynchronous FastAPI gateway backed by Redis sliding-window queues and Prometheus metrics exporter, capable of testing feature distribution shifts on 10,000 records/sec.",
    keyMetrics: [
      { label: "Throughput", value: "10k req/s" },
      { label: "Detection Latency", value: "< 4.2ms" },
      { label: "Memory Overhead", value: "48 MB" },
      { label: "Statistical Test", value: "Two-sample KS" }
    ],
    tags: ["MLOps", "Python", "FastAPI", "Docker", "Redis", "SciPy"],
    dataset: "Synthetic Streaming Tabular & Feature Vectors",
    paperOrRef: "Concept Drift & Statistical Anomaly Detection in Production ML",
    codeSnippet: `from scipy.stats import ks_2samp
import numpy as np

class DriftDetector:
    def __init__(self, baseline_distribution: np.ndarray, alpha: float = 0.05):
        self.baseline = baseline_distribution
        self.alpha = alpha

    def check_feature_drift(self, incoming_batch: np.ndarray):
        statistic, p_value = ks_2samp(self.baseline, incoming_batch)
        drift_detected = bool(p_value < self.alpha)
        return {
            "drift_detected": drift_detected,
            "ks_statistic": round(float(statistic), 4),
            "p_value": float(p_value),
            "confidence": round((1.0 - p_value) * 100, 2)
        }`,
    highlights: [
      "Automated continuous detection of covariate shift and concept drift in production pipelines.",
      "Sub-5ms evaluation latency using vectorized NumPy matrix computations.",
      "Dockerized microservice with health checks and zero-downtime hot-reload of baseline distributions."
    ],
    liveDemoUrl: "#interactive-lab",
    githubUrl: "https://github.com/mdzain/synapse-drift-monitor"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Foundations & Mathematics",
    description: "Core academic mathematical principles supporting machine learning algorithms.",
    skills: [
      { name: "Linear Algebra", context: "Eigenvalues, SVD, Matrix Decompositions, Vector Spaces", level: "Advanced" },
      { name: "Multivariate Calculus", context: "Gradient Descent, Jacobian/Hessian, Backpropagation", level: "Advanced" },
      { name: "Probability & Statistics", context: "Bayesian Inference, Hypothesis Testing, Random Variables", level: "Advanced" },
      { name: "Data Structures & Algorithms", context: "Trees, Graphs, Dynamic Programming, Complexity Analysis", level: "Advanced" },
      { name: "Discrete Mathematics", context: "Set Theory, Combinatorics, Graph Theory", level: "Proficient" }
    ]
  },
  {
    title: "Deep Learning & Neural Architectures",
    description: "Design, training, and optimization of deep learning models.",
    skills: [
      { name: "PyTorch", context: "Custom autograd functions, multi-GPU training, TorchScript", level: "Advanced" },
      { name: "TensorFlow & Keras", context: "Graph execution, tf.data pipelines, Model subclassing", level: "Proficient" },
      { name: "Hugging Face Transformers", context: "Fine-tuning ViTs, BERT, RoBERTa, LoRA/PEFT adapters", level: "Advanced" },
      { name: "Model Quantization & ONNX", context: "INT8/FP16 post-training quantization, TensorRT export", level: "Advanced" },
      { name: "Scikit-Learn", context: "Ensemble trees, SVMs, dimensionality reduction (PCA, t-SNE)", level: "Advanced" }
    ]
  },
  {
    title: "Computer Vision & Audio Intelligence",
    description: "Visual computing, spatial geometry, and signal processing.",
    skills: [
      { name: "OpenCV", context: "Spatial filtering, contour extraction, homography, camera calibration", level: "Advanced" },
      { name: "YOLO (v8 / v9)", context: "Object detection, oriented bounding boxes, anchor optimization", level: "Advanced" },
      { name: "Semantic & Instance Segmentation", context: "Mask R-CNN, UNet, BiSeNet architectures", level: "Proficient" },
      { name: "Audio Signal Processing", context: "Librosa, Mel-Spectrograms, STFT, Cepstral analysis", level: "Proficient" },
      { name: "Albumentations", context: "Complex spatial and photometric data augmentation", level: "Advanced" }
    ]
  },
  {
    title: "NLP, LLMs & Retrieval Systems",
    description: "Modern natural language processing and agentic search architectures.",
    skills: [
      { name: "Retrieval-Augmented Generation (RAG)", context: "Hybrid BM25 + dense retrieval, recursive chunking", level: "Advanced" },
      { name: "Vector Databases", context: "ChromaDB, Milvus, FAISS indexing (HNSW, IVF-PQ)", level: "Advanced" },
      { name: "Google Gemini SDK", context: "Multimodal prompting, structured output parsing, embeddings", level: "Advanced" },
      { name: "Cross-Encoder Re-Ranking", context: "Contextual re-ranking of retrieved candidate documents", level: "Proficient" },
      { name: "Tokenizer & Embedding Optimization", context: "Subword BPE, sentence embeddings, cosine distance", level: "Advanced" }
    ]
  },
  {
    title: "Software Engineering & MLOps",
    description: "Production software engineering, APIs, and cloud infrastructure.",
    skills: [
      { name: "Python 3.11+", context: "AsyncIO, typing, metaclasses, NumPy, Pandas, Polars", level: "Advanced" },
      { name: "TypeScript & React", context: "Modern hooks, Tailwind CSS, frontend architecture", level: "Advanced" },
      { name: "FastAPI", context: "High-concurrency async endpoints, Pydantic validation", level: "Advanced" },
      { name: "Docker & Containerization", context: "Multi-stage builds, GPU container orchestration", level: "Proficient" },
      { name: "Git & Version Control", context: "Feature branching, CI/CD actions, semantic releases", level: "Advanced" },
      { name: "Linux & Bash", context: "Shell scripting, server maintenance, CUDA environment setup", level: "Advanced" }
    ]
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    period: "2023 — 2027 (Present)",
    title: "B.Tech in Computer Science & Engineering (AI & ML)",
    organization: "School of Computing & Engineering",
    location: "Hyderabad, India",
    description: "Pursuing four-year undergraduate curriculum specializing in Artificial Intelligence and Machine Learning. Cumulative GPA: 9.24 / 10.0.",
    bulletPoints: [
      "Ranked in top 5% of department cohort with academic distinction.",
      "Completed rigorous coursework: Advanced Linear Algebra, Algorithms & Complexity, Probability & Statistical Inference, Deep Neural Networks, Operating Systems, Relational Database Systems.",
      "Recipient of Academic Excellence Merit Recognition for consecutive semesters."
    ],
    type: "education"
  },
  {
    period: "2024 — Present",
    title: "Undergraduate Research Assistant",
    organization: "Autonomous Vision & Systems Lab",
    location: "Campus Research Facility",
    description: "Working under faculty mentorship investigating low-latency edge computer vision architectures for micro-unmanned aerial vehicles (UAVs).",
    bulletPoints: [
      "Engineered lightweight convolutional backbones cutting inference compute by 38% compared to standard MobileNetV3 baselines.",
      "Conducted comprehensive benchmarking of INT8 TensorRT quantization against raw FP32 PyTorch models on Jetson platforms.",
      "Drafting co-authored research paper on dual-path real-time aerial obstacle identification."
    ],
    type: "research"
  },
  {
    period: "2024",
    title: "Technical Lead & Student Mentor",
    organization: "Developer Students & AI Club",
    location: "University Campus",
    description: "Organized hands-on technical bootcamps, workshops, and mentored first-year students in Python and machine learning fundamentals.",
    bulletPoints: [
      "Delivered a 3-part interactive workshop on 'Building Your First Neural Network with PyTorch' for 120+ student attendees.",
      "Mentored 6 junior hackathon teams, resulting in 2 teams securing finalist positions.",
      "Maintained the club's open-source GitHub organization and review standards."
    ],
    type: "leadership"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Deep Learning Specialization (5 Courses)",
    issuer: "DeepLearning.AI & Coursera (Andrew Ng)",
    year: "2024",
    skills: "Neural Networks, Hyperparameter Tuning, CNNs, Sequence Models, Attention Mechanisms"
  },
  {
    title: "CS50's Introduction to Artificial Intelligence with Python",
    issuer: "Harvard University Online",
    year: "2024",
    skills: "Search Algorithms, Knowledge Graphs, Bayesian Networks, Reinforcement Learning, NLP"
  },
  {
    title: "Google Cloud Computing Foundations: Machine Learning & Infrastructure",
    issuer: "Google Cloud Skills Boost",
    year: "2024",
    skills: "Vertex AI, Cloud Storage, BigQuery ML, Model Deployment Pipelines"
  },
  {
    title: "1st Runner-Up · Smart Campus National Hackathon 2024",
    issuer: "National Engineering Council",
    year: "2024",
    skills: "Edge AI Prototype, Computer Vision, Rapid System Architecture, Presentation"
  }
];
