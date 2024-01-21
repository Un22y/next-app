import { getFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import React from "react";

export default async function SubmitPage({
  params,
}: {
  params: {
    formUrl: string;
  };
}) {
  const form = await getFormContentByUrl(params.formUrl);

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  if (!form) {
    throw new Error("Form not found!");
  }
  return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
}
