"use client";

import { useEffect, useState } from "react";
import { Stage } from "@/types/roadmap";
import StageCard from "@/components/roadmap/StageCard";
import { Loader2 } from "lucide-react";

export default function RoadmapPage() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await fetch("/api/roadmap");
        if (res.ok) {
          const data = await res.json();
          setStages(data);
        }
      } catch (error) {
        console.error("Failed to fetch roadmap", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lộ trình học tập</h1>
          <p className="text-gray-500 mt-2">Hành trình từ Zero đến Hero của bạn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Connecting Line (Visual only, simplified) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 z-0" />

          {stages.map((stage, index) => (
            <div key={stage.id} className={`relative z-10 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12 md:mt-24'}`}>
              <StageCard stage={stage} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
