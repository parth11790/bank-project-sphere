
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { accentBorder?: boolean }
>(({ className, accentBorder, ...props }, ref) => {
  return (
    <button
      className={cn(
        buttonVariants({ ...props }),
        accentBorder && "hover-accent-border",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
