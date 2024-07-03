"use client";
import React from "react";
import NavBar from "@/components/sections/navbar";
import CommmunityImage from "../ui/communityImage";
import SavedImage from "../ui/savedImages";

type UserInfo = {
  id: string;
  name: string;
  email?: string;
  imageUrl?: string;
} | null;

interface savedImageItem {
  id: number;
  imageUrl: string;
  title: string;
  prompt: string;
  likes: number;
  downloads: number;
  creator: {
    name: string;
    avatar: string;
  };
}

// Updated mock data for community images
const mockSavedImages: savedImageItem[] = [
  {
    id: 1,
    imageUrl:
      "https://replicate.delivery/pbxt/Iwojf52KreuubUk1IjkyBfCB63c14BVvE9w2Xx2d2Gp5Ue7IB/out-0.png",
    title: "Futuristic Cityscape",
    prompt: "A futuristic cityscape with flying cars and neon lights",
    likes: 42,
    downloads: 15,
    creator: {
      name: "Alice",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alice",
    },
  },
  {
    id: 2,
    imageUrl:
      "https://replicate.delivery/pbxt/Iwojf52KreuubUk1IjkyBfCB63c14BVvE9w2Xx2d2Gp5Ue7IB/out-0.png",
    title: "Serene Japanese Garden",
    prompt: "A serene Japanese garden with cherry blossoms",
    likes: 28,
    downloads: 10,
    creator: {
      name: "Bob",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Bob",
    },
  },
  {
    id: 3,
    imageUrl:
      "https://replicate.delivery/pbxt/Iwojf52KreuubUk1IjkyBfCB63c14BVvE9w2Xx2d2Gp5Ue7IB/out-0.png",
    title: "Underwater Bioluminescence",
    prompt: "An underwater scene with bioluminescent creatures",
    likes: 35,
    downloads: 12,
    creator: {
      name: "Charlie",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Charlie",
    },
  },
];

export default function SavedImagesLayout({
  userInfo,
}: {
  userInfo: UserInfo;
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-stone-50 to-indigo-100 flex flex-col">
      <NavBar userInfo={userInfo} />
      <main className="flex-grow w-full max-w-screen-xl mx-auto flex flex-col items-start mt-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg mb-8">
          <h3 className="text-3xl font-display">Saved Images</h3>
          <p className="text-gray-500">
            Explore all of the images you've saved
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {mockSavedImages.map((item) => (
            <SavedImage key={item.id} item={item} />
          ))}
        </div>
      </main>
      <footer className="bg-white/10 backdrop-blur-md py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-indigo-900">
          <p>&copy; 2024 Jade.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
