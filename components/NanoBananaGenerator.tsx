'use client';

import React, { useCallback, useState } from 'react';
import {
  Image as ImageIcon,
  FileText,
  Palette,
  Upload,
  Link2,
  Sparkles,
  Wand2,
} from 'lucide-react';

type Mode = 'image-to-image' | 'text-to-image';
type Model = 'nano-banana-pro' | 'nano-banana';
type Resolution = '1k' | '2k' | '4k';
type AspectRatio =
  | 'auto'
  | '1:1'
  | '9:16'
  | '16:9'
  | '3:4'
  | '4:3'
  | '3:2'
  | '2:3'
  | '5:4'
  | '4:5'
  | '21:9';

interface GeneratedImage {
  url: string; // data url
}

const ASPECT_OPTIONS: { label: string; value: AspectRatio; box: string }[] = [
  { label: 'Auto', value: 'auto', box: 'w-4 h-4' },
  { label: '1:1', value: '1:1', box: 'w-4 h-4' },
  { label: '9:16', value: '9:16', box: 'w-3 h-5' },
  { label: '16:9', value: '16:9', box: 'w-5 h-3' },
  { label: '3:4', value: '3:4', box: 'w-3 h-4' },
  { label: '4:3', value: '4:3', box: 'w-4 h-3' },
  { label: '3:2', value: '3:2', box: 'w-4 h-2.5' },
  { label: '2:3', value: '2:3', box: 'w-2.5 h-4' },
  { label: '5:4', value: '5:4', box: 'w-4 h-5' },
  { label: '4:5', value: '4:5', box: 'w-4 h-5' },
  { label: '21:9', value: '21:9', box: 'w-6 h-2.5' },
];

export default function NanoBananaGenerator() {
  const [mode, setMode] = useState<Mode>('image-to-image');
  const [model, setModel] = useState<Model>('nano-banana-pro');
  const [resolution, setResolution] = useState<Resolution>('2k');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('auto');
  const [prompt, setPrompt] = useState('');
  const [promptLength, setPromptLength] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<GeneratedImage[]>([]);

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const list = Array.from(files).slice(0, 8); // 最多 8 张
    setImages(list);
    setImageUrl('');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files);
  };

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    setPromptLength(value.length);
  };

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('请先填写 Prompt。');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // 把本地图片转成 base64
      const base64Images: { data: string; mimeType: string }[] = [];
      for (const file of images) {
        const buf = await file.arrayBuffer();
        const base64 = Buffer.from(buf).toString('base64');
        base64Images.push({
          data: base64,
          mimeType: file.type || 'image/png',
        });
      }

      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          model,
          resolution,
          aspectRatio,
          prompt,
          base64Images,
          imageUrl: imageUrl || undefined,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || '生成失败');
      }

      const data: { images: string[] } = await res.json();
      setResults(data.images.map((url) => ({ url })));
    } catch (e: any) {
      console.error(e);
      setError(e.message ?? '生成失败，请稍后重试。');
    } finally {
      setIsGenerating(false);
    }
  }, [mode, model, resolution, aspectRatio, prompt, images, imageUrl]);

  return (
    <section className="w-full py-10 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：表单 */}
        <div id="generation-form" className="lg:col-span-1">
          <div className="rounded-xl text-slate-900 dark:text-slate-50 shadow-xl border-0 bg-white dark:bg-slate-900/80 backdrop-blur-sm h-full flex flex-col">
            {/* 标题 */}
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <div className="font-semibold leading-none tracking-tight flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg">Create with Nano Banana</span>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-6 flex-1 flex flex-col">
              <div className="flex-1 space-y-6">
                {/* Tabs */}
                <div>
                  <div
                    role="tablist"
                    className="items-center justify-center text-slate-500 grid w-full grid-cols-2 h-auto p-1 bg-slate-100/70 dark:bg-slate-800/70 rounded-xl border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mode === 'image-to-image'}
                      onClick={() => setMode('image-to-image')}
                      className={`whitespace-nowrap rounded-md text-sm flex items-center justify-center gap-2 py-3 px-4 font-medium transition-all duration-200 ${
                        mode === 'image-to-image'
                          ? 'bg-white text-blue-600 dark:bg-slate-900 dark:text-blue-400 shadow-sm'
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <ImageIcon className="w-4 h-4" />
                      Image to Image
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mode === 'text-to-image'}
                      onClick={() => setMode('text-to-image')}
                      className={`whitespace-nowrap rounded-md text-sm flex items-center justify-center gap-2 py-3 px-4 font-medium transition-all duration-200 ${
                        mode === 'text-to-image'
                          ? 'bg-white text-purple-600 dark:bg-slate-900 dark:text-purple-400 shadow-sm'
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      Text to Image
                    </button>
                  </div>
                </div>

                {/* Model 选择 */}
                <div className="space-y-4 mt-4">
                  <label className="text-base font-semibold flex items-center gap-2">
                    Model
                  </label>
                  <div role="radiogroup" className="grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      onClick={() => setModel('nano-banana-pro')}
                      className={`relative flex flex-col space-y-2 border-2 p-3 rounded-xl transition-all cursor-pointer ${
                        model === 'nano-banana-pro'
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className={`aspect-square h-4 w-4 rounded-full border shadow flex items-center justify-center ${
                            model === 'nano-banana-pro'
                              ? 'border-purple-600'
                              : 'border-slate-400'
                          }`}
                        >
                          {model === 'nano-banana-pro' && (
                            <span className="h-3 w-3 rounded-full bg-purple-600" />
                          )}
                        </span>
                        <div className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-base">
                              Nano Banana Pro
                            </span>
                            <div className="flex gap-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                                High Quality
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                                20 Credits
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setModel('nano-banana')}
                      className={`relative flex flex-col space-y-2 border-2 p-3 rounded-xl transition-all cursor-pointer ${
                        model === 'nano-banana'
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className={`aspect-square h-4 w-4 rounded-full border shadow flex items-center justify-center ${
                            model === 'nano-banana'
                              ? 'border-purple-600'
                              : 'border-slate-400'
                          }`}
                        >
                          {model === 'nano-banana' && (
                            <span className="h-3 w-3 rounded-full bg-purple-600" />
                          )}
                        </span>
                        <div className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-base">
                              Nano Banana
                            </span>
                            <div className="flex gap-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
                                10 Credits
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Image to Image 区块 */}
                {mode === 'image-to-image' && (
                  <div className="space-y-4 mt-6">
                    <label className="text-base font-semibold flex items-center gap-2">
                      Image
                      <span className="text-xs font-normal text-slate-500">
                        (最多 8 张)
                      </span>
                    </label>

                    <div className="space-y-4">
                      {/* Upload / URL 切换按钮（这里只做 UI，逻辑简单处理） */}
                      <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-2 rounded-md px-3 h-8 text-xs font-medium bg-blue-500 dark:bg-blue-600 text-white shadow-sm hover:bg-blue-600 dark:hover:bg-blue-700 transition-all"
                          onClick={() => setImageUrl('')}
                        >
                          <Upload className="w-3 h-3 mr-1.5 text-white" />
                          Upload
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-2 rounded-md px-3 h-8 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 transition-all"
                          onClick={() => {
                            setImages([]);
                          }}
                        >
                          <Link2 className="w-3 h-3 mr-1.5 text-slate-500 dark:text-slate-400" />
                          URL
                        </button>
                      </div>

                      {/* Dropzone */}
                      {images.length === 0 ? (
                        <div
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleDrop}
                          className="relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ease-in-out border-slate-300/60 hover:border-blue-400 hover:bg-blue-50/60 dark:border-slate-600 dark:hover:bg-blue-950/20"
                        >
                          <input
                            accept="image/*,.png,.jpg,.jpeg,.webp"
                            multiple
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => handleFileChange(e.target.files)}
                          />
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                              <Upload className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                点击上传或拖拽图片到此处
                              </p>
                              <p className="text-xs text-slate-500">
                                PNG, JPG, JPEG, WEBP（最多 8 张）
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {images.map((file, idx) => (
                              <div
                                key={idx}
                                className="w-20 h-20 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-500 relative overflow-hidden"
                              >
                                <span className="line-clamp-3 px-1 text-center">
                                  {file.name}
                                </span>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => setImages([])}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            清空图片
                          </button>
                        </div>
                      )}

                      {/* URL 输入（简单版本） */}
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="或粘贴图片 URL（可选）"
                        className="mt-2 w-full rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500"
                      />
                    </div>
                  </div>
                )}

                {/* Prompt */}
                <div className="space-y-4 mt-6">
                  <label
                    htmlFor="prompt"
                    className="text-base font-semibold flex items-center gap-2"
                  >
                    Prompt
                  </label>
                  <div className="relative">
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => handlePromptChange(e.target.value)}
                      maxLength={5000}
                      placeholder="详细描述你想要生成的图片风格、主体、光影、构图等..."
                      className="flex w-full rounded-md border-2 border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 md:text-sm min-h-[150px] max-h-[200px] resize-none text-sm transition-colors overflow-y-auto pb-8"
                    />
                  </div>
                  <div className="flex justify-end items-center text-xs text-slate-500">
                    {promptLength}/5000
                  </div>
                </div>

                {/* Resolution */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    Resolution
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['1k', '2k', '4k'] as Resolution[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setResolution(r)}
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium px-4 py-2 h-12 shadow transition-colors ${
                          resolution === r
                            ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                            : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <span className="text-sm font-semibold uppercase">
                          {r}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-4">
                  <label className="text-sm font-medium flex items-center gap-2">
                    Aspect Ratio
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {ASPECT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setAspectRatio(opt.value)}
                        className={`whitespace-nowrap rounded-md text-xs font-medium transition-colors px-3 py-2 h-16 flex flex-col items-center justify-center gap-2 shadow ${
                          aspectRatio === opt.value
                            ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                            : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div
                          className={`${opt.box} border border-current rounded-[3px]`}
                        />
                        <span className="font-semibold">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 错误提示 */}
              {error && (
                <div className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                  {error}
                </div>
              )}

              {/* Generate 按钮 */}
              <div className="mt-auto">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-md w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：预览 */}
        <div className="lg:col-span-1">
          <div className="rounded-xl text-slate-900 dark:text-slate-50 shadow-xl border-0 bg-white dark:bg-slate-900/80 backdrop-blur-sm h-full flex flex-col">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <div className="font-semibold leading-none tracking-tight flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <span>Powered by Nano Banana Pro</span>
              </div>
            </div>

            <div className="p-6 pt-0 h-[calc(100%-80px)] lg:h-[calc(100%-120px)]">
              <div className="h-full flex flex-col">
                {results.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center px-4">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mb-4">
                      <Wand2 className="h-10 w-10 lg:h-12 lg:w-12 text-blue-500 dark:text-blue-400" />
                    </div>
                    <p className="text-base lg:text-lg font-medium text-slate-700 dark:text-slate-200 mb-2">
                      Ready to Create
                    </p>
                    <p className="text-sm lg:text-base text-slate-500 max-w-xs lg:max-w-md">
                      上传图片并填写 Prompt，点击 Generate 开始创作。
                    </p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.url}
                            alt={`Generated ${idx}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      提示：生成结果由 Google AI Studio 提供，你可以在上方修改
                      Prompt 或参数重新生成。
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
