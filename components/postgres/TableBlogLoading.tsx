import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function TableBlogLoading() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
    </Stack>
  );
}
