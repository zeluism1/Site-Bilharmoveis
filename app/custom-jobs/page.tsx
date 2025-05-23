"use client";

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  Palette,
  Truck,
  Wrench,
  X,
  Menu,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { useState, useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import '@/lib/i18n';
import type { Project } from '@/types/api';

// --- Constants & Fetcher ---
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PROCESS_STEPS = [
  { id: 1, titleKey: 'customJobsPage.processSection.step1Title', descriptionKey: 'customJobsPage.processSection.step1Desc', icon: Briefcase },
  { id: 2, titleKey: 'customJobsPage.processSection.step2Title', descriptionKey: 'customJobsPage.processSection.step2Desc', icon: Palette },
  { id: 3, titleKey: 'customJobsPage.processSection.step3Title', descriptionKey: 'customJobsPage.processSection.step3Desc', icon: Wrench },
  { id: 4, titleKey: 'customJobsPage.processSection.step4Title', descriptionKey: 'customJobsPage.processSection.step4Desc', icon: Truck },
];

// --- Helper Functions ---
const getDisplayableText = (
  project: Project | null,
  field: 'title' | 'description',
  currentLang: string,
): string => {
  if (!project) return '';
  const langSuffix = currentLang.toUpperCase();
  const currentLangField = `${field}${langSuffix}` as keyof Project;
  const fallbackFieldPT = `${field}PT` as keyof Project;

  const primary = project[currentLangField];
  if (typeof primary === 'string' && primary.trim()) return primary;

  const fallback = project[fallbackFieldPT]; // Common fallback
  if (typeof fallback === 'string' && fallback.trim()) return fallback;
  
  // No ultimate fallback to base field. If specific lang versions aren't found, return empty.
  return '';
};

const getProjectAltText = (
  project: Project | null,
  t: Function,
  currentLang: string,
): string => {
  if (!project) return t('customJobsPage.gallerySection.viewProject');
  const title = getDisplayableText(project, 'title', currentLang);
  return title || t('customJobsPage.gallerySection.viewProject');
};


// --- Sub-Components ---

interface PageHeaderProps {
  t: Function;
}
const PageHeader: React.FC<PageHeaderProps> = ({ t }) => (
  <section className="py-16 px-6 text-center bg-white shadow-sm">
    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
      {t('customJobsPage.title')}
    </h1>
    <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
      {t('customJobsPage.subtitle')}
    </p>
  </section>
);

interface ProcessSidebarProps {
  t: Function;
  isOpen: boolean;
  onClose: () => void;
}
const ProcessSidebar: React.FC<ProcessSidebarProps> = ({ t, isOpen, onClose }) => (
  <>
    <aside
      id="process-sidebar"
      className={`fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`} // This will make it full viewport height on desktop
      aria-label={t('customJobsPage.ourProcess', 'Our Process')}
    >
      {/* Inner div handles scrolling for sidebar content */}
      <div className="h-full overflow-y-auto py-10 px-6 space-y-10">
        <div>
          <h2 className="text-xl font-bold text-gray-900"> 
            {t('customJobsPage.processSection.title')} 
          </h2>
          <div className="w-16 h-1 bg-orange-500 mt-2.5 mb-8" />
        </div>

        <TooltipProvider delayDuration={100}>
          <div className="space-y-6">
            {PROCESS_STEPS.map((step) => (
              <Tooltip key={step.id}>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-default group">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-md bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <step.icon className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-semibold border-2 border-white">
                        {step.id}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-orange-700 transition-colors">
                        {t(step.titleKey)}
                      </h3>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[240px] bg-gray-800 text-white p-3 rounded-md shadow-lg border-gray-700">
                  <p className="text-xs leading-relaxed">
                    {t(step.descriptionKey)}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </aside>
    {isOpen && (
      <div
        className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
    )}
  </>
);

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  idx: number;
  t: Function;
  currentLang: string;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal, idx, t, currentLang }) => {
  const displayTitle = getDisplayableText(project, 'title', currentLang);
  const displayDescription = getDisplayableText(project, 'description', currentLang);

  return (
    <Card
      key={project.id || `project-${idx}`}
      className="overflow-hidden group transform hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer border-gray-200 bg-white rounded-xl"
      onClick={() => onOpenModal(project)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpenModal(project);
      }}
      aria-label={`${t('customJobsPage.gallerySection.viewProjectDetailsFor')} ${displayTitle || project.id}`}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={getProjectAltText(project, t, currentLang)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={idx < 4} 
          />
          {(displayTitle || project.location) && ( 
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {displayTitle && (
                <h3 className="text-md font-semibold text-white mb-0.5 truncate">
                  {displayTitle}
                </h3>
              )}
              {project.location && (
                <p className="text-xs text-gray-200 truncate">
                  {project.location}
                </p>
              )}
            </div>
          )}
        </div>
        {displayDescription && (
          <div className="p-4">
            <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
              {displayDescription}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  t: Function;
  currentLang: string;
}
const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose, t, currentLang }) => {
  if (!isOpen || !project) return null;
  
  const modalTitle = getDisplayableText(project, 'title', currentLang);
  const modalDescription = getDisplayableText(project, 'description', currentLang);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby={modalTitle ? "project-modal-title" : undefined}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[102] p-2.5 bg-white/25 hover:bg-white/40 text-white rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/60"
        aria-label={t('common:close', 'Close modal')}
      >
        <X className="h-5 w-5" />
      </button>

      <div
        className="relative w-full max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60rem] h-[80vh] group animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <Image
          src={project.imageUrl}
          alt={getProjectAltText(project, t, currentLang)}
          fill
          className="object-contain rounded-lg shadow-2xl"
          sizes="90vw"
        />
        {(modalTitle || project.location || modalDescription) && (
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-b-lg space-y-1.5">
            {modalTitle && (
              <h3 id="project-modal-title" className="text-xl md:text-2xl font-bold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
                {modalTitle}
              </h3>
            )}
            {project.location && (
              <p className="text-xs md:text-sm text-gray-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]">
                {project.location}
              </p>
            )}
            {modalDescription && (
              <p className="text-xs md:text-sm text-gray-100 leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.7)] max-h-24 overflow-y-auto">
                {modalDescription}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface FloatingCTAProps {
  t: Function;
}
const FloatingCTA: React.FC<FloatingCTAProps> = ({ t }) => (
  // Positioned bottom-8, right-8. White text on orange pill.
  <div className="fixed bottom-8 right-8 z-50"> 
    <Button
      asChild
      size="lg" 
      className="bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl rounded-full px-6 py-3 transition-all duration-300 font-semibold"
    >
      <Link href="/contact">
        {t('customJobsPage.ctaSection.buttonFloating', 'Start Your Project')}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  </div>
);


// --- Main Page Component ---
export default function CustomJobsPage() {
  const { t, i18n } = useTranslation(['common', 'customJobsPage']);
  const currentLang = i18n.language;

  const { data: projectsData, error: projectsError } = useSWR<{ data: Project[] }>(
    '/api/projects',
    fetcher,
  );
  const projects = projectsData?.data || [];
  const isLoadingProjects = !projectsData && !projectsError;

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      if (document.body.style.overflow === 'hidden' && !isModalOpen) {
         document.body.style.overflow = '';
      }
    };
  }, [isModalOpen, closeModal]);

  return (
    <div className="min-h-screen bg-gray-100">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        aria-label={t('common:toggleMenu', 'Toggle menu')}
        aria-expanded={sidebarOpen}
        aria-controls="process-sidebar"
      >
        <Menu className="h-5 w-5 text-gray-700" />
      </button>

      <ProcessSidebar t={t} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* MODIFIED: pb-28 to pb-80 (320px) to create space for a global footer and the floating CTA above it */}
      <main className="lg:ml-72 pb-80"> 
        <PageHeader t={t} />

        <section className="pt-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {isLoadingProjects && (
              <div className="flex items-center justify-center h-96">
                <div role="status" aria-label={t('common:loading', 'Loading...')}>
                  <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500" />
                </div>
              </div>
            )}

            {projectsError && (
              <div className="text-center text-red-600 p-8 bg-red-50 rounded-xl shadow">
                <h3 className="font-semibold text-lg mb-2">{t('common:error', 'Error')}</h3>
                <p>{t('common:errorLoadingData', 'Could not load data. Please try again later.')}</p>
              </div>
            )}

            {!isLoadingProjects && projects.length === 0 && !projectsError && (
              <div className="text-center py-20">
                <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {t('customJobsPage.gallerySection.noProjectsTitle', 'No Custom Projects Yet')}
                </h3>
                <p className="text-gray-500 text-lg max-w-md mx-auto">
                  {t('customJobsPage.gallerySection.noProjects', 'Check back soon to see our amazing custom work!')}
                </p>
              </div>
            )}

            {projects.length > 0 && (
              <div
                className="grid gap-6 md:gap-8 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]"
              >
                {projects.map((project, idx) => (
                  <ProjectCard
                    key={project.id || `project-card-${idx}`}
                    project={project}
                    onOpenModal={openModal}
                    idx={idx}
                    t={t}
                    currentLang={currentLang}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
        t={t}
        currentLang={currentLang}
      />

      <FloatingCTA t={t} />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}