"use server";

import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { FormSchemaType, formSchema } from "@/schemas/form";
import { Form } from "@prisma/client";

class UserNotFoundErr extends Error {}

export async function getFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  const submissionsRate = visits > 0 ? (submissions / visits) * 100 : 0;
  const bounceRate = submissionsRate ? 100 - submissionsRate : 0;

  return {
    visits,
    submissions,
    submissionsRate,
    bounceRate,
  };
}

export async function createForm(data: FormSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  const { name, description } = data;
  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name: name,
      description: description,
    },
  });
  if (!form) {
    throw new Error("Error while saving form on server; please try again");
  }
  return form.id;
}

export async function getForms() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getFormById(id: number): Promise<Form | null> {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function updateFormContent(id: number, jsonContent: string) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function publishForm(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      published: true,
    },
  });
}

export async function getFormContentByUrl(url: string) {
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareUrl: url,
    },
  });
}

export async function submitForm(url: string, content: string) {
  return await prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareUrl: url,
      published: true,
    },
  });
}

export async function getFormWithSubmissions(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
    include: {
      FormSubmissions: true,
    },
  });
}
