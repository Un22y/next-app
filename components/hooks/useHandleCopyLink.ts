import { toast } from "../ui/use-toast";

export const useHandleCopyLink = (link: string) => {
  return () => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };
};
