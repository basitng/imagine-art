import React, { useEffect } from "react";

// @ts-ignore
import promptmaker from "promptmaker";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LoadingCircle } from "./icons";
import { SendHorizonal } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface FormProps {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setGenerate: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Form({ setImage, setGenerate }: FormProps) {
  const [placeholder, setPlaceholder] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    textareaRef.current?.focus();
    const value = promptmaker();
    setPlaceholder(value);
    axios.get("/api/clerk").then(({ data }) => setUser(data));
  }, []);

  const handleGeneration = async () => {
    setLoading(true);
    setGenerate(true);
    axios
      .post("/api/generate", { prompt })
      .then(({ data }) => {
        console.log(data);
        setImage(data[0]);
        toast.success("Image generated successfully");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => {
        setLoading(false);
        setGenerate(false);
      });
  };
  return (
    <div className="max-w-xl w-full mt-5 p-2 shadow-md flex items-center justify-center bg-white rounded-lg border border-gray-200">
      <Textarea
        ref={textareaRef}
        placeholder={placeholder}
        disabled={!user}
        className="
        md:min-h-[45px] min-h-[60px] text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus:right-0 border-none focus:outline-none
        "
        value={prompt}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setPrompt(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Tab" && e.currentTarget.value === "") {
            setPrompt(placeholder);
          }
        }}
        autoFocus
        autoComplete="off"
      />
      <Button onClick={handleGeneration} className="w-12 h-8" variant={"ghost"}>
        {loading ? (
          <LoadingCircle />
        ) : (
          <SendHorizonal className="w-5 h-5 text-gray-400" />
        )}
      </Button>
    </div>
  );
}
