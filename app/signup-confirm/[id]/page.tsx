import { ConfirmationOtpForm } from "@/components/form"

const Page = () => {
  return (
    <ConfirmationOtpForm
      email="test@gmail.com"
      onValid={async (values) => {
        "use server"
      }}
    />
  )
}

export default Page
