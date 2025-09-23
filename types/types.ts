export interface ProfileData {
  id: number;
  email: string;
  nom: string;
  prenoms: string;
  dateDeNaissance?: string;
  telephone: string;
  adresse: string;
  commune?: string;
  langue: string;
  nationalite?: string;
}
