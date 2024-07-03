import { nanoid } from "@/lib/utils";
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

interface bodyProps {
  prompt: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as bodyProps;
    const prompt = body.prompt;
    const output: any = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          width: 768,
          height: 768,
          prompt: prompt,
          refine: "expert_ensemble_refiner",
          scheduler: "K_EULER",
          lora_scale: 0.6,
          num_outputs: 1,
          guidance_scale: 7.5,
          apply_watermark: false,
          high_noise_frac: 0.8,
          negative_prompt: "",
          prompt_strength: 0.8,
          num_inference_steps: 25,
        },
      }
    );

    const id = nanoid();
    await kv.hset(id, { image: output[0] });

    return NextResponse.json(output);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET(request: Request) {
  const count = await kv.dbsize();

  return NextResponse.json(count);
}
