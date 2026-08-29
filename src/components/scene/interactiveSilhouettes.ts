export interface ObjectBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PixelInteractiveSilhouette {
  id: string;
  name: string;
  bounds: ObjectBounds[];
  silhouettePath: string;
}

/**
 * Computer-Vision Extracted Pixel-Art Silhouettes (1024x559 Native Resolution).
 * Extracted with OpenCV contour analysis directly from hero-bg.jpg.
 */
export const SCENE_PIXEL_SILHOUETTES: PixelInteractiveSilhouette[] = [
  {
    "id": "desk_lamp",
    "name": "Left Study Desk Lamp",
    "bounds": [
      {
        "x": 60,
        "y": 220,
        "width": 100,
        "height": 140
      }
    ],
    "silhouettePath": "M 60,220 L 60,351 L 65,352 L 64,355 L 60,355 L 60,359 L 159,359 L 159,338 L 156,337 L 157,334 L 159,334 L 159,303 L 157,302 L 156,306 L 152,309 L 151,313 L 149,314 L 145,322 L 140,324 L 139,331 L 135,330 L 132,324 L 132,287 L 139,287 L 146,284 L 147,279 L 145,276 L 144,266 L 141,254 L 139,252 L 137,240 L 134,233 L 131,230 L 132,220 Z"
  },
  {
    "id": "window_cats",
    "name": "The Window Cats",
    "bounds": [
      {
        "x": 460,
        "y": 230,
        "width": 220,
        "height": 150
      }
    ],
    "silhouettePath": "M 464,240 L 465,242 L 469,243 L 469,247 L 464,251 L 468,253 L 471,253 L 473,250 L 473,244 L 479,245 L 480,316 L 460,318 L 460,361 L 468,363 L 477,363 L 477,359 L 484,351 L 489,351 L 493,357 L 496,357 L 498,359 L 497,364 L 491,364 L 493,365 L 543,364 L 544,360 L 548,358 L 556,358 L 557,362 L 559,363 L 568,361 L 587,362 L 592,360 L 598,361 L 601,364 L 617,364 L 622,363 L 623,357 L 639,357 L 642,359 L 662,355 L 669,351 L 672,346 L 677,347 L 679,349 L 679,230 L 660,230 L 659,286 L 653,285 L 645,277 L 645,271 L 651,268 L 651,263 L 646,262 L 643,240 L 641,238 L 638,239 L 633,245 L 625,245 L 625,230 L 604,230 L 604,232 L 621,233 L 620,244 L 615,244 L 613,241 L 609,239 L 600,238 L 600,233 L 598,232 L 598,230 L 596,230 L 596,238 L 582,236 L 583,230 L 516,230 L 533,231 L 532,236 L 521,236 L 521,242 L 516,242 L 516,247 L 520,247 L 521,243 L 523,243 L 524,237 L 528,236 L 533,237 L 533,246 L 536,246 L 537,238 L 542,239 L 544,242 L 543,247 L 539,247 L 538,252 L 535,252 L 535,254 L 533,255 L 532,272 L 529,274 L 528,278 L 522,277 L 521,264 L 519,264 L 521,265 L 520,275 L 518,277 L 529,279 L 528,285 L 523,288 L 515,288 L 511,290 L 506,289 L 506,230 L 479,230 L 478,241 L 466,239 Z"
  },
  {
    "id": "wall_calendar",
    "name": "Wall Calendar & Notes",
    "bounds": [
      {
        "x": 860,
        "y": 130,
        "width": 80,
        "height": 110
      }
    ],
    "silhouettePath": "M 867,144 L 867,234 L 869,235 L 869,239 L 886,239 L 887,236 L 892,237 L 892,239 L 920,239 L 921,230 L 932,231 L 933,239 L 935,239 L 935,227 L 933,230 L 915,226 L 919,206 L 930,205 L 930,200 L 929,202 L 924,201 L 924,198 L 923,202 L 921,204 L 918,204 L 916,210 L 897,209 L 899,199 L 895,198 L 894,202 L 888,201 L 887,197 L 876,197 L 883,198 L 883,200 L 886,201 L 885,206 L 883,206 L 882,210 L 875,209 L 875,203 L 867,199 L 869,189 L 867,188 L 868,149 L 880,148 L 878,147 L 878,144 Z"
  },
  {
    "id": "bedside_lamp",
    "name": "Right Bedside Lamp",
    "bounds": [
      {
        "x": 880,
        "y": 280,
        "width": 90,
        "height": 140
      }
    ],
    "silhouettePath": "M 969,280 L 880,280 L 880,419 L 904,419 L 905,416 L 909,417 L 909,419 L 920,418 L 918,418 L 917,416 L 903,415 L 900,413 L 896,406 L 897,402 L 899,402 L 899,399 L 902,396 L 902,392 L 906,390 L 904,389 L 905,383 L 909,384 L 908,389 L 910,383 L 912,383 L 913,377 L 918,376 L 915,375 L 916,372 L 918,372 L 919,374 L 921,373 L 922,370 L 930,365 L 930,362 L 932,360 L 935,360 L 936,357 L 945,360 L 945,363 L 951,368 L 955,369 L 960,374 L 969,377 L 969,373 L 960,372 L 957,366 L 952,367 L 946,363 L 947,359 L 955,363 L 957,360 L 961,360 L 961,363 L 963,363 L 966,367 L 969,367 L 969,351 L 965,355 L 961,354 L 962,351 L 965,350 L 965,345 L 967,344 L 967,320 L 969,319 L 969,316 L 967,315 Z"
  },
  {
    "id": "cozy_bed",
    "name": "Cozy Bed & Blanket",
    "bounds": [
      {
        "x": 580,
        "y": 350,
        "width": 444,
        "height": 209
      }
    ],
    "silhouettePath": "M 580,350 L 580,558 L 647,558 L 648,545 L 656,546 L 656,553 L 658,554 L 658,558 L 942,558 L 943,554 L 946,553 L 955,554 L 955,558 L 1023,558 L 1023,350 L 664,350 L 662,355 L 654,355 L 654,350 Z"
  },
  {
    "id": "window_plant",
    "name": "Window Sill Plant & Coffee Mug",
    "bounds": [
      {
        "x": 340,
        "y": 270,
        "width": 80,
        "height": 110
      }
    ],
    "silhouettePath": "M 419,343 L 412,340 L 403,340 L 399,343 L 396,353 L 383,357 L 372,358 L 361,357 L 360,354 L 359,356 L 349,358 L 350,362 L 360,363 L 364,369 L 363,364 L 365,362 L 378,362 L 377,366 L 382,366 L 383,368 L 383,363 L 390,364 L 391,362 L 400,362 L 402,363 L 403,371 L 405,371 L 406,362 L 419,363 Z"
  },
  {
    "id": "lofi_radio",
    "name": "Lo-Fi Desk Monitor & Radio",
    "bounds": [
      {
        "x": 0,
        "y": 230,
        "width": 100,
        "height": 130
      }
    ],
    "silhouettePath": "M 0,230 L 0,359 L 99,359 L 99,230 Z"
  },
  {
    "id": "night_window",
    "name": "Night Sky & Moon Window",
    "bounds": [
      {
        "x": 290,
        "y": 20,
        "width": 510,
        "height": 330
      }
    ],
    "silhouettePath": "M 295,25 L 795,25 L 795,345 L 295,345 Z M 460,25 L 460,345 M 630,25 L 630,345 M 295,190 L 795,190"
  },
  {
    "id": "fairy_lights",
    "name": "Ceiling Fairy / Rice Lights",
    "bounds": [
      {
        "x": 0,
        "y": 0,
        "width": 220,
        "height": 80
      },
      {
        "x": 820,
        "y": 0,
        "width": 204,
        "height": 80
      }
    ],
    "silhouettePath": "M 0,20 Q 55,55 110,65 Q 165,65 220,40 M 825,35 Q 875,65 925,60 Q 975,45 1024,20"
  },
  {
    "id": "wall_art",
    "name": "Wall Picture Frames",
    "bounds": [
      {
        "x": 0,
        "y": 80,
        "width": 130,
        "height": 140
      }
    ],
    "silhouettePath": "M 0,90 L 60,90 L 60,180 L 0,180 Z M 70,105 L 120,105 L 120,155 L 70,155 Z M 70,165 L 115,165 L 115,210 L 70,210 Z"
  }
];
