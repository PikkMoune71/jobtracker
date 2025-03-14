import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { ReactElement, useState } from "react";

interface DialogActionProps {
  title: string;
  icon?: ReactElement<{ className: string }>;
  description?: string;
  component?: React.ReactElement<{ onClose: () => void }>;
  sizeButton?: "default" | "sm" | "lg" | "icon" | "xs";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export function DialogAction({
  title,
  icon,
  description,
  component,
  sizeButton,
  variant,
}: DialogActionProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={sizeButton ? sizeButton : "default"}
          variant={variant ? variant : "default"}
        >
          {icon}
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {React.isValidElement(component)
          ? React.cloneElement(component, { onClose: handleClose })
          : component}
      </DialogContent>
    </Dialog>
  );
}
