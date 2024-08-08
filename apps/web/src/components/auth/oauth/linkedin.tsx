import { useAuthActions } from "@convex-dev/auth/react";
import { Icons } from "@knowingly/icons";
import { Button } from "@knowingly/ui/button";

export function SignInWithLinkedin() {
  const { signIn } = useAuthActions();
  return (
    <Button
      className="flex-1"
      variant="outline"
      type="button"
      onClick={() => void signIn("linkedin")}
    >
      <Icons.linkedin className="mr-2 h-4 w-4" /> Linkedin
    </Button>
  );
}