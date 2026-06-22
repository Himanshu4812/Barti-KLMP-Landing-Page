import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B1F3A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "2.5px solid #C89B3C",
          boxSizing: "border-box",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          style={{
            width: "70%",
            height: "70%",
            color: "#C89B3C",
          }}
        >
          {/* Outer ring inside SVG */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="5" />
          {/* Inner detailed ring */}
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8 6" />
          {/* Center Star / Crest Symbol */}
          <polygon
            points="50,22 54,37 69,37 57,46 61,61 50,52 39,61 43,46 31,37 46,37"
            fill="currentColor"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
