'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Trash2 } from 'lucide-react';

// Schema (can be imported from add-product or a shared location if identical)
const variantSchema = z.object({
  id: z.string().optional(), // For existing variants
  colorKey: z.string().min(1, 'Color key is required'),
  colorHex: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color').optional().or(z.literal('')),
  colorNamePT: z.string().min(1, 'Portuguese color name is required'),
  colorNameEN: z.string().optional(),
  colorNameES: z.string().optional(),
  mainImageURL: z.string().min(1, 'Main image URL is required'),
  angleImageURLs: z.array(z.string().url()).optional(),
});

const productFormSchema = z.object({
  modelName: z.string().min(1, 'Model name is required'),
  displayNamePT: z.string().min(1, 'Portuguese display name is required'),
  displayNameEN: z.string().optional(),
  displayNameES: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  productType: z.enum(['silla', 'mesa', 'sofa', 'cama', 'armario', 'estante', 'otro']),
  baseDescriptionPT: z.string().min(1, 'Portuguese description is required'),
  baseDescriptionEN: z.string().optional(),
  baseDescriptionES: z.string().optional(),
  baseFeatures: z.array(z.string()).optional(), // Simplified
  baseMaterials: z.array(z.string()).optional(), // Simplified
  dimensions: z.object({
    width: z.number().positive().optional(),
    height: z.number().positive().optional(),
    depth: z.number().positive().optional(),
    unit: z.string().optional(),
  }).optional(),
  weight: z.number().positive().optional(),
  variants: z.array(variantSchema).min(1, 'At least one variant is required'),
  defaultVariantIndex: z.number().min(0, 'Default variant must be selected').optional(),
});

type ProductFormData = z.infer<typeof productFormSchema>;

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const modelId = params.modelId as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productName, setProductName] = useState('');

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset, // Used to populate form with fetched data
    setValue,
    watch
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      modelName: '',
      displayNamePT: '',
      category: '',
      productType: 'silla',
      baseDescriptionPT: '',
      variants: [],
      baseFeatures: [],
      baseMaterials: [],
      defaultVariantIndex: 0,
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'variants',
  });

  const watchedVariants = watch('variants');

  const fetchProductData = useCallback(async () => {
    if (!modelId) return;
    setIsFetchingData(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/products/${modelId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product data: ${response.statusText}`);
      }
      const data = await response.json();
      
      // Map API data to form data structure
      // This needs to align with your actual ProductModel and API response
      const defaultVariant = data.variants?.find((v: any) => v.isDefault);
      const defaultVariantIdx = defaultVariant ? data.variants.indexOf(defaultVariant) : 0;

      const formData: ProductFormData = {
        modelName: data.modelName || '',
        displayNamePT: data.displayName?.pt || '',
        displayNameEN: data.displayName?.en || '',
        displayNameES: data.displayName?.es || '',
        category: data.category || '',
        subcategory: data.subcategory || '',
        productType: data.productType || 'silla',
        baseDescriptionPT: data.baseDescription?.pt || '',
        baseDescriptionEN: data.baseDescription?.en || '',
        baseDescriptionES: data.baseDescription?.es || '',
        baseFeatures: data.baseFeatures || [],
        baseMaterials: data.baseMaterials || [],
        dimensions: data.dimensions || {},
        weight: data.weight || undefined,
        variants: data.variants?.map((v: any) => ({
          id: v.id, // Keep track of existing variant IDs
          colorKey: v.colorKey || '',
          colorHex: v.colorHex || '',
          colorNamePT: v.colorName?.pt || '',
          colorNameEN: v.colorName?.en || '',
          colorNameES: v.colorName?.es || '',
          mainImageURL: v.mainImageURL || '',
          angleImageURLs: v.angleImageURLs || [],
        })) || [],
        defaultVariantIndex: defaultVariantIdx,
      };
      reset(formData); // Populate the form
      setProductName(formData.displayNamePT || formData.modelName); // For page title

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching product data.');
      console.error("Error fetching product data:", err);
    } finally {
      setIsFetchingData(false);
    }
  }, [modelId, reset]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    setError(null);

    const finalData = {
        ...data,
        defaultVariantIndex: data.defaultVariantIndex ?? 0,
        baseFeatures: typeof data.baseFeatures === 'string' ? (data.baseFeatures as string).split(',').map(s => s.trim()).filter(s => s) : data.baseFeatures || [],
        baseMaterials: typeof data.baseMaterials === 'string' ? (data.baseMaterials as string).split(',').map(s => s.trim()).filter(s => s) : data.baseMaterials || [],
      };

    console.log("Submitting updated product data:", finalData);

    try {
      const response = await fetch(`/api/admin/products/${modelId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }
      const result = await response.json();
      console.log('Product updated:', result);
      // TODO: Show success toast/message
      router.push('/admin/products');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error("Error updating product:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetchingData) {
    return <div className="flex justify-center items-center h-screen"><p>Loading product data...</p></div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Product: {productName || 'Loading...'}</CardTitle>
          <CardDescription>Modify the details for the product model and its variants.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
                <p><span className="font-bold">Error:</span> {error}</p>
              </div>
            )}

            <section>
              <h3 className="text-lg font-medium mb-3">Model Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="modelName">Model Name (Internal)</Label>
                  <Input id="modelName" {...register('modelName')} />
                  {errors.modelName && <p className="text-red-500 text-sm mt-1">{errors.modelName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="productType">Product Type</Label>
                  <Controller
                    name="productType"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <SelectTrigger id="productType">
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="silla">Silla (Chair)</SelectItem>
                          <SelectItem value="mesa">Mesa (Table)</SelectItem>
                          <SelectItem value="sofa">Sofá (Sofa)</SelectItem>
                          <SelectItem value="cama">Cama (Bed)</SelectItem>
                          <SelectItem value="armario">Armario (Wardrobe)</SelectItem>
                          <SelectItem value="estante">Estante (Shelf)</SelectItem>
                          <SelectItem value="otro">Otro (Other)</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.productType && <p className="text-red-500 text-sm mt-1">{errors.productType.message}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <Label htmlFor="displayNamePT">Display Name (PT)</Label>
                  <Input id="displayNamePT" {...register('displayNamePT')} />
                  {errors.displayNamePT && <p className="text-red-500 text-sm mt-1">{errors.displayNamePT.message}</p>}
                </div>
                <div>
                  <Label htmlFor="displayNameEN">Display Name (EN)</Label>
                  <Input id="displayNameEN" {...register('displayNameEN')} />
                </div>
                <div>
                  <Label htmlFor="displayNameES">Display Name (ES)</Label>
                  <Input id="displayNameES" {...register('displayNameES')} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" {...register('category')} />
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                </div>
                 <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Input id="subcategory" {...register('subcategory')} />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="baseDescriptionPT">Base Description (PT)</Label>
                <Textarea id="baseDescriptionPT" {...register('baseDescriptionPT')} />
                {errors.baseDescriptionPT && <p className="text-red-500 text-sm mt-1">{errors.baseDescriptionPT.message}</p>}
              </div>
              <div className="mt-4">
                <Label htmlFor="baseDescriptionEN">Base Description (EN)</Label>
                <Textarea id="baseDescriptionEN" {...register('baseDescriptionEN')} />
              </div>
              <div className="mt-4">
                <Label htmlFor="baseDescriptionES">Base Description (ES)</Label>
                <Textarea id="baseDescriptionES" {...register('baseDescriptionES')} />
              </div>

              <div className="mt-4">
                <Label htmlFor="baseFeatures">Base Features (comma-separated)</Label>
                <Controller
                    name="baseFeatures"
                    control={control}
                    render={({ field }) => (
                        <Textarea 
                            id="baseFeatures" 
                            placeholder="Feature 1, Feature 2, ..."
                            value={Array.isArray(field.value) ? field.value.join(', ') : field.value || ''}
                            onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                        />
                    )}
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="baseMaterials">Base Materials (comma-separated)</Label>
                 <Controller
                    name="baseMaterials"
                    control={control}
                    render={({ field }) => (
                        <Textarea 
                            id="baseMaterials" 
                            placeholder="Material 1, Material 2, ..."
                            value={Array.isArray(field.value) ? field.value.join(', ') : field.value || ''}
                            onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                        />
                    )}
                />
              </div>
            </section>

            <section className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium">Variants</h3>
                <Button type="button" variant="outline" size="sm" onClick={() => append({ id: undefined, colorKey: '', colorHex: '', colorNamePT: '', mainImageURL: '', angleImageURLs: [] } )}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Variant
                </Button>
              </div>
              {errors.variants?.message && <p className="text-red-500 text-sm mb-2">{errors.variants.message}</p>}
              
              <div className="space-y-6">
                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-md relative">
                     <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-md mb-1">Variant {index + 1} {field.id ? '(Existing)' : '(New)'}</h4>
                        <Controller
                            name={`defaultVariantIndex`}
                            control={control}
                            render={({ field: controllerField }) => (
                                <label className="flex items-center text-sm space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    {...register('defaultVariantIndex')}
                                    value={index}
                                    checked={Number(watch('defaultVariantIndex')) === index}
                                    onChange={(e) => setValue('defaultVariantIndex', parseInt(e.target.value, 10), { shouldValidate: true, shouldDirty: true })}
                                    className="form-radio h-4 w-4"
                                />
                                <span>Set as Default Variant</span>
                                </label>
                            )}
                        />
                    </div>
                    {errors.variants?.[index]?.root && <p className="text-red-500 text-sm mt-1">{errors.variants[index]?.root?.message}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`variants.${index}.colorKey`}>Color Key</Label>
                        <Input id={`variants.${index}.colorKey`} {...register(`variants.${index}.colorKey`)} />
                        {errors.variants?.[index]?.colorKey && <p className="text-red-500 text-sm mt-1">{errors.variants[index]?.colorKey?.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor={`variants.${index}.colorHex`}>Color Hex (e.g. #FFFFFF)</Label>
                        <Input id={`variants.${index}.colorHex`} {...register(`variants.${index}.colorHex`)} />
                        {errors.variants?.[index]?.colorHex && <p className="text-red-500 text-sm mt-1">{errors.variants[index]?.colorHex?.message}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                            <Label htmlFor={`variants.${index}.colorNamePT`}>Color Name (PT)</Label>
                            <Input id={`variants.${index}.colorNamePT`} {...register(`variants.${index}.colorNamePT`)} />
                            {errors.variants?.[index]?.colorNamePT && <p className="text-red-500 text-sm mt-1">{errors.variants[index]?.colorNamePT?.message}</p>}
                        </div>
                         <div>
                            <Label htmlFor={`variants.${index}.colorNameEN`}>Color Name (EN)</Label>
                            <Input id={`variants.${index}.colorNameEN`} {...register(`variants.${index}.colorNameEN`)} />
                        </div>
                         <div>
                            <Label htmlFor={`variants.${index}.colorNameES`}>Color Name (ES)</Label>
                            <Input id={`variants.${index}.colorNameES`} {...register(`variants.${index}.colorNameES`)} />
                        </div>
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor={`variants.${index}.mainImageURL`}>Main Image URL</Label>
                      <Input id={`variants.${index}.mainImageURL`} {...register(`variants.${index}.mainImageURL`)} placeholder="https://example.com/image.jpg"/>
                      {errors.variants?.[index]?.mainImageURL && <p className="text-red-500 text-sm mt-1">{errors.variants[index]?.mainImageURL?.message}</p>}
                    </div>

                    {fields.length > 1 && (
                      <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove Variant</span>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {errors.defaultVariantIndex && <p className="text-red-500 text-sm mt-2">{errors.defaultVariantIndex.message}</p>}
            </section>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => router.push('/admin/products')} disabled={isLoading || isFetchingData}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isFetchingData}>
              {isLoading ? 'Saving...' : (isFetchingData ? 'Loading Data...' : 'Save Changes')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 