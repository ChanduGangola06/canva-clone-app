"use client";

import { fabric } from "fabric";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { useCallback, useEffect, useRef, useState } from "react";
import { Navbar } from "@/features/editor/components/navbar";
import { Sidebar } from "@/features/editor/components/sidebar";

import {
    ActiveTool,
    selectionDependentTools
} from "@/features/editor/types";
import { Footer } from "./footer";
import { Toolbar } from "./toolbar";
import { ShapeSidebar } from "./shape-sidebar";
import { on } from "events";

export const Editor = () => {
    const [activeTool, setActiveTool] = useState<ActiveTool>("select");

    const onChangeActiveTool = useCallback((tool: ActiveTool) => {
        if (tool === activeTool) {
            return setActiveTool("select");
        }
        if (tool === "draw") {
            // TODO: Enable draw mode
        }
        if (activeTool === "draw") {
            // TODO: Disable draw mode
        }
        setActiveTool(tool);
    }, [activeTool]);

    const { init, editor } = useEditor();
    const canvasRef = useRef(null);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = new fabric.Canvas(
            canvasRef.current,
            {
                controlsAboveOverlay: true,
                preserveObjectStacking: true,
            }
        )

        init({
            initialCanvas: canvas,
            initalContainer: containerRef.current!,
        });
    }, [init]);
    return (
        <div className="h-full flex flex-col">
            <Navbar
                activeTool={activeTool}
                onChangeActiveTool={onChangeActiveTool}
            />
            <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
                <Sidebar
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <ShapeSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
                <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
                    <Toolbar />
                    <div className="flex-1 h-full bg-muted" ref={containerRef}>
                        <canvas ref={canvasRef} />
                    </div>
                    <Footer />
                </main>

            </div>

        </div>
    );

};