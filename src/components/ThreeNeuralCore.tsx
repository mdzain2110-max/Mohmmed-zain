import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Eye } from 'lucide-react';

export const ThreeNeuralCore: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(true);
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Scene setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 460;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Group for all rotating neural components
    const neuralGroup = new THREE.Group();
    scene.add(neuralGroup);

    // 1. Procedural Neural Nodes (Fibonacci sphere distribution)
    const nodeCount = 72;
    const sphereRadius = 7.5;
    const nodePositions: THREE.Vector3[] = [];
    const phi = Math.PI * (Math.sqrt(5) - 1); // Golden ratio angle

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      nodePositions.push(new THREE.Vector3(x * sphereRadius, y * sphereRadius, z * sphereRadius));
    }

    // Node geometries with instancing
    const nodeGeometry = new THREE.SphereGeometry(0.18, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: false
    });
    const instancedNodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, nodeCount);

    const dummy = new THREE.Object3D();
    const colors = [0x60a5fa, 0x818cf8, 0x38bdf8, 0xa78bfa, 0x34d399];

    for (let i = 0; i < nodeCount; i++) {
      dummy.position.copy(nodePositions[i]);
      const s = 0.8 + Math.random() * 0.5;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      instancedNodes.setMatrixAt(i, dummy.matrix);
      instancedNodes.setColorAt(i, new THREE.Color(colors[i % colors.length]));
    }
    instancedNodes.instanceMatrix.needsUpdate = true;
    if (instancedNodes.instanceColor) instancedNodes.instanceColor.needsUpdate = true;
    neuralGroup.add(instancedNodes);

    // 2. Synaptic Connection Lines
    const lineIndices: number[] = [];
    const maxConnectionDist = 3.6;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < maxConnectionDist) {
          lineIndices.push(i, j);
        }
      }
    }

    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < lineIndices.length; i++) {
      linePoints.push(nodePositions[lineIndices[i]]);
    }

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending
    });
    const synapticLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    neuralGroup.add(synapticLines);

    // 3. Central Tensor Core / Latent Geometric Cage
    const icosahedronGeo = new THREE.IcosahedronGeometry(3.6, 1);
    const icosahedronMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const coreMesh = new THREE.Mesh(icosahedronGeo, icosahedronMat);
    neuralGroup.add(coreMesh);

    // Outer orbital rings
    const ringGeo1 = new THREE.TorusGeometry(9.2, 0.04, 8, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35
    });
    const orbitalRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitalRing1.rotation.x = Math.PI / 3;
    neuralGroup.add(orbitalRing1);

    const ringGeo2 = new THREE.TorusGeometry(8.4, 0.03, 8, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.25
    });
    const orbitalRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitalRing2.rotation.y = Math.PI / 4;
    orbitalRing2.rotation.z = Math.PI / 6;
    neuralGroup.add(orbitalRing2);

    // 4. Surrounding Latent Particle Cloud
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 9 + Math.random() * 8;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      particlePos[i] = r * Math.sin(ph) * Math.cos(th);
      particlePos[i + 1] = r * Math.sin(ph) * Math.sin(th);
      particlePos[i + 2] = r * Math.cos(ph);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.55
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    neuralGroup.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 2, 50);
    pointLight.position.set(5, 5, 10);
    scene.add(pointLight);

    // Mouse tracking with smooth spring damping
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseX = x;
      mouseY = y;
      targetRotationY = x * 0.75;
      targetRotationX = -y * 0.65;
    };

    container.addEventListener('mousemove', handlePointerMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Continuous autonomous rotation
      neuralGroup.rotation.y += 0.0035;

      // Mouse damping interpolation
      neuralGroup.rotation.y += (targetRotationY - neuralGroup.rotation.y * 0.1) * 0.04;
      neuralGroup.rotation.x += (targetRotationX - neuralGroup.rotation.x * 0.1) * 0.04;

      // Inner core pulse
      const pulse = 1 + Math.sin(elapsed * 2.2) * 0.08;
      coreMesh.scale.set(pulse, pulse, pulse);
      coreMesh.rotation.x += 0.005;
      coreMesh.rotation.y += 0.008;

      orbitalRing1.rotation.z += 0.006;
      orbitalRing2.rotation.x -= 0.005;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      renderer.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      icosahedronGeo.dispose();
      icosahedronMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [pulseCount]);

  return (
    <div className="relative w-full h-[420px] lg:h-[480px] rounded-2xl bg-slate-900/40 border border-slate-800/80 overflow-hidden flex items-center justify-center group shadow-2xl">
      {/* Three.js canvas mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Clean HUD overlays (Zero-Pill, Anti-Slop, Non-occlusive) */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs font-mono text-slate-400">
        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
        <span className="font-semibold text-slate-300">Latent Space Manifold</span>
        <span aria-hidden="true" className="text-slate-600">·</span>
        <span>Interactive 3D WebGL</span>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setPulseCount(prev => prev + 1)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-md transition-colors"
          title="Re-initialize neural cluster"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Regenerate Cluster</span>
        </button>
      </div>

      <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800/60 pt-3">
        <div className="flex items-center gap-3">
          <span>Nodes: <strong className="text-slate-200 tabular-nums">72</strong></span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Synapses: <strong className="text-slate-200 tabular-nums">148</strong></span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Precision: <strong className="text-cyan-400">FP32</strong></span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-slate-500">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>Move cursor to orbit</span>
        </div>
      </div>
    </div>
  );
};
