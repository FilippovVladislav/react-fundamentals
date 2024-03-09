import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import MyApp from "./like_button";

const root = createRoot(document.getElementById('root2'));

root.render(
    <StrictMode>
        <MyApp />
    </StrictMode>
)
