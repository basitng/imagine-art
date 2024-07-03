"use client";
import Form from "@/components/form";
import PhotoBooth from "@/components/photo-booth";
import NavBar from "@/components/sections/navbar";
import { Twitter } from "lucide-react";
import React from "react";

type UserInfo = {
  id: string;
  name: string;
  email?: string;
  imageUrl?: string;
} | null;

export default function HomeLayout({ userInfo }: { userInfo: UserInfo }) {
  const [image, setImage] = React.useState("");
  const [generate, setGenerate] = React.useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-stone-50 to-indigo-100 flex flex-col">
      <NavBar userInfo={userInfo} />
      <main className="flex-grow flex flex-col items-center justify-center mt-32 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto text-center">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://x.com/ajaga_abdbasit/status/1749806783160533204?s=20"
            className="inline-flex items-center justify-center space-x-2 rounded-full
                    bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200 mb-8"
          >
            <Twitter className="w-5 h-5 text-[#1d9bf0]" />
            <p className="text-sm font-semibold text-[#1d9bf0]">
              Introducing jade.lol
            </p>
          </a>

          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-lg w-full">
              <h1 className="md:text-6xl text-3xl font-display text-transparent bg-gradient-to-br from-black to-stone-500 bg-clip-text font-bold tracking-[-0.02em]">
                Anime Yourself
              </h1>
              <p className="mt-6 text-center text-gray-500 [text-wrap:balance] md:text-xl max-w-2xl mx-auto">
                Transform your photos to Anime art with one click. Powered by{" "}
                <a
                  href="https://app.owlai.art"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black underline-offset-4 hover:underline"
                >
                  OwlAI
                </a>
                &nbsp; and &nbsp;
                <a
                  href="https://replicate.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black underline-offset-4 hover:underline"
                >
                  Replicate
                </a>
                .
              </p>
            </div>

            <Form setGenerate={setGenerate} setImage={setImage} />

            <PhotoBooth
              image={
                image ||
                "https://replicate.delivery/pbxt/Iwojf52KreuubUk1IjkyBfCB63c14BVvE9w2Xx2d2Gp5Ue7IB/out-0.png"
              }
              loading={generate}
            />
          </div>
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
