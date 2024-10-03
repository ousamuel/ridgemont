"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
// NEED TO DO: implement something like aws lambda to periodically delete expired links
const ContactPage = () => {
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showReferral, setShowReferral] = useState<string>("");
  const supabase = createClient();
  const [mySession, setMySession] = useState<any>();

  const interestOptions = ["Job 1", "Job 2", "Job 3"];
  useEffect(() => {}, []);

  const handleSubmit = async (formData: FormData) => {
    const category = formData.get("category") as string;
    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }
    const requestBody = {
      category,
      subject,
      description,
      userEmail: user.email,
      userId: user.id,
    };

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(data.success);
        setErrorMessage(null);
      } else {
        setErrorMessage(data.error);
        setSuccessMessage(null);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="pr-6">
      <main className="w-full h-full p-4 flex justify-between flex flex-col bg-accent">
        <h2>Interested in joining the team?</h2>
        <form
          className="flex flex-col w-full  gap-2 [&>input]:mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitting(true);
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            handleSubmit(formData);
          }}
        >
          <div className="flex flex-col gap-2 [&>label]:mt-3  text-foreground text-sm">
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="fullName"
              className=""
              placeholder="Enter your full legal name"
              maxLength={50}
              required
            />{" "}
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="email"
              className="bg-"
              placeholder="Enter your email address"
              maxLength={50}
              required
            />{" "}
            <Label htmlFor="category">
              Select one <span className="text-red-500">*</span>
            </Label>
            <select name="category" required className="border rounded p-2">
              {interestOptions.map((optionStr: string, i: number) => (
                <option key={i} value={optionStr}>
                  {optionStr}
                </option>
              ))}
            </select>
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 border rounded"
              placeholder="Maximum of 600 characters"
              rows={4}
              maxLength={600}
              required
            />
            <SubmitButton className="my-4">
              {submitting
                ? "Submitting"
                : successMessage
                  ? "Success"
                  : errorMessage
                    ? "Error"
                    : "Submit"}
            </SubmitButton>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ContactPage;
