import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

const markSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 44' fill='none' stroke-linecap='round' stroke-linejoin='round'>
<path d='M24 24 C16 18 12 14.5 12 10.5 C12 7.5 14.2 5.5 16.8 5.5 C19 5.5 22.2 6.6 24 9.6 C25.8 6.6 29 5.5 31.2 5.5 C33.8 5.5 36 7.5 36 10.5 C36 14.5 32 18 24 24 Z' stroke='%238A3D25' stroke-width='2.6'/>
<path d='M9 26 C7.5 31 10 35.5 15.5 37 C18 37.7 21 38 24 38' stroke='%23A8783F' stroke-width='2.6'/>
<path d='M39 26 C40.5 31 38 35.5 32.5 37 C30 37.7 27 38 24 38' stroke='%23A8783F' stroke-width='2.6'/>
</svg>`;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FBF6EC",
          borderRadius: 96,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={340}
          height={312}
          alt=""
          src={`data:image/svg+xml,${markSvg.replace(/\n/g, "")}`}
        />
      </div>
    ),
    { ...size }
  );
}
