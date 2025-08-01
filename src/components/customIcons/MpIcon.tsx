import { SvgIcon, Box, Typography } from "@mui/material";

export function MpAvatar() {
  return (
    <SvgIcon
      viewBox="0 0 200 200"
      sx={{
        fontSize: 30,
        transition: "transform 0.4s ease",
        "&:hover": {
          transform: "rotate(360deg)",
        },
      }}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D3AB" />
          <stop offset="1200%" stopColor="rgb(11, 53, 160)" />
        </linearGradient>
      </defs>
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="url(#grad1)"
        stroke="white"
        strokeWidth="5"
      />
      <text
        x="100"
        y="100"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="90"
        fontWeight="bold"
        fill="white"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        MP
      </text>
    </SvgIcon>
  );
}

export function MpIcon() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {/* Avatar MP con hover */}
      <MpAvatar />

      <Typography
        variant="h6"
        sx={{
          background: "linear-gradient(to right, #00D3AB,rgb(11, 53, 160))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          fontWeight: "bold",
        }}
      >
        SystemsMP
      </Typography>
    </Box>
  );
}
