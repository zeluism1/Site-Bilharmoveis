'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import useSWR from 'swr';

// Form Schema
const variantSchema = z.object({
  id: z.string().optional(), // For existing variants
  colorKey: z.string().min(1, 'Color key is required'),
  colorName: z.object({
    pt: z.string().min(1, 'Portuguese color name is required'),
    en: z.string().min(1, 'English color name is required'),
    es: z.string().min(1, 'Spanish color name is required'),
  }),
  colorHex: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color'),
  mainImageURL: z.string().refine((value) => {
    // Accept both URLs and local paths
    return value.startsWith('http') || value.startsWith('https') || value.startsWith('/images/');
  }, 'Invalid image path or URL'),
  angleImageURLs: z.array(z.string().refine((value) => {
    // Accept both URLs and local paths
    return value.startsWith('http') || value.startsWith('https') || value.startsWith('/images/');
  }, 'Invalid image path or URL')),
});

const productSchema = z.object({
  modelName: z.string().min(1, 'Model name is required'),
  displayName: z.object({
    pt: z.string().min(1, 'Portuguese name is required'),
    en: z.string().min(1, 'English name is required'),
    es: z.string().min(1, 'Spanish name is required'),
  }),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().min(1, 'Subcategory is required'),
  productType: z.string().min(1, 'Product type is required'),
  baseDescription: z.object({
    pt: z.string().min(1, 'Portuguese description is required'),
    en: z.string().min(1, 'English description is required'),
    es: z.string().min(1, 'Spanish description is required'),
  }),
  baseFeatures: z.array(z.string()),
  baseMaterials: z.array(z.string()),
  dimensions: z.object({
    width: z.number().min(0, 'Width must be a positive number'),
    height: z.number().min(0, 'Height must be a positive number'),
    depth: z.number().min(0, 'Depth must be a positive number'),
    unit: z.string().min(1, 'Unit is required'),
  }),
  weight: z.number().min(0, 'Weight must be a positive number'),
  variants: z.array(variantSchema).min(1, 'At least one variant is required'),
  defaultVariantIndex: z.number().min(0),
  relatedProductModelIds: z.array(z.string()).optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const defaultVariant = {
  colorKey: '',
  colorName: { pt: '', en: '', es: '' },
  colorHex: '#000000',
  mainImageURL: '',
  angleImageURLs: [],
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

// Add type definitions for the API response
interface ApiResponse {
  data: Array<{
    id: string;
    category: string;
    subcategory: string;
    // ... other fields not needed for this context
  }>;
  // ... other response fields
}

export default function AddProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  // Fetch existing categories and subcategories with proper typing
  const { data: productsData, error: productsError } = useSWR<ApiResponse>('/api/products?page=1&limit=100', fetcher);
  
  // Extract unique categories and subcategories with proper typing
  const categories = Array.from(new Set(productsData?.data?.map(p => p.category) || []));
  const subcategories = Array.from(new Set(productsData?.data?.map(p => p.subcategory) || []));

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      modelName: '',
      displayName: { pt: '', en: '', es: '' },
      category: '',
      subcategory: '',
      productType: '',
      baseDescription: { pt: '', en: '', es: '' },
      baseFeatures: [],
      baseMaterials: [],
      dimensions: { width: 0, height: 0, depth: 0, unit: 'cm' },
      weight: 0,
      variants: [defaultVariant],
      defaultVariantIndex: 0,
      relatedProductModelIds: [],
    },
  });

  // Watch model name changes and update display names
  const modelName = form.watch('modelName');
  useEffect(() => {
    if (modelName) {
      form.setValue('displayName.pt', modelName);
      form.setValue('displayName.en', modelName);
      form.setValue('displayName.es', modelName);
    }
  }, [modelName, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  const handleImageUpload = async (file: File, index: number, isAngleImage: boolean = false): Promise<string> => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', form.getValues('category'));
      formData.append('subcategory', form.getValues('subcategory') || 'default');
      formData.append('modelName', form.getValues('modelName'));

      const response = await fetch('/api/products/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      
      if (isAngleImage) {
        const currentAngleImages = form.getValues(`variants.${index}.angleImageURLs`) || [];
        form.setValue(`variants.${index}.angleImageURLs`, [...currentAngleImages, data.url]);
      } else {
        form.setValue(`variants.${index}.mainImageURL`, data.url);
      }

      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      toast({
        title: 'Success',
        description: 'Product created successfully',
      });

      router.push('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: 'Error',
        description: 'Failed to create product. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <FormField
                control={form.control}
                name="modelName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="displayName.pt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name (PT)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="displayName.en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name (EN)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="displayName.es"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name (ES)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Category</FormLabel>
                      <Popover open={openCategory} onOpenChange={setOpenCategory}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openCategory}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value || "Select category"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput 
                              placeholder="Search or add new category"
                              value={newCategory}
                              onValueChange={setNewCategory}
                            />
                            <CommandEmpty>
                              <Button
                                type="button"
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => {
                                  field.onChange(newCategory);
                                  setOpenCategory(false);
                                }}
                              >
                                Add "{newCategory}"
                              </Button>
                            </CommandEmpty>
                            <CommandGroup>
                              {categories.map((category: string) => (
                                <CommandItem
                                  key={category}
                                  value={category}
                                  onSelect={() => {
                                    field.onChange(category);
                                    setOpenCategory(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === category ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {category}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Subcategory</FormLabel>
                      <Popover open={openSubcategory} onOpenChange={setOpenSubcategory}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openSubcategory}
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value || "Select subcategory"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput 
                              placeholder="Search or add new subcategory"
                              value={newSubcategory}
                              onValueChange={setNewSubcategory}
                            />
                            <CommandEmpty>
                              <Button
                                type="button"
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => {
                                  field.onChange(newSubcategory);
                                  setOpenSubcategory(false);
                                }}
                              >
                                Add "{newSubcategory}"
                              </Button>
                            </CommandEmpty>
                            <CommandGroup>
                              {subcategories.map((subcategory: string) => (
                                <CommandItem
                                  key={subcategory}
                                  value={subcategory}
                                  onSelect={() => {
                                    field.onChange(subcategory);
                                    setOpenSubcategory(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === subcategory ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {subcategory}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Description and Features */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="baseDescription.pt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (PT)</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="baseDescription.en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (EN)</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="baseDescription.es"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (ES)</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Dimensions and Weight */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="dimensions.width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dimensions.height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dimensions.depth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Depth</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Variants</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append(defaultVariant)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variant
                </Button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Variant {index + 1}</h4>
                      <div className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name="defaultVariantIndex"
                          render={({ field: defaultField }) => (
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                checked={defaultField.value === index}
                                onChange={() => defaultField.onChange(index)}
                                className="h-4 w-4"
                              />
                              <span className="text-sm">Default Variant</span>
                            </div>
                          )}
                        />
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`variants.${index}.colorKey`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color Key</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`variants.${index}.colorHex`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color Hex</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input {...field} />
                                <input
                                  type="color"
                                  value={field.value}
                                  onChange={(e) => field.onChange(e.target.value)}
                                  className="w-10 h-10 p-1 rounded border cursor-pointer"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`variants.${index}.colorName.pt`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color Name (PT)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`variants.${index}.colorName.en`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color Name (EN)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`variants.${index}.colorName.es`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color Name (ES)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`variants.${index}.mainImageURL`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Main Image</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input {...field} readOnly />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  id={`main-image-${index}`}
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      try {
                                        await handleImageUpload(file, index);
                                      } catch (error) {
                                        console.error('Failed to upload image:', error);
                                      }
                                    }
                                  }}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="shrink-0"
                                  onClick={() => document.getElementById(`main-image-${index}`)?.click()}
                                  disabled={isUploading}
                                >
                                  <Upload className="h-4 w-4" />
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variants.${index}.angleImageURLs`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Angle Images</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <div className="flex flex-wrap gap-2">
                                  {field.value?.map((url, angleIndex) => (
                                    <div key={angleIndex} className="relative">
                                      <img
                                        src={url}
                                        alt={`Angle ${angleIndex + 1}`}
                                        className="w-20 h-20 object-cover rounded"
                                      />
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -top-2 -right-2 h-6 w-6"
                                        onClick={() => {
                                          const newUrls = [...field.value];
                                          newUrls.splice(angleIndex, 1);
                                          form.setValue(`variants.${index}.angleImageURLs`, newUrls);
                                        }}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                                <div className="flex gap-2">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id={`angle-image-${index}`}
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        try {
                                          await handleImageUpload(file, index, true);
                                        } catch (error) {
                                          console.error('Failed to upload image:', error);
                                        }
                                      }
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById(`angle-image-${index}`)?.click()}
                                    disabled={isUploading}
                                  >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Add Angle Image
                                  </Button>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/products')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
