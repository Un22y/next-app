"use client";
import { IoMdCheckbox } from "react-icons/io";
import {
  ElementsType,
  FormElementInstance,
  FormElementType,
  SubmitValue,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

const type: ElementsType = "CheckboxField";

const extraAttributes = {
  label: "Checkbox field",
  helperText: "Helper text",
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const CheckboxFieldFormElement: FormElementType = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: IoMdCheckbox,
    label: "Checkbox",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue === "true";
    }

    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { updateElement } = useDesigner();
  const element = elementInstance as CustomInstance;
  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      ...element.extraAttributes,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchemaType) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => event.preventDefault()}
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") event.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field. <br /> It will be displayed above the
                field.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") event.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The helper text of the field. <br /> It will be displayed below
                the field.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex justify-between items-center rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  The helper text of the field. <br /> It will be displayed
                  below the field.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { helperText, label, required } = element.extraAttributes;
  const id = `checkbox-${element.id}`;
  return (
    <div className="flex items-start gap-2">
      <Checkbox id={id} />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {required && "*"}
        </Label>

        {helperText && (
          <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
        )}
      </div>
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitValue;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [value, setValue] = useState<boolean>(
    defaultValue === "true" ? true : false
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);
  const { helperText, label, placeholder, required } = element.extraAttributes;
  const id = `checkbox-${element.id}`;
  return (
    <div className="flex items-top flex-space-2 gap-2">
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && "border-red-500")}
        onCheckedChange={(checked) => {
          const value = checked ? true : false;
          setValue(value);
          if (!submitValue) return;
          const stringValue = value ? "true" : "false";
          const valid = CheckboxFieldFormElement.validate(element, stringValue);
          setError(!valid);
          submitValue(element.id, stringValue);
        }}
      />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {required && "*"}
        </Label>

        {helperText && (
          <p
            className={cn(
              "text-muted-foreground text-[0.8rem]",
              error && "text-red-500"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}
