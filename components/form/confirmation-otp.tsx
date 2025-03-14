"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

const schema = z.object({
  otp: z.string().length(6),
})

type SchemaT = z.infer<typeof schema>

interface Props {
  email: string
  onValid: (values: SchemaT) => Promise<void>
}

const ConfirmationOtpForm = ({ email, onValid }: Props) => {
  const t = useTranslations()

  const form = useForm<SchemaT>({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: "",
    },
  })

  async function onSubmit(values: SchemaT) {
    await onValid(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">
                {t("Verify your email")}
              </CardTitle>
              <CardDescription>
                {t("We've sent a verification code to {email}", { email })}.{" "}
                {t("Please enter it below to complete your registration")}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Confirmation Code")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter 6-digit code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-sm text-muted-foreground">
                The code is valid for 10 minutes
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button
                type="submit"
                className="w-full"
                disabled={!form.formState.isDirty}
              >
                {"Verify Email"}
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                type="button"
                onClick={() => {
                  // In a real app, this would resend the code
                  alert("A new code has been sent to your email")
                }}
              >
                Resend Code
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  )
}

export { ConfirmationOtpForm }
