"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserProfile } from "@/hooks/use-get-user-profile";

export function ProfilePhoto() {
  const { user, isGetUserProfilePending } = useGetUserProfile();

  return (
    <>
      {isGetUserProfilePending ? (
        <Skeleton className="w-full h-32" />
      ) : (
        <div className="w-full flex items-center gap-4 border rounded-md p-4">
          <Avatar className="size-24 border-2">
            <AvatarImage src="https://github.com/wellingtonrodriguesbr.png" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <strong className="text-lg">Adicione uma foto de perfil</strong>
            <span className="text-sm text-app-gray-500">
              A foto precisa ter no máximo 2 mb.
            </span>
          </div>
        </div>
      )}
    </>
  );
}
