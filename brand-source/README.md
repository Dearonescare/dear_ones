# Brand source image

Drop the supplied Dear Ones brand photo here as:

    dear-ones-source.jpeg   (.jpg, .png or .webp also accepted)

Then run:

    npm run process-images

This generates optimised hero/hands/source crops in `public/images/`.
If no source image is present, tasteful warm placeholders are generated instead,
so the site always builds. Crop framing can be tuned in `scripts/process-images.mjs`.
