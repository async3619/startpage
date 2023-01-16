import React from "react";

import { Root } from "./BannerItem.styles";
import { Tooltip } from "@mui/material";

export interface BannerItemProps {
    icon: React.ComponentType;
    url: string;
    title: string;
}

export function BannerItem({ url, title, icon: Icon }: BannerItemProps) {
    return (
        <Tooltip title={title}>
            <Root href={url}>
                <Icon />
            </Root>
        </Tooltip>
    );
}
