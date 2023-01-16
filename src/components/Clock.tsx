import React from "react";
import dayjs from "dayjs";

import { Box, Typography } from "@mui/material";

export function Clock() {
    const [currentTime, setCurrentTime] = React.useState<dayjs.Dayjs | null>(null);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(dayjs());
        }, 100);

        return () => {
            clearInterval(interval);
        };
    });

    return (
        <Box mb={2}>
            <Typography
                variant="body1"
                fontSize="5rem"
                color="text.secondary"
                lineHeight={1}
                sx={{ userSelect: "none" }}
            >
                {currentTime?.format("HH:mm:ss") || ""}
            </Typography>
        </Box>
    );
}
