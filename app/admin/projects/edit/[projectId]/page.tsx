'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { Project, projectSchema } from '@/types/api';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

type ProjectFormValues = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

export default function EditProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { t } = useTranslation(['adminProjects', 'common']);

  const projectId = params.projectId as string;

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema.omit({ id: true, createdAt: true, updatedAt: true })),
    defaultValues: {
      titlePT: '',
      titleEN: '',
      titleES: '',
      imageUrl: '',
      location: '',
      descriptionPT: '',
      descriptionEN: '',
      descriptionES: '',
    },
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        if (!response.ok) {
          throw new Error(t('errorFetchProject', {ns: 'adminProjects'}));
        }
        const { data } = await response.json();
        form.reset(data);
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error('Error fetching project:', error);
        toast({
          title: t('common:error'),
          description: error instanceof Error ? error.message : t('errorFetchProject', {ns: 'adminProjects'}),
          variant: 'destructive',
        });
        router.push('/admin/projects');
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId, form, router, toast, t]);

  const handleImageUpload = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/projects/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(t('common:uploadFailed'));
      const data = await response.json();
      setImageUrl(data.url);
      form.setValue('imageUrl', data.url);
      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: t('common:error'),
        description: t('common:imageUploadError'),
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error?.message || t('errorUpdateProject', {ns: 'adminProjects'}));
      }

      toast({
        title: t('common:success'),
        description: t('successUpdateProject', {ns: 'adminProjects'}),
      });
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: t('common:error'),
        description: error instanceof Error ? error.message : t('errorUpdateProject', {ns: 'adminProjects'}),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">{t('editProject', {ns: 'adminProjects'})}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {/* Title Fields */}
              <FormField
                control={form.control}
                name="titlePT"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('titlePT', {ns: 'adminProjects'})} ({t('common:optional')})</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="titleEN"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('titleEN', {ns: 'adminProjects'})} ({t('common:optional')})</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="titleES"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('titleES', {ns: 'adminProjects'})} ({t('common:optional')})</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload */}
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('image', {ns: 'adminProjects'})}</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="text"
                          {...field}
                          readOnly
                          placeholder={t('uploadInstruction', {ns: 'adminProjects'})}
                          className="mb-2"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="project-image-upload"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) await handleImageUpload(file);
                          }}
                          disabled={isUploading}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('project-image-upload')?.click()}
                          disabled={isUploading}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {isUploading ? t('common:uploading') : t('common:uploadImage')}
                        </Button>
                        {imageUrl && (
                          <div className="mt-2">
                            <Image
                              src={imageUrl}
                              alt="Preview"
                              width={100}
                              height={100}
                              className="rounded"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('location', {ns: 'adminProjects'})} ({t('common:optional')})</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Fields */}
              <FormField
                control={form.control}
                name="descriptionPT"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('descriptionPT', {ns: 'adminProjects'})} ({t('common:optional')})</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descriptionEN"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('descriptionEN', {ns: 'adminProjects'})} ({t('common:optional')})</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descriptionES"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('descriptionES', {ns: 'adminProjects'})} ({t('common:optional')})</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/projects')}
              disabled={isSubmitting}
            >
              {t('cancel', {ns: 'adminProjects'})}
            </Button>
            <Button type="submit" disabled={isSubmitting || isUploading}>
              {isSubmitting ? t('saving', {ns: 'adminProjects'}) : t('save', {ns: 'adminProjects'})}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 