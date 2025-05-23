import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Briefcase, Palette, Truck, Wrench } from 'lucide-react';
import { PrismaClient } from '@/src/generated/prisma/client';
import { Metadata } from 'next';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const prisma = new PrismaClient();

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'Custom Projects',
    description: 'Custom furniture projects for hospitality',
  };
}

async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function CustomJobsPage({ params: { locale } }: { params: { locale: string } }) {
  const projects = await getProjects();

  const processSteps = [
    {
      titleKey: 'customJobs.processSection.step1.title',
      descriptionKey: 'customJobs.processSection.step1.description',
      icon: Briefcase,
    },
    {
      titleKey: 'customJobs.processSection.step2.title',
      descriptionKey: 'customJobs.processSection.step2.description',
      icon: Palette,
    },
    {
      titleKey: 'customJobs.processSection.step3.title',
      descriptionKey: 'customJobs.processSection.step3.description',
      icon: Wrench,
    },
    {
      titleKey: 'customJobs.processSection.step4.title',
      descriptionKey: 'customJobs.processSection.step4.description',
      icon: Truck,
    },
  ];

  const getLocalizedText = (project: any, field: 'title' | 'description') => {
    const key = `${field}${locale.toUpperCase()}` as keyof typeof project;
    const fallbackKey = `${field}PT` as keyof typeof project;
    return (project[key] || project[fallbackKey] || '') as string;
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-gray-900">Custom Projects</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We collaborate with architects, interior designers, and hospitality businesses to create bespoke furniture solutions.
        </p>
      </div>

      {/* Process Section */}
      <section className="mb-16 md:mb-24">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Our Custom Journey</h2>
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connecting lines (for larger screens) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2">
            <div className="relative h-full">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="absolute h-0.5 bg-orange-200" style={{ left: `${(i + 1) * 25 - 12.5}%`, width: '25%', top: '0' }}></div>
              ))}
            </div>
          </div>
          
          {processSteps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <div className="absolute -top-5 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md">
                {index + 1}
              </div>
              <step.icon className="w-12 h-12 text-orange-500 mb-4 mt-8" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {index === 0 ? 'Consultation & Briefing' :
                 index === 1 ? 'Design & Prototyping' :
                 index === 2 ? 'Manufacturing Excellence' :
                 'Delivery & Installation'}
              </h3>
              <p className="text-gray-600 text-sm">
                {index === 0 ? 'Understanding your vision, needs, and project scope.' :
                 index === 1 ? 'Crafting concepts, detailed drawings, and sample production.' :
                 index === 2 ? 'Skilled artisans bring your furniture to life in our Portuguese workshop.' :
                 'Seamless logistics and on-site setup for a perfect finish.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Library / Portfolio */}
      <section className="mb-16 md:mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3 text-gray-900">Our Portfolio</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore a selection of our realized custom projects.</p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500">More project showcases coming soon. Check back later!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden group transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={project.imageUrl}
                      alt={getLocalizedText(project, 'title')}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-4 absolute bottom-0 left-0 right-0 text-white">
                        <h3 className="text-lg font-semibold">{getLocalizedText(project, 'title')}</h3>
                        {project.location && <p className="text-sm opacity-80">{project.location}</p>}
                      </div>
                    </div>
                  </div>
                </CardContent>
                {getLocalizedText(project, 'description') && (
                  <div className="p-4 border-t">
                    <p className="text-sm text-gray-600 line-clamp-3">{getLocalizedText(project, 'description')}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 text-white rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Custom Project?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Contact our team to discuss your requirements and discover how we can create the perfect furniture solution for your space.
        </p>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-orange-500 transition-colors duration-300"
        >
          <Link href={`/${locale}/contact`}>
            Talk to Our Design Team <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
} 