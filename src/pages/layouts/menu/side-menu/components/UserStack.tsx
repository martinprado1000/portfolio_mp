import { Avatar, Box, Stack, Typography } from "@mui/material";

import { useAuthContext } from "src/contexts/AuthUserContext";
import OptionsMenuUser from "src/pages/layouts/menu/common/OptionsMenuUser";

export function UserStack() {
  const { userAuth } = useAuthContext();

  return (
    <Stack
      direction="row"
      sx={{
        p: 2,
        gap: 1,
        alignItems: "center",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Avatar
        sizes="small"
        alt={userAuth?.name}
        src="/static/images/avatar/7.jpg"
        sx={{ width: 36, height: 36 }}
      />
      <Box sx={{ mr: "auto" }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            lineHeight: "16px",
            maxWidth: 120,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis", // Agrega 3 puntos al final del texto si no entra.
          }}
        >
          {userAuth?.name}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {userAuth?.roles}
        </Typography>
      </Box>

      {/* **** Options menu User **** **/}
      <OptionsMenuUser />
    </Stack>
  );
}
