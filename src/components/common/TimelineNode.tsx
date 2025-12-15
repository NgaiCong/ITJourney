
"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ExternalLink, BookOpen, Terminal, Cpu, Video, Code, Globe, FileText, Brain, Target, CheckCircle2 } from "lucide-react";


interface Resource {
  type: 'Video' | 'Docs' | 'Practice' | 'Tool' | 'Book' | 'Mental' | 'Lang' | 'Repo' | string;
  name: string;
  note?: string;
  link?: string;
  features?: string[];
  usage?: string;
}

interface PhaseData {
  id: string;
  phase: string;
  months: string;
  title: string;
  subtitle: string;
  tagline: string;
  detailedDescription: string;
  color: string;
  duration: string;
  keyAction: string;
  challenge: string;
  keywords: string[];
  milestones: string[];
  resources: Resource[];
}

import { SpotlightCard } from "@/components/common/ui/SpotlightCard";


function getResourceIcon(type: Resource["type"]) {
  switch (type) {
    case "Video": return <Video className="w-5 h-5" />;
    case "Docs": return <FileText className="w-5 h-5" />;
    case "Practice": return <Code className="w-5 h-5" />;
    case "Tool": return <Cpu className="w-5 h-5" />;
    case "Book": return <BookOpen className="w-5 h-5" />;
    case "Mental": return <Brain className="w-5 h-5" />;
    case "Lang": return <Globe className="w-5 h-5" />;
    case "Repo": return <Terminal className="w-5 h-5" />;
    default: return <BookOpen className="w-5 h-5" />;
  }
}



function ResourceCard({ resource, index, phaseColor, onSelect }: { resource: Resource; index: number; phaseColor: string; onSelect: (r: Resource) => void }) {
  const isTool = resource.type === 'Tool';

  const handleClick = (e: React.MouseEvent) => {
    if (isTool) {
      e.preventDefault();
      onSelect(resource);
    }
  };

  return (
    <motion.a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col p-6 bg-white/3 hover:bg-white/8 border border-white/5 hover:border-white/20 rounded-2xl transition-all duration-500 overflow-hidden cursor-pointer"
      style={{
        boxShadow: `0 0 0 0 ${phaseColor}00`,
      }}
      whileHover={{
        boxShadow: `0 0 30px 0 ${phaseColor}20`,
        y: -5,
      }}
    >

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${phaseColor}10 0%, transparent 50%)`,
        }}
      />


      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div
            className="p-3 rounded-xl bg-black/50 transition-colors duration-300"
            style={{ color: phaseColor }}
          >
            {getResourceIcon(resource.type)}
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border"
              style={{
                color: phaseColor,
                borderColor: `${phaseColor}40`,
                backgroundColor: `${phaseColor}10`,
              }}
            >
              {resource.type}
            </span>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
          </div>
        </div>
        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
          {resource.name}
        </h4>
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
          {resource.note}
        </p>
      </div>


      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-12" />
    </motion.a>
  );
}


function ToolModal({ tool, onClose, color }: { tool: Resource; onClose: () => void; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-neutral-900 border border-white/10 p-8 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden"
      >

        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none"
          style={{ backgroundColor: color }}
        />

        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors z-10">
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-xl bg-white/5 text-white border border-white/10">
              {getResourceIcon(tool.type)}
            </div>
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Công Cụ</span>
              <h3 className="text-2xl font-bold text-white mt-1">{tool.name}</h3>
            </div>
          </div>

          <div className="space-y-6">
            {tool.features && (
              <div>
                <h4 className="text-xs font-mono uppercase text-neutral-500 mb-3 tracking-widest">Tính Năng</h4>
                <ul className="space-y-3">
                  {tool.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tool.usage && (
              <div>
                <h4 className="text-xs font-mono uppercase text-neutral-500 mb-3 tracking-widest">Sử Dụng Để Làm Gì?</h4>
                <p className="text-neutral-300 text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                  {tool.usage}
                </p>
              </div>
            )}

            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 text-center rounded-xl font-bold text-black transition-all hover:scale-[1.02] hover:shadow-lg mt-8"
              style={{ backgroundColor: color, boxShadow: `0 0 20px -5px ${color}50` }}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Truy Cập / Tải Về</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


function MilestoneItem({ milestone, index, phaseColor }: { milestone: string; index: number; phaseColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      className="flex items-start gap-3 group"
    >
      <div
        className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${phaseColor}20`, color: phaseColor }}
      >
        <CheckCircle2 className="w-3 h-3" />
      </div>
      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
        {milestone}
      </p>
    </motion.div>
  );
}

export default function TimelineNode({ data }: { data: PhaseData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Resource | null>(null);
  const ref = useRef<HTMLDivElement>(null);


  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <>
      <motion.div
        ref={ref}
        id={data.id}
        style={{ y, opacity, scale }}
        className="w-full"
      >

        <div className="w-full">
          <div onClick={() => setIsOpen(true)} className="cursor-pointer">
            <SpotlightCard className="p-8 md:p-10 rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm hover:border-white/20 transition-colors group">

              <div
                className="absolute top-6 right-6 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest border bg-neutral-950/50 backdrop-blur-md z-20"
                style={{
                  borderColor: `${data.color}50`,
                  color: data.color,
                }}
              >
                {data.months}
              </div>


              <div className="relative z-10">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.3em] mb-2 block">
                  {data.phase}
                </span>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight text-white pr-24"
                >
                  {data.title}
                </h2>
                <p className="text-sm text-neutral-400 uppercase tracking-wider mb-4 font-medium">
                  {data.subtitle}
                </p>
                <p className="text-neutral-400 leading-relaxed mb-8 font-light text-base md:text-lg max-w-2xl">
                  {data.tagline}
                </p>


                <div className="flex flex-wrap gap-2 mb-8">
                  {data.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border bg-neutral-950/50 text-neutral-300 border-white/10"
                    >
                      {kw}
                    </span>
                  ))}
                </div>


                <div className="flex items-center gap-2 text-sm text-neutral-500 group-hover:text-white transition-colors">
                  <Target className="w-4 h-4" />
                  <span>Nhấn để xem chi tiết</span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>



      </motion.div>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
              onClick={() => setIsOpen(false)}
            />


            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl scrollbar-hide"
            >

              <div
                className="absolute top-0 left-0 right-0 h-64 opacity-30"
                style={{
                  background: `linear-gradient(180deg, ${data.color}40 0%, transparent 100%)`,
                }}
              />


              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all duration-300 hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative z-10 p-8 md:p-12">

                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest border"
                      style={{
                        borderColor: `${data.color}50`,
                        backgroundColor: `${data.color}10`,
                        color: data.color,
                      }}
                    >
                      {data.phase}
                    </span>
                    <span className="text-gray-500 text-sm">{data.duration}</span>
                  </div>

                  <h2
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
                    style={{ color: data.color }}
                  >
                    {data.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl">
                    {data.detailedDescription}
                  </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-2xl border border-white/10 bg-white/2"
                  >
                    <div className="flex items-center gap-3 mb-4" style={{ color: data.color }}>
                      <Target className="w-5 h-5" />
                      <span className="font-mono uppercase text-xs tracking-widest">Mục Tiêu Chính</span>
                    </div>
                    <p className="text-gray-200 text-lg">{data.keyAction}</p>
                  </motion.div>


                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5"
                  >
                    <div className="flex items-center gap-3 mb-4 text-yellow-400">
                      <Terminal className="w-5 h-5" />
                      <span className="font-mono uppercase text-xs tracking-widest">Thử Thách</span>
                    </div>
                    <p className="text-gray-200 italic text-lg">&ldquo;{data.challenge}&rdquo;</p>
                  </motion.div>
                </div>


                <div className="mb-12">
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                    <div className="w-8 h-px" style={{ backgroundColor: data.color }} />
                    Cột Mốc Hàng Tuần
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.milestones.map((milestone: string, i: number) => (
                      <MilestoneItem key={i} milestone={milestone} index={i} phaseColor={data.color} />
                    ))}
                  </div>
                </div>


                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                    <div className="w-8 h-px" style={{ backgroundColor: data.color }} />
                    Tài Liệu Chọn Lọc
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.resources.map((res: Resource, i: number) => (
                      <ResourceCard
                        key={i}
                        resource={res}
                        index={i}
                        phaseColor={data.color}
                        onSelect={(r) => setSelectedTool(r)}
                      />
                    ))}
                  </div>
                </div>


                <AnimatePresence>
                  {selectedTool && (
                    <ToolModal
                      tool={selectedTool}
                      onClose={() => setSelectedTool(null)}
                      color={data.color}
                    />
                  )}
                </AnimatePresence>


                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 pt-8 border-t border-white/10 text-center"
                >
                  <p className="text-gray-500 text-sm mb-4">Sẵn sàng cho giai đoạn này?</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-8 py-3 rounded-full font-semibold text-black transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: data.color }}
                  >
                    Bắt Đầu {data.title}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}