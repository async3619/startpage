import React from "react";
import { AiFillGithub, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";

import { Box, Grid } from "@mui/material";

import { BannerItem } from "@/components/BannerItem";

export function Banners() {
    return (
        <Box width="100%" mt={2}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <BannerItem icon={AiFillGithub} url="https://github.com" title="GitHub" />
                </Grid>
                <Grid item xs={2}>
                    <BannerItem icon={AiFillYoutube} url="https://youtube.com" title="YouTube" />
                </Grid>
                <Grid item xs={2}>
                    <BannerItem icon={AiOutlineTwitter} url="https://twitter.com" title="Twitter" />
                </Grid>
            </Grid>
        </Box>
    );
}
