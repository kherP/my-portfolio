declare interface AppDetails {
  brand: string;
  header: string;
  subheader: string;
  description: string;
  copyrightText: string;
  imageAttribution: string;
  email: string;
}

declare interface DetailsProps {
  details: AppDetails;
}

declare interface ExperienceItem {
  image: string;
  name: string;
  description: string;
  techstack: string[];
}

declare interface SkillItem {
  image: string;
  name: string;
  description: string;
  proficiency: number;
}

declare interface ExperienceDetailsProps {
  image: string;
  name: string;
  techstack: string[];
  overview: string;
  client: string;
  role: string;
  challenges: string;
  result: string;
}

declare interface FileItem {
  store: Writable<any> ;
  request: Promise<Response>;
}

declare interface GistFileResponse {
  raw_url: string;
}

declare interface GistResponse {
  files: {
    [key: string]: GistFileResponse
  }
}

declare interface MenuItem {
  label: string;
  route: string;
}

declare interface Routes {
  root: string;
  experiences: string;
  experience: string;
  skill: string;
}

declare interface AppConfig {
  defaultExperienceCount: number;
  defaultSkillCount: number;
  isDevelopment: boolean;
}

declare interface APIResponse<T> {
  result: T
}