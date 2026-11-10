"use client";

import * as React from "react";
import Image from "next/image";
import { CameraAddOutlineIcon, TrashBinMinimalisticOutlineIcon } from "@solar-icons/react";
import { FieldError } from "@/components/ui/field";
import { PHOTO_RULES } from "@/lib/validation/quote";
import { cn } from "@/lib/utils";

export type PickedPhoto = { id: string; file: File; preview: string };

const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export function PhotoPicker({ photos, onChange }: { photos: PickedPhoto[]; onChange: (next: PickedPhoto[]) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [problems, setProblems] = React.useState<string[]>([]);
  const [dragging, setDragging] = React.useState(false);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...photos];
    const issues: string[] = [];
    for (const file of Array.from(list)) {
      const typeOk = (PHOTO_RULES.mimeTypes as readonly string[]).includes(file.type) || /\.(heic|heif)$/i.test(file.name);
      if (!typeOk) {
        issues.push(`${file.name} isn't a photo we can accept. Use JPG, PNG, WebP or HEIC.`);
        continue;
      }
      if (file.size > PHOTO_RULES.maxBytes) {
        issues.push(`${file.name} is ${mb(file.size)}. Each photo must be ${mb(PHOTO_RULES.maxBytes)} or smaller.`);
        continue;
      }
      if (next.length >= PHOTO_RULES.maxFiles) {
        issues.push(`You can add up to ${PHOTO_RULES.maxFiles} photos. ${file.name} wasn't added.`);
        continue;
      }
      next.push({ id: crypto.randomUUID(), file, preview: URL.createObjectURL(file) });
    }
    setProblems(issues);
    onChange(next);
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (id: string) => {
    const photo = photos.find((p) => p.id === id);
    if (photo) URL.revokeObjectURL(photo.preview);
    onChange(photos.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-5">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex flex-col items-center rounded-[1.75rem] border-2 border-dashed px-6 py-10 text-center transition-colors",
          dragging ? "border-green bg-mint" : "border-navy/20 bg-paper",
        )}
      >
        <CameraAddOutlineIcon className="size-10 text-green" aria-hidden />
        <p className="mt-4 font-semibold text-navy">Add photos of your garden</p>
        <p id="photos-hint" className="mt-1 max-w-sm text-sm text-muted-strong">
          Up to {PHOTO_RULES.maxFiles} photos, {mb(PHOTO_RULES.maxBytes)} each. JPG, PNG, WebP or HEIC. Photos from your phone
          are perfect.
        </p>
        <label
          htmlFor="photos"
          className="mt-6 inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-navy px-6 font-semibold text-white transition-[background-color,transform] hover:bg-navy-900 active:scale-[0.97] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-green"
        >
          Choose photos
          <input
            ref={inputRef}
            id="photos"
            type="file"
            multiple
            accept={[...PHOTO_RULES.mimeTypes, ".heic", ".heif"].join(",")}
            aria-describedby="photos-hint photos-error"
            className="sr-only"
            onChange={(e) => addFiles(e.target.files)}
          />
        </label>
        <p className="mt-3 text-sm text-muted">or drag and drop them here</p>
      </div>

      <FieldError id="photos-error" message={problems.length ? problems.join(" ") : undefined} />

      {photos.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-semibold text-navy" aria-live="polite">
            {photos.length} of {PHOTO_RULES.maxFiles} photos added
          </p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {photos.map((p, i) => (
              <li key={p.id} className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-mint">
                {/* HEIC previews don't render in most browsers — show the file name instead. */}
                {/\.(heic|heif)$/i.test(p.file.name) || p.file.type.includes("heic") ? (
                  <span className="grid h-full place-items-center p-3 text-center text-xs break-all text-muted-strong">{p.file.name}</span>
                ) : (
                  <Image src={p.preview} alt={`Photo ${i + 1}: ${p.file.name}`} fill unoptimized className="object-cover" />
                )}
                <button
                  type="button"
                  onClick={() => remove(p.id)}
                  className="absolute top-2 right-2 grid size-10 cursor-pointer place-items-center rounded-full bg-white/95 text-error transition-transform active:scale-95"
                  aria-label={`Remove photo ${i + 1} (${p.file.name})`}
                >
                  <TrashBinMinimalisticOutlineIcon className="size-5" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
