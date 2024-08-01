"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useGetUserProfile } from "@/hooks/use-get-user-profile";
import { Textarea } from "@/components/ui/textarea";

const myProfessionalAccountFormSchema = z.object({
  zipCode: z.string().min(8, { message: "Digite um CEP válido" }),
  about: z
    .string()
    .min(2, { message: "Este campo é obrigatório" })
    .max(300, { message: "Precisa ter no máximo até 300 caracteres" }),
});

type MyProfessionalAccountFormSchema = z.infer<
  typeof myProfessionalAccountFormSchema
>;

export function MyProfessionalAccountForm() {
  const { user, isGetUserProfilePending } = useGetUserProfile();

  const form = useForm<MyProfessionalAccountFormSchema>({
    resolver: zodResolver(myProfessionalAccountFormSchema),
    defaultValues: {
      zipCode: "",
      about: "",
    },
  });

  async function onSubmit({ zipCode, about }: MyProfessionalAccountFormSchema) {
    try {
      // await updateUserInformation({ name, email, phone });
      toast.success("Informações atualizadas com sucesso");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 409 &&
          error.response.data.message ===
            "User already exists with the same email"
        ) {
          toast.error("Já existe um usuário cadastrado com este e-mail");
        } else if (
          error.response?.status === 409 &&
          error.response.data.message ===
            "User already exists with the same phone"
        ) {
          toast.error(
            "Já existe um usuário cadastrado com este número de celular"
          );
        }
      }
    }
  }
  return (
    <Form {...form}>
      {isGetUserProfilePending ? (
        <fieldset className="flex flex-col gap-6 mt-6">
          <div className="flex flex-col gap-3">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-full h-9" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-full h-9" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-full h-9" />
          </div>
          <div className="flex gap-2 mt-2">
            <Skeleton className="w-28 h-9" />
            <Skeleton className="w-full h-9" />
          </div>
        </fieldset>
      ) : (
        <form
          className="w-full flex flex-col gap-3 mt-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="zipCode"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>CEP da sua cidade</FormLabel>
                <FormControl>
                  <Input placeholder="00000-000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="about"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fale um pouco sobre você</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="Suas experiências, tempo de carreira e etc.."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            // disabled={isUpdateUserInformationPending}
            type="submit"
            className="w-full gap-2 mt-5"
          >
            {false ? <Loader2 className="size-4 animate-spin" /> : "Salvar"}
          </Button>
        </form>
      )}
    </Form>
  );
}
