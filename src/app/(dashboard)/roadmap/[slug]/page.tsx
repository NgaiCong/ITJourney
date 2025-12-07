"use client";

import { useEffect, useState } from "react";
import { Stage } from "@/types/roadmap";
import MonthAccordion from "@/components/roadmap/MonthAccordion";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function StageDetailPage() {
  const params = useParams();
  const slug = params?.slug as string; // e.g., "stage-1" or "stage-cluid"
  
  // Extract ID from slug if needed, or just pass slug to API
  // Assuming API accepts ID, we might need to parse "stage-{id}"
  const stageId = slug?.replace('stage-', '');

  const [stage, setStage] = useState<Stage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stageId) return;

    const fetchStage = async () => {
      try {
        const res = await fetch(`/api/roadmap/stage/${stageId}`);
        if (res.ok) {
          const data = await res.json();
          setStage(data);
        }
      } catch (error) {
        console.error("Failed to fetch stage", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStage();
  }, [stageId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!stage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-gray-800">Không tìm thấy nội dung</h2>
        <Link href="/roadmap" className="text-blue-600 hover:underline mt-4">
          Quay lại lộ trình
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/roadmap" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại lộ trình
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
              Stage {stage.order}
            </span>
            <span className="text-gray-500 font-medium">{stage.progress}% hoàn thành</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{stage.title}</h1>
          <p className="text-gray-600">{stage.description}</p>
          
          <div className="w-full bg-gray-100 rounded-full h-2 mt-6">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stage.progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800">Nội dung học tập</h2>
          {stage.months?.map((month, index) => (
            <MonthAccordion key={month.id} month={month} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
