"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
    images: string[];
    productName: string;
};

export default function ProductGallery({
    images,
    productName,
}: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const displayImages = images.length ? images : [];
    const mainImage = displayImages[activeIndex] || null;

    return (
        <div>
            {/* Main image */}
            <div className="relative rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
                <button
                    type="button"
                    aria-label="Save product"
                    className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-violet-100 bg-white text-slate-400 shadow-sm transition hover:text-violet-600"
                >
                    <i className="uil uil-heart text-lg" />
                </button>
                <div className="flex h-80 items-center justify-center rounded-2xl bg-violet-50">
                    {mainImage ? (
                        <Image
                            src={mainImage}
                            alt={productName}
                            width={400}
                            height={400}
                            className="h-64 w-auto object-contain transition-opacity duration-300"
                            priority
                        />
                    ) : (
                        <i className="uil uil-box text-5xl text-violet-300" />
                    )}
                </div>
            </div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                    {displayImages.slice(0, 4).map((image, index) => (
                        <button
                            key={`thumb-${index}`}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={`flex h-20 items-center justify-center rounded-2xl border-2 bg-white transition ${activeIndex === index
                                    ? "border-violet-600 shadow-md shadow-violet-100"
                                    : "border-violet-100 hover:border-violet-300"
                                }`}
                        >
                            <Image
                                src={image}
                                alt={`${productName} ${index + 1}`}
                                width={80}
                                height={80}
                                className="h-14 w-auto object-contain"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
