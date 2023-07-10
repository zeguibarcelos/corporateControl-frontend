import { Box, Link, Typography } from "@mui/material";

export const Copyright = () => {
  return (
    <Box padding='10px'>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="">
          Corporate
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}