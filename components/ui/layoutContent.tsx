"use client";

import { Button } from "@/components/ui/button"; // Update based on your component path
import { getTenantBrowserSupabase } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type LayoutContentProps = {
  children: React.ReactNode;
  companyName: string;
};

export default function LayoutContent({
  children,
  companyName,
}: LayoutContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = getTenantBrowserSupabase(companyName);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/login/${companyName}`);
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden relative">
      <div className="flex-1 flex flex-col overflow-x-auto relative">
        {/* Back to Home Button */}
        {pathname !== `/${companyName}/dashboard` && (
          <div className="p-4 bg-stone-900">
            <Button
              variant="outline"
              className="rounded-md"
              onClick={() => router.push(`/${companyName}/dashboard`)}
            >
              ← Back to Home
            </Button>
          </div>
        )}

        <div className="relative z-50 grow bg-stone-900 dark:text-white">
          {children}
          <Button
            className="fixed top-10 right-10"
            variant="default"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
