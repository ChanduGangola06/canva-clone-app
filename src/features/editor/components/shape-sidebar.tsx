import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ShapeTool } from "./shape-tool";

interface ShapeSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

export const ShapeSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: ShapeSidebarProps) => {
    const onClose = () => {
        onChangeActiveTool("select");
    };

    return (
        <aside className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "shapes" ? "visible" : "hidden",
        )}>
            <ToolSidebarHeader
                title="Shapes"
                description="Add shapes to your canvas" />
            <ScrollArea>
                <ShapeTool
                    onClick={() => editor?.addCircle()}
                    icon={FaCircle}
                />
                <ShapeTool
                    onClick={() => { }}
                    icon={FaSquare}
                />
                <ShapeTool
                    onClick={() => { }}
                    icon={FaSquareFull}
                />
                <ShapeTool
                    onClick={() => { }}
                    icon={IoTriangle}
                />
                <ShapeTool
                    onClick={() => { }}
                    icon={IoTriangle}
                    iconClassName="rotate-180"
                />
                <ShapeTool
                    onClick={() => { }}
                    icon={FaDiamond}
                />
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
}