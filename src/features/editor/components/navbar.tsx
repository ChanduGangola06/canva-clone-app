"use client"

import { CiFileOn } from "react-icons/ci";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import {
    ChevronDown,
    Download,
    Loader,
    MousePointerClick,
    Redo2,
    Undo2
} from "lucide-react";
import { Hint } from "@/components/hint";
import { ActiveTool, Editor } from "@/features/editor/types";
import { Logo } from "@/features/editor/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
    id: string;
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

export const Navbar = () => {
    return (
        <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
            <Logo />
            <div className="w-full flex items-center gap-x-1 h-full">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger>
                        <Button size="sm" variant="ghost">
                            File
                            <ChevronDown className="size-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-60">
                        <DropdownMenuItem className="flex items-center gap-x-2">
                            <CiFileOn className="size-8" />
                            <div>
                                <p>Open</p>
                                <p className="text-xs text-muted-foreground">Open a JSON File</p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator orientation="vertical" className="mx-2" />
                <Hint label="Select" side="bottom" sideOffset={10}>
                    <Button></Button>
                </Hint>

            </div>
        </nav>
    )
}

