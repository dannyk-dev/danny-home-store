// src/app/admin/products/product-create-form.tsx
// Product create form – Chakra UI v3.3 with **exact** Field / Fieldset sub‑component names
// (Field.Label, Field.Control don’t exist; use Field.Label, Field.ErrorText, Field.RequiredIndicator)
"use client";
import {
  Box,
  VStack,
  HStack,
  Stack,
  Button,
  Input,
  Textarea,
  Select,
  Switch,
  IconButton,
  Fieldset,
  Field,
  NativeSelect,
} from "@chakra-ui/react";
import { useForm, useFieldArray, Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { createProductSchema } from "@/server/schemas/product";

import { z } from "zod";

import { FiPlus, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { createProductSchema } from "@/lib/schemas/product";
import { api } from "@/trpc/react";
import { toaster } from "@/components/ui/toaster";

/* ---------------- Types ---------------- */
export type CreateProductInput = z.infer<typeof createProductSchema>;

export const ProductCreateForm: React.FC = () => {
  const router = useRouter();

  /* Category list */
  // const { data: categories } = api.admin.category.list.useQuery();

  /* RHF */
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      brand: "",
      images: [""],
      categoryId: "",
      defaultPrice: 0,
      currency: "BRL",
      taxable: false,
      active: true,
      variants: [],
    },
  });

  const {
    fields: imgFields,
    append: addImg,
    remove: removeImg,
  } = useFieldArray({ control, name: "images" });
  const {
    fields: varFields,
    append: addVar,
    remove: removeVar,
  } = useFieldArray({ control, name: "variants" });

  const createMutation = api.products.create.useMutation({
    onSuccess: (p) => {
      toaster.create({ type: "success", description: "Product created" });
      // router.push(`/admin/products/${p.id}`);
    },
    onError: (e) => toaster.create({ type: "error", description: e.message }),
  });

  const onSubmit = (data: CreateProductInput) => createMutation.mutate(data);

  return (
    // <Form {...form}>
    <Box as="form" maxW="3xl" mx="auto" onSubmit={handleSubmit(onSubmit)}>
      <VStack spaceX={10} align="stretch">
        <Fieldset.Root title="Basic information">
          <Stack spaceX={1} mb={4}>
            <Fieldset.Legend>Basic information</Fieldset.Legend>
            <Fieldset.HelperText>
              Key identifiers and description.
            </Fieldset.HelperText>
          </Stack>
          <Fieldset.Content gap={4}>
            <Field.Root>
              <Field.Label>
                Name <Field.RequiredIndicator />
              </Field.Label>
              <Input {...register("name")} />
              <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            </Field.Root>

            <HStack spaceX={4} w="full">
              <Field.Root flex="1">
                <Field.Label>
                  Slug <Field.RequiredIndicator />
                </Field.Label>
                <Input {...register("slug")} />
                <Field.ErrorText>{errors.slug?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root w="48">
                <Field.Label>Brand</Field.Label>
                <Input {...register("brand")} />
                <Field.ErrorText>{errors.brand?.message}</Field.ErrorText>
              </Field.Root>
            </HStack>

            <Field.Root mt={4}>
              <Field.Label>Description</Field.Label>
              <Textarea rows={4} {...register("description")} />
              <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
            </Field.Root>
          </Fieldset.Content>
        </Fieldset.Root>

        <Fieldset.Root title="Pricing & Category">
          <Fieldset.Content gap={4}>
            {/* <Field.Root flex="1">
              <Field.Label>
                Category <Field.RequiredIndicator />
              </Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field  placeholder="Select category" {...register("categoryId")}>
                  {categories?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
                </NativeSelect.Field>
              </NativeSelect.Root>
              <Field.ErrorText>{errors.categoryId?.message}</Field.ErrorText>
            </Field.Root> */}
            <HStack spaceX={4} w="full">
              <Field.Root w="40">
                <Field.Label>
                  Price <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("defaultPrice", { valueAsNumber: true })}
                />
                <Field.ErrorText>
                  {errors.defaultPrice?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root w="32">
                <Field.Label>Currency</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    placeholder="Select a currency type"
                    {...register("currency")}
                  >
                    <option value="BRL">BRL</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </NativeSelect.Field>
                </NativeSelect.Root>
              </Field.Root>
            </HStack>
          </Fieldset.Content>
        </Fieldset.Root>

        {/* ───────── Status ───────── */}
        <Fieldset.Root title="Status">
          <Fieldset.Content>
            <Field.Root>
              <HStack>
                <Switch.Root {...register("active")}>
                  <Switch.HiddenInput onBlur={register("active").onBlur} />
                  <Switch.Control />
                  <Switch.Label>Active</Switch.Label>
                </Switch.Root>
              </HStack>
            </Field.Root>
          </Fieldset.Content>
        </Fieldset.Root>

        {/* ───────── Images ───────── */}
        <Fieldset.Root title="Images">
          <Fieldset.Content>
            <VStack spaceX={3} align="stretch">
              {imgFields.map((f, idx) => (
                <HStack key={f.id} w="full">
                  <Field.Root flex="1">
                    <Input
                      placeholder="Image URL"
                      {...register(`images.${idx}` as const)}
                    />
                    <Field.ErrorText>
                      {errors.images?.[idx]?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <IconButton
                    aria-label="remove"
                    size="sm"
                    onClick={() => removeImg(idx)}
                  >
                    <FiTrash2 />
                  </IconButton>
                </HStack>
              ))}
              <Button size="sm" variant="outline" onClick={() => addImg("")}>
                <FiPlus />
                Add image
              </Button>
            </VStack>
          </Fieldset.Content>
        </Fieldset.Root>

        {/* ───────── Variants ───────── */}
        <Fieldset.Root title="Variants">
          <Fieldset.Content>
            <VStack spaceX={4} align="stretch">
              {varFields.map((f, idx) => (
                <Box key={f.id} p={3} borderWidth="1px" rounded="md">
                  <HStack spaceX={3} w="full">
                    <Field.Root flex="1">
                      <Input
                        placeholder="SKU"
                        {...register(`variants.${idx}.sku` as const)}
                      />
                      <Field.ErrorText>
                        {errors.variants?.[idx]?.sku?.message}
                      </Field.ErrorText>
                    </Field.Root>
                    <Field.Root w="32">
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        {...register(`variants.${idx}.price`, {
                          valueAsNumber: true,
                        })}
                      />
                    </Field.Root>
                    <Field.Root w="28">
                      <Input
                        type="number"
                        placeholder="Stock"
                        {...register(`variants.${idx}.stock`, {
                          valueAsNumber: true,
                        })}
                      />
                    </Field.Root>
                    <IconButton
                      aria-label="remove variant"
                      size="sm"
                      onClick={() => removeVar(idx)}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </HStack>
                </Box>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  addVar({
                    sku: "",
                    price: 0,
                    stock: 0,
                    currency: "BRL",
                    active: true,
                    productId: "",
                    attributes: {},
                  })
                }
              >
                <FiPlus />
                Add variant
              </Button>
            </VStack>
          </Fieldset.Content>
        </Fieldset.Root>

        <Button
          type="submit"
          colorScheme="red"
          loading={isSubmitting || createMutation.isPending}
        >
          Create Product
        </Button>
      </VStack>
    </Box>
  );
};
