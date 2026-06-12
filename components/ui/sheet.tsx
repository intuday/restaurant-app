// "use client";

// import * as React from "react";
// import * as SheetPrimitive from "@radix-ui/react-dialog";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { XIcon } from "lucide-react";

// function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
//   return <SheetPrimitive.Root data-slot="sheet" {...props} />;
// }

// function SheetTrigger({
//   ...props
// }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
//   return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
// }

// function SheetClose({
//   ...props
// }: React.ComponentProps<typeof SheetPrimitive.Close>) {
//   return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
// }

// function SheetPortal({
//   ...props
// }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
//   return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
// }

// function SheetOverlay({
//   className,
//   ...props
// }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
//   return (
//     <SheetPrimitive.Overlay
//       className={cn(
//         "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
//         className
//       )}
//       {...props}
//     />
//   );
// }

// function SheetContent({
//   className,
//   children,
//   side = "left",
//   showCloseButton = true,
//   ...props
// }: React.ComponentProps<typeof SheetPrimitive.Content> & {
//   side?: "left" | "right" | "top" | "bottom";
//   showCloseButton?: boolean;
// }) {
//   return (
//     <SheetPortal>
//       <SheetOverlay />

//       <SheetPrimitive.Content
//         className={cn(
//           "fixed z-50 flex flex-col bg-white dark:bg-gray-900 shadow-xl",
//           "h-full w-[85%] sm:w-[320px]",
//           "data-[side=left]:left-0 data-[side=right]:right-0",
//           "data-[state=open]:animate-in data-[state=closed]:animate-out",
//           "data-[side=left]:slide-in-from-left data-[side=right]:slide-in-from-right",
//           className
//         )}
//         {...props}
//       >
//         <div className="flex flex-col h-full overflow-hidden">
//           <div className="flex-1 overflow-y-auto p-4">
//             {children}
//           </div>
//         </div>

//         {showCloseButton && (
//           <SheetPrimitive.Close asChild>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute top-3 right-3"
//             >
//               <XIcon className="h-5 w-5" />
//             </Button>
//           </SheetPrimitive.Close>
//         )}
//       </SheetPrimitive.Content>
//     </SheetPortal>
//   );
// }

// function SheetHeader(props: React.ComponentProps<"div">) {
//   return <div className="flex flex-col gap-1 mb-4" {...props} />;
// }

// function SheetFooter(props: React.ComponentProps<"div">) {
//   return <div className="mt-auto flex flex-col gap-2 p-4" {...props} />;
// }

// function SheetTitle(
//   props: React.ComponentProps<typeof SheetPrimitive.Title>
// ) {
//   return (
//     <SheetPrimitive.Title
//       className="text-lg font-semibold"
//       {...props}
//     />
//   );
// }

// function SheetDescription(
//   props: React.ComponentProps<typeof SheetPrimitive.Description>
// ) {
//   return (
//     <SheetPrimitive.Description
//       className="text-sm text-gray-500"
//       {...props}
//     />
//   );
// }

// export {
//   Sheet,
//   SheetTrigger,
//   SheetClose,
//   SheetContent,
//   SheetHeader,
//   SheetFooter,
//   SheetTitle,
//   SheetDescription,
// };
"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "left" | "right" | "top" | "bottom";
  showCloseButton?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />

      <SheetPrimitive.Content
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col bg-white dark:bg-gray-900 shadow-xl",
          "h-full w-[85%] sm:w-[320px]",
          "data-[side=left]:left-0 data-[side=right]:right-0",
          "data-[side=left]:top-0 data-[side=right]:top-0",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[side=left]:slide-in-from-left data-[side=right]:slide-in-from-right",
          className
        )}
        {...props}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </div>

        {showCloseButton && (
          <SheetPrimitive.Close asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader(props: React.ComponentProps<"div">) {
  return <div className="flex flex-col gap-1 mb-4" {...props} />;
}

function SheetFooter(props: React.ComponentProps<"div">) {
  return <div className="mt-auto flex flex-col gap-2 p-4" {...props} />;
}

function SheetTitle(
  props: React.ComponentProps<typeof SheetPrimitive.Title>
) {
  return (
    <SheetPrimitive.Title
      className="text-lg font-semibold"
      {...props}
    />
  );
}

function SheetDescription(
  props: React.ComponentProps<typeof SheetPrimitive.Description>
) {
  return (
    <SheetPrimitive.Description
      className="text-sm text-gray-500"
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};