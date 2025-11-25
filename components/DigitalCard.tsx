import React, { useState, useRef } from 'react';
import { 
  Film, Music, Globe, Cpu, Twitter, Headphones, Video, Code, 
  ExternalLink, Copy, Check, QrCode, Download, Loader2, Upload
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { PROFILE_DATA, STATS, COLLABORATIONS, SOCIAL_LINKS } from '../constants';
import { ProfileLink } from '../types';

const DigitalCard: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(PROFILE_DATA.avatar);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopyWX = () => {
    navigator.clipboard.writeText(PROFILE_DATA.contact.wx);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!cardRef.current || isDownloading) return;
    
    setIsDownloading(true);
    setShowQR(false); // Close QR if open to capture the main card

    try {
      // Wait a brief moment to ensure state updates are rendered (like closing QR)
      await new Promise(resolve => setTimeout(resolve, 100));

      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        backgroundColor: '#020617', // Force dark background (slate-950)
        cacheBust: true,
        pixelRatio: 2, // Better resolution
      });

      const link = document.createElement('a');
      link.download = `TianSuan_ShenSiTing_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to save image:', err);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'film': return <Film className="w-5 h-5" />;
      case 'music': return <Music className="w-5 h-5" />;
      case 'globe': return <Globe className="w-5 h-5" />;
      case 'cpu': return <Cpu className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'headphones': return <Headphones className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'code': return <Code className="w-5 h-5" />;
      default: return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto p-4 sm:p-8 perspective-1000">
      <div 
        ref={cardRef}
        className="relative bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]"
      >
        
        {/* Top Decorative Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-75"></div>

        {/* Header Section */}
        <div className="p-8 text-center relative z-10">
          
          {/* Avatar / Logo Section */}
          <div 
            className="w-32 h-32 mx-auto mb-6 relative group cursor-pointer"
            onClick={handleAvatarClick}
            title="Click to upload custom logo"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
            {/* Rotating Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-violet-500 rounded-2xl animate-spin-slow opacity-70 blur-md group-hover:blur-xl transition-all duration-500"></div>
            
            {/* The Image */}
            <img 
              src={avatarUrl} 
              alt="Logo" 
              crossOrigin="anonymous"
              className="relative w-full h-full object-cover rounded-2xl border-2 border-white/20 p-1 bg-black z-10 shadow-xl"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-20 backdrop-blur-sm border border-cyan-500/30">
              <Upload className="w-6 h-6 text-cyan-400 mb-1" />
              <span className="text-cyan-100 text-[10px] font-mono tracking-wider">CHANGE LOGO</span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-slate-400 mb-2 tracking-tight">
            {PROFILE_DATA.name}
          </h1>
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-1">{PROFILE_DATA.englishOrg}</p>
          <div className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs sm:text-sm font-medium mb-6">
            {PROFILE_DATA.role} · {PROFILE_DATA.title}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {STATS.map((stat, idx) => (
              <div key={idx} className="bg-slate-800/40 p-4 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all hover:bg-slate-800/60 group">
                <div className="flex items-center justify-center text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
                  {getIcon(stat.icon)}
                </div>
                <div className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {stat.value}<span className="text-cyan-500 text-lg">+</span>
                </div>
                <div className="text-xs text-slate-400">{stat.subValue}</div>
              </div>
            ))}
          </div>

          {/* Collaborations */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4">Core Modules</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {COLLABORATIONS.map((collab, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs sm:text-sm text-slate-300 border border-white/5 transition-colors cursor-default">
                  {collab}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
             <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4">Neural Network</h3>
             {SOCIAL_LINKS.map((link, idx) => (
               <a 
                 key={idx}
                 href={link.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 hover:bg-cyan-900/20 border border-white/5 hover:border-cyan-500/50 transition-all group"
               >
                 <div className="flex items-center gap-3">
                   <div className="text-slate-400 group-hover:text-cyan-400 transition-colors">
                     {getIcon(link.icon)}
                   </div>
                   <div className="text-left">
                     <div className="text-sm font-medium text-slate-200 group-hover:text-white">{link.label}</div>
                     <div className="text-xs text-slate-500 group-hover:text-cyan-400/70">{link.description}</div>
                   </div>
                 </div>
                 <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
               </a>
             ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-black/20 border-t border-white/5 grid grid-cols-3 gap-3" data-html2canvas-ignore="true">
          <button 
            onClick={() => setShowQR(!showQR)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors font-medium text-sm border border-white/5"
            title="Show WeChat QR"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">QR Code</span>
          </button>
          
          <button 
            onClick={handleCopyWX}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors font-medium text-sm border border-white/5"
            title="Copy WeChat ID"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy ID"}</span>
          </button>

          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-violet-600 text-white hover:opacity-90 transition-opacity font-medium text-sm shadow-lg shadow-cyan-900/20"
            title="Save Card as Image"
          >
            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span className="hidden sm:inline">{isDownloading ? "Saving" : "Save"}</span>
          </button>
        </div>

        {/* QR Modal Overlay */}
        {showQR && (
          <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8 animate-in fade-in duration-200">
             <div className="bg-white p-4 rounded-2xl shadow-2xl mb-6">
                <QRCodeSVG value={`weixin://dl/chat?${PROFILE_DATA.contact.wx}`} size={200} />
             </div>
             <p className="text-white font-mono mb-6">Scan to Connect on WeChat</p>
             <button 
               onClick={() => setShowQR(false)}
               className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 text-white transition-colors"
             >
               Close
             </button>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center text-slate-600 text-xs font-mono">
        <p>TianSuan AI Lab © {new Date().getFullYear()}</p>
        <p className="mt-1">Generated by Neural Interface</p>
      </div>
    </div>
  );
};

export default DigitalCard;