import { Box } from "@mui/material";

import { Clock } from "@/components/Clock";
import { SearchBar } from "@/components/SearchBar";
import { Banners } from "@/components/Banners";

export default function Home() {
    return (
        <Box width="750px" display="flex" flexDirection="column" alignItems="center" position="relative">
            <Box position="absolute" top="0" left="0" sx={{ transform: "translateY(-100%)" }}>
                <Clock />
            </Box>
            <SearchBar />
            <Box position="absolute" bottom="0" left="0" right="0" sx={{ transform: "translateY(100%)" }}>
                <Banners />
            </Box>
        </Box>
    );
}
