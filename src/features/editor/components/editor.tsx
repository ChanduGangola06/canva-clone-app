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

export const Editor = () => {
    const [activeTool, setActiveTool] = useState<ActiveTool>("select");

    const onChangeActiveTool = useCallback((tool: ActiveTool) => {
        if (tool === "draw") {

        }
        setActiveTool(tool);
    }, [activeTool]);

    const { init } = useEditor();
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
            <Navbar />
            <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
                <Sidebar
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
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