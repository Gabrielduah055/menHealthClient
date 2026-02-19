"use client";

import { useState } from "react";

type Props = {
  slug: string;
  title: string;
};

type ShareTarget = {
  key: string;
  label: string;
  icon: string;
  getUrl: (shareUrl: string, title: string) => string | null;
};

const SHARE_TARGETS: ShareTarget[] = [
  {
    key: "facebook",
    label: "Share on Facebook",
    icon: "uil-facebook-f",
    getUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    key: "twitter",
    label: "Share on X (Twitter)",
    icon: "uil-twitter",
    getUrl: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    key: "linkedin",
    label: "Share on LinkedIn",
    icon: "uil-linkedin",
    getUrl: (url, title) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    key: "whatsapp",
    label: "Share on WhatsApp",
    icon: "uil-whatsapp",
    getUrl: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    key: "email",
    label: "Share via Email",
    icon: "uil-envelope",
    getUrl: (url, title) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`I thought you might find this interesting:\n\n${url}`)}`,
  },
  {
    key: "copy",
    label: "Copy link",
    icon: "uil-link",
    getUrl: () => null,
  },
];

export default function ShareButtons({ slug, title }: Props) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    const base =
      process.env.NEXT_PUBLIC_FRONTEND_URL ||
      (typeof window !== "undefined" ? window.location.origin : "");
    return `${base}/blog/${slug}`;
  };

  const handleShare = async (target: ShareTarget) => {
    const shareUrl = getShareUrl();

    if (target.key === "copy") {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        const el = document.createElement("input");
        el.value = shareUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
      return;
    }

    if (
      target.key === "facebook" ||
      target.key === "twitter" ||
      target.key === "linkedin" ||
      target.key === "whatsapp"
    ) {
      if (
        typeof navigator !== "undefined" &&
        typeof (navigator as any).share === "function"
      ) {
        try {
          await (navigator as any).share({ title, url: shareUrl });
          return;
        } catch {
          // fall through to platform-specific URL
        }
      }
    }

    const url = target.getUrl(shareUrl, title);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
    }
  };

  return (
    <div className="rounded-3xl border border-violet-100 bg-violet-50 px-6 py-6 text-center text-sm text-slate-600">
      <p className="font-semibold text-slate-900">Share this article</p>
      <p className="mt-2 text-xs text-slate-500">
        Found this helpful? Share it with your friends and community.
      </p>
      <div className="mt-4 flex justify-center gap-3 flex-wrap">
        {SHARE_TARGETS.map((target) => (
          <button
            key={target.key}
            type="button"
            onClick={() => handleShare(target)}
            title={target.label}
            aria-label={target.label}
            className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
              target.key === "copy" && copied
                ? "border-green-300 bg-green-50 text-green-600"
                : "border-violet-100 bg-white text-slate-500 hover:border-violet-300 hover:text-violet-600"
            }`}
          >
            {target.key === "copy" && copied ? (
              <i className="uil uil-check text-sm" />
            ) : (
              <i className={`uil ${target.icon} text-sm`} />
            )}
          </button>
        ))}
      </div>
      {copied && (
        <p className="mt-2 text-xs text-green-600 font-medium">
          Link copied to clipboard!
        </p>
      )}
    </div>
  );
}
