import { fabric } from "fabric";
import { useCallback, useState, useMemo, useRef } from "react";
import { 
    Editor, 
    FILL_COLOR,
    STROKE_WIDTH,
    STROKE_COLOR,
    CIRCLE_OPTIONS,
    DIAMOND_OPTIONS,
    TRIANGLE_OPTIONS,
    BuildEditorProps, 
    RECTANGLE_OPTIONS,
    EditorHookProps,
    STROKE_DASH_ARRAY,
    TEXT_OPTIONS,
    FONT_FAMILY,
    FONT_WEIGHT,
    FONT_SIZE,
    JSON_KEYS,
  } from "@/features/editor/types";
  
import { useAutoResize } from "./use-auto-resize";

const buildEditor = ({
    canvas,
} : BuildEditorProps) : Editor => {
    // const getWorkspace = () => {
    //     return canvas.getObjects().find((object) => object.name === "Clip");
    // }
    addCircle: () => {
        const object = new fabric.Circle({
            width: 100,
            height: 100,
            fill: "black",
            stroke: "black",
        });
        canvas.add(object);
        canvas.setActiveObject(object);
    }

};

export const useEditor = () => {

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    useAutoResize({
        canvas,
        container,
    });

    const editor = useMemo(() => {
        if (canvas) {
            return buildEditor({
                canvas,
            });
        }
        return undefined;
    }, [
        canvas,
    ])

    const init = useCallback(({
        initialCanvas,
        initalContainer,
    }: {
        initialCanvas: any;
        initalContainer: HTMLDivElement;
    }) => {

        fabric.Object.prototype.set({
            cornerColor: "#FFF",
            cornerStyle: "circle",
            borderColor: "#3b82f6",
            borderScaleFactor: 1.5,
            transparentCorners: false,
            borderOpacityWhenMoving: 1,
            cornerStrokeColor: "#3b82f6",
        });


        const initialWorkspace = new fabric.Rect({
            width: 900,
            height: 1200,
            name: "clip",
            fill: "white",
            selectable: false,
            hasControls: false,
            shadow: new fabric.Shadow({
                color: "rgba(0,0,0,0.8)",
                blur: 5,
            }),
        });

        initialCanvas.setWidth(initalContainer.offsetWidth);
        initialCanvas.setHeight(initalContainer.offsetHeight);

        initialCanvas.add(initialWorkspace);
        initialCanvas.centerObject(initialWorkspace);
        initialCanvas.clipPath = initialWorkspace;

        setCanvas(initialCanvas);
        setContainer(initalContainer);

        const test = new fabric.Rect({
            height: 100,
            width: 100,
            fill: "black",
        });

        initialCanvas.add(test);
        initialCanvas.centerObject(test);
    }, []);

    return { init, editor };
}