import React from "react";

import SearchIcon from "@mui/icons-material/Search";

import { Input, Root } from "./SearchBar.styles";

export function SearchBar() {
    const [focused, setFocused] = React.useState<boolean>(false);

    const handleFocus = React.useCallback(() => setFocused(true), []);
    const handleBlur = React.useCallback(() => setFocused(false), []);

    return (
        <Root focused={focused}>
            <SearchIcon />
            <Input type="text" onFocus={handleFocus} onBlur={handleBlur} />
        </Root>
    );
}
