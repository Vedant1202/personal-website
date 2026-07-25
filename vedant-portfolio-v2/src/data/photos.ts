// src/data/photos.ts
//
// Personal photos, in one place so they're easy to edit. Change the `caption`
// (the handwritten note on each print), the `alt` (the screen-reader
// description), the order, or the `tilt` freely. The image imports at the top
// are wired to optimized webp files — you shouldn't need to touch those unless
// you're swapping the actual picture.

import viewDesk from "../assets/my-images/view-desk.webp";
import wallFav from "../assets/my-images/wall-fav.webp";
import gym from "../assets/my-images/gym.webp";
import elephants from "../assets/my-images/elephants.webp";
// Parked for now — re-enable the import together with a GALLERY entry to use it.
// import beach from "../assets/my-images/beach.webp";
// import wallUpAngle from "../assets/my-images/wall-up-angle.webp";
// import colosseum from "../assets/my-images/colosseum.webp";

export type Photo = {
  src: string;
  /** Screen-reader description of the image (accessibility, not shown on screen). */
  alt: string;
  /** The handwritten note on the print. */
  caption: string;
  /** Small rotation in degrees, so a stack of prints sits hand-placed. */
  tilt?: number;
};

/** The two prints beside the Projects intro — shown as a small overlapping pair. */
export const PROJECT_PHOTOS: Photo[] = [
  {
    src: viewDesk,
    alt: "The view from Vedant's desk",
    caption: "view from my desk",
    tilt: -3,
  },
  {
    src: wallFav,
    alt: "My favorite wall in my apartment",
    caption: "favorite wall in my apartment",
    tilt: 3.5,
  },
];

/** The Contact scrapbook — a small cluster of prints beside the copy. */
export const GALLERY: Photo[] = [
  {
    src: gym,
    alt: "At the gym",
    caption: "helping a friend with filming content",
    tilt: -4,
  },
  {
    src: elephants,
    alt: "First painting for my home",
    caption: "first painting for my home",
    tilt: 3,
  },
  // {
  //   src: beach,
  //   alt: "Favourite summertime spot",
  //   caption: "my fav summertime spot",
  //   tilt: -2.5,
  // },
];
