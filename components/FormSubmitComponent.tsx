"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, formElements } from "./FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "./ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { submitForm } from "@/actions/form";

export default function FormSubmitComponent({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementInstance[];
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = formElements[field.type].validate(field, actualValue);
      if (!valid) {
        formErrors.current[field.id] = true;
      }
      if (Object.keys(formErrors.current).length) {
        return false;
      }
    }
    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const handleSubmitForm = async () => {
    console.log("Form errors", formErrors.current);
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "Check your form for errors",
        variant: "destructive",
      });
      return;
    }
    try {
      const jsonContent = JSON.stringify(formValues.current);
      await submitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Check your form for errors",
        variant: "destructive",
      });
    }
    console.log("Form values", formValues.current);
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2x1 font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you, now you can close this page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-center items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        {content.map((element) => {
          const FormElement = formElements[element.type].formComponent;
          return (
            <FormElement
              submitValue={submitValue}
              elementInstance={element}
              isInvalid={formErrors.current[element.id]}
              key={element.id}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          onClick={() => {
            startTransition(handleSubmitForm);
          }}
          className="mt-8"
          disabled={pending}
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" /> Submit
            </>
          )}
          {pending && <ImSpinner2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}
